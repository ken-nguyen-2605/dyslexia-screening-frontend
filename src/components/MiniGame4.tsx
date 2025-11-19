// MiniGame4.tsx
import React from "react";
import MiniGame4Canvas from "./MiniGame4Canvas";
import { useMinigameLogic } from "./MiniGame4Logic";
import { speakLetter } from "./audio";

const MiniGame4: React.FC = () => {
  const { currentLetter, round, maxRounds, checkAnswer, resetGame, rewardState } = useMinigameLogic();

  const handleSubmit = async (drawnLetter: string) => {
    return checkAnswer(drawnLetter);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start p-4 bg-blue-50">
      <h1 className="text-3xl font-bold mb-4">MiniGame 4 – Xây Thành Phố Mini</h1>

      <p className="text-xl mb-2">Vòng {round} / {maxRounds}</p>
      <p className="text-xl mb-4">Hãy viết chữ sau:</p>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-5xl font-bold">{currentLetter}</span>
        <button
          onClick={() => speakLetter(currentLetter)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
        >
          🔊 Nghe chữ
        </button>
      </div>

      <MiniGame4Canvas onSubmit={handleSubmit} round={round} />

      <p className="mt-4">Tòa nhà: {rewardState.buildings} | Cấp độ: {rewardState.level} | Stars: {rewardState.stars}</p>

      <button
        onClick={resetGame}
        className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-lg shadow"
      >
        Chơi lại
      </button>
    </div>
  );
};

export default MiniGame4;
