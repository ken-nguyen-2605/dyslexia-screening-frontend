import apiClient from "./apiClient";
import type {
	ProfileCreateRequest,
	ProfileSchema,
	Token,
} from "../types";

const accountService = {
	/**
	 * Get all profiles for the current user.
	 */
	getProfiles: async (): Promise<ProfileSchema[]> => {
		const response = await apiClient.get("/v1/account/profiles");
		return response.data;
	},

	/**
	 * Create a new profile.
	 */
	createProfile: async (profileData: ProfileCreateRequest): Promise<ProfileSchema> => {
		const response = await apiClient.post("/v1/account/profiles", profileData);
		return response.data;
	},

	/**
	 * Delete a profile by ID.
	 */
	deleteProfile: async (profileId: number): Promise<void> => {
		await apiClient.delete(`/v1/account/profiles/${profileId}`);
	},

	/**
	 * Select a profile and get a new token.
	 */
	selectProfile: async (profileId: number): Promise<Token> => {
		const response = await apiClient.post(`/v1/account/profiles/${profileId}/select`);
		return response.data;
	},
};

export default accountService;
