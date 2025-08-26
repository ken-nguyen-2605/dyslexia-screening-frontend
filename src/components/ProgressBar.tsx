import { useTestStep } from "../contexts/TestStepContext";

const ProgressBar = () => {
	const { currentStep, steps } = useTestStep();

	// Only use the 8 test steps for progress
	const testSteps = steps.filter(
		(s) => !["instruction", "rating"].includes(s)
	);

	// Which test step am I on? (if not in test, fallback to 0)
	const thisTestStepIdx = testSteps.indexOf(steps[currentStep]);
	const percent =
		thisTestStepIdx >= 0
			? ((thisTestStepIdx + 1) / testSteps.length) * 100
			: 0;

	// Hide on non-test
	if (thisTestStepIdx === -1) return null;

	return (
		<div className="mb-8 mt-4 w-full max-w-[500px] px-4 mx-auto">
			<div className="text-left text-sm font-medium text-gray-800 mb-1">
				Step {thisTestStepIdx + 1} of {testSteps.length}
			</div>
			<div className="h-2 rounded-full bg-gray-200 w-full">
				<div
					className="h-2 rounded-full bg-teal-500 transition-all duration-300"
					style={{ width: `${percent}%` }}
				/>
			</div>
		</div>
	);
};

export default ProgressBar;

