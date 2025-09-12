import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DYSLEXIA_QUESTIONS } from '../data/dyslexiaQuestions';
import type { DyslexiaAnswer, DyslexiaTestResult } from '../data/dyslexiaQuestions';
import { DyslexiaTestService } from '../services/dyslexiaTestService';
import { LearningPlanService } from '../services/learningPlanService';
import { DyslexiaRiskLevel } from '../enum';
import SimpleProgressBar from './SimpleProgressBar';
import LearningPlanDisplay from './LearningPlanDisplay';
import TreatmentCentersDisplay from './TreatmentCentersDisplay';

const DyslexiaChildTest: React.FC = () => {
  const navigate = useNavigate();
  
  // Test state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState<DyslexiaAnswer[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [testStartTime] = useState(Date.now());
  const [testResult, setTestResult] = useState<DyslexiaTestResult | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Audio state
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  
  const currentQuestion = DYSLEXIA_QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setUserAnswer('');
    
    // Cleanup audio when component unmounts
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.remove();
      }
    };
  }, [currentQuestionIndex]);

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
    if (currentQuestionIndex < DYSLEXIA_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeTest(newAnswers);
    }
  };

  const completeTest = (finalAnswers: DyslexiaAnswer[]) => {
    const testEndTime = Date.now();
    const result = DyslexiaTestService.calculateTestResult(
      finalAnswers,
      DYSLEXIA_QUESTIONS,
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

  // Render test result
  if (isCompleted && testResult) {
    const learningRecommendation = LearningPlanService.generateLearningRecommendation(testResult);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-7xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-teal-600 mb-4">🎉 Hoàn thành bài test!</h1>
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
                  <h3 className="font-semibold text-gray-700 mb-2">Điểm số</h3>
                  <p className="text-3xl font-bold text-teal-600 mb-1">
                    {testResult.totalScore}/{testResult.maxScore}
                  </p>
                  <p className="text-sm text-gray-500">({testResult.percentage.toFixed(1)}%)</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="font-semibold text-gray-700 mb-2">Mức độ rủi ro</h3>
                  <p className={`text-2xl font-bold ${getRiskLevelColor(testResult.riskLevel)}`}>
                    {getRiskLevelText(testResult.riskLevel)}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="font-semibold text-gray-700 mb-2">Thời gian</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {testResult.completionTime.toFixed(1)} phút
                  </p>
                  <p className="text-sm text-gray-500">Mục tiêu: 5 phút</p>
                </div>
              </div>

              {/* Module Scores */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Điểm từng module:</h3>
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
                <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Khuyến nghị:</h3>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {testResult.recommendations}
                </div>
              </div>
            </div>

            {/* Right Column - Learning Plan or Treatment Centers */}
            <div className="space-y-6">
              {learningRecommendation ? (
                <div>
                  {/* Encouragement message */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-6 mb-6">
                    <div className="text-center mb-4">
                      <div className="text-3xl mb-2">
                        {learningRecommendation.type === 'learning_plan' ? '💪' : '🏥'}
                      </div>
                      <h3 className="text-lg font-bold text-orange-700 mb-2">
                        {learningRecommendation.type === 'learning_plan' 
                          ? 'Cần hỗ trợ học tập' 
                          : 'Cần can thiệp chuyên nghiệp'
                        }
                      </h3>
                    </div>
                    <p className="text-gray-700 text-center leading-relaxed">
                      {LearningPlanService.getEncouragementMessage(learningRecommendation.correctAnswers)}
                    </p>
                  </div>

                  {/* Learning Plan or Treatment Centers */}
                  {learningRecommendation.type === 'learning_plan' && learningRecommendation.learningPlans && (
                    <LearningPlanDisplay 
                      learningPlans={learningRecommendation.learningPlans}
                      weakestModules={learningRecommendation.weakestModules}
                    />
                  )}
                  
                  {learningRecommendation.type === 'treatment_centers' && learningRecommendation.treatmentCenters && (
                    <TreatmentCentersDisplay 
                      treatmentCenters={learningRecommendation.treatmentCenters}
                    />
                  )}
                </div>
              ) : (
                // If no specific recommendation needed (good results)
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-3">🎉</div>
                  <h2 className="text-2xl font-bold text-green-700 mb-4">Kết quả tuyệt vời!</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Chúc mừng! Kết quả cho thấy trẻ có khả năng học tập tốt. Hãy tiếp tục duy trì và 
                    phát triển những kỹ năng này thông qua việc đọc sách và luyện tập hàng ngày.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition font-semibold"
            >
              📊 Xem lịch sử test
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition font-semibold"
            >
              🔄 Làm lại bài test
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition font-semibold"
            >
              🏠 Về trang chủ
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
              Test Sàng lọc Dyslexia (4-5 tuổi)
            </h1>
            <div className="text-sm text-gray-500">
              Câu {currentQuestionIndex + 1}/{DYSLEXIA_QUESTIONS.length}
            </div>
          </div>
          
          <SimpleProgressBar 
            current={currentQuestionIndex + 1} 
            total={DYSLEXIA_QUESTIONS.length} 
          />
          
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              ⏱️ Thời gian khuyến nghị: <strong>30 giây/câu</strong> | 
              🎯 Tổng thời gian: <strong>5 phút</strong>
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
                  🔊 Phát âm thanh
                </button>
                <p className="text-sm text-gray-500 mt-2">Bấm để nghe lại</p>
              </div>
            )}

            {/* Image */}
            {currentQuestion.imageFilePath && (
              <div className="mb-6 text-center">
                <img
                  src={currentQuestion.imageFilePath}
                  alt="Hình ảnh câu hỏi"
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
              ← Thoát
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
              {currentQuestionIndex === DYSLEXIA_QUESTIONS.length - 1 ? '🏁 Hoàn thành' : 'Tiếp theo →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DyslexiaChildTest;
