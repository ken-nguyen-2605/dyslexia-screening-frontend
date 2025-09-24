import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Audio imports
import A_audio from "../assets/audioTestVowel/A.mp3";
import B_audio from "../assets/audioTestVowel/B.mp3";
import M_audio from "../assets/audioTestVowel/M.mp3";
import N_audio from "../assets/audioTestVowel/N.mp3";
import D_audio from "../assets/audioTestVowel/D.mp3";
import Đ_audio from "../assets/audioTestVowel/Đ.mp3";
import ca_audio from "../assets/audioTestVowel/ca.mp3";
import cá_audio from "../assets/audioTestVowel/cá.mp3";
import cà_audio from "../assets/audioTestVowel/cà.mp3";
import cả_audio from "../assets/audioTestVowel/cả.mp3";
import khiAnChuoi_audio from "../assets/audioTestVowel/khiAnChuoi.mp3";
import meoAnCa_audio from "../assets/audioTestVowel/meoAnCa.mp3";
import thichAnKem_vn_audio from "../assets/audioTestVowel/thichAnKem_vn.mp3";
import thichAnKem_ko_audio from "../assets/audioTestVowel/thichAnKem_ko.mp3.mp3";
import buoiTruaAnBuoiChua_audio from "../assets/audioTestVowel/buoiTruaAnBuoiChua.mp3";
import buoiTruaUongSuaChua_audio from "../assets/audioTestVowel/buoiTruaUongSuaChua.mp3";

// Image imports
import monkeyBananaImg from "../assets/image/testVowels/monkeyBanana.jpg";
import catFishImg from "../assets/image/testVowels/catFish.jpg";
import dogBoneImg from "../assets/image/testVowels/dogBone.jpg";

// Speaker Icon Component
const SpeakerIcon = ({ size = 64 }: { size?: number }) => {
  return (
    <div className="w-full h-full bg-pink-50 rounded-xl border-2 border-pink-200 flex items-center justify-center">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
      >
        {/* Speaker body */}
        <rect 
          x="20" 
          y="35" 
          width="25" 
          height="30" 
          fill="#ec4899" 
          rx="3"
        />
        {/* Speaker cone */}
        <path 
          d="M 45 35 L 65 25 L 65 75 L 45 65 Z" 
          fill="#ec4899"
        />
        {/* Sound waves */}
        <path 
          d="M 70 40 Q 75 50 70 60" 
          stroke="#ec4899" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
        <path 
          d="M 75 35 Q 82 50 75 65" 
          stroke="#ec4899" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

type QuestionType = {
  id: string;
  module: string;
  question: string;
  type: "audio-choice" | "text-choice" | "image-choice" | "language-recognition";
  audio?: string;
  secondAudio?: string;
  options?: { text?: string; audio?: string; image?: string }[];
  correctAnswer?: number;
  targetLetter?: string;
};

// Function to generate randomized questions
const generateRandomizedQuestions = (): QuestionType[] => {
  const questions: QuestionType[] = [];

  // Module 1: Phonological Awareness - Randomized pairs
  const phonologicalPairs = [
    { audio1: A_audio, audio2: A_audio, same: true, label: "A-A" },
    { audio1: A_audio, audio2: B_audio, same: false, label: "A-B" },
    { audio1: B_audio, audio2: B_audio, same: true, label: "B-B" },
    { audio1: B_audio, audio2: A_audio, same: false, label: "B-A" },
    { audio1: M_audio, audio2: M_audio, same: true, label: "M-M" },
    { audio1: M_audio, audio2: N_audio, same: false, label: "M-N" },
    { audio1: N_audio, audio2: N_audio, same: true, label: "N-N" },
    { audio1: N_audio, audio2: M_audio, same: false, label: "N-M" },
  ];

  const selectedPhonologicalPairs = phonologicalPairs.sort(() => Math.random() - 0.5).slice(0, 2);
  
  console.log('Selected phonological pairs:', selectedPhonologicalPairs.map(p => p.label));

  selectedPhonologicalPairs.forEach((pair, index) => {
    console.log(`Creating question ${index + 1}:`, {
      label: pair.label,
      audio1: pair.audio1,
      audio2: pair.audio2
    });
    questions.push({
      id: `phonological-${index + 1}`,
      module: "Nhận thức âm vị",
      question: "Hai âm này có giống nhau không?",
      type: "audio-choice",
      audio: pair.audio1,
      secondAudio: pair.audio2,
      options: [
        { text: "Giống nhau" },
        { text: "Khác nhau" }
      ],
      correctAnswer: pair.same ? 0 : 1
    });
  });

  // Module 2: Decoding - Randomized
  const decodingPairs = [
    { audio: D_audio, options: ["D", "Đ"], correct: 0 },
    { audio: Đ_audio, options: ["D", "Đ"], correct: 1 },
  ];

  const selectedDecoding1 = decodingPairs[Math.floor(Math.random() * decodingPairs.length)];
  
  const decodingWords = [
    { audio: ca_audio, options: ["ca", "cá", "cà", "cả"], correct: 0 },
    { audio: cá_audio, options: ["ca", "cá", "cà", "cả"], correct: 1 },
    { audio: cà_audio, options: ["ca", "cá", "cà", "cả"], correct: 2 },
    { audio: cả_audio, options: ["ca", "cá", "cà", "cả"], correct: 3 },
  ];

  const selectedDecoding2 = decodingWords[Math.floor(Math.random() * decodingWords.length)];

  questions.push({
    id: "decoding-1",
    module: "Nhận diện chữ & giải mã",
    question: "Chọn chữ cái đúng theo âm thanh:",
    type: "text-choice",
    audio: selectedDecoding1.audio,
    options: selectedDecoding1.options.map(text => ({ text })),
    correctAnswer: selectedDecoding1.correct
  });

  questions.push({
    id: "decoding-2",
    module: "Nhận diện chữ & giải mã", 
    question: "Chọn từ đúng theo âm thanh:",
    type: "text-choice",
    audio: selectedDecoding2.audio,
    options: selectedDecoding2.options.map(text => ({ text })),
    correctAnswer: selectedDecoding2.correct
  });

  // Module 3: Understanding Fluency
  questions.push(
    {
      id: "understanding-1",
      module: "Tốc độ hiểu",
      question: "Chọn hình ảnh đúng theo câu:",
      type: "image-choice",
      audio: khiAnChuoi_audio,
      options: [
        { text: "Khỉ ăn chuối", image: monkeyBananaImg },
        { text: "Mèo ăn cá", image: catFishImg },
        { text: "Chó ăn xương", image: dogBoneImg }
      ],
      correctAnswer: 0
    },
    {
      id: "understanding-2",
      module: "Tốc độ hiểu",
      question: "Chọn câu đang được phát âm:",
      type: "image-choice",
      audio: meoAnCa_audio,
      options: [
        { text: "Khỉ ăn chuối", image: monkeyBananaImg },
        { text: "Mèo ăn cá", image: catFishImg },
        { text: "Chó ăn xương", image: dogBoneImg }
      ],
      correctAnswer: 1
    }
  );

  // Module 5: Language Comprehension - Randomized
  const languagePairs = [
    { audio: thichAnKem_vn_audio, isVietnamese: true },
    { audio: thichAnKem_ko_audio, isVietnamese: false },
  ];

  const selectedLanguage = languagePairs[Math.floor(Math.random() * languagePairs.length)];

  questions.push({
    id: "language-1",
    module: "Hiểu và nhận dạng ngôn ngữ",
    question: "Đây có phải tiếng Việt không?",
    type: "language-recognition",
    audio: selectedLanguage.audio,
    options: [
      { text: "Có, đây là tiếng Việt" },
      { text: "Không, đây không phải tiếng Việt" }
    ],
    correctAnswer: selectedLanguage.isVietnamese ? 0 : 1
  });

  const sentenceComparisons = [
    { audio1: buoiTruaAnBuoiChua_audio, audio2: buoiTruaAnBuoiChua_audio, same: true },
    { audio1: buoiTruaAnBuoiChua_audio, audio2: buoiTruaUongSuaChua_audio, same: false },
    { audio1: buoiTruaUongSuaChua_audio, audio2: buoiTruaUongSuaChua_audio, same: true },
  ];

  const selectedComparison = sentenceComparisons[Math.floor(Math.random() * sentenceComparisons.length)];

  questions.push({
    id: "language-2",
    module: "Hiểu và nhận dạng ngôn ngữ",
    question: "Hai câu này có giống nhau không?",
    type: "audio-choice",
    audio: selectedComparison.audio1,
    secondAudio: selectedComparison.audio2,
    options: [
      { text: "Giống nhau" },
      { text: "Khác nhau" }
    ],
    correctAnswer: selectedComparison.same ? 0 : 1
  });

  return questions;
};

const AuditoryTest = () => {
  const navigate = useNavigate();
  
  const [questions] = useState<QuestionType[]>(() => generateRandomizedQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);
  const [moduleScores, setModuleScores] = useState<Record<string, { correct: number; total: number }>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Calculate progress
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Play audio function
  const playAudio = (audioSrc: string) => {
    console.log('playAudio called with:', audioSrc);
    
    if (playingAudio) {
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
    
    const audio = new Audio(audioSrc);
    setPlayingAudio(audio);
    
    audio.play().catch(console.error);
    
    audio.onended = () => {
      setPlayingAudio(null);
    };
  };

  // Auto-play audio when question loads
  useEffect(() => {
    // Reset states first
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestion?.audio && questions.length > 0 && currentQuestionIndex >= 0) {
      console.log(`Question ${currentQuestionIndex + 1} autoplay:`, {
        type: currentQuestion.type,
        audio: currentQuestion.audio,
        secondAudio: currentQuestion.secondAudio,
        id: currentQuestion.id
      });
      
      // Stop any currently playing audio
      if (playingAudio) {
        playingAudio.pause();
        playingAudio.currentTime = 0;
        setPlayingAudio(null);
      }
      
      if (currentQuestion.type === "audio-choice") {
        // For audio-choice questions, play audios sequentially
        const timeoutId = setTimeout(() => {
          console.log('Playing first audio:', currentQuestion.audio);
          
          const firstAudio = new Audio(currentQuestion.audio!);
          setPlayingAudio(firstAudio);
          
          firstAudio.onended = () => {
            setPlayingAudio(null);
            
            const secondTimeoutId = setTimeout(() => {
              if (currentQuestion.secondAudio) {
                console.log('Playing second audio:', currentQuestion.secondAudio);
                const secondAudio = new Audio(currentQuestion.secondAudio);
                setPlayingAudio(secondAudio);
                
                secondAudio.onended = () => {
                  setPlayingAudio(null);
                };
                
                secondAudio.play().catch(console.error);
              }
            }, 800);
            
            return () => clearTimeout(secondTimeoutId);
          };
          
          firstAudio.play().catch(console.error);
        }, 500);
        
        return () => clearTimeout(timeoutId);
      } else {
        // For other question types, play normally
        const timeoutId = setTimeout(() => {
          console.log('Playing single audio:', currentQuestion.audio);
          playAudio(currentQuestion.audio!);
        }, 500);
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    // Calculate score
    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Update module scores
    const module = currentQuestion.module;
    setModuleScores(prev => ({
      ...prev,
      [module]: {
        correct: (prev[module]?.correct || 0) + (isCorrect ? 1 : 0),
        total: (prev[module]?.total || 0) + 1
      }
    }));
  };

  const goToNextQuestion = () => {
    if (isLastQuestion) {
      // Test completed, show results
      setCurrentQuestionIndex(-1); // Use -1 to indicate results screen
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Calculate dyslexia risk based on module scores
  const calculateDyslexiaRisk = () => {
    const moduleResults = Object.entries(moduleScores).map(([module, scores]) => {
      const percentage = scores.total > 0 ? (scores.correct / scores.total) * 100 : 0;
      let level = 0;
      if (percentage > 70) level = 2;
      else if (percentage >= 50) level = 1;
      else level = 0;
      
      return { module, percentage, level, correct: scores.correct, total: scores.total };
    });

    const averageLevel = moduleResults.reduce((sum, result) => sum + result.level, 0) / moduleResults.length;
    
    let riskAssessment = "";
    if (averageLevel >= 1.5) {
      riskAssessment = "Unofficial: tôi hong sao hết 🎉";
    } else {
      riskAssessment = "Unofficial: tôi bị dyslexia ròi 😢";
    }

    return { moduleResults, riskAssessment, averageLevel };
  };

  // Results screen
  if (currentQuestionIndex === -1) {
    const { moduleResults, riskAssessment } = calculateDyslexiaRisk();
    
    return (
      <div className="flex flex-col bg-white/90 border-4 border-pink-200 p-10 rounded-[2em] items-center space-y-7 shadow-xl max-w-4xl w-full mx-auto">
        <h2 className="text-3xl text-pink-600 font-bold text-center mb-1 drop-shadow font-[Comic Sans MS,cursive,sans-serif]">
          Kết Quả Bài Test
        </h2>

        {/* Overall Result */}
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold text-pink-600">
            Tổng điểm: {score}/{questions.length}
          </div>
          
          <div className={`text-xl font-semibold p-4 rounded-xl ${
            riskAssessment.includes("hong sao") 
              ? "bg-green-100 text-green-700 border-2 border-green-300"
              : "bg-yellow-100 text-yellow-700 border-2 border-yellow-300"
          }`}>
            {riskAssessment}
          </div>
        </div>

        {/* Module Breakdown */}
        <div className="w-full space-y-4">
          <h3 className="text-xl font-semibold text-pink-600 text-center">Chi tiết theo từng phần:</h3>
          
          <div className="grid gap-4">
            {moduleResults.map((result, index) => (
              <div key={index} className="bg-pink-50 p-4 rounded-xl border-2 border-pink-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-pink-700">{result.module}</span>
                  <span className="text-pink-600">{result.correct}/{result.total} ({result.percentage.toFixed(0)}%)</span>
                </div>
                <div className="w-full h-2 bg-pink-200 rounded-full mt-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      result.level === 2 ? 'bg-green-500' :
                      result.level === 1 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {result.level === 2 ? 'Tốt (>70%)' :
                   result.level === 1 ? 'Trung bình (50-70%)' : 'Cần cải thiện (<50%)'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => {
              // Reset test
              setCurrentQuestionIndex(0);
              setScore(0);
              setModuleScores({});
              setSelectedAnswer(null);
              setShowFeedback(false);
            }}
            className="px-6 py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition"
          >
            Làm lại
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "audio-choice":
        return (
          <div className="space-y-6">
            {/* Two speakers side by side for audio comparison */}
            <div className="flex justify-center space-x-8">
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => playAudio(currentQuestion.audio!)}
                  className="w-24 h-24 border-4 border-pink-400 rounded-2xl p-2 hover:bg-pink-50 transition"
                >
                  <SpeakerIcon size={64} />
                </button>
                <span className="text-sm font-semibold text-pink-600">Âm 1</span>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => {
                    if (currentQuestion.secondAudio) {
                      playAudio(currentQuestion.secondAudio);
                    } else {
                      const secondAudio = currentQuestion.options?.find((opt: any) => opt.audio);
                      if (secondAudio?.audio) {
                        playAudio(secondAudio.audio);
                      }
                    }
                  }}
                  className="w-24 h-24 border-4 border-pink-400 rounded-2xl p-2 hover:bg-pink-50 transition"
                >
                  <SpeakerIcon size={64} />
                </button>
                <span className="text-sm font-semibold text-pink-600">Âm 2</span>
              </div>
            </div>
            
            {/* Question text */}
            <p className="text-xl font-semibold text-center text-pink-600 font-[Comic Sans MS,cursive,sans-serif]">
              {currentQuestion.question}
            </p>

            {/* Options */}
            <div className="grid gap-4 max-w-md mx-auto">
              {currentQuestion.options?.map((option: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`
                    p-4 rounded-xl border-2 font-semibold text-lg transition-all
                    ${showFeedback && selectedAnswer === index
                      ? selectedAnswer === currentQuestion.correctAnswer
                        ? 'bg-green-100 border-green-400 text-green-700'
                        : 'bg-red-100 border-red-400 text-red-700'
                      : 'bg-white border-pink-300 hover:border-pink-400 hover:bg-pink-50'
                    }
                    ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                  `}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        );

      case "text-choice":
      case "image-choice":
      case "language-recognition":
        return (
          <div className="space-y-6">
            {/* Audio player */}
            {currentQuestion.audio && (
              <div className="flex justify-center">
                <button
                  onClick={() => playAudio(currentQuestion.audio!)}
                  className="w-24 h-24 border-4 border-pink-400 rounded-2xl p-2 hover:bg-pink-50 transition"
                >
                  <SpeakerIcon size={64} />
                </button>
              </div>
            )}
            
            {/* Question text */}
            <p className="text-xl font-semibold text-center text-pink-600 font-[Comic Sans MS,cursive,sans-serif]">
              {currentQuestion.question}
            </p>

            {/* Options */}
            <div className="grid gap-4 max-w-md mx-auto">
              {currentQuestion.options?.map((option: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`
                    p-4 rounded-xl border-2 font-semibold text-lg transition-all
                    ${showFeedback && selectedAnswer === index
                      ? selectedAnswer === currentQuestion.correctAnswer
                        ? 'bg-green-100 border-green-400 text-green-700'
                        : 'bg-red-100 border-red-400 text-red-700'
                      : 'bg-white border-pink-300 hover:border-pink-400 hover:bg-pink-50'
                    }
                    ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                  `}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {option.audio && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playAudio(option.audio!);
                        }}
                        className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center"
                      >
                        🔊
                      </button>
                    )}
                    {option.image ? (
                      <div className="flex flex-col items-center space-y-2">
                        <img 
                          src={option.image} 
                          alt={option.text}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <span className="text-sm">{option.text}</span>
                      </div>
                    ) : (
                      <span>{option.text}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-white/90 border-4 border-pink-200 p-10 rounded-[2em] items-center space-y-7 shadow-xl min-w-xl w-full mx-auto">
      {/* Header */}
      <h2 className="text-3xl text-pink-600 font-bold text-center mb-1 drop-shadow font-[Comic Sans MS,cursive,sans-serif]">
        Bài Test Cơ Bản
      </h2>

      {/* Progress */}
      <div className="w-full">
        <div className="text-pink-500 font-semibold mb-2 text-center text-lg font-[Comic Sans MS,cursive,sans-serif]">
          {currentQuestion.module} - Câu {currentQuestionIndex + 1} / {questions.length}
        </div>
        <div className="w-full h-2 bg-pink-100 rounded-full mb-4">
          <div
            className="bg-pink-400 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Score display */}
      <div className="text-center text-sm text-pink-600">
        <span className="font-semibold">Điểm số: {score}/{questions.length}</span>
      </div>

      {/* Question content */}
      <div className="w-full">
        {renderQuestion()}
      </div>

      {/* Next button */}
      {showFeedback && (
        <div className="flex justify-center mt-6">
          <button
            onClick={goToNextQuestion}
            className="px-8 py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition text-lg"
          >
            {isLastQuestion ? 'Hoàn thành' : 'Câu tiếp theo'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuditoryTest;
