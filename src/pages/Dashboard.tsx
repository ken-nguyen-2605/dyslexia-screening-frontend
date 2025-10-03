import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import testSessionService from "../services/testSessionService";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await testSessionService.fetchTestSessions();
        setSessions(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [isAuthenticated, navigate]);

  // Update once you have real data!
  const getScore = () => "--";
  const getResult = () => "Pending";
  const getResultColor = (result: string) => {
    if (result === "Safe") return "text-pink-600 font-bold";
    if (result === "Risk") return "text-yellow-500 font-bold";
    if (result === "Dyslexic") return "text-red-500 font-bold";
    // for pending/unknown
    return "text-gray-500 font-semibold";
  };

  return (
    <div className="min-h-screen bg-gradient-cyan rounded-2xl flex flex-col items-center py-10 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">My Tests</h2>
          <button
            className="bg-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition"
            onClick={() => navigate("/human/")}
          >
            Start New Test
          </button>
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
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-pink-50">
                  <th className="py-2 px-4 text-left font-semibold">#</th>
                  <th className="py-2 px-4 text-left font-semibold">Date</th>
                  <th className="py-2 px-4 text-left font-semibold">Score</th>
                  <th className="py-2 px-4 text-left font-semibold">Result</th>
                  <th className="py-2 px-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, idx) => {
                  const score = getScore();
                  const result = getResult();
                  return (
                    <tr key={session.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 font-bold">{idx + 1}</td>
                      <td className="py-2 px-4">
                        {new Date(session.start_time).toLocaleDateString("en-GB")}
                      </td>
                      <td className="py-2 px-4">{score}</td>
                      <td className={`py-2 px-4 ${getResultColor(result)}`}>{result}</td>
                      <td className="py-2 px-4">
                        <button
                          className="text-pink-600 hover:underline hover:text-pink-800 font-medium"
                          onClick={() => navigate(`/test-session/${session.id}`)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;