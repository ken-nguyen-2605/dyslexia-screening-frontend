import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MinigameSuccessPage from "../../../components/tests/minigame/MinigameSuccessPage";
import { minigameService } from "../../../services/minigameService";

interface LocationState {
  score: number;
  correct: number;
  total: number;
}

const MiniGame1RatingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const hasSubmitted = useRef(false);

  const score = state?.score ?? 0;
  const correct = state?.correct ?? 0;
  const total = state?.total ?? 5;

  useEffect(() => {
    const submitScore = async () => {
      if (hasSubmitted.current) return;
      hasSubmitted.current = true;

      try {
        await minigameService.submitMinigame({
          minigame_number: "one",
          score: score,
          minigame_details: {
            correct_answers: correct,
            total_questions: total,
          },
          attempted_at: new Date().toISOString(),
        });
        console.log("MiniGame1 score submitted successfully:", score);
      } catch (error) {
        console.error("Failed to submit MiniGame1 score:", error);
      }
    };

    submitScore();
  }, [score, correct, total]);

  const handlePlayAgain = () => {
    navigate("/test/minigame1/instruction");
  };

  return (
    <MinigameSuccessPage
      gameName="Trò chơi 1 - Spelling Bee"
      message="Con đã hoàn thành trò chơi Spelling Bee!"
      score={correct}
      maxScore={total}
      onPlayAgain={handlePlayAgain}
    />
  );
};

export default MiniGame1RatingPage;
