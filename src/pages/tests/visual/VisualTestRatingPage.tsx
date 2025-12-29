import { useNavigate } from "react-router-dom";
import { useTestProgress } from "../../../hooks/useTestProgress";
import TestDifficultyRating from "../../../components/tests/shared/TestDifficultyRating";
import { toastSuccess, toastInfo } from "../../../utils/toast";

const VisualTestRatingPage = () => {
  const navigate = useNavigate();
  const { markTestComplete, getNextIncompleteTest } = useTestProgress();

  const handleSubmit = (rating: number) => {
    // Mark visual test as complete
    markTestComplete("visual", { difficultyRating: rating });

    // Get next incomplete test
    const nextTest = getNextIncompleteTest();

    if (nextTest) {
      toastSuccess("Visual test completed!");
      toastInfo(`Continue with ${nextTest} test...`);
      navigate(`/test/${nextTest}/instruction`);
    } else {
      toastSuccess("All main tests completed!");
      toastInfo("Time for a bonus game!");
      navigate("/test/minigame2/instruction");
    }
  };

  return <TestDifficultyRating testType="visual" onSubmit={handleSubmit} />;
};

export default VisualTestRatingPage;
