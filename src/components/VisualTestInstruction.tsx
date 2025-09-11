// VisualTestInstruction.tsx
import { useTestSession } from "../contexts/TestSessionContext";

interface VisualTestInstructionProps {
  onStartTest: () => void;
}

const VisualTestInstruction = ({ onStartTest }: VisualTestInstructionProps) => {
  const { startSession, isLoading, error } = useTestSession();

  const handleStartTest = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = await startSession("ADVANCED");
    if (session) {
      onStartTest();
    }
  };

  return (
    <form
      className="flex flex-col bg-white border border-gray-100 p-8 rounded-2xl items-center space-y-4 shadow-lg max-w-md w-full mx-auto mt-10"
      onSubmit={handleStartTest}
    >
      <h2 className="text-2xl text-indigo-600 font-bold text-center mb-1">
        Visual Test Instruction
      </h2>
      <div className="text-indigo-600 font-medium mb-2 text-center text-lg">
        In this visual memory test, your goal is to click the target image as many times as you can in 15 seconds.
      </div>
      <ul className="list-disc list-inside text-gray-700 text-left mb-2">
        <li>First, you'll see the "target" (memorize it).</li>
        <li>Then, 4 or 6 images appear – pick the target as fast as possible!</li>
        <li>Wrong answers don't count, but the grid will shuffle.</li>
        <li>How many do you get right in 15 seconds?</li>
      </ul>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded w-full">
          <p className="text-sm text-red-800">
            <strong>Error:</strong> {error}
          </p>
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-indigo-500 py-2 w-full rounded-lg text-white font-semibold hover:bg-indigo-600 transition focus:ring-2 focus:ring-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Starting..." : "Start Visual Test"}
      </button>
    </form>
  );
};

export default VisualTestInstruction;