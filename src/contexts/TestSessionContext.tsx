import { createContext, useContext, useState, type ReactNode } from "react";
import testSessionService from "../services/testSessionService";
import type { TestStartResponse, TestDifficulty, TestSubmissionRequest, TestSubmissionResponse } from "../types";

interface TestSessionContextType {
  currentSession: TestStartResponse | null;
  isLoading: boolean;
  error: string | null;
  startSession: (difficulty: TestDifficulty) => Promise<TestStartResponse | null>;
  submitSession: (sessionId: number, answers: TestSubmissionRequest) => Promise<TestSubmissionResponse | null>;
  clearSession: () => void;
}

const TestSessionContext = createContext<TestSessionContextType | undefined>(undefined);

export const useTestSession = () => {
  const context = useContext(TestSessionContext);
  if (!context) {
    throw new Error("useTestSession must be used within a TestSessionProvider");
  }
  return context;
};

interface TestSessionProviderProps {
  children: ReactNode;
}

export const TestSessionProvider = ({ children }: TestSessionProviderProps) => {
  const [currentSession, setCurrentSession] = useState<TestStartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startSession = async (difficulty: TestDifficulty): Promise<TestStartResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const session = await testSessionService.startTest({ test_difficulty: difficulty });
      setCurrentSession(session);
      return session;
    } catch (err: any) {
      setError(err.message || "Failed to start test session");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const submitSession = async (sessionId: number, answers: TestSubmissionRequest): Promise<TestSubmissionResponse | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await testSessionService.submitTest(sessionId, answers);
      return result;
    } catch (err: any) {
      setError(err.message || "Failed to submit test");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearSession = () => {
    setCurrentSession(null);
    setError(null);
  };

  const value: TestSessionContextType = {
    currentSession,
    isLoading,
    error,
    startSession,
    submitSession,
    clearSession,
  };

  return (
    <TestSessionContext.Provider value={value}>
      {children}
    </TestSessionContext.Provider>
  );
};
