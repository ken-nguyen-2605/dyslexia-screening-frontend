import apiClient from "./apiClient";

interface LoginCredentials {
	email: string;
	password: string;
}

interface RegisterInfo {
	email: string;
	password: string;
	name: string;
}

const authService = {
	/**
	 * Logs in a user.
	 */
	login: async (credentials: LoginCredentials) => {
		const response = await apiClient.post("/auth/login", credentials);
		return response.data;
	},
  
	/**
	 * Logs out the user by removing the token.
	 */
	logout: () => {
		localStorage.removeItem("access_token");
	},

	/**
	 * Registers a new user.
	 */
	register: async (userInfo: RegisterInfo) => {
		const response = await apiClient.post("/auth/register", userInfo);
		return response.data;
	},
};

export default authService;
