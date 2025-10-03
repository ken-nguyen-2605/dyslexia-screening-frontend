import apiClient from "./apiClient";
import type {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
} from "../types/auth";

/**
 * Service for handling authentication-related operations.
 */
class AuthService {
	/**
	 * Logs in a user.
	 */
	async login(loginRequest: LoginRequest): Promise<LoginResponse> {
		const response = await apiClient.post("/auth/login", loginRequest);
		return response.data;
	}

	/**
	 * Logs out the user by removing the token.
	 */
	logout(): void {
		localStorage.removeItem("access_token");
	}

	/**
	 * Registers a new user.
	 */
	async register(
		registerRequest: RegisterRequest
	): Promise<RegisterResponse> {
		const response = await apiClient.post(
			"/auth/register",
			registerRequest
		);
		return response.data;
	}
}

export default new AuthService();