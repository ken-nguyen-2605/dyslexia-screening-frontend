import { useNavigate } from "react-router-dom";
import { useTestProgress } from "../../../hooks/useTestProgress";
import TestDifficultyRating from "../../../components/tests/shared/TestDifficultyRating";
import { toastSuccess, toastInfo } from "../../../utils/toast";

const AuditoryTestRatingPage = () => {
  const navigate = useNavigate();
  const { markTestComplete, getNextIncompleteTest } = useTestProgress();

  const handleSubmit = (rating: number) => {
    // Mark auditory test as complete
    markTestComplete("auditory", { difficultyRating: rating });

    // Get next incomplete test
    const nextTest = getNextIncompleteTest();

    if (nextTest) {
      toastSuccess("Auditory test completed!");
      toastInfo(`Continue with ${nextTest} test...`);
      navigate(`/test/${nextTest}/instruction`);
    } else {
      toastSuccess("All main tests completed!");
      toastInfo("Time for a bonus game!");
      navigate("/test/minigame2/instruction");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-cyan p-8 rounded-2xl">
      <TestDifficultyRating testType="auditory" onSubmit={handleSubmit} />
    </div>
  );
};

export default AuditoryTestRatingPage;
