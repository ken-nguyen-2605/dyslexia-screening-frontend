import { Outlet } from "react-router-dom";
import { TestStepProvider } from "../contexts/TestStepContext";

// Define steps for MiniGame5: Find Matching Letters
const MINIGAME5_STEPS: string[] = ["instruction", "start", "rating"];

const MiniGame5Layout = () => {
  return (
    <TestStepProvider testType="minigame5" testSteps={MINIGAME5_STEPS}>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-cyan-50">
        <Outlet />
      </div>
    </TestStepProvider>
  );
};

export default MiniGame5Layout;
