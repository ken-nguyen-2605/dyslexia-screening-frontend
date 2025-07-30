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
		<div className="flex flex-col items-center w-full min-h-screen py-8">
			<Outlet />
		</div>
	</TestStepProvider>
);

export default AuditoryTestLayout;
