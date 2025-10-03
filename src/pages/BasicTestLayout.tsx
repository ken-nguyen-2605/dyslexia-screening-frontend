import { Outlet } from "react-router-dom";
import { TestStepProvider } from "../contexts/TestStepContext";
import { TestSessionProvider } from "../contexts/TestSessionContext";

const BASIC_TEST_STEPS = [
	"instruction",
	"phonological-awareness/1", // Module 1: Nhận thức âm vị
	"phonological-awareness/2",
	"decoding/1", // Module 2: Nhận diện chữ & giải mã  
	"decoding/2",
	"understanding-fluency/1", // Module 3: Tốc độ hiểu
	"understanding-fluency/2", 
	"spelling-writing/1", // Module 4: Chính tả & viết
	"spelling-writing/2",
	"language-comprehension/1", // Module 5: Hiểu và nhận dạng ngôn ngữ
	"language-comprehension/2",
	"rating",
];

const BasicTestLayout = () => (
	<TestSessionProvider>
		<TestStepProvider testType="basic" testSteps={BASIC_TEST_STEPS}>
			<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-cyan-100">
				<div>
					<Outlet />
				</div>
			</div>
		</TestStepProvider>
	</TestSessionProvider>
);

export default BasicTestLayout;
