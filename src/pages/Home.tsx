import mainImage from "../assets/image/main.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const handleStartTest = () => {
		navigate("/dashboard");
	};
	return (
		<div className="bg-blue-50 min-h-screen py-12 px-4 sm:px-8">
			{/* Hero Section */}
			<section className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
				{/* Left content */}
				<div className="text-center md:text-left md:w-1/2 space-y-4">
					<h1 className="text-4xl font-bold text-teal-700 leading-tight">
						Identify<br />And Support<br />Dyslexia Early
					</h1>
					<p className="text-teal-600 text-sm">
						Professional, reliable screening tools to help<br />
						you understand and address dyslexia.
					</p>
					<button onClick={handleStartTest}
					 className="bg-teal-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm shadow">
						START TEST
					</button>
				</div>

				{/* Right image */}
				<div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
					<img
						src={mainImage} // Thay đổi đường dẫn nếu cần
						alt="Kid with dyslexia"
						className="w-64 h-auto"
					/>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="mt-16 text-center">
				<h2 className="text-2xl font-bold text-teal-700 mb-8">
					Benefits From<br />Screening Dyslexia
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{/* Benefit Box 1 */}
					<div className="bg-teal-400 text-white p-6 rounded-3xl shadow-md">
						<h3 className="font-semibold mb-2">EARLY INTERVENTION</h3>
						<p className="text-sm">
							Lorem Ipsum is simply dummy text of<br />
							the printing and typesetting industry.
						</p>
					</div>

					{/* Benefit Box 2 */}
					<div className="bg-teal-500 text-white p-6 rounded-3xl shadow-md">
						<h3 className="font-semibold mb-2">PERSONALIZED TREATMENT</h3>
						<p className="text-sm">
							Lorem Ipsum is simply dummy text of<br />
							the printing and typesetting industry.
						</p>
					</div>

					{/* Benefit Box 3 */}
					<div className="bg-teal-600 text-white p-6 rounded-3xl shadow-md">
						<h3 className="font-semibold mb-2">IMPROVED SELF-ESTEEM</h3>
						<p className="text-sm">
							Lorem Ipsum is simply dummy text of<br />
							the printing and typesetting industry.
						</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
