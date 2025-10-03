import axios from "axios";
import type {
	InternalAxiosRequestConfig,
	AxiosInstance,
	AxiosResponse,
} from "axios";

const API_BASE_URL: string =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: any) => Promise.reject(error)
);

apiClient.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => response,
	(error: any) => {
		if (error.response && error.response.status === 401) {
			console.error("UNAUTHORIZED, REDIRECTING...");
			// Optionally clear storage, redirect, or dispatch a global logout event.
			// localStorage.clear();
			// window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

export default apiClient;
