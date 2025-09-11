import { createContext, useState, useEffect } from "react";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import authService from "../services/authService";
import accountService from "../services/accountService";
import type { ProfileSchema, Token } from "../types";

interface AuthContextType {
	token: string | null;
	user: ProfileSchema | null;
	profiles: ProfileSchema[];
	isAuthenticated: boolean;
	hasProfiles: boolean;
	loading: boolean;
	error: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	selectProfile: (profileId: number) => Promise<void>;
	createProfile: (profileData: { profile_type: "PARENT" | "CHILD"; name: string }) => Promise<void>;
	refreshProfiles: () => Promise<void>;
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
	const [user, setUser] = useState<ProfileSchema | null>(null);
	const [profiles, setProfiles] = useState<ProfileSchema[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const validateTokenAndLoadData = async () => {
			if (token) {
				try {
					const decoded: JwtPayload = jwtDecode(token);
					if (decoded.exp && decoded.exp * 1000 < Date.now()) {
						handleLogout();
					} else {
						await loadUserData();
					}
				} catch (error: any) {
					handleLogout();
				}
			} else {
				setLoading(false);
			}
		};

		validateTokenAndLoadData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const loadUserData = async () => {
		try {
			// First try to get profiles (this works with account token)
			const userProfiles = await accountService.getProfiles();
			setProfiles(userProfiles);
			
			// If we have profiles, we might need to select one or get current profile
			// For now, we'll leave user as null until profile is selected
			setUser(null);
		} catch (error: any) {
			// If we can't get profiles, might be an old profile token
			// Try to clear and force re-login
			handleLogout();
		} finally {
			setLoading(false);
		}
	};

	const refreshProfiles = async () => {
		try {
			const userProfiles = await accountService.getProfiles();
			setProfiles(userProfiles);
		} catch (error: any) {
			setError(error.message || "Failed to load profiles");
		}
	};

	const handleLogout = () => {
		setToken(null);
		setUser(null);
		setProfiles([]);
		localStorage.removeItem(TOKEN_KEY);
		setLoading(false);
	};

	const login = async (email: string, password: string) => {
		setLoading(true);
		setError(null);
		try {
			const data: Token = await authService.login({
				email,
				password,
			});
			if (data.access_token) {
				localStorage.setItem(TOKEN_KEY, data.access_token);
				setToken(data.access_token);
				// After login, we'll load the profiles in the useEffect
			} else {
				throw new Error("No access token in login response");
			}
		} catch (err: any) {
			setError(
				err?.response?.data?.message || err.message || "Login failed"
			);
			handleLogout();
		} finally {
			// Loading will be set to false in loadUserData
		}
	};

	const selectProfile = async (profileId: number) => {
		setLoading(true);
		setError(null);
		try {
			const data: Token = await accountService.selectProfile(profileId);
			if (data.access_token) {
				localStorage.setItem(TOKEN_KEY, data.access_token);
				setToken(data.access_token);
				// Find and set the selected profile
				const selectedProfile = profiles.find(p => p.id === profileId);
				if (selectedProfile) {
					setUser(selectedProfile);
				}
			} else {
				throw new Error("No access token in profile selection response");
			}
		} catch (err: any) {
			setError(
				err?.response?.data?.message || err.message || "Profile selection failed"
			);
		} finally {
			setLoading(false);
		}
	};

	const createProfile = async (profileData: { profile_type: "PARENT" | "CHILD"; name: string }) => {
		setLoading(true);
		setError(null);
		try {
			const newProfile = await accountService.createProfile(profileData);
			setProfiles(prev => [...prev, newProfile]);
		} catch (err: any) {
			setError(
				err?.response?.data?.message || err.message || "Profile creation failed"
			);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		authService.logout();
		handleLogout();
	};

	const contextValue: AuthContextType = {
		token,
		user,
		profiles,
		isAuthenticated: !!user,
		hasProfiles: profiles.length > 0,
		loading,
		error,
		login,
		logout,
		selectProfile,
		createProfile,
		refreshProfiles,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
