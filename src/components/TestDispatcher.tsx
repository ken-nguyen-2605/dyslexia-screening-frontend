import VisualTestInstruction from "./VisualTestInstruction";
import VisualTest from "./VisualTest";
import LanguageTestInstruction from "./LanguageTestInstruction";
//import LanguageTest from "./LanguageTest";

// 🚀 IMPORTS MỚI CHO MINIGAME 2
import Minigame2Instruction from "./MiniGame2Instruction";
import MiniGame2 from "./MiniGame2";

import TestDifficultyRating from "./TestDifficultyRating";

import { useNavigate } from "react-router-dom";
import type { TestType } from "../enum"; // Giả sử TestType đã được cập nhật
import { useTestStep } from "../contexts/TestStepContext";

interface TestDispatcherProps {
	testType: TestType;
}

const TestDispatcher = ({ testType }: TestDispatcherProps) => {
	const { currentStep, steps, setCurrentStep } = useTestStep();
	const step = steps[currentStep];
	const navigate = useNavigate();

	// Điều hướng tới step kế tiếp hoặc bất kỳ step nào
	const goTo = (idx: number) => {
		setCurrentStep(idx);
		const s = steps[idx];
		navigate(`/test/${testType}/${s}`);
	};

	// Xử lý Instruction
	if (step === "instruction") {
		switch (testType) {
			case "auditory":
				return (
					// <AuditoryTestInstruction/>
					<div></div>
				);
			case "visual":
				return (
					<VisualTestInstruction
						onStartTest={() => goTo(currentStep + 1)}
					/>
				);
			case "language":
				return (
					<LanguageTestInstruction
						onStartTest={() => goTo(currentStep + 1)}
					/>
				);
			// 🚀 LOGIC MỚI CHO MINIGAME 2
			case "minigame2":
				return (
					<Minigame2Instruction
						goToNextStep={() => goTo(currentStep + 1)}
					/>
				);
		}
	}

	// Xử lý Rating
	if (step === "rating") {
		return (
			<TestDifficultyRating
				testType={testType}
				onSubmit={() => {
					switch (testType) {
						case "auditory":
							navigate("/test/visual/instruction");
							break;
						case "visual":
							navigate("/test/language/instruction");
							break;
						case "language":
                            // Ví dụ: Sau LanguageTest chuyển sang Minigame 2
							navigate("/test/minigame2/instruction"); 
							break;
						// 🚀 LOGIC MỚI CHO MINIGAME 2
						case "minigame2":
							navigate("/dashboard");
							break;
					}
				}}
			/>
		);
	}

	// Xử lý phần Test chính
	switch (testType) {
		case "auditory":
			return <div></div>;
		case "visual":
			return <VisualTest />;
		//case "language":
		//return <LanguageTest />;
		// 🚀 LOGIC MỚI CHO MINIGAME 2
		case "minigame2":
			return <MiniGame2 />;
		default:
			return null;
	}
};

export default TestDispatcher;