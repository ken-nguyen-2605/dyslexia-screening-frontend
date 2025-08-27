import { Outlet } from "react-router-dom";
import { TestStepProvider } from "../contexts/TestStepContext";

const VISUAL_TEST_STEPS = [
	"instruction",
	"symbol/4",
	"symbol/6",
	"z/4",
	"z/6",
	"square/4",
	"square/6",
	"face/4",
	"face/6",
	"rating",
];

const AuditoryTestLayout = () => (
	<TestStepProvider
		testType="visual"
		testSteps={VISUAL_TEST_STEPS}
	>
		<div className="flex flex-col items-center w-full min-h-screen py-8">
			<Outlet />
		</div>
	</TestStepProvider>
);

export default AuditoryTestLayout;
