import { Outlet } from "react-router-dom";
import { TestStepProvider } from "../contexts/TestStepContext";

const AUDITORY_TEST_STEPS = [
	"instruction",
	"frequency/4",
	"frequency/6",
	"length/4",
	"length/6",
	"rise/4",
	"rise/6",
	"rhythm/4",
	"rhythm/6",
	"rating",
];

const AuditoryTestLayout = () => (
	<TestStepProvider
		testType="auditory"
		testSteps={AUDITORY_TEST_STEPS}
	>
		<div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-cyan-100 py-14 px-4 sm:px-8 min-h-screen rounded-[1.5rem] flex items-center justify-center font-[Comic Sans MS,cursive,sans-serif]">
			<Outlet />
		</div>
	</TestStepProvider>
);

export default AuditoryTestLayout;
