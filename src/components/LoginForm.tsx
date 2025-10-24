import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, error, loading, isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !password) {
			alert("Please fill in both fields.");
			return;
		}
		try {
			await login(email, password);
			// Optionally, check if login succeeded via isAuthenticated
			// then navigate. Or handle redirect via useEffect.
			navigate("/");
		} catch {
			// Error handled by context, but you can optionally catch here for additional UX
		}
	};

	useEffect(() => {
		if (isAuthenticated) navigate("/");
	}, [isAuthenticated, navigate]);

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col bg-white border border-gray-100 p-8 rounded-2xl items-center space-y-5 shadow-lg max-w-sm w-full mx-auto mt-10"
		>
			<h1 className="text-3xl text-pink-600 font-bold mb-2">Login</h1>
			<div className="w-full flex flex-col space-y-1">
				<label htmlFor="email" className="font-semibold text-gray-800">
					Email
				</label>
				<input
					className="border border-gray-300 p-2 rounded-md focus:border-pink-500 focus:outline-none transition"
					autoComplete="username"
					type="email"
					id="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div className="w-full flex flex-col space-y-1">
				<label
					htmlFor="password"
					className="font-semibold text-gray-800"
				>
					Password
				</label>
				<input
					className="border border-gray-300 p-2 rounded-md focus:border-pink-500 focus:outline-none transition"
					autoComplete="current-password"
					type="password"
					id="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			{error && <div className="text-red-500 w-full">{error}</div>}
			<button
				className="bg-pink-500 py-2 w-full rounded-lg text-white font-semibold hover:bg-pink-600 transition focus:ring-2 focus:ring-pink-200 focus:outline-none"
				type="submit"
				disabled={loading}
			>
				{loading ? "Logging in..." : "Login"}
			</button>
			<p className="text-gray-700 text-sm">
				Don&apos;t have an account?{" "}
				<a
					className="text-pink-600 hover:underline hover:text-pink-800 font-medium"
					href="/register"
				>
					Register
				</a>
			</p>
			<p className="text-gray-700 text-sm">
				<a
					className="text-pink-600 hover:underline hover:text-pink-800 font-medium"
					href="/forgot-password"
				>
					Forgot password?
				</a>
			</p>
		</form>
	);
};

export default LoginForm;
