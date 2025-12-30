import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTestProgress } from "../hooks/useTestProgress";
import { testSessionService } from "../services/testSessionService";
import type { TestSession } from "../types/testSession";

const Dashboard = () => {
  const [sessions, setSessions] = useState<TestSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    progress,
    getNextIncompleteTest,
    isAllTestsComplete,
    syncWithBackendSession,
    resetProgress,
    setCurrentSessionId,
  } = useTestProgress();

  const handleStartNewTest = async () => {
    resetProgress();
    const newSession = await testSessionService.startTestSession();
    setCurrentSessionId(newSession.id);
    navigate("/test/auditory/instruction");
  };

	useEffect(() => {
		const fetchSessions = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await testSessionService.getAllTestSessions();
				setSessions(data);
			} catch (err: any) {
				setError(err.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		};
		fetchSessions();
	}, [hasSelectedProfile, navigate]);

  const getResultText = (result: string | null) => {
    switch (result) {
      case "NON_DYSLEXIC":
        return "Không có dấu hiệu";
      case "MAYBE_DYSLEXIC":
        return "Có thể có dấu hiệu";
      case "DYSLEXIC":
        return "Có dấu hiệu";
      default:
        return "Đang chờ";
    }
  };

  const getResultColor = (result: string | null) => {
    switch (result) {
      case "NON_DYSLEXIC":
        return "text-green-600 font-bold";
      case "MAYBE_DYSLEXIC":
        return "text-yellow-600 font-bold";
      case "DYSLEXIC":
        return "text-red-600 font-bold";
      default:
        return "text-gray-500 font-semibold";
    }
  };

  const getTestStatusIcon = (completed: boolean) => {
    return completed ? "✅" : "⏳";
  };

  const handleContinueSession = (session: TestSession) => {
    // Sync context with this session's state
    syncWithBackendSession(session);

    // Find the next test to continue
    if (!session.taken_auditory_test) {
      navigate("/test/auditory/instruction");
    } else if (!session.taken_visual_test) {
      navigate("/test/visual/instruction");
    } else if (!session.taken_language_test) {
      navigate("/test/language/instruction");
    } else {
      // All tests done, go to results
      navigate(`/results/${session.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cyan rounded-2xl flex flex-col items-center py-10 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Bài test của tôi</h2>
          <button
            className="bg-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition"
            onClick={handleStartNewTest}
          >
            Bắt đầu bài test mới
          </button>
        </div>

        {/* Test Progress Overview */}
        <div className="mb-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
          <h3 className="text-lg font-semibold text-pink-600 mb-3">
            Test Progress
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">
                {getTestStatusIcon(progress.auditory.completed)}
              </span>
              <span className="text-sm font-medium text-gray-700">
                Auditory Test
              </span>
              <span className="text-xs text-gray-500">
                {progress.auditory.completed ? "Completed" : "Pending"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">
                {getTestStatusIcon(progress.visual.completed)}
              </span>
              <span className="text-sm font-medium text-gray-700">
                Visual Test
              </span>
              <span className="text-xs text-gray-500">
                {progress.visual.completed ? "Completed" : "Pending"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">
                {getTestStatusIcon(progress.language.completed)}
              </span>
              <span className="text-sm font-medium text-gray-700">
                Language Test
              </span>
              <span className="text-xs text-gray-500">
                {progress.language.completed ? "Completed" : "Pending"}
              </span>
            </div>
          </div>

          {!isAllTestsComplete && (
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  const nextTest = getNextIncompleteTest();
                  if (nextTest) navigate(`/test/${nextTest}/instruction`);
                }}
                className="text-pink-600 hover:underline font-medium"
              >
                Continue with {getNextIncompleteTest()} test →
              </button>
            </div>
          )}

          {isAllTestsComplete && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              🎉 All tests completed!
            </div>
          )}
        </div>

        {/* Training Zone Section */}
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-yellow-600">
              🎮 Khu vực luyện tập
            </h3>
            <button
              onClick={() => navigate("/training")}
              className="text-pink-600 hover:underline font-medium text-sm"
            >
              Xem tất cả →
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Luyện tập với các trò chơi để cải thiện kỹ năng đọc và nghe!
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { id: 1, icon: "🎮", name: "Trò chơi 1", available: false },
              {
                id: 2,
                icon: "📖",
                name: "Trò chơi 2",
                available: true,
                path: "/test/minigame2/instruction",
              },
              { id: 3, icon: "🧩", name: "Trò chơi 3", available: false },
              { id: 4, icon: "🎯", name: "Trò chơi 4", available: false },
              { id: 5, icon: "🌟", name: "Trò chơi 5", available: false },
            ].map((game) => (
              <button
                key={game.id}
                onClick={() =>
                  game.available && game.path && navigate(game.path)
                }
                className={`
                  flex flex-col items-center p-3 rounded-xl transition-all
                  ${
                    game.available
                      ? "bg-pink-100 hover:bg-pink-200 cursor-pointer"
                      : "bg-gray-100 opacity-50 cursor-not-allowed"
                  }
                `}
                disabled={!game.available}
              >
                <span className="text-2xl mb-1">{game.icon}</span>
                <span className="text-xs font-medium text-gray-700 text-center">
                  {game.name}
                </span>
                {!game.available && (
                  <span className="text-[10px] text-gray-500">Sắp có</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 py-10">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : sessions.length === 0 ? (
          <div className="text-gray-600 text-center py-10">
            No test sessions found. Start your first test!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <h3 className="text-lg font-semibold text-pink-600 mb-3">
              Lịch sử bài test
            </h3>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-pink-50">
                  <th className="py-2 px-4 text-left font-semibold">#</th>
                  <th className="py-2 px-4 text-left font-semibold">Ngày</th>
                  <th className="py-2 px-4 text-left font-semibold">Giờ</th>
                  <th className="py-2 px-4 text-left font-semibold">
                    Trạng thái
                  </th>
                  <th className="py-2 px-4 text-left font-semibold">Điểm</th>
                  <th className="py-2 px-4 text-left font-semibold">Kết quả</th>
                  <th className="py-2 px-4 text-left font-semibold">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, idx) => (
                  <tr
                    key={session.id}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-2 px-4 font-bold">{idx + 1}</td>
                    <td className="py-2 px-4">
                      {new Date(session.start_time).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(session.start_time).toLocaleTimeString(
                        "vi-VN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {session.completed ? (
                        <span className="text-green-600">✅ Hoàn thành</span>
                      ) : (
                        <span className="text-yellow-600">⏳ Đang làm</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {session.total_score !== null
                        ? `${session.total_score.toFixed(1)}/100`
                        : "--"}
                    </td>
                    <td
                      className={`py-2 px-4 ${getResultColor(session.result)}`}
                    >
                      {getResultText(session.result)}
                    </td>
                    <td className="py-2 px-4">
                      {session.completed ? (
                        <button
                          className="text-pink-600 hover:underline hover:text-pink-800 font-medium"
                          onClick={() => navigate(`/results/${session.id}`)}
                        >
                          Xem kết quả
                        </button>
                      ) : (
                        <button
                          className="text-blue-600 hover:underline hover:text-blue-800 font-medium"
                          onClick={() => handleContinueSession(session)}
                        >
                          Tiếp tục
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
