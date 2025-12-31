/**
 * Score Calculator Utilities
 *
 * All scores are normalized to 0-100 scale
 */

// ============ AUDITORY TEST ============
// 10 questions total, simple percentage
export const AUDITORY_TOTAL_QUESTIONS = 10;

export function calculateAuditoryScore(correctAnswers: number): number {
  const score = (correctAnswers / AUDITORY_TOTAL_QUESTIONS) * 100;
  return Math.round(Math.min(100, Math.max(0, score)));
}

// ============ VISUAL TEST ============
// 8 rounds, time-based clicking game
// Score based on accuracy: correct / (correct + wrong)
export const VISUAL_TOTAL_ROUNDS = 8;

export interface VisualTestResult {
  totalCorrect: number;
  totalWrong: number;
  roundDetails: Array<{
    round: number;
    correct: number;
    wrong: number;
    timeRemaining: number;
  }>;
}

export function calculateVisualScore(result: VisualTestResult): number {
  const { totalCorrect, totalWrong } = result;

  // If no clicks at all, return 0
  if (totalCorrect + totalWrong === 0) {
    return 0;
  }

  // Accuracy-based score: correct / (correct + wrong) * 100
  // This penalizes wrong clicks but rewards correct ones
  const accuracyScore = (totalCorrect / (totalCorrect + totalWrong)) * 100;

  return Math.round(Math.min(100, Math.max(0, accuracyScore)));
}

// Alternative: Score with bonus for speed (optional)
export function calculateVisualScoreWithTimeBonus(
  result: VisualTestResult,
  avgTimeRemaining: number,
  maxTimePerRound: number = 15
): number {
  const baseScore = calculateVisualScore(result);

  // Time bonus: up to 20% extra for fast performance
  const timeBonus = (avgTimeRemaining / maxTimePerRound) * 20;

  const finalScore = baseScore + timeBonus;
  return Math.round(Math.min(100, Math.max(0, finalScore)));
}

// ============ LANGUAGE TEST ============
// 6 sub-tests with varying question counts
export const LANGUAGE_TEST_QUESTIONS = {
  test1_vowels: 5, // A, E, I, O, U
  test2_consonants: 4, // B, Q, P, D
  test3_alphabet: 26, // A-Z
  test4_removeLetter: 4, // Remove letter questions
  test5_addLetter: 4, // Add letter questions
  test6_replaceLetter: 4, // Replace letter questions
};

export const LANGUAGE_TOTAL_QUESTIONS = Object.values(
  LANGUAGE_TEST_QUESTIONS
).reduce((a, b) => a + b, 0); // 47

export interface LanguageTestResult {
  test1_correct: number;
  test2_correct: number;
  test3_correct: number;
  test4_correct: number;
  test5_correct: number;
  test6_correct: number;
  totalCorrect: number;
}

export function calculateLanguageScore(result: LanguageTestResult): number {
  const score = (result.totalCorrect / LANGUAGE_TOTAL_QUESTIONS) * 100;
  return Math.round(Math.min(100, Math.max(0, score)));
}

// Alternative: Weighted score by test difficulty
export function calculateLanguageScoreWeighted(
  result: LanguageTestResult
): number {
  // Weights based on difficulty (higher = harder)
  const weights = {
    test1: 0.1, // Vowels - easy
    test2: 0.12, // Consonants - slightly harder
    test3: 0.28, // Full alphabet - medium
    test4: 0.15, // Remove letter - medium
    test5: 0.17, // Add letter - harder
    test6: 0.18, // Replace letter - hardest
  };

  const test1Score =
    (result.test1_correct / LANGUAGE_TEST_QUESTIONS.test1_vowels) *
    weights.test1;
  const test2Score =
    (result.test2_correct / LANGUAGE_TEST_QUESTIONS.test2_consonants) *
    weights.test2;
  const test3Score =
    (result.test3_correct / LANGUAGE_TEST_QUESTIONS.test3_alphabet) *
    weights.test3;
  const test4Score =
    (result.test4_correct / LANGUAGE_TEST_QUESTIONS.test4_removeLetter) *
    weights.test4;
  const test5Score =
    (result.test5_correct / LANGUAGE_TEST_QUESTIONS.test5_addLetter) *
    weights.test5;
  const test6Score =
    (result.test6_correct / LANGUAGE_TEST_QUESTIONS.test6_replaceLetter) *
    weights.test6;

  const totalWeightedScore =
    (test1Score +
      test2Score +
      test3Score +
      test4Score +
      test5Score +
      test6Score) *
    100;

  return Math.round(Math.min(100, Math.max(0, totalWeightedScore)));
}

// ============ MINIGAME 5 - Letter Matching ============
// Accuracy-based scoring similar to visual test
// Score = correct / (correct + wrong) * 100
export interface MiniGame5Result {
  totalCorrect: number;
  totalWrong: number;
  levelsCompleted: number;
}

export function calculateMiniGame5Score(result: MiniGame5Result): number {
  const { totalCorrect, totalWrong } = result;

  // If no clicks at all, return 0
  if (totalCorrect + totalWrong === 0) {
    return 0;
  }

  // Accuracy-based score: correct / (correct + wrong) * 100
  // This penalizes wrong clicks but rewards correct ones
  const accuracyScore = (totalCorrect / (totalCorrect + totalWrong)) * 100;

  return Math.round(Math.min(100, Math.max(0, accuracyScore)));
}

// ============ OVERALL RESULT ============
export type DyslexiaResult = "NON_DYSLEXIC" | "MAYBE_DYSLEXIC" | "DYSLEXIC";

export interface OverallTestResult {
  auditoryScore: number;
  visualScore: number;
  languageScore: number;
}

export function calculateOverallScore(result: OverallTestResult): number {
  const average =
    (result.auditoryScore + result.visualScore + result.languageScore) / 3;
  return Math.round(average);
}

export function getDyslexiaResult(overallScore: number): DyslexiaResult {
  if (overallScore >= 75) {
    return "NON_DYSLEXIC";
  } else if (overallScore >= 50) {
    return "MAYBE_DYSLEXIC";
  } else {
    return "DYSLEXIC";
  }
}

export function getResultLabel(result: DyslexiaResult): string {
  switch (result) {
    case "NON_DYSLEXIC":
      return "Không có dấu hiệu rối loạn đọc";
    case "MAYBE_DYSLEXIC":
      return "Có thể có dấu hiệu rối loạn đọc - cần theo dõi thêm";
    case "DYSLEXIC":
      return "Có dấu hiệu rối loạn đọc - cần đánh giá chuyên sâu";
  }
}
