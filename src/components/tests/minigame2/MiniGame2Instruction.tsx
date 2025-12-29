import type { FormEvent } from "react";

interface Minigame2InstructionProps {
  goToNextStep: () => void;
}

const Minigame2Instruction = ({ goToNextStep }: Minigame2InstructionProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    goToNextStep();
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-cyan-50 py-14 px-4 sm:px-8 min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col bg-white/90 border-4 border-pink-200 p-10 rounded-[2em] items-center space-y-7 shadow-xl max-w-lg w-full mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-pink-600 font-bold text-center mb-1 drop-shadow font-[Comic Sans MS,cursive,sans-serif]">
          Minigame 2: Lắp Ráp Robot
        </h2>

        <div className="flex flex-col items-center">
          <div className="my-2">
            <span className="inline-block bg-pink-50 rounded-full p-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-pink-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5A3.5 3.5 0 004 8.5c0 1.25.132 2.44 0 3.5.006.136.012.271.02.406 0 2.25 1.79 4.08 4 4.08h7c2.21 0 4-1.83 4-4.08 0-.136-.006-.271-.02-.406 0-1.06.132-2.25 0-3.5A3.5 3.5 0 0016.5 5c-1.706 0-3.332.477-4.5 1.253z" />
              </svg>
            </span>
          </div>

          <div className="font-bold text-black text-center mb-2 mt-2 font-[Comic Sans MS,cursive,sans-serif]">
            Kĩ năng đọc hiểu cơ bản
          </div>
          <div className="text-center mb-4 text-gray-700 font-[Comic Sans MS,cursive,sans-serif]">
            Trò chơi này đánh giá tốc độ đọc và khả năng hiểu nội dung của bạn thông qua câu hỏi Đúng/Sai.
          </div>

          <div className="mb-1 text-black font-bold text-center uppercase font-[Comic Sans MS,cursive,sans-serif]">
            Hướng Dẫn
          </div>
          <div className="text-center text-gray-700 text-sm leading-relaxed px-2 font-[Comic Sans MS,cursive,sans-serif] space-y-2">
            <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                Bạn sẽ thấy một câu mệnh đề. Nhiệm vụ của bạn là đọc và trả lời Đúng hoặc Sai.
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                Mỗi câu trả lời Đúng robot sẽ được lắp ráp thêm một phần.
            </div>
            <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                Mỗi câu trả lời Sai sẽ robot sẽ không được lắp ráp thêm phần nào.
            </div>
            <p className="pt-2 font-bold text-sm text-pink-600">
                Hoàn thành hết tất cả câu hỏi để lắp ráp robot hoàn chỉnh!
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-pink-500 py-3 w-full rounded-lg text-white font-semibold hover:bg-pink-600 transition-all transform hover:scale-105 font-[Comic Sans MS,cursive,sans-serif]"
        >
            Bắt đầu chơi
        </button>
      </form>
    </div>
  );
};

export default Minigame2Instruction;