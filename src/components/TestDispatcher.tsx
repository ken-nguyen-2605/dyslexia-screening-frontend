import AuditoryTestInstruction from "./AuditoryTestInstruction";
import AuditoryTest from "./AuditoryTest";
import VisualTest from "./VisualTest";
import TestDifficultyRating from "./TestDifficultyRating";
import { useNavigate } from "react-router-dom";
import type { TestType } from "../enum";
import { useTestStep } from "../contexts/TestStepContext";
import VisualTestInstruction from "./VisualTestInstruction";
import LanguageTestInstruction from "./LanguageTestInstruction";

interface TestDispatcherProps {
	testType: TestType;
}

const TestDispatcher = ({ testType }: TestDispatcherProps) => {
	const { currentStep, steps, setCurrentStep } = useTestStep();
	const step = steps[currentStep];
	const navigate = useNavigate();

	// Helper to go to the current step (used on start, and navigation)
	const goTo = (idx: number) => {
		setCurrentStep(idx);
		const s = steps[idx];
		navigate(`/test/${testType}/${s}`);
	};

	if (step === "instruction") {
		switch (testType) {
			case "auditory":
				return (
					<AuditoryTestInstruction
						onStartTest={() => goTo(currentStep + 1)}
					/>
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
		}
	}

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
							navigate("/dashboard");
							break;
					}
				}}
			/>
		);
	}

	switch (testType) {
        case "auditory":
            return <AuditoryTest />;
        case "visual":
            return <VisualTest />;
        case "language":
            // return <LanguageTest />; // <-- ensure this component exists
        default:
            return null; // Optionally fallback or show error for unknown type
    }
};

export default TestDispatcher;
