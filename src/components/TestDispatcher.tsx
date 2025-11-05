import VisualTestInstruction from "./VisualTestInstruction";
import VisualTest from "./VisualTest";
import LanguageTestInstruction from "./LanguageTestInstruction";
// import LanguageTest from "./LanguageTest";
import Minigame2Instruction from "./MiniGame2Instruction";
import MiniGame2 from "./MiniGame2";
import TestDifficultyRating from "./TestDifficultyRating";
import { useNavigate } from "react-router-dom";
import type { TestType } from "../enum";
import { useTestStep } from "../contexts/TestStepContext";

// === MiniGame1 (Spelling Bee) ===
import MG1Instruction from "./minigame1/Instruction";
import MiniGame1 from "./minigame1/MiniGame1";

interface TestDispatcherProps {
  testType: TestType; // "auditory" | "visual" | "language" | "minigame1" | "minigame2"
}

const TestDispatcher = ({ testType }: TestDispatcherProps) => {
  const { currentStep, steps, setCurrentStep } = useTestStep();
  const step = steps[currentStep];
  const navigate = useNavigate();

  // Điều hướng tới step bất kỳ
  const goTo = (idx: number) => {
    setCurrentStep(idx);
    const s = steps[idx];
    navigate(`/test/${testType}/${s}`);
  };

  // ===== Instruction screens =====
  if (step === "instruction") {
    switch (testType) {
      case "auditory":
        // TODO: thay bằng <AuditoryTestInstruction /> khi có
        return <div />;
      case "visual":
        return <VisualTestInstruction onStartTest={() => goTo(currentStep + 1)} />;
      case "language":
        return <LanguageTestInstruction onStartTest={() => goTo(currentStep + 1)} />;
      case "minigame1":
        // MG1Instruction KHÔNG nhận prop; bản thân component tự gọi goToNextStep() bằng context
        return <MG1Instruction />;
      case "minigame2":
        return <Minigame2Instruction goToNextStep={() => goTo(currentStep + 1)} />;
      default:
        return null;
    }
  }

  // ===== Rating screen dùng chung =====
  if (step === "rating") {
    return (
      <TestDifficultyRating
        testType={testType}
        onSubmit={() => {
          switch (testType) {
            case "auditory":
              navigate("/test/visual/instruction");
              break;
            case "visual":
              navigate("/test/language/instruction");
              break;
            case "language":
              navigate("/test/minigame1/instruction");
              break;
            case "minigame1":
              navigate("/test/minigame2/instruction");
              break;
            case "minigame2":
              navigate("/dashboard");
              break;
            default:
              navigate("/");
          }
        }}
      />
    );
  }

  // ===== Start / main screens =====
  switch (testType) {
    case "auditory":
      // TODO: thay bằng <AuditoryTest /> khi có
      return <div />;
    case "visual":
      return <VisualTest />;
    // case "language":
    //   return <LanguageTest />;
    case "minigame1":
      return <MiniGame1 />;
    case "minigame2":
      return <MiniGame2 />;
    default:
      return null;
  }
};

export default TestDispatcher;
