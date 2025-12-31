import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import mascotImage from "../../../assets/icons/mascot.jpg";
import { minigameService } from "../../../services/minigameService";
import { calculateMiniGame5Score } from "../../../utils/scoreCalculator";

type TileState = "default" | "correct" | "wrong";

interface Level {
  id: number;
  target: string;
  grid: string[];
  description?: string;
}

const LEVELS: Level[] = [
  {
    id: 1,
    target: "b",
    grid: ["b", "d", "p", "b", "q", "b", "p", "d", "b"],
    description: "Phân biệt chữ b với d, p, q",
  },
  {
    id: 2,
    target: "p",
    grid: ["q", "p", "b", "d", "p", "q", "p", "b", "d"],
    description: "Phân biệt chữ p với q, b, d",
  },
  {
    id: 3,
    target: "d",
    grid: ["b", "p", "d", "q", "d", "b", "p", "d", "q"],
    description: "Phân biệt chữ d với b, p, q",
  },
  {
    id: 4,
    target: "m",
    grid: ["m", "n", "w", "m", "n", "m", "w", "n", "m"],
    description: "Phân biệt chữ m với n, w",
  },
  {
    id: 5,
    target: "t",
    grid: ["f", "t", "l", "t", "f", "t", "l", "t", "f"],
    description: "Phân biệt chữ t với f, l",
  },
];

const MAX_RAW_SCORE = LEVELS.reduce((sum, lvl) => {
  const correct = lvl.grid.filter((ch) => ch === lvl.target).length;
  return sum + correct;
}, 0);

const MiniGame5: React.FC = () => {
  const navigate = useNavigate();
  const hasSubmitted = useRef(false);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [tileStates, setTileStates] = useState<TileState[]>(() =>
    new Array(LEVELS[0].grid.length).fill("default")
  );
  const [feedback, setFeedback] = useState<"" | "correct" | "wrong">("");
  const [finished, setFinished] = useState(false);

  const currentLevel = LEVELS[currentLevelIndex];
  const totalLevels = LEVELS.length;

  const totalCorrectThisLevel = useMemo(
    () => currentLevel.grid.filter((ch) => ch === currentLevel.target).length,
    [currentLevel]
  );

  useEffect(() => {
    const level = LEVELS[currentLevelIndex];
    setTileStates(new Array(level.grid.length).fill("default"));
    setFeedback("");
  }, [currentLevelIndex]);

  // Submit score and navigate to rating when game finishes
  useEffect(() => {
    const submitAndNavigate = async () => {
      if (!finished || hasSubmitted.current) return;
      hasSubmitted.current = true;

      const finalScore = calculateMiniGame5Score({
        totalCorrect: score,
        totalWrong: wrongCount,
        levelsCompleted: totalLevels,
      });

      try {
        await minigameService.submitMinigame({
          minigame_number: "five",
          score: finalScore,
          minigame_details: {
            correct_answers: score,
            total_questions: MAX_RAW_SCORE,
            wrong_count: wrongCount,
            levels_completed: totalLevels,
          },
          attempted_at: new Date().toISOString(),
        });
        console.log("MiniGame5 score submitted successfully:", finalScore);
      } catch (error) {
        console.error("Failed to submit MiniGame5 score:", error);
      }

      // Navigate to rating page
      navigate("/test/minigame5/rating", {
        state: {
          score: finalScore,
          correct: score,
          total: MAX_RAW_SCORE,
          wrongCount: wrongCount,
        },
      });
    };

    submitAndNavigate();
  }, [finished, score, wrongCount, navigate, totalLevels]);

  const handleTileClick = (index: number) => {
    if (finished) return;

    const letter = currentLevel.grid[index];
    const state = tileStates[index];
    if (state === "correct") return;

    if (letter === currentLevel.target) {
      // chọn đúng
      setTileStates((prev) =>
        prev.map((s, i) => (i === index ? "correct" : s))
      );
      setScore((prev) => prev + 1);
      setFeedback("correct");

      // Check if all correct tiles found in this level
      const currentCorrectCount =
        tileStates.filter((s) => s === "correct").length + 1;
      if (currentCorrectCount === totalCorrectThisLevel) {
        if (currentLevelIndex < totalLevels - 1) {
          setTimeout(() => {
            setCurrentLevelIndex((idx) => idx + 1);
          }, 600);
        } else {
          setTimeout(() => setFinished(true), 600);
        }
      }
    } else {
      // chọn sai
      setWrongCount((prev) => prev + 1);
      setFeedback("wrong");
      setTileStates((prev) => prev.map((s, i) => (i === index ? "wrong" : s)));
      setTimeout(
        () =>
          setTileStates((prev) =>
            prev.map((s, i) => (i === index && s === "wrong" ? "default" : s))
          ),
        300
      );
    }
  };

  const feedbackText =
    feedback === "correct"
      ? "Đúng rồi, giỏi quá! 🎯"
      : feedback === "wrong"
      ? "Chưa đúng, thử lại nhé 💪"
      : "";

  // Màn hình chơi game
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
      <div className="max-w-md w-full mx-4 bg-white/90 rounded-3xl shadow-2xl border-4 border-pink-100 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <img
            src={mascotImage}
            alt="Buddy mascot"
            className="w-16 h-16 rounded-full border-4 border-yellow-300 object-cover"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-pink-600 drop-shadow-sm">
              Minigame 5: Tìm chữ giống nhau
            </h1>
            <p className="text-xs sm:text-sm text-pink-500 font-medium">
              Nhiệm vụ: chọn tất cả ô có chữ giống chữ mẫu bên dưới.
            </p>
          </div>
        </div>

        {/* Target + level info */}
        <div className="bg-indigo-50/80 border-2 border-indigo-100 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex flex-col items-center flex-1">
            <span className="text-xs uppercase tracking-wide text-indigo-500 font-semibold">
              Chữ mẫu
            </span>
            <div className="mt-1 text-5xl sm:text-6xl font-extrabold text-indigo-700 tracking-widest">
              {currentLevel.target}
            </div>
          </div>
          <div className="flex flex-col gap-1 text-xs sm:text-sm text-indigo-600 flex-1">
            <span>
              Cấp:{" "}
              <span className="font-bold">
                {currentLevelIndex + 1} / {totalLevels}
              </span>
            </span>
            <span>
              Điểm:{" "}
              <span className="font-bold text-pink-600">
                {calculateMiniGame5Score({
                  totalCorrect: score,
                  totalWrong: wrongCount,
                  levelsCompleted: currentLevelIndex + 1,
                })}
              </span>
            </span>
            <span>
              Sai: <span className="font-bold text-red-500">{wrongCount}</span>
            </span>
            {currentLevel.description && (
              <span className="text-[11px] text-indigo-500">
                {currentLevel.description}
              </span>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3 mt-2">
          {currentLevel.grid.map((letter, index) => {
            const state = tileStates[index] ?? "default";

            let tileStyle =
              "flex items-center justify-center rounded-2xl py-4 text-3xl sm:text-4xl font-extrabold cursor-pointer select-none transition transform";

            if (state === "default") {
              tileStyle +=
                " bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 shadow-sm hover:-translate-y-0.5";
            } else if (state === "correct") {
              tileStyle +=
                " bg-emerald-100 border-2 border-emerald-400 shadow-md scale-95";
            } else if (state === "wrong") {
              tileStyle +=
                " bg-red-100 border-2 border-red-400 shadow-md scale-95";
            }

            return (
              <button
                key={`${currentLevel.id}-${index}`}
                type="button"
                onClick={() => handleTileClick(index)}
                className={tileStyle}
              >
                <span className="drop-shadow-sm">{letter}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        <div className="min-h-[24px] text-center text-sm font-semibold">
          {feedback && (
            <span
              className={
                feedback === "correct" ? "text-emerald-600" : "text-red-500"
              }
            >
              {feedbackText}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full mt-1 text-[11px] text-center text-pink-500 hover:text-pink-600"
        >
          ⬅ Quay lại
        </button>
      </div>
    </div>
  );
};

export default MiniGame5;
