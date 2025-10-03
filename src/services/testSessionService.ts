import apiClient from "./apiClient";
import type {
	TestStartRequest,
	TestStartResponse,
	TestSubmissionRequest,
	TestSubmissionResponse,
	TestSessionResponse,
} from "../types";

const testSessionService = {
  /**
   * Fetches all test sessions for the current profile.
   */
  getAllTestSessions: async (): Promise<TestSessionResponse[]> => {
    const response = await apiClient.get("/v1/test-session/");
    return response.data;
  },
  
	/**
	 * Starts a new test session.
	 */
	startTest: async (testData: TestStartRequest): Promise<TestStartResponse> => {
    const response = await apiClient.post("/v1/test-session/", testData);
    return response.data;
  },

  /**
   * Submit test answers for a specific test session.
   */
  submitTest: async (testSessionId: number, answers: TestSubmissionRequest): Promise<TestSubmissionResponse> => {
    const response = await apiClient.post(`/v1/test-session/${testSessionId}/submit`, answers);
    return response.data;
  },

  // Legacy methods for backward compatibility
  fetchTestSessions: async (): Promise<TestSessionResponse[]> => {
    return testSessionService.getAllTestSessions();
  },

  startTestSession: async (params: any): Promise<TestStartResponse> => {
    // Convert legacy format to new format
    const testData: TestStartRequest = {
      test_difficulty: params.test_difficulty || "BASIC"
    };
    return testSessionService.startTest(testData);
  },
};

export default testSessionService;