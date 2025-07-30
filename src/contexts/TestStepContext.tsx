import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface TestStepContextType {
	currentStep: number;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
	steps: string[];
	goToNextStep: () => void;
}

const TestStepContext = createContext<
	TestStepContextType | undefined
>(undefined);

export const useTestStep = () => {
	const context = useContext(TestStepContext);
	if (!context)
		throw new Error(
			"useTestStep must be used within a TestStepProvider"
		);
	return context;
};

interface TestStepProviderProps {
  testType: string;
  testSteps: string[];
	children: React.ReactNode;
}

export const TestStepProvider = ({
	testType,
  testSteps,
  children,
}: TestStepProviderProps) => {
	const [currentStep, setCurrentStep] = useState(0);
	const steps = testSteps;
	const location = useLocation();
	const navigate = useNavigate();

	const goToNextStep = () => {
		if (currentStep < steps.length - 1) {
			navigate(`/test/${testType}/${steps[currentStep + 1]}`);
		}
	};

	useEffect(() => {
		const path = location.pathname
			.replace(`/test/${testType}/`, "")
			.replace(/^\//, "");
		const idx = steps.findIndex((s) => s === path);
		if (idx !== -1 && idx !== currentStep) {
			setCurrentStep(idx);
		}
	}, [location.pathname, steps, currentStep, testType]);

	return (
		<TestStepContext.Provider
			value={{ currentStep, setCurrentStep, steps, goToNextStep }}
		>
			{children}
		</TestStepContext.Provider>
	);
};
