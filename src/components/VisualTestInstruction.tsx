import type { FormEvent } from "react";

interface VisualTestInstructionProps {
  onStartTest: () => void;
}

const VisualTestInstruction = ({ onStartTest }: VisualTestInstructionProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onStartTest();
  };

  return (
    <form
      className="flex flex-col bg-white border border-gray-100 p-8 rounded-2xl items-center space-y-4 shadow-lg max-w-md w-full mx-auto mt-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-teal-600 font-bold text-center mb-1">
        Visual Test Instruction
      </h2>

      <div className="text-teal-600 font-medium mb-2 text-center text-lg">
        Step 3 of 4: <span className="text-gray-700 font-normal">Visual features</span>
      </div>
      <div className="w-full h-1.5 bg-teal-100 rounded-full mb-4">
        <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: "75%" }} />
      </div>

      <div className="flex flex-col items-center">
        <div className="my-2">
          <span className="inline-block bg-teal-50 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-teal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12s-4.5 7.5-10.5 7.5S1.5 12 1.5 12z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
        </div>

        <div className="font-bold text-black text-center mb-2 mt-2">
          Read carefully to the instructions.
        </div>
        <div className="text-center mb-2 text-gray-700">
          You will play a series of memory games using images. Your goal is to
          find and match the images.
        </div>

        <div className="mb-1 text-black font-bold text-center uppercase">
          Instructions
        </div>
        <div className="text-center text-gray-700 text-sm leading-relaxed px-2">
          First, you’ll see a <strong>target visual cue for 3 seconds</strong>
          —memorize it. Next, click on the target among several images{" "}
          <strong>as many times as you can in 15 seconds</strong>. The positions
          will shuffle after each click. Each stage has two rounds with
          increasing number of images. Good luck!
        </div>
      </div>

      <button
        type="submit"
        className="bg-teal-500 py-2 w-full rounded-lg text-white font-semibold hover:bg-teal-600 transition"
      >
        Start Visual Test
      </button>
    </form>
  );
};

export default VisualTestInstruction;
