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
			setFormError("Hãy nhập đầy đủ thông tin.");
			return;
		}
		if (isNaN(Number(form.age)) || Number(form.age) < 0) {
			setFormError("Vui lòng nhập số tuổi hợp lệ.");
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
		<div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-cyan-100 py-14 px-4 sm:px-8 min-h-screen rounded-[1.5rem] flex items-center justify-center">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-white/90 border-4 border-pink-200 p-10 rounded-[2em] items-center space-y-7 shadow-xl max-w-lg w-full mx-auto"
			>
				{/* Heading */}
				<h2 className="text-3xl text-pink-600 font-bold text-center mb-1 drop-shadow font-[Comic Sans MS,cursive,sans-serif]">
					Chia sẻ một chút nhé!
				</h2>
				<div className="text-pink-500 font-semibold mb-2 text-center text-lg font-[Comic Sans MS,cursive,sans-serif]">
					Bước 1 / 4:{" "}
					<span className="text-gray-700 font-normal">
						Thông tin của bạn
					</span>
				</div>
				<div className="w-full h-2 bg-pink-100 rounded-full mb-4">
					<div
						className="bg-pink-400 h-2 rounded-full transition-all"
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
					<label className="font-semibold text-pink-600 text-lg font-[Comic Sans MS,cursive,sans-serif]">
						Tên
					</label>
					<input
						className="border-2 border-yellow-200 rounded-xl p-3 font-medium focus:border-pink-400 focus:outline-none transition bg-white/70"
						type="text"
						name="name"
						placeholder="Nhập tên của bạn"
						value={form.name}
						onChange={handleChange}
					/>
				</div>

				{/* Email */}
				<div className="w-full flex flex-col space-y-1">
					<label className="font-semibold text-pink-600 text-lg font-[Comic Sans MS,cursive,sans-serif]">
						Email
					</label>
					<input
						className="border-2 border-yellow-200 rounded-xl p-3 font-medium focus:border-pink-400 focus:outline-none transition bg-white/70"
						type="email"
						name="email"
						placeholder="Nhập email của bạn"
						value={form.email}
						onChange={handleChange}
					/>
				</div>

				{/* Age */}
				<div className="w-full flex flex-col space-y-1">
					<label className="font-semibold text-pink-600 text-lg font-[Comic Sans MS,cursive,sans-serif]">
						Tuổi
					</label>
					<input
						className="border-2 border-yellow-200 rounded-xl p-3 font-medium focus:border-pink-400 focus:outline-none transition bg-white/70"
						type="text"
						name="age"
						placeholder="Nhập tuổi của bạn"
						value={form.age}
						onChange={handleChange}
						autoComplete="off"
						inputMode="numeric" // mobile users will see the numeric keyboard
						pattern="\d*" // hint for numeric input, doesn't enforce on its own
					/>
				</div>
				{/* Gender */}
				<div className="w-full flex flex-col space-y-1">
					<label className="font-semibold text-pink-600 text-lg font-[Comic Sans MS,cursive,sans-serif]">
						Giới tính
					</label>
					<div className="flex gap-10 mt-2">
						<label className="flex items-center font-semibold text-pink-600">
							<input
								type="radio"
								name="gender"
								value="MALE"
								checked={form.gender === "MALE"}
								onChange={handleChange}
								className="mr-2 accent-pink-500 bg-white w-5 h-5"
							/>
							Nam
						</label>
						<label className="flex items-center font-semibold text-pink-600">
							<input
								type="radio"
								name="gender"
								value="FEMALE"
								checked={form.gender === "FEMALE"}
								onChange={handleChange}
								className="mr-2 accent-pink-500 bg-white w-5 h-5"
							/>
							Nữ
						</label>
					</div>
				</div>

				{/* Native Language */}
				<div className="w-full flex flex-col space-y-1">
					<label className="font-semibold text-pink-600 text-lg font-[Comic Sans MS,cursive,sans-serif]">
						Ngôn ngữ mẹ đẻ
					</label>
					<input
						className="border-2 border-yellow-200 rounded-xl p-3 font-medium focus:border-pink-400 focus:outline-none transition bg-white/70"
						type="text"
						name="native_language"
						placeholder="Nhập ngôn ngữ mẹ đẻ của bạn"
						value={form.native_language}
						onChange={handleChange}
						autoComplete="off"
					/>
				</div>

				{/* Diagnosed as dyslexic */}
				<div className="w-full flex flex-col space-y-1">
					<label className="font-semibold text-pink-600 text-lg font-[Comic Sans MS,cursive,sans-serif]">
						Bạn đã từng được chẩn đoán là khó đọc chưa?
					</label>
					<div className="flex gap-6 mt-2 flex-wrap">
						<label className="flex items-center font-semibold text-pink-600">
							<input
								type="radio"
								name="rl_dyslexia"
								value="yes"
								checked={form.rl_dyslexia === "yes"}
								onChange={handleChange}
								className="mr-2 accent-pink-500 bg-white w-5 h-5"
							/>
							Có
						</label>
						<label className="flex items-center font-semibold text-pink-600">
							<input
								type="radio"
								name="rl_dyslexia"
								value="no"
								checked={form.rl_dyslexia === "no"}
								onChange={handleChange}
								className="mr-2 accent-pink-500 bg-white w-5 h-5"
							/>
							Không
						</label>
						<label className="flex items-center font-semibold text-pink-600">
							<input
								type="radio"
								name="rl_dyslexia"
								value="unknown"
								checked={form.rl_dyslexia === "unknown"}
								onChange={handleChange}
								className="mr-2 accent-pink-500 bg-white w-5 h-5"
							/>
							Chưa từng kiểm tra / Không rõ
						</label>
					</div>
				</div>

				{/* Button */}
				<button
					type="submit"
					className="bg-yellow-300 hover:bg-yellow-400 text-pink-700 px-12 py-3 rounded-full text-xl font-bold shadow-lg border-2 border-pink-200 transition-all duration-200 focus:ring focus:ring-yellow-100 active:scale-95 font-[Comic Sans MS,cursive,sans-serif] mt-3"
				>
					Bắt đầu
				</button>
			</form>
		</div>
	);
};

export default HumanFeaturesForm;
