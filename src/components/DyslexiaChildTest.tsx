import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TestbankService } from '../data/testbankService';
import type { DyslexiaAnswer, DyslexiaTestResult, DyslexiaQuestion } from '../data/testbankService';
import { DyslexiaTestService } from '../services/dyslexiaTestService';
import { DyslexiaRiskLevel } from '../enum';
import SimpleProgressBar from './SimpleProgressBar';
import EmailNotificationComponent from './EmailNotificationComponent';
import { useTranslation } from 'react-i18next';

const DyslexiaChildTest: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Test state
  const [questions, setQuestions] = useState<DyslexiaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState<DyslexiaAnswer[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [testStartTime] = useState(Date.now());
  const [testResult, setTestResult] = useState<DyslexiaTestResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Audio state
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  
  const currentQuestion = questions[currentQuestionIndex];

  // Load questions from testbank
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const loadedQuestions = await TestbankService.loadDyslexiaQuestions();
        setQuestions(loadedQuestions);
      } catch (error) {
        console.error('Failed to load questions:', error);
        // Handle error appropriately - maybe show error message or use fallback
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      setQuestionStartTime(Date.now());
      setUserAnswer('');
      
      // Cleanup audio when component unmounts
      return () => {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.remove();
        }
      };
    }
  }, [currentQuestionIndex, questions]);

  const playAudio = (audioPath: string) => {
    try {
      // Stop current audio if playing
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.remove();
      }

      const audio = new Audio(audioPath);
      setCurrentAudio(audio);
      
      audio.addEventListener('error', () => {
        console.warn('Audio file not found:', audioPath);
      });
      
      audio.play().catch(error => {
        console.warn('Could not play audio:', error);
      });
    } catch (error) {
      console.warn('Audio error:', error);
    }
  };

  const handleAnswerSubmit = () => {
    if (!userAnswer.trim()) {
      alert('Vui lòng chọn một đáp án!');
      return;
    }

    const endTime = Date.now();
    const responseTime = (endTime - questionStartTime) / 1000; // Convert to seconds
    const isCorrect = DyslexiaTestService.checkAnswer(userAnswer, currentQuestion.correctAnswer);
    const score = DyslexiaTestService.calculateQuestionScore(isCorrect, currentQuestion.maxScore, responseTime);

    const answer: DyslexiaAnswer = {
      questionId: currentQuestion.id,
      userAnswer,
      isCorrect,
      score,
      responseTime,
      startTime: questionStartTime,
      endTime
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Move to next question or complete test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeTest(newAnswers);
    }
  };

  const completeTest = (finalAnswers: DyslexiaAnswer[]) => {
    const testEndTime = Date.now();
    const result = DyslexiaTestService.calculateTestResult(
      finalAnswers,
      questions,
      testStartTime,
      testEndTime
    );

    // Save result to localStorage
    DyslexiaTestService.saveTestResult(result);
    
    setTestResult(result);
    setIsCompleted(true);
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case DyslexiaRiskLevel.LOW: return 'text-green-600';
      case DyslexiaRiskLevel.MEDIUM: return 'text-yellow-600';
      case DyslexiaRiskLevel.HIGH: return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskLevelText = (riskLevel: string) => {
    switch (riskLevel) {
      case DyslexiaRiskLevel.LOW: return 'Rủi ro thấp';
      case DyslexiaRiskLevel.MEDIUM: return 'Rủi ro trung bình';
      case DyslexiaRiskLevel.HIGH: return 'Rủi ro cao';
      default: return 'Chưa xác định';
    }
  };

  const getRiskLevelIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case DyslexiaRiskLevel.LOW: return '✅';
      case DyslexiaRiskLevel.MEDIUM: return '⚠️';
      case DyslexiaRiskLevel.HIGH: return '🚨';
      default: return '❓';
    }
  };

  const getFailureLevel = () => {
    if (!testResult) return null;
    
    const totalQuestions = questions.length;
    const wrongAnswers = totalQuestions - testResult.totalScore;
    
    if (wrongAnswers >= 7) return 'severe'; // 75%
    if (wrongAnswers >= 3) return 'mild';   // 25%
    return null;
  };

  const getSuggestionContent = () => {
    const failureLevel = getFailureLevel();
    if (!failureLevel) return null;

    const isSevere = failureLevel === 'severe';
    
    return {
      title: t('results.suggestions.title'),
      message: isSevere ? t('results.suggestions.failed75') : t('results.suggestions.failed25'),
      recommendations: isSevere ? t('results.suggestions.recommendations.severe') : t('results.suggestions.recommendations.mild'),
      generalTips: t('results.suggestions.recommendations.general')
    };
  };

  // Show loading state while questions are being loaded
  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">{t('test.loading')}</h2>
          <p className="text-gray-500 mt-2">{t('test.loadingQuestions')}</p>
        </div>
      </div>
    );
  }

  // Show error state if no questions loaded
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-700">{t('test.errorLoading')}</h2>
          <p className="text-gray-500 mt-2">{t('test.errorLoadingQuestions')}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
          >
            {t('test.retry')}
          </button>
        </div>
      </div>
    );
  }

  // Render test result
  if (isCompleted && testResult) {
    const suggestionContent = getSuggestionContent();
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-7xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal-600 mb-4">{t('results.title')}</h1>
            <div className="text-6xl mb-4">
              {getRiskLevelIcon(testResult.riskLevel)}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column - Main Results */}
            <div className="space-y-6">
              {/* Results Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="font-semibold text-gray-700 mb-2">{t('results.score')}</h3>
                  <p className="text-3xl font-bold text-teal-600 mb-1">
                    {testResult.totalScore}/{testResult.maxScore}
                  </p>
                  <p className="text-sm text-gray-500">({testResult.percentage.toFixed(1)}%)</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="font-semibold text-gray-700 mb-2">{t('results.riskLevel')}</h3>
                  <p className={`text-2xl font-bold ${getRiskLevelColor(testResult.riskLevel)}`}>
                    {getRiskLevelText(testResult.riskLevel)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="font-semibold text-gray-700 mb-2">{t('results.time')}</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {testResult.completionTime.toFixed(1)} phút
                  </p>
                  <p className="text-sm text-gray-500">{t('results.timeTarget')}</p>
                </div>
              </div>

              {/* Module Scores */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('results.moduleScores')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(testResult.moduleScores).map(([module, score]) => {
                    const moduleScore = score as any;
                    return moduleScore.questionsCount > 0 && (
                      <div key={module} className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-700 mb-2">
                          {DyslexiaTestService.getModuleName(module)}
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-600">
                            {moduleScore.score}/{moduleScore.maxScore}
                          </span>
                          <span className={`text-sm font-semibold ${
                            moduleScore.percentage >= 70 ? 'text-green-600' :
                            moduleScore.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {moduleScore.percentage.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{t('results.recommendations')}</h3>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {testResult.recommendations}
                </div>
              </div>
            </div>

            {/* Right Column - Suggestions (if failed) */}
            {suggestionContent ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">💡</div>
                    <h2 className="text-2xl font-bold text-orange-700 mb-4">
                      {suggestionContent.title}
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Main Message */}
                    <div className="bg-white/50 rounded-lg p-6">
                      <p className="text-gray-700 leading-relaxed">
                        {suggestionContent.message}
                      </p>
                    </div>

                    {/* General Tips */}
                    <div className="bg-white/50 rounded-lg p-6">
                      <h4 className="font-bold text-orange-700 mb-3">🌟 Gợi ý chung:</h4>
                      <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                        {suggestionContent.generalTips}
                      </div>
                    </div>

                    {/* Specific Recommendations */}
                    <div className="bg-white/50 rounded-lg p-6">
                      <h4 className="font-bold text-orange-700 mb-3">🎯 Khuyến nghị cụ thể:</h4>
                      <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                        {suggestionContent.recommendations}
                      </div>
                    </div>

                    {/* Encouragement */}
                    <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 text-center">
                      <div className="text-2xl mb-2">🌈</div>
                      <p className="text-green-700 font-semibold">
                        Mỗi trẻ đều có tốc độ phát triển riêng. Với sự hỗ trợ phù hợp, mọi trẻ đều có thể tiến bộ!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Notification Component */}
                <EmailNotificationComponent 
                  testResult={testResult}
                  userEmail={""} // Replace with actual user email from auth context
                />
              </div>
            ) : (
              // If no suggestions needed, still show email notifications
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-3">🎉</div>
                  <h2 className="text-2xl font-bold text-green-700 mb-4">Excellent Results!</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Great job! The results show good reading skills. Keep up the excellent work and continue practicing to maintain this level.
                  </p>
                </div>

                <EmailNotificationComponent 
                  testResult={testResult}
                  userEmail={""} // Replace with actual user email from auth context
                />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition font-semibold"
            >
              {t('results.viewHistory')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition font-semibold"
            >
              {t('results.retakeTest')}
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
            >
              🏠 {t('common.home')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render question
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-teal-600">
              {t('test.title')}
            </h1>
            <div className="text-sm text-gray-500">
              {t('test.question')} {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
          
          <SimpleProgressBar 
            current={currentQuestionIndex + 1} 
            total={questions.length} 
          />
          
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              {t('test.timeRecommendation')} | 
              {t('test.totalTime')}
            </p>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {currentQuestion.questionText}
            </h2>

            {/* Audio Player */}
            {currentQuestion.audioFilePath && (
              <div className="mb-6 text-center">
                <button
                  onClick={() => playAudio(currentQuestion.audioFilePath!)}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition flex items-center gap-2 mx-auto font-semibold"
                >
                  {t('test.playAudio')}
                </button>
                <p className="text-sm text-gray-500 mt-2">{t('test.playAgain')}</p>
              </div>
            )}

            {/* Image */}
            {currentQuestion.imageFilePath && (
              <div className="mb-6 text-center">
                <img
                  src={currentQuestion.imageFilePath}
                  alt={t('test.imageAlt')}
                  className="max-w-md mx-auto rounded-lg shadow"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-4">
              {/* Text input for writing questions */}
              {currentQuestion.isTextInput ? (
                <div className="text-center">
                  <label className="block text-lg font-medium text-gray-700 mb-4">
                    Viết chữ cái bạn nghe được:
                  </label>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
                    className="w-32 h-16 text-center text-2xl font-bold border-4 border-gray-300 rounded-lg focus:border-teal-500 focus:outline-none mx-auto block"
                    placeholder="?"
                    maxLength={1}
                    autoFocus
                  />
                </div>
              ) : (
                // Multiple choice options
                <>
                  {currentQuestion.optionA && (
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-teal-300 cursor-pointer transition">
                      <input
                        type="radio"
                        name="answer"
                        value="A"
                        checked={userAnswer === 'A'}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="mr-4 w-5 h-5"
                      />
                      <span className="text-lg">A. {currentQuestion.optionA}</span>
                    </label>
                  )}

                  {currentQuestion.optionB && (
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-teal-300 cursor-pointer transition">
                      <input
                        type="radio"
                        name="answer"
                        value="B"
                        checked={userAnswer === 'B'}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="mr-4 w-5 h-5"
                      />
                      <span className="text-lg">B. {currentQuestion.optionB}</span>
                    </label>
                  )}

                  {currentQuestion.optionC && (
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-teal-300 cursor-pointer transition">
                      <input
                        type="radio"
                        name="answer"
                        value="C"
                        checked={userAnswer === 'C'}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="mr-4 w-5 h-5"
                      />
                      <span className="text-lg">C. {currentQuestion.optionC}</span>
                    </label>
                  )}

                  {currentQuestion.optionD && (
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-teal-300 cursor-pointer transition">
                      <input
                        type="radio"
                        name="answer"
                        value="D"
                        checked={userAnswer === 'D'}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="mr-4 w-5 h-5"
                      />
                      <span className="text-lg">D. {currentQuestion.optionD}</span>
                    </label>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
            >
              ← {t('common.exit')}
            </button>

            <button
              onClick={handleAnswerSubmit}
              disabled={!userAnswer.trim()}
              className={`px-8 py-3 rounded-lg font-semibold transition ${
                userAnswer.trim()
                  ? 'bg-teal-500 text-white hover:bg-teal-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? t('test.finish') : t('common.next') + ' →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DyslexiaChildTest;
