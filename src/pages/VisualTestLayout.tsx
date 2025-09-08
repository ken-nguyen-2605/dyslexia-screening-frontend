import { Outlet } from "react-router-dom";
import { TestStepProvider } from "../contexts/TestStepContext";

const VISUAL_TEST_STEPS = [
    "instruction",
    "simple/1",
    "simple/2", 
    "simple/3",
    "simple/4",
    "complex/5",
    "complex/6",
    "complex/7", 
    "complex/8",
    "rating",
];

const VisualTestLayout = () => (
	<TestStepProvider testType="visual" testSteps={VISUAL_TEST_STEPS}>
		<div className="flex flex-col items-center w-full min-h-screen py-8">
			<Outlet />
		</div>
	</TestStepProvider>
);

export default VisualTestLayout;