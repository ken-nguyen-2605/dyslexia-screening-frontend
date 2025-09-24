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


// FaceIcon: giữ dạng nửa hình tròn với 2 ô vuông làm mắt (variant 1..4)
const FaceIcon = ({ variant, size = 64 }: { variant: 1 | 2 | 3 | 4; size?: number }) => {
  // we'll slightly rotate/transform for different variants
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
  return (
    <div className="w-full h-full bg-pink-50 rounded-xl border-2 border-pink-200 flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: transforms[variant] }}>
        {/* half circle (top) */}
        <path d="M 10 50 A 40 40 0 0 1 90 50 L 90 90 L 10 90 Z" stroke="#ec4899" strokeWidth="5" fill="white"/>
        {/* two square eyes */}
        <rect x={pos.x1 - 5} y={pos.y - 5} width="10" height="10" fill="#ec4899" />
        <rect x={pos.x2 - 5} y={pos.y - 5} width="10" height="10" fill="#ec4899" />
      </svg>
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
  direction?: Direction;    // used for chevron
  variant?: Variant;        // used for z, face
  rectangleVariant?: RectangleVariant; // dùng cho rectangle
  isTarget?: boolean;
};

const makeChevron = (id: number, direction: Direction, isTarget = false): CardType => ({
  id, type: "chevron", direction, isTarget,
});
const makeZ = (id: number, variant: Variant, isTarget = false): CardType => ({
  id, type: "z", variant, isTarget,
});
const makeRectangle = (id: number, variant: RectangleVariant, isTarget = false): CardType => ({
  id, type: "rectangle", rectangleVariant: variant, isTarget,
});
const makeFace = (id: number, variant: Variant, isTarget = false): CardType => ({
  id, type: "face", variant, isTarget,
});

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
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [multiTargetCount, setMultiTargetCount] = useState(0);

  // get current round number (1..8)
  const getCurrentRound = () => (currentStep >= 1 && currentStep <= 8 ? currentStep : 1);
  const round = getCurrentRound();

  // map round -> icon type
  const getIconType = (): CardType["type"] => {
    if (round <= 2) return "chevron";
    if (round <= 4) return "z";
    if (round <= 6) return "rectangle";
    return "face";
  };

  // create cards strictly typed (no spread)
  const buildCards = (roundNum: number): { target: CardType; cards: CardType[] } => {
    const type = getIconType();

    if (type === "chevron") {
      // define target & distractors
      const target = makeChevron(1, "up", true);
      if (roundNum % 2 === 1) {
        // 4 cards: 1T + 3D
        const d1 = makeChevron(2, "down", false);
        const d2 = makeChevron(3, "left", false);
        const d3 = makeChevron(4, "right", false);
        return { target, cards: shuffle([target, d1, d2, d3]) };
      } else {
        // 9 cards: 2T, d1 x3, d2 x2, d3 x2
        const t1 = makeChevron(101, "up", true);
        const t2 = makeChevron(102, "up", true);
        const d1 = makeChevron(201, "down", false);
        const d1b = makeChevron(202, "down", false);
        const d1c = makeChevron(203, "down", false);
        const d2 = makeChevron(301, "left", false);
        const d2b = makeChevron(302, "left", false);
        const d3 = makeChevron(401, "right", false);
        const d3b = makeChevron(402, "right", false);
        const arr = [t1, t2, d1, d1b, d1c, d2, d2b, d3, d3b];
        return { target, cards: shuffle(arr) };
      }
    }

    if (type === "z") {
      const target = makeZ(1, 1, true);
      if (roundNum % 2 === 1) {
        const d1 = makeZ(2, 2, false);
        const d2 = makeZ(3, 3, false);
        const d3 = makeZ(4, 4, false);
        return { target, cards: shuffle([target, d1, d2, d3]) };
      } else {
        const t1 = makeZ(101, 1, true);
        const t2 = makeZ(102, 1, true);
        const d1 = makeZ(201, 2, false);
        const d1b = makeZ(202, 2, false);
        const d1c = makeZ(203, 2, false);
        const d2 = makeZ(301, 3, false);
        const d2b = makeZ(302, 3, false);
        const d3 = makeZ(401, 4, false);
        const d3b = makeZ(402, 4, false);
        return { target, cards: shuffle([t1, t2, d1, d1b, d1c, d2, d2b, d3, d3b]) };
      }
    }

    if (type === "rectangle") {
  const target = makeRectangle(1, "tl", true);
  if (roundNum % 2 === 1) {
    const d1 = makeRectangle(2, "tr", false);
    const d2 = makeRectangle(3, "bl", false);
    const d3 = makeRectangle(4, "br", false);
    return { target, cards: shuffle([target, d1, d2, d3]) };
  } else {
    const t1 = makeRectangle(101, "tl", true);
    const t2 = makeRectangle(102, "tl", true);
    const d1 = makeRectangle(201, "tr", false);
    const d1b = makeRectangle(202, "tr", false);
    const d1c = makeRectangle(203, "tr", false);
    const d2 = makeRectangle(301, "bl", false);
    const d2b = makeRectangle(302, "bl", false);
    const d3 = makeRectangle(401, "br", false);
    const d3b = makeRectangle(402, "br", false);
    return { target, cards: shuffle([t1, t2, d1, d1b, d1c, d2, d2b, d3, d3b]) };
  }
}


    // face
    const targetFace = makeFace(1, 1, true);
    if (roundNum % 2 === 1) {
      const d1 = makeFace(2, 2, false);
      const d2 = makeFace(3, 3, false);
      const d3 = makeFace(4, 4, false);
      return { target: targetFace, cards: shuffle([targetFace, d1, d2, d3]) };
    } else {
      const t1 = makeFace(101, 1, true);
      const t2 = makeFace(102, 1, true);
      const d1 = makeFace(201, 2, false);
      const d1b = makeFace(202, 2, false);
      const d1c = makeFace(203, 2, false);
      const d2 = makeFace(301, 3, false);
      const d2b = makeFace(302, 3, false);
      const d3 = makeFace(401, 4, false);
      const d3b = makeFace(402, 4, false);
      return { target: targetFace, cards: shuffle([t1, t2, d1, d1b, d1c, d2, d2b, d3, d3b]) };
    }
  };

  const goToNextStep = () => {
    const nextStepIndex = currentStep + 1;
    if (nextStepIndex < steps.length) {
      setCurrentStep(nextStepIndex);
      navigate(`/test/visual/${steps[nextStepIndex]}`);
    }
  };

  // init when step changes
  useEffect(() => {
      setMultiTargetCount(0); // Thêm dòng này ở đầu useEffect

    const { target, cards: built } = buildCards(round);
    setTargetCard(target);
    setCards(built);
    setTimeLeft(3);
    setTestActive(false);
    setTestTime(15);
    setCorrectCount(0);
    setWrongCount(0);
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // countdown to start
  useEffect(() => {
    if (timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setTestActive(true);
    }
  }, [timeLeft]);

  // test countdown
  useEffect(() => {
    if (testActive && testTime > 0) {
      const t = setTimeout(() => setTestTime((s) => s - 1), 1000);
      return () => clearTimeout(t);
    } else if (testActive && testTime === 0) {
      goToNextStep();
    }
  }, [testActive, testTime]); // eslint-disable-line react-hooks/exhaustive-deps

  // handle click
  const handleCardClick = (card: CardType) => {
  if (!testActive) return;

  if (round % 2 === 0) {
    // Round 9 card: chọn đúng 2 lần thì shuffle lại card
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

  // Round 4 card: chọn đúng thì shuffle lại card, không chuyển round
  if (card.isTarget) {
    setScore((s) => s + 1);
    setCorrectCount((c) => c + 1);
    setCards((prev) => shuffle(prev));
  } else {
    setWrongCount((w) => w + 1);
    setCards((prev) => shuffle(prev));
  }
};

  const renderCard = (card: CardType) => {
  switch (card.type) {
    case "chevron": return <ChevronIcon direction={card.direction!} size={60} />;
    case "z": return <ZIcon variant={card.variant!} size={60} />;
    case "rectangle": return <RectangleIcon variant={card.rectangleVariant!} size={60} />;
    case "face": return <FaceIcon variant={card.variant!} size={60} />;
  }
}

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
            <div className="w-16 h-16 flex items-center justify-center border-4 border-pink-400 rounded-full text-xl font-bold text-pink-600">
              {testTime}
            </div>
          </div>

          <p className="text-center font-semibold mb-4 font-[Comic Sans MS,cursive,sans-serif]">Find the symbol and click as many times as possible!</p>

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
