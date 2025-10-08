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