import { useNavigate } from "react-router-dom";
import TestDifficultyRating from "../../../components/tests/shared/TestDifficultyRating";
import { toastSuccess } from "../../../utils/toast";

const MiniGame2RatingPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // MiniGame2 is NOT tracked in TestProgressContext (it's a bonus game)
    toastSuccess("MiniGame2 completed! Great job!");
    navigate("/dashboard");
  };

  return <TestDifficultyRating testType="minigame2" onSubmit={handleSubmit} />;
};

export default MiniGame2RatingPage;
