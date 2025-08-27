import React, { useEffect, useState } from "react";
import { useTestStep } from "../contexts/TestStepContext";
import { useNavigate } from "react-router-dom";

// Component Chevron với màu teal
const ChevronIcon = ({ direction, size = 64 }: { 
  direction: 'up' | 'down' | 'left' | 'right';
  size?: number;
}) => {
  const getRotation = () => {
    switch(direction) {
      case 'up': return -90;
      case 'down': return 90;
      case 'left': return 180;
      case 'right': return 0;
      default: return 0;
    }
  };

  return (
    <div className="w-full h-full bg-teal-50 rounded-xl border-2 border-teal-200 flex items-center justify-center">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${getRotation()}deg)` }}
      >
        <path 
          d="M 35 30 L 65 50 L 35 70" 
          stroke="#14b8a6" // màu teal-500
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

// Định nghĩa cards với direction thay vì img
type CardType = {
  id: number;
  direction: 'up' | 'down' | 'left' | 'right';
};

const allCards: CardType[] = [
  { id: 1, direction: 'up' },
  { id: 2, direction: 'down' },
  { id: 3, direction: 'left' },
  { id: 4, direction: 'right' },
];

const VisualTest = () => {
  const { currentStep, setCurrentStep, steps } = useTestStep();
  const navigate = useNavigate();
  
  const [targetCard, setTargetCard] = useState<CardType | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  const [timeLeft, setTimeLeft] = useState(3);
  const [testActive, setTestActive] = useState(false);
  const [testTime, setTestTime] = useState(15);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  // Tính toán round hiện tại dựa trên currentStep
  const getCurrentRound = () => {
    if (currentStep >= 1 && currentStep <= 8) {
      return currentStep;
    }
    return 1;
  };

  const round = getCurrentRound();
  const currentStepName = steps[currentStep];

  // Xác định số lượng thẻ dựa trên step name
  const getNumCards = () => {
    if (currentStepName.includes("/4")) return 4;
    if (currentStepName.includes("/6")) return 6;
    return 4; // default
  };

  // Function để chuyển sang step tiếp theo
  const goToNextStep = () => {
    const nextStepIndex = currentStep + 1;
    if (nextStepIndex < steps.length) {
      setCurrentStep(nextStepIndex);
      navigate(`/test/visual/${steps[nextStepIndex]}`);
    }
  };

  // Khởi tạo khi component mount hoặc khi step thay đổi
  useEffect(() => {
    const randomTarget = allCards[Math.floor(Math.random() * allCards.length)];
    setTargetCard(randomTarget);

    // Reset state cho step mới
    setTimeLeft(3);
    setTestActive(false);
    setTestTime(15);
    setCorrectCount(0);
    setWrongCount(0);

    const numCards = getNumCards();
    const selectedCards = [...allCards];
    while (selectedCards.length < numCards) {
      selectedCards.push(allCards[Math.floor(Math.random() * allCards.length)]);
    }
    const shuffledCards = selectedCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, [currentStep]);

  // Target countdown 
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTestActive(true);
    }
  }, [timeLeft]);

  // Test countdown
  useEffect(() => {
    if (testActive && testTime > 0) {
      const timer = setTimeout(() => setTestTime(testTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (testTime === 0 && testActive) {
      // Next step
      goToNextStep();
    }
  }, [testActive, testTime]);

  const handleCardClick = (id: number) => {
    if (!testActive) return;
    
    const isCorrect = id === targetCard?.id;
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setCorrectCount(prevCount => prevCount + 1);
    } else {
      setWrongCount(prevCount => prevCount + 1);
    }
    
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const numCards = getNumCards();

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">Visual Test</h2>

      {/* Progress + Round Info */}
      <div className="mb-6">
        <p className="text-teal-500 font-semibold">Round {round} of 8</p>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div
            className="bg-teal-500 h-2 rounded-full transition-all"
            style={{ width: `${(round / 8) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Score display */}
      {testActive && (
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="flex gap-4">
            <span className="text-green-600 font-semibold">
              Correct: {correctCount}
            </span>
            <span className="text-red-600 font-semibold">
              Wrong: {wrongCount}
            </span>
            <span className="text-teal-600 font-semibold">
              Total Score: {score}
            </span>
          </div>
        </div>
      )}

      {/* Nội dung chính */}
      {!testActive ? (
        <div className="text-center">
          <p className="text-lg font-semibold mb-3">
            For 15 seconds try to hit as most as possible the symbol below
          </p>
          {targetCard && (
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 border-4 border-teal-400 rounded-2xl p-2">
                <ChevronIcon direction={targetCard.direction} size={80} />
              </div>
            </div>
          )}
          <p className="text-teal-600 text-3xl font-bold">{timeLeft}</p>
        </div>
      ) : (
        <div>
          {/* Timer */}
          <div className="flex justify-end items-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center border-4 border-teal-400 rounded-full text-xl font-bold text-teal-600">
              {testTime}
            </div>
          </div>

          <p className="text-center font-semibold mb-4">
            Find the symbol and click as many times as possible!
          </p>

          {/* Cards grid - với kích thước vuông cố định */}
          <div className={`grid gap-4 ${numCards === 4 ? "grid-cols-2" : "grid-cols-3"}`}>
            {cards.map((card, idx) => (
              <button
                key={idx}
                className="w-32 h-32 mx-auto border-2 border-teal-300 rounded-xl p-2 bg-white hover:bg-teal-100 hover:border-teal-400 transition-all transform hover:scale-105"
                onClick={() => handleCardClick(card.id)}
              >
                <ChevronIcon direction={card.direction} size={60} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualTest;