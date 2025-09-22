import { useRef, useState } from "react";
import soundFile from "../assets/auditoryTest/AuditoryInstruction.mp3";
interface AuditoryTestInstructionProps {
	onStartTest: () => void;
}

const AuditoryTestInstruction = ({
	onStartTest,
}: AuditoryTestInstructionProps) => {
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
			className="flex flex-col bg-white/90 border-4 border-pink-200 p-10 rounded-[2em] items-center space-y-7 shadow-xl max-w-lg w-full mx-auto"
			onSubmit={handleSubmit}
		>
			<h2 className="text-2xl text-pink-600 font-bold text-center mb-1">
				Audio Test Instruction
			</h2>

			<div className="text-pink-600 font-medium mb-2 text-center text-lg">
				Step 2 of 4:{" "}
				<span className="text-gray-700 font-normal">
					Audio features
				</span>
			</div>
			<div className="w-full h-1.5 bg-pink-100 rounded-full mb-4">
				<div
					className="bg-pink-400 h-1.5 rounded-full transition-all"
					style={{ width: "50%" }}
				/>
			</div>

			<div className="flex flex-col items-center">
				{/* Ear Icon */}
				<div className="my-2">
					{/* Replace with a better illustration if you want */}
					<span className="inline-block bg-pink-50 rounded-full p-3">
						{/* Or use an SVG. Here, using react-icons */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-10 w-10 text-pink-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 19V6a3 3 0 016 0v5a3 3 0 11-6 0"
							/>
						</svg>
					</span>
				</div>
				<div className="font-bold text-yellow-500 text-justify mb-2 mt-2">
					Bạn hãy lắng nghe thật kỹ hướng dẫn nhé!
				</div>
				<div className="text-justify mb-2 text-gray-600 text-sm">
					Bạn sẽ chơi một loạt các trò chơi ghi nhớ bằng âm thanh. Mục
					tiêu của bạn là tìm và ghép các âm thanh giống nhau. <span className="text-yellow-500 font-semibold">Sẽ không có bất kỳ gợi ý hình ảnh nào – hãy tập trung vào
					việc lắng nghe!</span>
				</div>
				<div className="mb-1 text-yellow-500 font-semibold text-center">
					
				</div>
				<div className="text-center text-gray-600 text-sm mb-2">
					Nhấn &quot;Nghe hướng dẫn&quot; để nghe hướng dẫn
					cho bài kiểm tra thính giác.
				</div>
			</div>

			<button
				type="button"
				className={`bg-white text-pink-600 font-semibold py-2 w-full rounded-lg border border-pink-400 shadow hover:bg-pink-100 hover:text-pink-700 transition
          ${playing ? "opacity-60 pointer-events-none" : ""}
        `}
				onClick={handlePlayAudio}
				disabled={playing}
			>
				{playing ? "Đang phát" : "Nghe hướng dẫn"}
			</button>

			<button
				type="submit"
				className="bg-pink-500 py-2 w-full rounded-lg text-white font-semibold hover:bg-pink-600 transition focus:ring-2 focus:ring-pink-200 focus:outline-none"
			>
				Bắt đầu bài kiểm tra
			</button>

			<div className="text-gray-600 text-sm text-center mt-2">
				Need to hear again? Press &quot;Play Audio&quot;
			</div>
		</form>
	);
};

export default AuditoryTestInstruction;
