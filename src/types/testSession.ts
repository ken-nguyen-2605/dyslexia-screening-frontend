export interface StartSpecificTestSessionParams {
	test_type: "AUDITORY" | "VISUAL" | "LANGUAGE";
}

export interface SubmitSpecificTestSessionParams {
  id: number;
  test_session_id: number;
  score: number;
  test_details: any;
  test_type: "AUDITORY" | "VISUAL" | "LANGUAGE";
}

export interface TestSession {
  id: number;
  profile_id: number;
  start_time: string;
  end_time: string | null;
  completed: boolean;
  taken_auditory_test: boolean;
  taken_visual_test: boolean;
  taken_language_test: boolean;
  result: "DYSLEXIC" | "MAYBE_DYSLEXIC" | "NON_DYSLEXIC" | null;
  score: number | null;
  auditory_test: SpecificTestSession | null;
  visual_test: SpecificTestSession | null;
  language_test: SpecificTestSession | null;
}

export interface SpecificTestSession {
  id: number;
  test_session_id: number;
  score: number | null;
  test_details: any | null;
  test_type: "AUDITORY" | "VISUAL" | "LANGUAGE";
}

/**
 * {
  "id": 0,
  "profile_id": 0,
  "start_time": "2025-10-08T07:16:32.321Z",
  "end_time": "2025-10-08T07:16:32.321Z",
  "completed": true,
  "taken_auditory_test": true,
  "taken_visual_test": true,
  "taken_language_test": true,
  "result": "DYSLEXIC",
  "score": 0
}
 */