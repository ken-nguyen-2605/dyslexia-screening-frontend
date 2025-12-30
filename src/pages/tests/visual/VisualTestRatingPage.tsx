import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTestProgress } from "../../../hooks/useTestProgress";
import TestDifficultyRating from "../../../components/tests/shared/TestDifficultyRating";
import { toastSuccess, toastInfo, toastError } from "../../../utils/toast";
import { testSessionService } from "../../../services/testSessionService";

const VisualTestRatingPage = () => {
  const navigate = useNavigate();
  const {
    markTestComplete,
    getNextIncompleteTest,
    progress,
    setCurrentSessionId,
  } = useTestProgress();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (rating: number) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Get or create test session
      let testSessionId: number | null = progress.currentSessionId;

      if (!testSessionId) {
        const sessions = await testSessionService.getAllTestSessions();
        const incompleteSession = sessions.find((s: any) => !s.completed);
        if (incompleteSession) {
          testSessionId = incompleteSession.id;
        } else {
          const newSession = await testSessionService.startTestSession();
          testSessionId = newSession.id;
        }
        setCurrentSessionId(testSessionId);
      }

      if (!testSessionId) {
        throw new Error("Could not get or create test session");
      }

      const score = progress.visual.score || 80;

      await testSessionService.submitTestSection(testSessionId, {
        score,
        test_details: {
          difficultyRating: rating,
          completedAt: new Date().toISOString(),
        },
        test_type: "VISUAL",
      });

      // Mark visual test as complete
      markTestComplete("visual", { difficultyRating: rating, score });

      // Get next incomplete test
      const nextTest = getNextIncompleteTest();

      if (nextTest) {
        toastSuccess("Hoàn thành bài test thị giác!");
        toastInfo(`Tiếp tục với bài test ngôn ngữ...`);
        navigate(`/test/${nextTest}/instruction`);
      } else {
        toastSuccess("Hoàn thành tất cả bài test!");
        navigate("/test/minigame2/instruction");
      }
    } catch (error: any) {
      console.error("Failed to submit test:", error);
      toastError("Gửi kết quả thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <TestDifficultyRating testType="visual" onSubmit={handleSubmit} />;
};

export default VisualTestRatingPage;
