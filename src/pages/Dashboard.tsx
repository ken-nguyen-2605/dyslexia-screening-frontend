import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { testSessionService } from "../services/testSessionService";
import type { TestSession } from "../types/testSession";

const Dashboard = () => {
	const [sessions, setSessions] = useState<TestSession[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { hasSelectedProfile, selectedProfile } = useAuth();

	useEffect(() => {
		const fetchSessions = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await testSessionService.getAllTestSessions();
				setSessions(data);
			} catch (err: any) {
				setError(err.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		};
		fetchSessions();
	}, [hasSelectedProfile, navigate]);

	const getResultLabel = (result: TestSession["result"]) => {
		if (!result) return "Pending";
		switch (result) {
			case "NON_DYSLEXIC":
				return "Safe";
			case "MAYBE_DYSLEXIC":
				return "Risk";
			case "DYSLEXIC":
				return "Dyslexic";
		}
	};

	const getResultColor = (result: TestSession["result"]) => {
		if (result === "NON_DYSLEXIC") return "text-pink-600 font-bold";
		if (result === "MAYBE_DYSLEXIC") return "text-yellow-500 font-bold";
		if (result === "DYSLEXIC") return "text-red-500 font-bold";
		return "text-gray-500 font-semibold";
	};

	const onStartNewTest = () => {
		const hasInfo =
			selectedProfile &&
			selectedProfile.name &&
			selectedProfile.year_of_birth &&
			selectedProfile.email &&
			selectedProfile.gender &&
			selectedProfile.mother_tongue &&
			selectedProfile.official_dyslexia_diagnosis;
		if (hasInfo) {
			navigate("/test/auditory/");
		} else {
			navigate("/human");
		}
	};

	// Handles starting a specific test type for an existing session
	const startSpecificTest = (
		sessionId: number,
		type: "auditory" | "visual" | "language",
		specificTestId?: number
	) => {
		navigate(`/test/${type}?sessionId=${sessionId}&specificTestId=${specificTestId}`);
	};

	return (
		<div className="min-h-screen bg-gradient-cyan rounded-2xl flex flex-col items-center py-10 px-4">
			<div className="bg-white rounded-2xl p-8 shadow-lg max-w-5xl w-full">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl font-bold text-pink-600">
						My Tests
					</h2>
					<button
						className="bg-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition"
						onClick={onStartNewTest}
					>
						Start New Test
					</button>
				</div>
				{loading ? (
					<div className="text-center text-gray-600 py-10">
						Loading...
					</div>
				) : error ? (
					<div className="text-red-500 text-center py-10">
						{error}
					</div>
				) : sessions.length === 0 ? (
					<div className="text-gray-600 text-center py-10">
						No test sessions found. Start your first test!
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full border-collapse">
							<thead>
								<tr className="bg-pink-50">
									<th className="py-2 px-4 text-left font-semibold">
										#
									</th>
									<th className="py-2 px-4 text-left font-semibold">
										Date
									</th>
									<th className="py-2 px-4 text-left font-semibold">
										Score
									</th>
									<th className="py-2 px-4 text-left font-semibold">
										Result
									</th>
									<th className="py-2 px-4 text-left font-semibold">
										Completed
									</th>
									<th className="py-2 px-4 text-left font-semibold">
										Tests Taken / Actions
									</th>
									<th className="py-2 px-4 text-left font-semibold">
										View
									</th>
								</tr>
							</thead>
							<tbody>
								{sessions.map((session, idx) => {
									const resultLabel = getResultLabel(
										session.result
									);
									return (
										<tr
											key={session.id}
											className={
												idx % 2 === 0
													? "bg-gray-50"
													: "bg-white"
											}
										>
											<td className="py-2 px-4 font-bold">
												{idx + 1}
											</td>
											<td className="py-2 px-4">
												{new Date(
													session.start_time
												).toLocaleDateString("en-GB", {
													year: "numeric",
													month: "short",
													day: "numeric",
												})}
											</td>
											<td className="py-2 px-4">
												{session.score !== null
													? session.score
													: "--"}
											</td>
											<td
												className={`py-2 px-4 ${getResultColor(
													session.result
												)}`}
											>
												{resultLabel}
											</td>
											<td className="py-2 px-4">
												{session.completed
													? "Yes"
													: "No"}
											</td>
											<td className="py-2 px-4 space-x-2">
												{/* Show buttons for incomplete tests */}
												{session.taken_auditory_test ? (
													<span className="text-gray-600">
														Auditory ✅
													</span>
												) : (
													<button
														key={session.auditory_test?.id}
														className="bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
														onClick={() =>
															startSpecificTest(
																session.id,
																"auditory",
																session.auditory_test?.id
															)
														}
													>
														Start Auditory
													</button>
												)}
												{session.taken_visual_test ? (
													<span className="text-gray-600">
														Visual ✅
													</span>
												) : (
													<button
														key={session.visual_test?.id}
														className="bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
														onClick={() =>
															startSpecificTest(
																session.id,
																"visual",
																session.visual_test?.id
															)
														}
													>
														Start Visual
													</button>
												)}
												{session.taken_language_test ? (
													<span className="text-gray-600">
														Language ✅
													</span>
												) : (
													<button
														key={session.language_test?.id}
														className="bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200"
														onClick={() =>
															startSpecificTest(
																session.id,
																"language",
																session.language_test?.id
															)
														}
													>
														Start Language
													</button>
												)}
											</td>
											<td className="py-2 px-4">
												<button
													className="text-pink-600 hover:underline hover:text-pink-800 font-medium"
													onClick={() =>
														navigate(
															`/test-session/${session.id}`
														)
													}
												>
													View
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
