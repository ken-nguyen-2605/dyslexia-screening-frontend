import { Outlet } from "react-router-dom";
import { TestStepProvider } from "../contexts/TestStepContext";

const LANGUAGE_TEST_STEPS = [
	"instruction",
	"vowels",
	"consonants",
	"letter",
	"remove",
	"add",
	"replace",
];

const LanguageTestLayout = () => (
	<TestStepProvider
		testType="language"
		testSteps={LANGUAGE_TEST_STEPS}
	>
		<div className="flex flex-col items-center w-full min-h-screen py-8">
			<Outlet />
		</div>
	</TestStepProvider>
);

export default LanguageTestLayout;
