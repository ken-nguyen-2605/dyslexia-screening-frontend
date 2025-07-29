import apiClient from "./apiClient";

interface StartTestSessionParams {
	info: {
    age: number;
    gender: string;
    native_language: string;
    rl_dyslexia: boolean;
  }
}

interface SubmitAuditoryFeatureParams {
  question_type: string;
  start_time: string;
  end_time: string;
  first_click_interval: string;
  second_click_interval: string;
  third_click_interval: string;
  fourth_click_interval: string;
  fifth_click_interval: string;
  sixth_click_interval: string;
  duration_from_round: string;
  duration_from_interaction: string;
  total_clicks: number;
  logic: boolean;
  instructions_viewed: number;
}

interface SubmitVisualFeatureParams {
  question_type: string;
  start_time: string;
  end_time: string;
  total_clicks: number;
  first_click_interval: string;
  second_click_interval: string;
  third_click_interval: string;
  fourth_click_interval: string;
  fifth_click_interval: string;
  sixth_click_interval: string;
  time_last_click: string;
  correct_answers: number;
  wrong_answers: number;
}

interface SubmitLanguageFeatureParams {
  question_type: string;
  start_time: string;
  end_time: string;
  clicks: number;
  hits: number;
  misses: number;
}

interface RatingFeatureParams {
  feature: string;
  rating: number;
}

const testSessionService = {
  /**
   * Fetches all test sessions.
   */
  fetchTestSessions: async () => {
    const response = await apiClient.get("/test-session/");
    if (response.status !== 200) {
      throw new Error("Failed to fetch test sessions");
    }
    return response.data;
  },
  
	/**
	 * Starts a new test session.
	 */
	startTestSession: async (params: StartTestSessionParams) => {
    const response = await apiClient.post("/test-session/", params);
    if (response.status !== 201) {
      throw new Error("Failed to start test session");
    }
    return response.data;
  },

  /**
   * Submits auditory feature data.
   */
  submitAuditoryFeature: async (sessionId: number, params: SubmitAuditoryFeatureParams) => {
    const response = await apiClient.post(`/test-session/${sessionId}/auditory/`, params);
    if (response.status !== 200) {
      throw new Error("Failed to submit auditory feature data");
    }
    return response.data;
  },

  /**
   * Submits visual feature data.
   * */
  submitVisualFeature: async (sessionId: number, params: SubmitVisualFeatureParams) => {
    const response = await apiClient.post(`/test-session/${sessionId}/visual/`, params);
    if (response.status !== 200) {
      throw new Error("Failed to submit visual feature data");
    }
    return response.data;
  },

  /**
   * Submits language feature data.
   */
  submitLanguageFeature: async (sessionId: number, params: SubmitLanguageFeatureParams) => {
    const response = await apiClient.post(`/test-session/${sessionId}/language/`, params);
    if (response.status !== 200) {
      throw new Error("Failed to submit language feature data");
    }
    return response.data;
  },

  /**
   * Submits a rating for a feature.
   */
  submitRatingFeature: async (sessionId: number, params: RatingFeatureParams) => {
    const response = await apiClient.post(`/test-session/${sessionId}/rating/`, params);
    if (response.status !== 200) {
      throw new Error("Failed to submit rating feature data");
    }
    return response.data;
  }
};

export default testSessionService;