import { useNavigate } from "react-router-dom";
import { useTestProgress } from "../../../hooks/useTestProgress";
import TestDifficultyRating from "../../../components/tests/shared/TestDifficultyRating";
import { toastSuccess, toastInfo } from "../../../utils/toast";

const LanguageTestRatingPage = () => {
  const navigate = useNavigate();
  const { markTestComplete, getNextIncompleteTest } = useTestProgress();

  const handleSubmit = (rating: number) => {
    // Mark language test as complete
    markTestComplete("language", { difficultyRating: rating });

    // Get next incomplete test
    const nextTest = getNextIncompleteTest();

    if (nextTest) {
      toastSuccess("Language test completed!");
      toastInfo(`Continue with ${nextTest} test...`);
      navigate(`/test/${nextTest}/instruction`);
    } else {
      toastSuccess("All main tests completed!");
      toastInfo("Time for a bonus game!");
      navigate("/test/minigame2/instruction");
    }
  };

  return <TestDifficultyRating testType="language" onSubmit={handleSubmit} />;
};

export default LanguageTestRatingPage;
