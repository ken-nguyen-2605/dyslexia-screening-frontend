import apiClient from "./apiClient";
import type {
	LoginRequest,
	RegisterRequest,
	Token,
	RegisterResponse,
	LoginCredentials,
	RegisterInfo,
} from "../types";

const authService = {
	/**
	 * Logs in a user.
	 */
	login: async (credentials: LoginRequest): Promise<Token> => {
		const response = await apiClient.post("/v1/auth/login", credentials);
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
	register: async (userInfo: RegisterRequest): Promise<RegisterResponse> => {
		const response = await apiClient.post("/v1/auth/register", userInfo);
		return response.data;
	},

	// Legacy methods for backward compatibility
	loginLegacy: async (credentials: LoginCredentials): Promise<Token> => {
		return authService.login(credentials);
	},

	registerLegacy: async (userInfo: RegisterInfo): Promise<RegisterResponse> => {
		const { email, password } = userInfo;
		return authService.register({ email, password });
	},
};

export default authService;
