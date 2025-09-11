import apiClient from "./apiClient";
import type {
	ProfileSchema,
	ProfileUpdateRequest,
} from "../types";

const userService = {
	/**
	 * Get current user's profile.
	 */
	getProfile: async (): Promise<ProfileSchema> => {
		const response = await apiClient.get("/v1/user/profile");
		return response.data;
	},

	/**
	 * Update current user's profile.
	 */
	updateProfile: async (profileData: ProfileUpdateRequest): Promise<ProfileSchema> => {
		const response = await apiClient.put("/v1/user/profile", profileData);
		return response.data;
	},
};

export default userService;
