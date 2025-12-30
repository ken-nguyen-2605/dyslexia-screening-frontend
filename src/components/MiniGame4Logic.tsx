// MiniGame4Logic.ts
import { useState } from "react";
import { LETTERS, getRandomLetter } from "./letters";
import { rewardCorrectAnswer, loadRewardState } from "./rewardSystem";

export function useMinigameLogic() {
  const maxRounds = 5;
  const [round, setRound] = useState(1);
  const [currentLetter, setCurrentLetter] = useState(getRandomLetter());
  const [rewardState, setRewardState] = useState(loadRewardState());

  const pickRandomLetter = () => {
    setCurrentLetter(getRandomLetter());
  };

  const checkAnswer = (answer: string) => {
    const isCorrect = answer.toLowerCase() === currentLetter.toLowerCase();
    if (isCorrect) {
      const updated = rewardCorrectAnswer();
      setRewardState(updated); // cập nhật thành phố
    }

    if (round < maxRounds) {
      setRound((prev) => prev + 1);
      pickRandomLetter();
    }

    return isCorrect;
  };

  const resetGame = () => {
    setRound(1);
    pickRandomLetter();
    setRewardState({ buildings: 0, stars: 0, level: 1 });
  };

  return {
    currentLetter,
    round,
    maxRounds,
    rewardState,
    checkAnswer,
    resetGame,
  };
}

export type UseMinigameLogicReturn = ReturnType<typeof useMinigameLogic>;
