import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ROBOT_FULL_IMAGE_PATH = "/mascot.jpg";

/* ---------------- DATA CÂU HỎI ---------------- */
interface Question {
  id: number;
  sentence: string;
  correctAnswer: boolean;
}

const QUESTIONS: Question[] = [
  { id: 1, sentence: "Con cá biết bay.", correctAnswer: false },
  {
    id: 2,
    sentence: "Hoàng Sa Trường Sa là của Việt Nam.",
    correctAnswer: true,
  },
  { id: 3, sentence: "Con mèo kêu meo meo.", correctAnswer: true },
  { id: 4, sentence: "1 + 1 = 2", correctAnswer: true },
  { id: 5, sentence: "Mặt trời mọc ở hướng Tây", correctAnswer: false },
];

const TOTAL_QUESTIONS = QUESTIONS.length;
const REVEAL_INCREMENT = 100 / TOTAL_QUESTIONS;

const MiniGame2 = () => {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [imageRevealPercent, setImageRevealPercent] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [testActive, setTestActive] = useState(true);
  const [testFinished, setTestFinished] = useState(false);

  const currentQ = QUESTIONS[currentQuestionIndex];

  const handleAnswer = (userAnswer: boolean) => {
    if (!testActive || feedbackVisible || testFinished) return;

    const isCorrectAnswer = userAnswer === currentQ.correctAnswer;
    setIsCorrect(isCorrectAnswer);
    setFeedbackVisible(true);

    if (isCorrectAnswer) {
      setScore((s) => s + 1);
      setImageRevealPercent((prev) => Math.min(100, prev + REVEAL_INCREMENT));
    } else {
      setWrongCount((w) => w + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    setTimeout(() => {
      setFeedbackVisible(false);
      if (nextIndex < TOTAL_QUESTIONS) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        setTestActive(false);
        setTestFinished(true);
        navigate("/test/minigame2/rating");
      }
    }, 1200);
  };

  /* ---------------- RENDERING LOGIC ---------------- */
  const renderRobotImage = () => {
    const finalImageSrc = ROBOT_FULL_IMAGE_PATH;

    return (
      <div className="relative w-80 h-80 rounded-lg overflow-hidden shadow-xl">
        <style>
          {`
                    @keyframes laserPulse {
                        0%, 100% { box-shadow: 0 0 5px rgba(255, 0, 0, 0.7); }
                        50% { box-shadow: 0 0 10px 3px rgba(255, 0, 0, 1); }
                    }
                    .laser-pulse {
                        animation: laserPulse 0.5s infinite alternate;
                    }
                    `}
        </style>

        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-pink-100 via-cyan-100 to-yellow-100 border-4 border-pink-300 flex flex-col items-center justify-center">
          {imageRevealPercent === 0 && (
            <span className="text-xl text-pink-700 font-bold">
              Trả lời đúng để lắp ráp robot!
            </span>
          )}
        </div>

        {/* 2. (Layer được cắt và hiện ra) */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{ clipPath: `inset(0 0 ${100 - imageRevealPercent}% 0)` }}
        >
          <img
            src={finalImageSrc}
            alt="Robot Revealed"
            className="w-full h-full object-cover"
          />

          {/* 3. Thanh laser */}
          {imageRevealPercent < 100 &&
            imageRevealPercent > 0 &&
            feedbackVisible &&
            isCorrect && (
              <div
                className="absolute left-0 right-0 h-1 bg-red-500 laser-pulse"
                style={{
                  top: `${imageRevealPercent}%`,
                  transform: "translateY(-50%)",
                }}
              />
            )}
        </div>
      </div>
    );
  };

  if (testFinished) {
    return (
      <div className="text-center p-10 bg-white rounded-xl shadow-2xl max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">
          Yeah! Bạn đã lắp ráp xong Robot 🤖
        </h2>
        <p className="text-xl text-gray-700">
          Final Score:{" "}
          <span className="font-extrabold text-green-500">
            {score} / {TOTAL_QUESTIONS}
          </span>
        </p>
        <p className="text-md text-gray-500">Wrong Answers: {wrongCount}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white/90 border-4 border-pink-200 p-10 rounded-[2em] items-center space-y-7 shadow-xl max-w-lg w-full mx-auto">
      <h2 className="text-3xl text-pink-600 font-bold text-center drop-shadow font-[Comic Sans MS,cursive,sans-serif]">
        Minigame 2: Lắp Ráp Robot
      </h2>
      <div className="text-pink-500 font-semibold text-center text-lg font-[Comic Sans MS,cursive,sans-serif]">
        Câu hỏi số {currentQuestionIndex + 1} / {TOTAL_QUESTIONS}
      </div>

      {renderRobotImage()}

      <div className="w-full h-2 bg-pink-100 rounded-full">
        <div
          className="bg-pink-400 h-2 rounded-full transition-all duration-700"
          style={{ width: `${imageRevealPercent}%` }}
        />
      </div>

      <div className="w-full p-4 bg-gray-50 border-l-4 border-pink-400 rounded-lg shadow-inner">
        <p className="text-lg font-medium text-gray-700 text-center">
          {currentQ.sentence}
        </p>
      </div>

      <div className="flex space-x-4 w-full">
        <button
          onClick={() => handleAnswer(true)}
          disabled={feedbackVisible}
          className="flex-1 py-3 text-white font-semibold rounded-lg transition-colors bg-green-500 hover:bg-green-600 disabled:opacity-50"
        >
          ĐÚNG
        </button>
        <button
          onClick={() => handleAnswer(false)}
          disabled={feedbackVisible}
          className="flex-1 py-3 text-white font-semibold rounded-lg transition-colors bg-red-500 hover:bg-red-600 disabled:opacity-50"
        >
          SAI
        </button>
      </div>

      {feedbackVisible && (
        <div
          className={`text-2xl font-extrabold ${
            isCorrect ? "text-green-600" : "text-red-600"
          } transition-opacity duration-300`}
        >
          {isCorrect ? "✅ CORRECT! (+1)" : "❌ WRONG!"}
        </div>
      )}
    </div>
  );
};

export default MiniGame2;
