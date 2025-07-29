import { createContext, useState, useEffect } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import authService from "../services/authService";
import apiClient from "../services/apiClient";

interface User {
	id: number;
	email: string;
	name: string;
	created_at: string;
}

interface LoginResponse {
	access_token: string;
	token_type: string;
	id: number;
}

interface AuthContextType {
	token: string | null;
	user: User | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

interface AuthProviderProps {
	children: React.ReactNode;
}

const TOKEN_KEY = "access_token";

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useState<string | null>(() =>
		localStorage.getItem(TOKEN_KEY)
	);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const validateTokenAndFetchUser = async () => {
			if (token) {
				try {
					const decoded: JwtPayload = jwtDecode(token);
					if (decoded.exp && decoded.exp * 1000 < Date.now()) {
						handleLogout();
					} else {
						await fetchUserProfile();
					}
				} catch (error: any) {
					handleLogout();
				}
			} else {
				setLoading(false);
			}
		};

		validateTokenAndFetchUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const fetchUserProfile = async () => {
		try {
			const response = await apiClient.get<User>("/user/profile");
			setUser(response.data);
		} catch (error: any) {
			handleLogout();
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem(TOKEN_KEY);
		setLoading(false);
	};

	const login = async (email: string, password: string) => {
		setLoading(true);
		setError(null);
		try {
			const data: LoginResponse = await authService.login({
				email,
				password,
			});
			if (data.access_token) {
				localStorage.setItem(TOKEN_KEY, data.access_token);
				setToken(data.access_token);
			} else {
				throw new Error("No access token in login response");
			}
		} catch (err: any) {
			setError(
				err?.response?.data?.message || err.message || "Login failed"
			);
			handleLogout();
		} finally {
			// Loading is set to false in fetchUserProfile's finally block
		}
	};

	const logout = () => {
		authService.logout();
		handleLogout();
	};

	const contextValue: AuthContextType = {
		token,
		user,
		isAuthenticated: !!user,
		loading,
		error,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
