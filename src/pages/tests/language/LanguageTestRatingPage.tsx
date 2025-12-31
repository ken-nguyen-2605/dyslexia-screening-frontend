import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTestProgress } from "../../../hooks/useTestProgress";
import TestDifficultyRating from "../../../components/tests/shared/TestDifficultyRating";
import { toastSuccess, toastInfo, toastError } from "../../../utils/toast";
import { testSessionService } from "../../../services/testSessionService";
import type { TestSession } from "../../../types/testSession";

interface TestDetailItem {
  correct: number;
  total: number;
  weight: number;
  earned: number;
}

interface LanguageTestState {
  score: number;
  testDetails: {
    test1_vowels: TestDetailItem;
    test2_consonants: TestDetailItem;
    test3_alphabet: TestDetailItem;
    test4_removeLetter: TestDetailItem;
    test5_addLetter: TestDetailItem;
    test6_replaceLetter: TestDetailItem;
  };
}

const LanguageTestRatingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const testState = location.state as LanguageTestState | null;

  const {
    markTestComplete,
    progress,
    setCurrentSessionId,
    syncWithBackendSession,
  } = useTestProgress();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get score from navigation state or use default
  const calculatedScore = testState?.score ?? 80;

  // Helper function to determine next test based on backend session state
  const getNextTestFromSession = (session: TestSession): string | null => {
    // Order: auditory > visual > language
    if (!session.taken_auditory_test) return "auditory";
    if (!session.taken_visual_test) return "visual";
    if (!session.taken_language_test) return "language";
    return null; // All tests completed
  };

  const handleSubmit = async (rating: number) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Get or create test session
      let testSessionId: number | null = progress.currentSessionId;

      if (!testSessionId) {
        // Try to find an incomplete session or create a new one
        const sessions = await testSessionService.getAllTestSessions();
        const incompleteSession = Array.isArray(sessions)
          ? sessions.find((s: any) => !s.completed)
          : null;
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

      // Use score calculated from test performance (weighted: 20-20-20-15-15-10)
      const score = calculatedScore;

      await testSessionService.submitTestSection(testSessionId, {
        score,
        test_details: {
          difficultyRating: rating,
          completedAt: new Date().toISOString(),
          weightedScoring: "20-20-20-15-15-10",
          testDetails: testState?.testDetails,
        },
        test_type: "LANGUAGE",
      });

      // Mark language test as complete
      markTestComplete("language", { difficultyRating: rating, score });

      // Fetch updated session from backend to get accurate state
      const updatedSession = await testSessionService.getTestSessionById(
        testSessionId
      );
      syncWithBackendSession(updatedSession);

      // Determine next test based on backend session state
      const nextTest = getNextTestFromSession(updatedSession);

      if (nextTest) {
        toastSuccess("Hoàn thành bài test ngôn ngữ!");
        const testNames: Record<string, string> = {
          auditory: "thính giác",
          visual: "thị giác",
          language: "ngôn ngữ",
        };
        toastInfo(`Tiếp tục với bài test ${testNames[nextTest]}...`);
        navigate(`/test/${nextTest}/instruction`);
      } else {
        // All tests completed - navigate to results
        toastSuccess("Hoàn thành tất cả bài test!");
        navigate(`/results/${testSessionId}`);
      }
    } catch (error: any) {
      console.error("Failed to submit test:", error);
      toastError("Gửi kết quả thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <TestDifficultyRating testType="language" onSubmit={handleSubmit} />;
};

export default LanguageTestRatingPage;
