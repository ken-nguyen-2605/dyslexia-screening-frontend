import React, { useEffect, useState } from "react";
import { useTestStep } from "../contexts/TestStepContext";
import { useNavigate } from "react-router-dom";

// Audio imports
import A_audio from "../assets/audioTestVowel/A.mp3";
import B_audio from "../assets/audioTestVowel/B.mp3";
import M_audio from "../assets/audioTestVowel/M.mp3";
import N_audio from "../assets/audioTestVowel/N.mp3";
import D_audio from "../assets/audioTestVowel/D.mp3";
import cá_audio from "../assets/audioTestVowel/cá.mp3";
import O_audio from "../assets/audioTestVowel/O.mp3";
import S_audio from "../assets/audioTestVowel/S.mp3";
import khiAnChuoi_audio from "../assets/audioTestVowel/khiAnChuoi.mp3";
import meoAnCa_audio from "../assets/audioTestVowel/meoAnCa.mp3";
import thichAnKem_vn_audio from "../assets/audioTestVowel/thichAnKem_vn.mp3";
import buoiTruaAnBuoiChua_audio from "../assets/audioTestVowel/buoiTruaAnBuoiChua.mp3";
import buoiTruaUongSuaChua_audio from "../assets/audioTestVowel/buoiTruaUongSuaChua.mp3";

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

// Drawing Canvas Component for Module 4
const DrawingCanvas = ({ onDrawingComplete }: { onDrawingComplete: (hasDrawing: boolean) => void }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    
    if (!hasContent) {
      setHasContent(true);
      onDrawingComplete(true);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
    onDrawingComplete(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className="border-2 border-pink-300 rounded-lg bg-white cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button
        onClick={clearCanvas}
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Clear
      </button>
    </div>
  );
};

type QuestionType = {
  id: string;
  module: string;
  question: string;
  type: "audio-choice" | "text-choice" | "image-choice" | "drawing" | "language-recognition";
  audio?: string;
  options?: { text?: string; audio?: string; image?: string }[];
  correctAnswer?: number;
  targetLetter?: string;
};

const questions: QuestionType[] = [
  // Module 1: Phonological Awareness
  {
    id: "phonological-1",
    module: "Nhận thức âm vị",
    question: "Hai chữ này phát âm có giống nhau không?",
    type: "audio-choice",
    audio: A_audio,
    options: [
      { text: "Giống nhau", audio: B_audio },
      { text: "Khác nhau" }
    ],
    correctAnswer: 1 // Different
  },
  {
    id: "phonological-2", 
    module: "Nhận thức âm vị",
    question: "Hai âm này có giống nhau không?",
    type: "audio-choice",
    audio: M_audio,
    options: [
      { text: "Giống nhau" },
      { text: "Khác nhau", audio: N_audio }
    ],
    correctAnswer: 1 // Different
  },
  // Module 2: Decoding
  {
    id: "decoding-1",
    module: "Nhận diện chữ & giải mã",
    question: "Chọn chữ cái đúng theo âm thanh:",
    type: "text-choice",
    audio: D_audio,
    options: [
      { text: "D" },
      { text: "Đ" }
    ],
    correctAnswer: 0
  },
  {
    id: "decoding-2",
    module: "Nhận diện chữ & giải mã", 
    question: "Chọn từ đúng theo âm thanh:",
    type: "text-choice",
    audio: cá_audio,
    options: [
      { text: "ca" },
      { text: "cá" },
      { text: "cà" },
      { text: "cả" }
    ],
    correctAnswer: 1
  },
  // Module 3: Understanding Fluency
  {
    id: "understanding-1",
    module: "Tốc độ hiểu",
    question: "Chọn hình ảnh đúng theo câu:",
    type: "image-choice",
    audio: khiAnChuoi_audio,
    options: [
      { text: "🐵🍌", image: "monkey-banana" },
      { text: "🐱🐟", image: "cat-fish" },
      { text: "🐶🦴", image: "dog-bone" }
    ],
    correctAnswer: 0
  },
  {
    id: "understanding-2",
    module: "Tốc độ hiểu",
    question: "Chọn câu đang được phát âm:",
    type: "audio-choice",
    audio: meoAnCa_audio,
    options: [
      { text: "🐵🍌" },
      { text: "🐱🐟" },
      { text: "🐶🦴" }
    ],
    correctAnswer: 1
  },
  // Module 4: Spelling & Writing
  {
    id: "spelling-1",
    module: "Chính tả & viết",
    question: "Vẽ lại chữ cái bạn nghe:",
    type: "drawing",
    audio: O_audio,
    targetLetter: "O"
  },
  {
    id: "spelling-2",
    module: "Chính tả & viết",
    question: "Vẽ lại chữ cái bạn nghe:",
    type: "drawing", 
    audio: S_audio,
    targetLetter: "S"
  },
  // Module 5: Language Comprehension
  {
    id: "language-1",
    module: "Hiểu và nhận dạng ngôn ngữ",
    question: "Đây có phải tiếng Việt không?",
    type: "language-recognition",
    audio: thichAnKem_vn_audio,
    options: [
      { text: "Có, đây là tiếng Việt" },
      { text: "Không, đây không phải tiếng Việt" }
    ],
    correctAnswer: 0
  },
  {
    id: "language-2",
    module: "Hiểu và nhận dạng ngôn ngữ",
    question: "Hai câu này có giống nhau không?",
    type: "audio-choice",
    audio: buoiTruaAnBuoiChua_audio,
    options: [
      { text: "Giống nhau" },
      { text: "Khác nhau", audio: buoiTruaUongSuaChua_audio }
    ],
    correctAnswer: 1 // Different
  }
];

const BasicTest = () => {
  const { currentStep, setCurrentStep, steps } = useTestStep();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Calculate progress
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Play audio function
  const playAudio = (audioSrc: string) => {
    if (playingAudio) {
      playingAudio.pause();
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
    if (currentQuestion?.audio) {
      setTimeout(() => {
        playAudio(currentQuestion.audio!);
      }, 500);
    }
    
    // Reset states
    setSelectedAnswer(null);
    setShowFeedback(false);
    setHasDrawing(false);
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
  };

  const handleDrawingAnswer = () => {
    if (showFeedback) return;
    
    setShowFeedback(true);
    
    // For drawing questions, give credit if they drew something
    if (hasDrawing) {
      setScore(prev => prev + 1);
    }
  };

  const goToNextQuestion = () => {
    if (isLastQuestion) {
      // Test completed, go to rating
      const nextStepIndex = currentStep + 1;
      if (nextStepIndex < steps.length) {
        setCurrentStep(nextStepIndex);
        navigate(`/test/basic/${steps[nextStepIndex]}`);
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "audio-choice":
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
              {currentQuestion.options?.map((option, index) => (
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
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case "drawing":
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

            {/* Drawing canvas */}
            <div className="flex justify-center">
              <DrawingCanvas onDrawingComplete={setHasDrawing} />
            </div>

            {/* Submit button for drawing */}
            {hasDrawing && !showFeedback && (
              <div className="flex justify-center">
                <button
                  onClick={handleDrawingAnswer}
                  className="px-6 py-3 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition"
                >
                  Nộp bài vẽ
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-white/90 border-4 border-pink-200 p-10 rounded-[2em] items-center space-y-7 shadow-xl max-w-4xl w-full mx-auto">
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

      {/* Feedback */}
      {showFeedback && (
        <div className="text-center">
          {currentQuestion.type === "drawing" ? (
            <p className="text-lg font-semibold text-green-600">
              {hasDrawing ? "Tốt lắm! Bạn đã vẽ được!" : "Hãy thử vẽ lại!"}
            </p>
          ) : (
            <p className="text-lg font-semibold">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <span className="text-green-600">Chính xác! 🎉</span>
              ) : (
                <span className="text-red-600">Hãy thử lại lần sau! 💪</span>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BasicTest;
