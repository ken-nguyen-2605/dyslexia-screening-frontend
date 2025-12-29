import MiniGame2Instruction from "../../../components/tests/minigame2/MiniGame2Instruction";
import { useTestStep } from "../../../contexts/TestStepContext";

const MiniGame2InstructionPage = () => {
  const { goToNextStep } = useTestStep();

  return <MiniGame2Instruction goToNextStep={goToNextStep} />;
};

export default MiniGame2InstructionPage;
