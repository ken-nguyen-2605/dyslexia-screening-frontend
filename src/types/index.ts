// API Request Types
export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ProfileCreateRequest {
  profile_type: ProfileType;
  name: string;
}

export interface ProfileUpdateRequest {
  name: string;
  year_of_birth: number;
  gender: Gender;
  hobbies: string;
}

export interface TestStartRequest {
  test_difficulty: TestDifficulty;
}

export interface TestQuestion {
  correct: boolean;
  question_no: number;
}

export interface TestSubmissionRequest {
  questions: TestQuestion[];
}

// API Response Types
export interface RegisterResponse {
  id: number;
  email: string;
  created_at: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface ProfileSchema {
  id: number;
  profile_type: ProfileType;
  created_at: string;
  name: string | null;
  year_of_birth: number | null;
  gender: Gender | null;
  hobbies: string | null;
}

export interface TestStartResponse {
  id: number;
  profile_id: number;
  start_time: string;
  completion_status: TestStatus;
  test_difficulty: TestDifficulty;
}

export interface TestSubmissionResponse {
  id: number;
  profile_id: number;
  start_time: string;
  end_time: string | null;
  test_difficulty: TestDifficulty;
  completion_status: TestStatus;
  predict_dyslexia: PredictDyslexia | null;
  result: number;
}

export interface TestSessionResponse {
  id: number;
  profile_id: number;
  start_time: string;
  end_time: string | null;
  test_difficulty: TestDifficulty;
  completion_status: TestStatus;
  predict_dyslexia: PredictDyslexia | null;
  result: number;
}

// Enums
export type ProfileType = "PARENT" | "CHILD";

export type Gender = "MALE" | "FEMALE";

export type TestDifficulty = "BASIC" | "ADVANCED";

export type TestStatus = "COMPLETED" | "IN_PROGRESS";

export type PredictDyslexia = "YES" | "NO" | "MAYBE";

// Error Types
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

// User/Profile related types
export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface Profile extends ProfileSchema {}

// Legacy types for backward compatibility
export interface LoginCredentials extends LoginRequest {}
export interface RegisterInfo extends RegisterRequest {}
