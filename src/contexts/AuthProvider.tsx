import { createContext, useState, useEffect } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";

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

const TOKEN_KEY = "token";

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [token, setToken] = useState<string | null>(() =>
		localStorage.getItem(TOKEN_KEY)
	);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (token) {
			try {
				const decoded: JwtPayload = jwtDecode(token);
				if (decoded.exp && decoded.exp * 1000 < Date.now()) {
					setToken(null);
					setUser(null);
					localStorage.removeItem(TOKEN_KEY);
				} else {
					fetchUserProfile(token);
				}
			} catch (e: any) {
				setUser(null);
			}
		} else {
			setUser(null);
		}
	}, [token]);

	useEffect(() => {
		if (token) {
			localStorage.setItem(TOKEN_KEY, token);
		} else {
			localStorage.removeItem(TOKEN_KEY);
		}
	}, [token]);

	const fetchUserProfile = async (accessToken: string) => {
		try {
			const response = await fetch(
				"http://localhost:8000/v1/user/profile",
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			);
			if (!response.ok) throw new Error("Failed to fetch user profile");
			const profile: User = await response.json();
			setUser(profile);
		} catch (error) {
			setUser(null);
		}
	};

	const login = async (email: string, password: string) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				"http://localhost:8000/v1/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				}
			);

			if (!response.ok) throw new Error("Invalid credentials");

			const data: LoginResponse = await response.json();
			if (data.access_token) {
				setToken(data.access_token);
			} else {
				throw new Error("No token in response");
			}
		} catch (err: any) {
			setError(err.message || "Login failed");
			setToken(null);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem(TOKEN_KEY);
	};

	const contextValue: AuthContextType = {
		token,
		user,
		isAuthenticated: Boolean(token && user),
		loading,
		error,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};
