import { useAuditoryTestStep } from "../contexts/AuditoryTestStepContext";
import AuditoryTestInstruction from "./AuditoryTestInstruction";
import AuditoryTest from "./AuditoryTest";
import AudioTestDifficultyRating from "./AudioTestDifficultyRating";
import { useNavigate } from "react-router-dom";

const AuditoryTestStepsDispatcher = () => {
	const { currentStep, steps, setCurrentStep } = useAuditoryTestStep();
	const step = steps[currentStep];
	const navigate = useNavigate();

	// Helper to go to the current step (used on start, and navigation)
	const goTo = (idx: number) => {
		setCurrentStep(idx);
		const s = steps[idx];
		navigate(`/test/auditory/${s}`);
	};

	if (step === "instruction") {
		return (
			<AuditoryTestInstruction
				onStartTest={() => goTo(currentStep + 1)}
			/>
		);
	}

	if (step === "rating") {
		return (
			<AudioTestDifficultyRating
				onSubmit={() => navigate(`/test/visual/instruction`)}
			/>
		);
	}

	return <AuditoryTest />;
};

export default AuditoryTestStepsDispatcher;
