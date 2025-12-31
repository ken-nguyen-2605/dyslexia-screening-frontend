import type { FormEvent } from "react";
import { useTestStep } from "../../../contexts/TestStepContext";

const MiniGame5Instruction = () => {
  const { goToNextStep } = useTestStep();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    goToNextStep();
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-pink-50 to-cyan-50 px-4 sm:px-8 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 border-4 border-pink-200 rounded-3xl shadow-xl max-w-4xl w-full mx-auto p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl text-pink-600 font-extrabold mb-2">
            🔤 Minigame 5: Tìm chữ giống nhau
          </h2>
          <p className="text-gray-600">
            Luyện phân biệt chữ cái cho trẻ có nguy cơ Dyslexia
          </p>
        </div>

        {/* Main content - horizontal layout */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Left side - How to play */}
          <div className="lg:w-1/2 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-5 border border-pink-100">
            <h3 className="font-bold text-pink-600 text-lg mb-3 flex items-center gap-2">
              <span className="text-xl">🎯</span> Cách chơi
            </h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <p>
                Trên màn hình sẽ xuất hiện{" "}
                <strong className="text-pink-600">một chữ mẫu</strong> ở phía
                trên và một{" "}
                <strong className="text-pink-600">bảng gồm nhiều chữ</strong>{" "}
                bên dưới.
              </p>
              <p>
                Nhiệm vụ:{" "}
                <strong>Chọn tất cả ô có chữ giống hệt chữ mẫu</strong>.
              </p>
              <p className="text-xs text-gray-500 italic">
                Các chữ còn lại là những chữ dễ gây nhầm lẫn (ví dụ: b/d/p/q,
                m/n/w...)
              </p>
            </div>
          </div>

          {/* Right side - Steps */}
          <div className="lg:w-1/2 space-y-3">
            <div className="flex items-start gap-3 bg-pink-50 p-4 rounded-xl border border-pink-200">
              <span className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </span>
              <p className="text-gray-700 text-sm pt-1">
                Nhìn thật kỹ <strong>chữ mẫu</strong> ở ô phía trên
              </p>
            </div>

            <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl border border-green-200">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </span>
              <p className="text-gray-700 text-sm pt-1">
                Nhấp vào <strong>tất cả ô</strong> có chữ giống với chữ mẫu
              </p>
            </div>

            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-200">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </span>
              <p className="text-gray-700 text-sm pt-1">
                Chọn đúng được cộng điểm, chọn sai sẽ được ghi lại để hỗ trợ
                đánh giá
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-purple-500 py-3 px-12 rounded-full text-white font-semibold shadow-lg hover:from-pink-600 hover:to-purple-600 transition transform hover:scale-105 focus:ring-2 focus:ring-pink-200 focus:outline-none"
          >
            🚀 Bắt đầu chơi
          </button>
          <p className="text-xs text-gray-400 mt-4">
            * Trò chơi này chỉ hỗ trợ luyện tập / sàng lọc sơ bộ, không thay thế
            chẩn đoán của chuyên gia.
          </p>
        </div>
      </form>
    </div>
  );
};

export default MiniGame5Instruction;
