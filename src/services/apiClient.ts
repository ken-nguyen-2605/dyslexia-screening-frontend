import axios from "axios";
import type {
	InternalAxiosRequestConfig,
	AxiosInstance,
	AxiosResponse,
} from "axios";

const API_BASE_URL: string =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/v1";

const API_TIMEOUT: number = parseInt(import.meta.env.VITE_API_TIMEOUT) || 5000;

const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: API_TIMEOUT,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const profileToken = localStorage.getItem("profile_token");
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = profileToken
      ? `Bearer ${profileToken}`
      : token
      ? `Bearer ${token}`
      : "";
    return config;
  },
  (error: any) => Promise.reject(error)
);

apiClient.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => response.data,
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
