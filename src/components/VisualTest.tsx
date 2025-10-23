import { useEffect, useState } from "react";
import { useTestStep } from "../contexts/TestStepContext";
import { useNavigate } from "react-router-dom";

// Component Speaker với màu hồng
const SpeakerIcon = ({ size = 64 }: {
  size?: number;
}) => {
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

// Component cho chữ tiếng Việt
const VietnameseText = ({ dấu }: { 
  dấu: 'sắc' | 'huyền' | 'hỏi' | 'ngã';
}) => {
  const getText = () => {
    switch(dấu) {
      case 'sắc': return 'cá';
      case 'huyền': return 'cà';
      case 'hỏi': return 'cả';
      case 'ngã': return 'cã';
      default: return 'cá';
    }
  };

  return (
    <div className="w-full h-full bg-pink-50 rounded-xl border-2 border-pink-200 flex items-center justify-center">
      <span className="text-4xl font-bold text-pink-600">
        {getText()}
      </span>
    </div>
  );
};

type CardType = {
  id: number;
  dấu: 'sắc' | 'huyền' | 'hỏi' | 'ngã';
};

const allCards: CardType[] = [
  { id: 1, dấu: 'sắc' },
  { id: 2, dấu: 'huyền' },
  { id: 3, dấu: 'hỏi' },
  { id: 4, dấu: 'ngã' },
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

  // Next
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

    // Reset state for new step
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

  // Comment out để đồng hồ đứng yên
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
      <div className="flex flex-col bg-white/90 border-4 border-pink-200 p-10 rounded-[2em] items-center space-y-7 shadow-xl max-w-3xl w-full mx-auto">
        {/* Header */}
        <h2 className="text-3xl text-pink-600 font-bold text-center mb-1 drop-shadow font-[Comic Sans MS,cursive,sans-serif]">
          Visual Test
        </h2>

        {/* Progress + Round Info */}
        <div className="w-full">
          <div className="text-pink-500 font-semibold mb-2 text-center text-lg font-[Comic Sans MS,cursive,sans-serif]">
            Round {round} of 8
          </div>
          <div className="w-full h-2 bg-pink-100 rounded-full mb-4">
            <div
              className="bg-pink-400 h-2 rounded-full transition-all"
              style={{ width: `${(round / 8) * 100}%` }}
            />
          </div>
        </div>

        {/* Score display */}
        {testActive && (
          <div className="flex justify-between items-center mb-4 text-sm w-full">
            <div className="flex gap-4 mx-auto">
              <span className="text-green-600 font-semibold">
                Correct: {correctCount}
              </span>
              <span className="text-red-600 font-semibold">
                Wrong: {wrongCount}
              </span>
              <span className="text-pink-600 font-semibold">
                Total Score: {score}
              </span>
            </div>
          </div>
        )}

        {/* Test */}
        {!testActive ? (
          <div className="text-center">
            <p className="text-lg font-semibold mb-3 font-[Comic Sans MS,cursive,sans-serif]">
              Listen to the voice and choice correct letter!
            </p>
            {targetCard && (
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 border-4 border-pink-400 rounded-2xl p-2">
                  <SpeakerIcon size={80} />
                </div>
              </div>
            )}
            <p className="text-pink-600 text-3xl font-bold">{timeLeft}</p>
          </div>
        ) : (
          <div className="w-full">
            {/* Timer */}
            <div className="flex justify-end items-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center border-4 border-pink-400 rounded-full text-xl font-bold text-pink-600">
                {testTime}
              </div>
            </div>

            <p className="text-center font-semibold mb-4 font-[Comic Sans MS,cursive,sans-serif]">
              Find the symbol and click as many times as possible!
            </p>

            {/* Cards grid */}
            <div className={`grid gap-4 ${numCards === 4 ? "grid-cols-2" : "grid-cols-3"} justify-items-center`}>
              {cards.map((card, idx) => (
                <button
                  key={idx}
                  className="w-32 h-32 border-2 border-pink-300 rounded-xl p-2 bg-white hover:bg-pink-100 hover:border-pink-400 transition-all transform hover:scale-105"
                  onClick={() => handleCardClick(card.id)}
                >
                  <VietnameseText dấu={card.dấu} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
  );
};

export default VisualTest;