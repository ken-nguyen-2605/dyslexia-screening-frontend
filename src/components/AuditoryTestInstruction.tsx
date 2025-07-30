import { useRef, useState } from "react";
import soundFile from "../assets/auditoryTest/AuditoryInstruction.mp3";
interface AuditoryTestInstructionProps {
  onStartTest: () => void;
}

const AuditoryTestInstruction = ({ onStartTest }: AuditoryTestInstructionProps) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    // Stop & cleanup previous audio if exists
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setPlaying(true);
    const audio = new Audio(soundFile);
    audioRef.current = audio;

    audio.play();

    audio.onended = () => {
      setPlaying(false);
      audioRef.current = null;
    };
    audio.onerror = () => {
      setPlaying(false);
      audioRef.current = null;
      alert("Error playing audio. Please try again.");
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If audio is playing, stop it
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      setPlaying(false);
    }

    onStartTest();
  };
  
  return (
    <form
      className="flex flex-col bg-white border border-gray-100 p-8 rounded-2xl items-center space-y-4 shadow-lg max-w-md w-full mx-auto mt-10"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-teal-600 font-bold text-center mb-1">
        Audio Test Instruction
      </h2>

      <div className="text-teal-600 font-medium mb-2 text-center text-lg">
        Step 2 of 4: <span className="text-gray-700 font-normal">Audio features</span>
      </div>
      <div className="w-full h-1.5 bg-teal-100 rounded-full mb-4">
        <div className="bg-teal-400 h-1.5 rounded-full transition-all" style={{ width: "50%" }} />
      </div>

      <div className="flex flex-col items-center">
        {/* Ear Icon */}
        <div className="my-2">
          {/* Replace with a better illustration if you want */}
          <span className="inline-block bg-teal-50 rounded-full p-3">
            {/* Or use an SVG. Here, using react-icons */}
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
                d="M9 19V6a3 3 0 016 0v5a3 3 0 11-6 0"/>
            </svg>
          </span>
        </div>
        <div className="font-bold text-black text-center mb-2 mt-2">Listen carefully to the instructions.</div>
        <div className="text-center mb-2 text-gray-700">
          You will play a series of memory games using sound. Your goal is to find and match the sounds.
        </div>
        <div className="mb-1 text-black font-semibold text-center">
          No visual clues will help you – focus on listening!
        </div>
        <div className="text-center text-gray-700 mb-2">
          Press &quot;Play Audio Instruction&quot; to hear the instruction for auditory test.
        </div>
      </div>

      <button
        type="button"
        className={`bg-white text-teal-600 font-semibold py-2 w-full rounded-lg border border-teal-400 shadow hover:bg-teal-100 hover:text-teal-700 transition
          ${playing ? "opacity-60 pointer-events-none" : ""}
        `}
        onClick={handlePlayAudio}
        disabled={playing}
      >
        {playing ? "Playing..." : "Play Audio"}
      </button>

      <button
        type="submit"
        className="bg-teal-500 py-2 w-full rounded-lg text-white font-semibold hover:bg-teal-600 transition focus:ring-2 focus:ring-teal-200 focus:outline-none"
      >
        Start Auditory Test
      </button>

      <div className="text-gray-600 text-sm text-center mt-2">Need to hear again? Press &quot;Play Audio&quot;</div>
    </form>
  );
};

export default AuditoryTestInstruction;