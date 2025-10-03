import { useNavigate } from "react-router-dom";
import { HiOutlineClock } from "react-icons/hi";
import { FaStar, FaLightbulb } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const TestTypeSelection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChoose = (type: "basic" | "advanced") => {
    if (type === "basic") {
      navigate("/test/basic/instruction");
    } else {
      navigate("/test/advanced/instruction");
    }
  };

  return (
    <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-cyan-100 py-14 px-4 sm:px-8 min-h-screen rounded-[1.5rem] flex items-center justify-center font-[Comic Sans MS,cursive,sans-serif]">
      <div className="flex flex-col items-center bg-white/90 border-4 border-pink-200 py-10 px-6 rounded-[2em] w-full max-w-lg shadow-xl space-y-8">
        <h2 className="text-3xl text-pink-600 font-bold text-center drop-shadow mb-1">
          {t('testSelection.title')}
        </h2>
        <div className="text-center text-pink-500 font-semibold text-lg mb-2">
          Bước 2 / 4:{" "}
          <span className="text-gray-700 font-normal">{t('testSelection.subtitle')}</span>
        </div>
        <div className="w-full h-2 bg-pink-100 rounded-full mb-3">
          <div
            className="bg-pink-400 h-2 rounded-full transition-all"
            style={{ width: "50%" }}
          />
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 px-4 py-3 rounded-xl text-base text-center font-semibold flex flex-row gap-2 items-center justify-center shadow mt-2">
          <FaLightbulb className="text-yellow-400 text-xl" />
          <span>
            Nếu bạn còn nhỏ (<span className="text-pink-600 font-bold">dưới 7 tuổi</span>),
            hãy thử <span className="text-pink-600 font-semibold">bài Cơ bản</span> trước nhé,
            khi nào quen thì làm <span className="text-blue-600 font-semibold">Chuyên sâu</span> nhé!
          </span>
        </div>
        {/* Option buttons */}
        <div className="flex flex-col gap-7 w-full mt-2">
          {/* Basic  */}
          <button
            onClick={() => handleChoose("basic")}
            className="flex items-center bg-yellow-200 hover:bg-yellow-300 transition border-2 border-pink-100 rounded-[1.5em] px-6 py-5 shadow-sm space-x-5 text-left group"
          >
            <div className="flex-shrink-0 bg-white rounded-full p-3 border-2 border-yellow-300">
              <HiOutlineClock className="text-3xl text-yellow-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-pink-700 mb-1">
                Bài test <span className="text-base font-normal">(Cơ bản)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium mb-0.5">
                <FaStar className="text-yellow-400" />
                Thời gian: 5 phút
              </div>
              <div className="text-gray-600 text-sm">
                Phù hợp cho các bạn nhỏ mới tham gia, tập trung ngắn, dễ làm quen.
              </div>
            </div>
          </button>
          {/* Advanced */}
          <button
            onClick={() => handleChoose("advanced")}
            className="flex items-center bg-blue-100 hover:bg-blue-200 transition border-2 border-pink-100 rounded-[1.5em] px-6 py-5 shadow-sm space-x-5 text-left group"
          >
            <div className="flex-shrink-0 bg-white rounded-full p-3 border-2 border-blue-300">
              <HiOutlineClock className="text-3xl text-blue-500" />
            </div>
            <div>
              <div className="text-xl font-bold text-blue-700 mb-1">
                Bài test <span className="text-base font-normal">(Chuyên sâu)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 font-medium mb-0.5">
                <FaStar className="text-blue-400" />
                Thời gian: 20 phút
              </div>
              <div className="text-gray-600 text-sm">
                Dành cho bạn đã quen thao tác, có thể tập trung lâu hơn và muốn kiểm tra sâu hơn.
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestTypeSelection;