import { Outlet } from "react-router-dom";
import { TestStepProvider } from "../contexts/TestStepContext";

const VISUAL_TEST_STEPS = [
	"instruction",
	"simple/1",
	"simple/2",
	"simple/3",
	"simple/4",
	"hard/5",
	"hard/6",
	"hard/7",
	"hard/8",
	"rating",
];

const VisualTestLayout = () => (
	<TestStepProvider testType="visual" testSteps={VISUAL_TEST_STEPS}>
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-cyan-100">
			<div>
				<Outlet />
			</div>
		</div>
	</TestStepProvider>
);

export default VisualTestLayout;
