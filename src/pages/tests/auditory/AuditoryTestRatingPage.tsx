import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTestProgress } from "../../../hooks/useTestProgress";
import TestDifficultyRating from "../../../components/tests/shared/TestDifficultyRating";
import { toastSuccess, toastInfo, toastError } from "../../../utils/toast";
import { testSessionService } from "../../../services/testSessionService";

const AuditoryTestRatingPage = () => {
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

      // Calculate score (you may want to store actual score from test)
      const score = progress.auditory.score || 80; // Default or from context

      // Submit test results to backend
      await testSessionService.submitTestSection(testSessionId, {
        score,
        test_details: {
          difficultyRating: rating,
          completedAt: new Date().toISOString(),
        },
        test_type: "AUDITORY",
      });

      // Mark auditory test as complete locally
      markTestComplete("auditory", { difficultyRating: rating, score });

      // Get next incomplete test
      const nextTest = getNextIncompleteTest();

      if (nextTest) {
        toastSuccess("Hoàn thành bài test thính giác!");
        toastInfo(
          `Tiếp tục với bài test ${
            nextTest === "visual" ? "thị giác" : "ngôn ngữ"
          }...`
        );
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-cyan p-8 rounded-2xl">
      <TestDifficultyRating testType="auditory" onSubmit={handleSubmit} />
    </div>
  );
};

export default AuditoryTestRatingPage;
