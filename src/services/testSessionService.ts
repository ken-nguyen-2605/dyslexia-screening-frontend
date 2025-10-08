import apiClient from "./apiClient";
import type {
	StartSpecificTestSessionParams,
	SubmitSpecificTestSessionParams,
} from "../types/testSession";

// interface SubmitAuditoryFeatureParams {
//   question_type: string;
//   start_time: string;
//   end_time: string;
//   first_click_interval: string;
//   second_click_interval: string;
//   third_click_interval: string;
//   fourth_click_interval: string;
//   fifth_click_interval: string;
//   sixth_click_interval: string;
//   duration_from_round: string;
//   duration_from_interaction: string;
//   total_clicks: number;
//   logic: boolean;
//   instructions_viewed: number;
// }

// interface SubmitVisualFeatureParams {
//   question_type: string;
//   start_time: string;
//   end_time: string;
//   total_clicks: number;
//   first_click_interval: string;
//   second_click_interval: string;
//   third_click_interval: string;
//   fourth_click_interval: string;
//   fifth_click_interval: string;
//   sixth_click_interval: string;
//   time_last_click: string;
//   correct_answers: number;
//   wrong_answers: number;
// }

// interface SubmitLanguageFeatureParams {
//   question_type: string;
//   start_time: string;
//   end_time: string;
//   clicks: number;
//   hits: number;
//   misses: number;
// }

// interface RatingFeatureParams {
//   feature: string;
//   rating: number;
// }

export const testSessionService = {
	/**
	 * Fetches all test sessions.
	 */
	getAllTestSessions: async () => {
		return await apiClient.get("/test-session/");
	},

	/**
	 * Starts a new test session.
	 */
	startTestSession: async () => {
		return await apiClient.post("/test-session");
	},

	/**
	 * Fetches a test session by ID.
	 */
	getTestSessionById: async (testSessionId: number) => {
		return await apiClient.get(`/test-session/${testSessionId}`);
	},

	/**
	 * Starts a specific type of test session.
	 */
	startSpecificTestSession: async (
		params: StartSpecificTestSessionParams
	) => {
		return await apiClient.post("/test-session/start", params);
	},

	/**
	 * Submits a specific test session.
	 */
	submitTestSection: async (
		testSessionId: number,
		submitTestParams: SubmitSpecificTestSessionParams
	) => {
		return await apiClient.post(
			`/test-session/${testSessionId}/submit`,
			submitTestParams
		);
	},
};
