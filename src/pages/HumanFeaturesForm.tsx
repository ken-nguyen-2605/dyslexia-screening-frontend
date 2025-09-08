import { useState } from "react";
import { useNavigate } from "react-router-dom";
import testSessionService from "../services/testSessionService";

const HumanFeaturesForm = () => {
	const [form, setForm] = useState({
		name: "",
		year: "",
		gender: "",
		hobby: "",
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
			!form.year ||
			!form.gender ||
			!form.hobby
		) {
			setFormError("Hãy nhập đầy đủ thông tin.");
			return;
		}
		if (isNaN(Number(form.year)) || Number(form.year) < 0) {
			setFormError("Vui lòng nhập năm sinh hợp lệ.");
			return;
		}
		// add any other validation as needed

		// Simulate next step, or API call etc.
		setFormError(null);
		console.log("Form submitted:", form);
		const data = testSessionService.startTestSession({
			info: {
				age: Number(form.year),
				gender: form.gender,
				native_language: "vietnamese",
				rl_dyslexia: true,
			},
		});
		if (!data) {
			setFormError("Failed to start test session. Please try again.");
			return;
		}
		navigate("/test/selection");
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
				
				{/* Year of birth */}
<div className="w-full flex flex-col space-y-1">
  <label className="font-semibold text-pink-600 text-lg font-[Comic Sans MS,cursive,sans-serif]">
    Năm sinh
  </label>
  <input
    className="border-2 border-yellow-200 rounded-xl p-3 font-medium focus:border-pink-400 focus:outline-none transition bg-white/70"
    type="text"
    name="year"
    placeholder="Nhập năm sinh của bạn"
    value={form.year}
    onChange={handleChange}
    autoComplete="off"
    inputMode="numeric" // mobile users will see the numeric keyboard
    pattern="\d*"       // hint for numeric input, doesn't enforce on its own
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
				{/* Hobby */}
				<div className="w-full flex flex-col space-y-1">
					<label className="font-semibold text-pink-600 text-lg font-[Comic Sans MS,cursive,sans-serif]">
						Sở thích
					</label>
					<input
						className="border-2 border-yellow-200 rounded-xl p-3 font-medium focus:border-pink-400 focus:outline-none transition bg-white/70"
						type="text"
						name="hobby"
						placeholder="Nhập sở thích của bạn"
						value={form.hobby}
						onChange={handleChange}
					/>
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
