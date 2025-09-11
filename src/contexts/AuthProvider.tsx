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
			
			// Try to decode token to see if it contains profile info
			if (token) {
				try {
					const decoded: any = jwtDecode(token);
					if (decoded.profile_id) {
						// This is a profile token, find the matching profile
						const currentProfile = userProfiles.find(p => p.id === decoded.profile_id);
						if (currentProfile) {
							setUser(currentProfile);
						}
					}
					// If no profile_id in token, it might be an account token - leave user as null for profile selection
				} catch (decodeError) {
					console.warn("Could not decode token for profile info");
				}
			}
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
		console.log("🔄 Starting profile selection for ID:", profileId);
		setLoading(true);
		setError(null);
		try {
			console.log("📡 Calling API to select profile...");
			const data: Token = await accountService.selectProfile(profileId);
			console.log("✅ API response received:", data);
			
			if (data.access_token) {
				localStorage.setItem(TOKEN_KEY, data.access_token);
				setToken(data.access_token);
				
				console.log("🔍 Decoding new token...");
				// Decode the new token to get user info
				const decoded: any = jwtDecode(data.access_token);
				console.log("📋 Token decoded:", decoded);
				
				// Find the selected profile from our profiles list
				const selectedProfile = profiles.find(p => p.id === profileId);
				console.log("👤 Found profile:", selectedProfile);
				
				if (selectedProfile) {
					// Update the selected profile with any additional data from token if needed
					const updatedUser = {
						...selectedProfile,
						// Add any additional fields from the token if available
						...(decoded.profile || {})
					};
					console.log("✨ Setting user to:", updatedUser);
					setUser(updatedUser);
				}
				
				// Refresh profiles to get latest data
				console.log("🔄 Refreshing profiles...");
				await refreshProfiles();
				console.log("✅ Profile selection completed successfully");
			} else {
				throw new Error("No access token in profile selection response");
			}
		} catch (err: any) {
			console.error("❌ Profile selection failed:", err);
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
