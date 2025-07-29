import { useState } from "react";
import { useNavigate } from "react-router-dom";
import testSessionService from "../services/testSessionService";

const HumanFeaturesForm = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		age: "",
		gender: "",
		native_language: "",
		rl_dyslexia: "",
	});

	const [formError, setFormError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("Input changed:", e.target.name, e.target.value);
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
		setFormError(null); // clear error on any change
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validation (expand as needed)
		if (
			!form.name ||
			!form.email ||
			!form.age ||
			!form.gender ||
			!form.native_language ||
			!form.rl_dyslexia
		) {
			setFormError("Please fill in all fields.");
			return;
		}
		if (isNaN(Number(form.age)) || Number(form.age) < 0) {
			setFormError("Please enter a valid age.");
			return;
		}
		// add any other validation as needed

		// Simulate next step, or API call etc.
		setFormError(null);
		console.log("Form submitted:", form);
		const data = testSessionService.startTestSession({
			info: {
				age: Number(form.age),
				gender: form.gender,
				native_language: form.native_language,
				rl_dyslexia: form.rl_dyslexia === "yes",
			},
		});
		if (!data) {
			setFormError("Failed to start test session. Please try again.");
			return;
		}
		navigate("/test/auditory/instruction");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col bg-white border border-gray-100 p-8 rounded-2xl items-center space-y-5 shadow-lg max-w-md w-full mx-auto mt-10"
		>
			<h2 className="text-2xl text-teal-600 font-bold mb-1 text-center">
				Information
			</h2>
			<div className="text-teal-600 font-medium mb-2 text-center text-lg">
				Step 1 of 4:{" "}
				<span className="text-gray-700 font-normal">
					Human features
				</span>
			</div>
			<div className="w-full h-1.5 bg-teal-100 rounded-full mb-4">
				<div
					className="bg-teal-400 h-1.5 rounded-full transition-all"
					style={{ width: "25%" }}
				/>
			</div>

			{/* Error Message */}
			{formError && (
				<div className="w-full bg-red-100 border border-red-300 text-red-700 px-4 py-2 mb-2 rounded text-sm text-center">
					{formError}
				</div>
			)}

			{/* Name */}
			<div className="w-full flex flex-col space-y-1">
				<label className="font-semibold text-gray-800">Name</label>
				<input
					className="border border-gray-300 p-2 rounded-md focus:border-teal-500 focus:outline-none transition"
					type="text"
					name="name"
					placeholder="Enter your name"
					value={form.name}
					onChange={handleChange}
				/>
			</div>
			{/* Email */}
			<div className="w-full flex flex-col space-y-1">
				<label className="font-semibold text-gray-800">Email</label>
				<input
					className="border border-gray-300 p-2 rounded-md focus:border-teal-500 focus:outline-none transition"
					type="email"
					name="email"
					placeholder="Enter your email"
					value={form.email}
					onChange={handleChange}
				/>
			</div>
			{/* Age */}
			<div className="w-full flex flex-col space-y-1">
				<label className="font-semibold text-gray-800">Age</label>
				<input
					className="border border-gray-300 p-2 rounded-md focus:border-teal-500 focus:outline-none transition"
					type="number"
					name="age"
					min={0}
					placeholder="Enter your age"
					value={form.age}
					onChange={handleChange}
				/>
			</div>
			{/* Gender */}
			<div className="w-full flex flex-col space-y-1">
				<label className="font-semibold text-gray-800">Gender</label>
				<div className="flex gap-8 mt-1">
					<label className="flex items-center font-normal">
						<input
							type="radio"
							name="gender"
							value="MALE"
							checked={form.gender === "MALE"}
							onChange={handleChange}
							className="mr-1"
						/>
						Male
					</label>
					<label className="flex items-center font-normal">
						<input
							type="radio"
							name="gender"
							value="FEMALE"
							checked={form.gender === "FEMALE"}
							onChange={handleChange}
							className="mr-1"
						/>
						Female
					</label>
				</div>
			</div>
			{/* Native Language */}
			<div className="w-full flex flex-col space-y-1">
				<label className="font-semibold text-gray-800">
					Native Language
				</label>
				<input
					className="border border-gray-300 p-2 rounded-md focus:border-teal-500 focus:outline-none transition"
					type="text"
					name="native_language"
					placeholder="Enter your native language"
					value={form.native_language}
					onChange={handleChange}
				/>
			</div>
			{/* Diagnosed as dyslexic */}
			<div className="w-full flex flex-col space-y-1">
				<label className="font-semibold text-gray-800">
					Diagnosed as dyslexic?
				</label>
				<div className="flex gap-6 mt-1 flex-wrap">
					<label className="flex items-center font-normal">
						<input
							type="radio"
							name="rl_dyslexia"
							value="yes"
							checked={form.rl_dyslexia === "yes"}
							onChange={handleChange}
							className="mr-1"
						/>
						Yes
					</label>
					<label className="flex items-center font-normal">
						<input
							type="radio"
							name="rl_dyslexia"
							value="no"
							checked={form.rl_dyslexia === "no"}
							onChange={handleChange}
							className="mr-1"
						/>
						No
					</label>
					<label className="flex items-center font-normal">
						<input
							type="radio"
							name="rl_dyslexia"
							value="unknown"
							checked={form.rl_dyslexia === "unknown"}
							onChange={handleChange}
							className="mr-1"
						/>
						Has not undergone assessment
					</label>
				</div>
			</div>

			<button
				type="submit"
				className="bg-teal-500 py-2 w-full rounded-lg text-white font-semibold hover:bg-teal-600 transition focus:ring-2 focus:ring-teal-200 focus:outline-none"
			>
				Start
			</button>
		</form>
	);
};

export default HumanFeaturesForm;
