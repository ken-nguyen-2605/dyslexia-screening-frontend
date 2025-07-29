import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuditoryTestStepContextType {
	currentStep: number;
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
	steps: string[];
	goToNextStep: () => void;
}

const AuditoryTestStepContext = createContext<
	AuditoryTestStepContextType | undefined
>(undefined);

export const useAuditoryTestStep = () => {
	const context = useContext(AuditoryTestStepContext);
	if (!context)
		throw new Error(
			"useAuditoryTestStep must be used within an AuditoryTestStepProvider"
		);
	return context;
};

interface AuditoryTestStepProviderProps {
  testType: string;
  testSteps: string[];
	children: React.ReactNode;
}

export const AuditoryTestStepProvider = ({
	testType,
  testSteps,
  children,
}: AuditoryTestStepProviderProps) => {
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
		<AuditoryTestStepContext.Provider
			value={{ currentStep, setCurrentStep, steps, goToNextStep }}
		>
			{children}
		</AuditoryTestStepContext.Provider>
	);
};
