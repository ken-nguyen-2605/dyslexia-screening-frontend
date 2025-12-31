import { useNavigate, useLocation } from "react-router-dom";
import MinigameSuccessPage from "../../../components/tests/minigame/MinigameSuccessPage";

interface LocationState {
  score: number;
  correct: number;
  total: number;
  wrongCount: number;
}

const MiniGame5RatingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  // score is already the calculated score (0-100)
  const calculatedScore = state?.score ?? 0;

  const handlePlayAgain = () => {
    navigate("/test/minigame5/instruction");
  };

  return (
    <MinigameSuccessPage
      gameName="Trò chơi 5 - Tìm chữ giống nhau"
      message="Con đã hoàn thành trò chơi phân biệt chữ cái!"
      score={calculatedScore}
      maxScore={100}
      onPlayAgain={handlePlayAgain}
    />
  );
};

export default MiniGame5RatingPage;
