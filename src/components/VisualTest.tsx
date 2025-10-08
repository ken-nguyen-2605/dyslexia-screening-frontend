import React, { useEffect, useState } from "react";
import { useTestStep } from "../contexts/TestStepContext";
import { useNavigate } from "react-router-dom";

/* ---------------- ICONS ---------------- */
const ChevronIcon = ({ direction, size = 64 }: { direction: "up" | "down" | "left" | "right"; size?: number }) => {
  const getRotation = () => {
    switch (direction) {
      case "up": return -90;
      case "down": return 90;
      case "left": return 180;
      case "right": return 0;
    }
  };
  return (
    <div className="w-full h-full bg-pink-50 rounded-xl border-2 border-pink-200 flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: `rotate(${getRotation()}deg)` }}>
        <path d="M 35 30 L 65 50 L 35 70" stroke="#ec4899" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
  );
};

const ZIcon = ({ variant, size = 64 }: { variant: 1 | 2 | 3 | 4; size?: number }) => {
  const paths: Record<number, string> = {
    1: "M 20 20 L 80 20 L 20 80 L 80 80",
    2: "M 80 20 L 20 20 L 80 80 L 20 80",
    3: "M 20 80 L 20 20 L 80 80 L 80 20",
    4: "M 80 80 L 80 20 L 20 80 L 20 20",
  };
  return (
    <div className="w-full h-full bg-pink-50 rounded-xl border-2 border-pink-200 flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <path d={paths[variant]} stroke="#ec4899" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
  );
};

const RectangleIcon = ({ variant, size = 64 }: { variant: "tl" | "tr" | "bl" | "br"; size?: number }) => {
  const triangleMap: Record<string, string> = {
    tl: "M 0 0 L 100 0 L 0 100 Z",
    tr: "M 100 0 L 100 100 L 0 0 Z",
    bl: "M 0 100 L 100 100 L 0 0 Z",
    br: "M 100 100 L 100 0 L 0 100 Z",
  };
  return (
    <div className="w-full h-full bg-pink-50 rounded-xl border-2 border-pink-200 flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="0" y="0" width="100" height="100" fill="white" stroke="#ec4899" strokeWidth="6" />
        <path d={triangleMap[variant]} fill="#ec4899" />
      </svg>
    </div>
  );
};

const FaceIcon = ({ variant, size = 64 }: { variant: 1 | 2 | 3 | 4; size?: number }) => {
  const transforms: Record<number, string> = {
    1: "rotate(0 50 50)",
    2: "rotate(10 50 50)",
    3: "rotate(-10 50 50)",
    4: "rotate(0 50 50) translate(0,2)",
  };

  const eyePositions: Record<number, { x1: number; x2: number; y: number }> = {
    1: { x1: 35, x2: 65, y: 35 },
    2: { x1: 38, x2: 62, y: 35 },
    3: { x1: 35, x2: 65, y: 32 },
    4: { x1: 35, x2: 65, y: 38 },
  };
  const pos = eyePositions[variant];

  // Hàm vẽ mắt
  const renderEye = (shape: "circle" | "triangle" | "star" | "square", cx: number, cy: number) => {
    switch (shape) {
      case "circle":
        return <circle cx={cx} cy={cy} r="5" fill="#ec4899" />;
      case "triangle":
  // Tam giác đều hướng lên trên
  const side = 14; // độ dài cạnh
  const height = (Math.sqrt(3) / 2) * side; // chiều cao tam giác đều
  return (
    <polygon
      points={`
        ${cx},${cy - height / 2} 
        ${cx - side / 2},${cy + height / 2} 
        ${cx + side / 2},${cy + height / 2}
      `}
      fill="#ec4899"
    />
  );
      case "star":
        // Hình sao 5 cánh
        const R = 8; // bán kính ngoài
        const r = 3.5; // bán kính trong
        const points = Array.from({ length: 10 }, (_, i) => {
          const angle = (i * 36 - 90) * (Math.PI / 180);
          const rad = i % 2 === 0 ? R : r;
          return `${cx + rad * Math.cos(angle)},${cy + rad * Math.sin(angle)}`;
        }).join(" ");
        return <polygon points={points} fill="#ec4899" />;
      case "square":
      default:
        return <rect x={cx - 5} y={cy - 5} width="10" height="10" fill="#ec4899" />;
    }
  };

  // Map variant -> kiểu mắt
  const eyeShapeMap: Record<number, "circle" | "triangle" | "star" | "square"> = {
    1: "circle",
    2: "triangle",
    3: "star",
    4: "square", // hoặc đổi thành loại khác nếu muốn
  };

  return (
    <div className="w-full h-full bg-pink-50 rounded-xl border-2 border-pink-200 flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: transforms[variant] }}>
        {/* Nửa hình tròn */}
        <path d="M 10 50 A 40 40 0 0 1 90 50 L 90 90 L 10 90 Z" stroke="#ec4899" strokeWidth="5" fill="white"/>
        {/* Hai mắt */}
        {renderEye(eyeShapeMap[variant], pos.x1, pos.y)}
        {renderEye(eyeShapeMap[variant], pos.x2, pos.y)}
      </svg>
    </div>
  );
};

/* ---------------- CLOCK ICON ---------------- */
const ClockFace = ({ timeLeft, totalTime }: { timeLeft: number; totalTime: number }) => {
  const degreesPerSec = 360 / totalTime;
  const angle = (totalTime - timeLeft) * degreesPerSec;
  const counterClockwiseAngle = 360 - angle;

  return (
    <div className="flex flex-col items-center">
      {/* Mặt đồng hồ */}
      <svg width="80" height="80" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="#ec4899" strokeWidth="4" fill="white" />
        {/* Kim ngắn hơn để không che chữ */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25" // rút ngắn từ 15 -> 25
          stroke="#ec4899"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${counterClockwiseAngle} 50 50)`}
        />
      </svg>
      {/* Số thời gian rõ ràng bên ngoài */}
      <span className="mt-1 text-pink-600 font-bold text-xl">
        {Math.ceil(timeLeft)}s
      </span>
    </div>
  );
};

/* ---------------- TYPES + HELPERS ---------------- */
type Direction = "up" | "down" | "left" | "right";
type RectangleVariant = "tl" | "tr" | "bl" | "br";
type Variant = 1 | 2 | 3 | 4;

type CardType = {
  id: number;
  type: "chevron" | "z" | "rectangle" | "face";
  direction?: Direction;
  variant?: Variant;
  rectangleVariant?: RectangleVariant;
  isTarget?: boolean;
};

const makeChevron = (id: number, direction: Direction, isTarget = false): CardType => ({ id, type: "chevron", direction, isTarget });
const makeZ = (id: number, variant: Variant, isTarget = false): CardType => ({ id, type: "z", variant, isTarget });
const makeRectangle = (id: number, variant: RectangleVariant, isTarget = false): CardType => ({ id, type: "rectangle", rectangleVariant: variant, isTarget });
const makeFace = (id: number, variant: Variant, isTarget = false): CardType => ({ id, type: "face", variant, isTarget });

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ---------------- MAIN COMPONENT ---------------- */
const VisualTest = () => {
  const { currentStep, setCurrentStep, steps } = useTestStep();
  const navigate = useNavigate();

  const [targetCard, setTargetCard] = useState<CardType | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  const [timeLeft, setTimeLeft] = useState(3);
  const [testActive, setTestActive] = useState(false);
  const [testTime, setTestTime] = useState(15);
  const [testTimeFloat, setTestTimeFloat] = useState(15); // Thời gian thực để quay mượt
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [multiTargetCount, setMultiTargetCount] = useState(0);

  const getCurrentRound = () => (currentStep >= 1 && currentStep <= 8 ? currentStep : 1);
  const round = getCurrentRound();

  const getIconType = (): CardType["type"] => {
    if (round <= 2) return "chevron";
    if (round <= 4) return "z";
    if (round <= 6) return "rectangle";
    return "face";
  };

  const buildCards = (roundNum: number): { target: CardType; cards: CardType[] } => {
    const type = getIconType();

    if (type === "chevron") {
      const target = makeChevron(1, "up", true);
      if (roundNum % 2 === 1) {
        return { target, cards: shuffle([target, makeChevron(2, "down"), makeChevron(3, "left"), makeChevron(4, "right")]) };
      } else {
        return { target, cards: shuffle([
          makeChevron(101, "up", true),
          makeChevron(102, "up", true),
          makeChevron(201, "down"), makeChevron(202, "down"), makeChevron(203, "down"),
          makeChevron(301, "left"), makeChevron(302, "left"),
          makeChevron(401, "right"), makeChevron(402, "right"),
        ])};
      }
    }

    if (type === "z") {
      const target = makeZ(1, 1, true);
      if (roundNum % 2 === 1) {
        return { target, cards: shuffle([target, makeZ(2, 2), makeZ(3, 3), makeZ(4, 4)]) };
      } else {
        return { target, cards: shuffle([
          makeZ(101, 1, true),
          makeZ(102, 1, true),
          makeZ(201, 2), makeZ(202, 2), makeZ(203, 2),
          makeZ(301, 3), makeZ(302, 3),
          makeZ(401, 4), makeZ(402, 4),
        ])};
      }
    }

    if (type === "rectangle") {
      const target = makeRectangle(1, "tl", true);
      if (roundNum % 2 === 1) {
        return { target, cards: shuffle([target, makeRectangle(2, "tr"), makeRectangle(3, "bl"), makeRectangle(4, "br")]) };
      } else {
        return { target, cards: shuffle([
          makeRectangle(101, "tl", true),
          makeRectangle(102, "tl", true),
          makeRectangle(201, "tr"), makeRectangle(202, "tr"), makeRectangle(203, "tr"),
          makeRectangle(301, "bl"), makeRectangle(302, "bl"),
          makeRectangle(401, "br"), makeRectangle(402, "br"),
        ])};
      }
    }

    const targetFace = makeFace(1, 1, true);
    if (roundNum % 2 === 1) {
      return { target: targetFace, cards: shuffle([targetFace, makeFace(2, 2), makeFace(3, 3), makeFace(4, 4)]) };
    } else {
      return { target: targetFace, cards: shuffle([
        makeFace(101, 1, true), makeFace(102, 1, true),
        makeFace(201, 2), makeFace(202, 2), makeFace(203, 2),
        makeFace(301, 3), makeFace(302, 3),
        makeFace(401, 4), makeFace(402, 4),
      ])};
    }
  };

  const goToNextStep = () => {
    const nextStepIndex = currentStep + 1;
    if (nextStepIndex < steps.length) {
      setCurrentStep(nextStepIndex);
      navigate(`/test/visual/${steps[nextStepIndex]}`);
    }
  };

  useEffect(() => {
    setMultiTargetCount(0);
    const { target, cards: built } = buildCards(round);
    setTargetCard(target);
    setCards(built);
    setTimeLeft(3);
    setTestActive(false);
    setTestTime(15);
    setTestTimeFloat(15);
    setCorrectCount(0);
    setWrongCount(0);
  }, [currentStep]);

  useEffect(() => {
    if (timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setTestActive(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (testActive && testTime > 0) {
      const start = Date.now();
      const startValue = testTime;

      intervalId = setInterval(() => {
        const elapsed = (Date.now() - start) / 1000;
        const newTimeFloat = startValue - elapsed;
        setTestTimeFloat(newTimeFloat > 0 ? newTimeFloat : 0);

        if (newTimeFloat <= (testTime - 1)) {
          setTestTime(prev => prev - 1);
        }

        if (newTimeFloat <= 0) {
          clearInterval(intervalId);
          goToNextStep();
        }
      }, 50);
    }
    return () => clearInterval(intervalId);
}, [testActive, testTime]);

  const handleCardClick = (card: CardType) => {
    if (!testActive) return;

    if (round % 2 === 0) {
      if (card.isTarget) {
        setScore((s) => s + 1);
        setCorrectCount((c) => c + 1);
        setMultiTargetCount((cnt) => {
          if (cnt + 1 >= 2) {
            setCards((prev) => shuffle(prev));
            return 0;
          }
          return cnt + 1;
        });
      } else {
        setWrongCount((w) => w + 1);
        setCards((prev) => shuffle(prev));
      }
      return;
    }

    if (card.isTarget) {
      setScore((s) => s + 1);
      setCorrectCount((c) => c + 1);
    } else {
      setWrongCount((w) => w + 1);
    }
    setCards((prev) => shuffle(prev));
  };

  const renderCard = (card: CardType) => {
    switch (card.type) {
      case "chevron": return <ChevronIcon direction={card.direction!} size={60} />;
      case "z": return <ZIcon variant={card.variant!} size={60} />;
      case "rectangle": return <RectangleIcon variant={card.rectangleVariant!} size={60} />;
      case "face": return <FaceIcon variant={card.variant!} size={60} />;
    }
  };

  return (
    <div className="flex flex-col bg-white/90 border-4 border-pink-200 p-10 rounded-[2em] items-center space-y-7 shadow-xl max-w-3xl w-full mx-auto">
      <h2 className="text-3xl text-pink-600 font-bold text-center mb-1 drop-shadow font-[Comic Sans MS,cursive,sans-serif]">
        Visual Test
      </h2>

      <div className="w-full">
        <div className="text-pink-500 font-semibold mb-2 text-center text-lg font-[Comic Sans MS,cursive,sans-serif]">
          Round {round} of 8
        </div>
        <div className="w-full h-2 bg-pink-100 rounded-full mb-4">
          <div className="bg-pink-400 h-2 rounded-full transition-all" style={{ width: `${(round / 8) * 100}%` }} />
        </div>
      </div>

      {testActive && (
        <div className="flex justify-between items-center mb-4 text-sm w-full">
          <div className="flex gap-4 mx-auto">
            <span className="text-green-600 font-semibold">Correct: {correctCount}</span>
            <span className="text-red-600 font-semibold">Wrong: {wrongCount}</span>
            <span className="text-pink-600 font-semibold">Total Score: {score}</span>
          </div>
        </div>
      )}

      {!testActive ? (
        <div className="text-center">
          <p className="text-lg font-semibold mb-3 font-[Comic Sans MS,cursive,sans-serif]">Remember this symbol!</p>
          {targetCard && (
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 border-4 border-pink-400 rounded-2xl p-2">
                {renderCard(targetCard)}
              </div>
            </div>
          )}
          <p className="text-pink-600 text-3xl font-bold">{timeLeft}</p>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex justify-end items-center mb-6">
            <ClockFace timeLeft={testTimeFloat} totalTime={15} />
          </div>

          <p className="text-center font-semibold mb-4 font-[Comic Sans MS,cursive,sans-serif]">
            Find the symbol and click as many times as possible!
          </p>

          <div className={`grid gap-4 ${round % 2 === 1 ? "grid-cols-2" : "grid-cols-3"} justify-items-center`}>
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="w-32 h-32 border-2 border-pink-300 rounded-xl p-2 bg-white hover:bg-pink-100 hover:border-pink-400 transition-all transform hover:scale-105"
              >
                {renderCard(card)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualTest;