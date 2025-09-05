interface BasicTestInstructionProps {
  onStartTest: () => void;
}

const BasicTestInstruction = ({ onStartTest }: BasicTestInstructionProps) => {
  return (
    <div className="flex flex-col bg-white/90 border-4 border-pink-200 p-10 rounded-[2em] items-center space-y-7 shadow-xl max-w-2xl w-full mx-auto">
      <h2 className="text-3xl text-pink-600 font-bold text-center mb-1 drop-shadow font-[Comic Sans MS,cursive,sans-serif]">
        Bài Test Sàng Lọc Dyslexia
      </h2>
      
      <div className="text-pink-500 font-semibold mb-2 text-center text-lg font-[Comic Sans MS,cursive,sans-serif]">
        Dành cho trẻ 4-5 tuổi
      </div>

      <div className="text-gray-700 text-left space-y-4 max-w-lg">
        <p className="text-lg font-semibold text-pink-600 text-center">
          Bài test này bao gồm 5 phần:
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="bg-pink-100 text-pink-600 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
            <div>
              <p className="font-semibold text-pink-600">Nhận thức âm vị</p>
              <p className="text-sm text-gray-600">Phân biệt các âm thanh khác nhau</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="bg-pink-100 text-pink-600 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
            <div>
              <p className="font-semibold text-pink-600">Nhận diện chữ & giải mã</p>
              <p className="text-sm text-gray-600">Đọc và nhận biết chữ cái, từ ngữ</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="bg-pink-100 text-pink-600 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
            <div>
              <p className="font-semibold text-pink-600">Tốc độ hiểu</p>
              <p className="text-sm text-gray-600">Hiểu nội dung và ý nghĩa</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="bg-pink-100 text-pink-600 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">4</span>
            <div>
              <p className="font-semibold text-pink-600">Chính tả & viết</p>
              <p className="text-sm text-gray-600">Vẽ và viết chữ cái</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <span className="bg-pink-100 text-pink-600 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">5</span>
            <div>
              <p className="font-semibold text-pink-600">Hiểu và nhận dạng ngôn ngữ</p>
              <p className="text-sm text-gray-600">Nhận biết và phân biệt ngôn ngữ</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Lưu ý:</strong> Hãy đeo tai nghe hoặc bật âm thanh để nghe rõ các câu hỏi.
            Test sẽ tự động phát âm thanh khi bắt đầu mỗi câu hỏi.
          </p>
        </div>
      </div>

      <button
        onClick={onStartTest}
        className="bg-pink-500 py-3 px-8 rounded-lg text-white font-semibold hover:bg-pink-600 transition focus:ring-2 focus:ring-pink-200 text-lg"
      >
        Bắt đầu làm bài
      </button>
    </div>
  );
};

export default BasicTestInstruction;
