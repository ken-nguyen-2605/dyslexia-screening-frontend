// VisualTest.tsx

import { useRef, useEffect, useState } from "react";
import VisualTestInstruction from "./VisualTestInstruction";
import VisualTestCard from "./VisualTestCard";

// --- Helper functions for loading images ---
function getImagesForCategory(kind: string) {
  switch (kind) {
    case "symbol":
      return [
        require("../assets/image/visual/symbol/symbol-down.jpg"),
        require("../assets/image/visual/symbol/symbol-left.jpg"),
        require("../assets/image/visual/symbol/symbol-right.jpg"),
        require("../assets/image/visual/symbol/symbol-up.jpg"),
      ];
    case "z":
      return [
        require("../assets/image/visual/z/z-flip-right.jpg"),
        require("../assets/image/visual/z/z-flip-up.jpg"),
        require("../assets/image/visual/z/z-right.jpg"),
        require("../assets/image/visual/z/z.jpg"),
      ];
    case "square":
      return [
        require("../assets/image/visual/square/square-down.jpg"),
        require("../assets/image/visual/square/square-left.jpg"),
        require("../assets/image/visual/square/square-right.jpg"),
        require("../assets/image/visual/square/square.jpg"),
      ];
    case "face":
      return [
        require("../assets/image/visual/face/face-normal-down.jpg"),
        require("../assets/image/visual/face/face-normal-up.jpg"),
        require("../assets/image/visual/face/face-not-normal-down.jpg"),
        require("../assets/image/visual/face/face-not-normal-up.jpg"),
      ];
    default:
      return [];
  }
}

function generateVisualDeck(kind: string, size: 4 | 6, targetIdx?: number) {
  const images = getImagesForCategory(kind);

  if (size === 4) {
    // Use all 4, one of each, target is among them
    return images.map((img, i) => ({
      img,
      idx: i,
      isTarget: i === targetIdx,
    }));
  }

  if (size === 6) {
    // 1 picked image twice, each other image once, shuffled, total 6 cards
    const target = typeof targetIdx === "number" ? targetIdx : Math.floor(Math.random() * 4);
    let others = [0, 1, 2, 3].filter((n) => n !== target);
    // Build array: 2x target, 1x each other
    let resultArr = [target, target, ...others];
    // Shuffle and pick 6 (if for some reason >6, but this guarantees 6)
    resultArr = resultArr.sort(() => Math.random() - 0.5);
    return resultArr.map((idx) => ({
      img: images[idx],
      idx,
      isTarget: idx === target,
    }));
  }
  return [];
}

// --- Main Test Component ---

const TIMER = 15; // seconds

interface VisualTestProps {
  kind: 'symbol' | 'z' | 'square' | 'face';
  size: 4 | 6;
  onDone?: (result: { correct: number; wrong: number; allClicks: number; accuracy: number; efficiency: number }) => void;
}

const VisualTest = ({ kind, size, onDone }: VisualTestProps) => {
  // Step 1: Instruction screen
  const [testStarted, setTestStarted] = useState(false);

  // Step 2: Test rounds
  const [targetIdx, setTargetIdx] = useState(Math.floor(Math.random() * 4));
  const [showTarget, setShowTarget] = useState(true);
  const [deck, setDeck] = useState<{ img: string; idx: number; isTarget: boolean }[]>([]);
  const [time, setTime] = useState(TIMER);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [allClicks, setAllClicks] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Show target to memorize for 3s
  useEffect(() => {
    if (!testStarted) return;
    setShowTarget(true);
    const t = setTimeout(() => setShowTarget(false), 3000);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [testStarted, targetIdx]);

  // Prepare deck on each round
  useEffect(() => {
    if (!showTarget && testStarted) {
      const d = generateVisualDeck(kind, size, targetIdx);
      setDeck(d.sort(() => Math.random() - 0.5));
    }
  }, [showTarget, targetIdx, testStarted, kind, size]);

  // Timer control
  useEffect(() => {
    if (!testStarted || showTarget) {
      setTime(TIMER);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTime((old) => {
        if (old <= 1) {
          clearInterval(timerRef.current!);
          // Test end, emit result
          if (onDone)
            onDone({
              correct,
              wrong,
              allClicks,
              accuracy: correct / (allClicks || 1),
              efficiency: correct * (allClicks || 1),
            });
        }
        return old - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
    // eslint-disable-next-line
  }, [showTarget, testStarted, correct, wrong, allClicks]);

  // Card click handler
  function handleClick(idx: number) {
    setAllClicks((c) => c + 1);
    if (idx === targetIdx) {
      setCorrect((c) => c + 1);
      // pick a new target and restart target-memorize phase
      setTargetIdx(Math.floor(Math.random() * 4));
      setShowTarget(true);
    } else {
      setWrong((w) => w + 1);
      // reshuffle deck, don't change target
      setDeck((prev) => prev.sort(() => Math.random() - 0.5));
    }
  }

  // If time's up, show result
  if (testStarted && !showTarget && time <= 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="text-2xl text-green-600 font-bold mb-4">Visual Test Complete!</div>
        <div className="mb-2 text-gray-800 font-semibold">Your score: {correct} / {allClicks}</div>
        <div className="mb-2 text-gray-700">{`Accuracy: ${(100 * correct / (allClicks || 1)).toFixed(0)}%`}</div>
        <div className="text-gray-600 text-center">Thank you for completing the visual test.</div>
      </div>
    );
  }

  if (!testStarted) {
    return <VisualTestInstruction onStartTest={() => setTestStarted(true)} />;
  }

  // Show "memorize the target"
  if (showTarget) {
    const image = getImagesForCategory(kind)[targetIdx];
    return (
      <div className="flex flex-col items-center justify-center mt-10 space-y-4">
        <div className="text-lg text-indigo-600">Memorize this image...</div>
        <img src={image} className="w-24 h-24 rounded-xl shadow-lg border-4 border-indigo-300" alt="target" />
      </div>
    );
  }

  // Main grid
  return (
    <div className="flex flex-col items-center">
      <div className="mb-3">
        Time left: <span className="font-mono text-xl">{time}s</span>
      </div>
      <div
        className={
          size === 4
            ? "grid grid-cols-2 gap-4"
            : "grid grid-cols-3 gap-4"
        }
      >
        {deck.map((card, i) => (
          <VisualTestCard
            key={i}
            img={card.img}
            onClick={() => handleClick(card.idx)}
          />
        ))}
      </div>
      <div className="mt-4 text-gray-700 text-xs">
        Correct: {correct} | Wrong: {wrong} | Total Clicks: {allClicks}
      </div>
    </div>
  );
};

export default VisualTest;