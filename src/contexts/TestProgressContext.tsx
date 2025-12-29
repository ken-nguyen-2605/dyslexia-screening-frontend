import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type MainTestType = "auditory" | "visual" | "language";

interface TestStatus {
  completed: boolean;
  completedAt?: Date;
  score?: number;
  difficultyRating?: number;
}

interface TestProgressState {
  auditory: TestStatus;
  visual: TestStatus;
  language: TestStatus;
}

interface TestCompletionData {
  score?: number;
  difficultyRating?: number;
}

interface TestProgressContextType {
  progress: TestProgressState;
  markTestComplete: (testType: MainTestType, data: TestCompletionData) => void;
  getNextIncompleteTest: () => MainTestType | null;
  resetProgress: () => void;
  isAllTestsComplete: boolean;
}

const TestProgressContext = createContext<TestProgressContextType | undefined>(undefined);

const STORAGE_KEY = "dyslexia_test_progress";

const initialState: TestProgressState = {
  auditory: { completed: false },
  visual: { completed: false },
  language: { completed: false },
};

export const TestProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<TestProgressState>(() => {
    // Load from localStorage on init
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert ISO date strings back to Date objects
        if (parsed.auditory?.completedAt) {
          parsed.auditory.completedAt = new Date(parsed.auditory.completedAt);
        }
        if (parsed.visual?.completedAt) {
          parsed.visual.completedAt = new Date(parsed.visual.completedAt);
        }
        if (parsed.language?.completedAt) {
          parsed.language.completedAt = new Date(parsed.language.completedAt);
        }
        return parsed;
      }
    } catch (error) {
      console.error("Failed to load test progress from localStorage:", error);
    }
    return initialState;
  });

  // Persist to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error("Failed to save test progress to localStorage:", error);
    }
  }, [progress]);

  const markTestComplete = (testType: MainTestType, data: TestCompletionData) => {
    setProgress((prev) => ({
      ...prev,
      [testType]: {
        completed: true,
        completedAt: new Date(),
        score: data.score,
        difficultyRating: data.difficultyRating,
      },
    }));
  };

  const getNextIncompleteTest = (): MainTestType | null => {
    const testOrder: MainTestType[] = ["auditory", "visual", "language"];
    for (const testType of testOrder) {
      if (!progress[testType].completed) {
        return testType;
      }
    }
    return null; // All tests completed
  };

  const resetProgress = () => {
    setProgress(initialState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear test progress from localStorage:", error);
    }
  };

  const isAllTestsComplete =
    progress.auditory.completed && progress.visual.completed && progress.language.completed;

  return (
    <TestProgressContext.Provider
      value={{
        progress,
        markTestComplete,
        getNextIncompleteTest,
        resetProgress,
        isAllTestsComplete,
      }}
    >
      {children}
    </TestProgressContext.Provider>
  );
};

export const useTestProgress = () => {
  const context = useContext(TestProgressContext);
  if (!context) {
    throw new Error("useTestProgress must be used within a TestProgressProvider");
  }
  return context;
};
