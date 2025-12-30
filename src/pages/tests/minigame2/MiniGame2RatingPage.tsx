import { useNavigate } from "react-router-dom";
import TestDifficultyRating from "../../../components/tests/shared/TestDifficultyRating";
import { toastSuccess } from "../../../utils/toast";
import { useTestProgress } from "../../../hooks/useTestProgress";

const MiniGame2RatingPage = () => {
  const navigate = useNavigate();
  const { progress } = useTestProgress();

  const handleSubmit = () => {
    // MiniGame2 is NOT tracked in TestProgressContext (it's a bonus game)
    toastSuccess("Hoàn thành minigame! Tuyệt vời!");
    
    // Navigate to results page with the current session
    if (progress.currentSessionId) {
      navigate(`/results/${progress.currentSessionId}`);
    } else {
      navigate("/results");
    }
  };

  return <TestDifficultyRating testType="minigame2" onSubmit={handleSubmit} />;
};

export default MiniGame2RatingPage;
