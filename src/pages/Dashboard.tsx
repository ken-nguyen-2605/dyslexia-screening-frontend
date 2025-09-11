import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import testSessionService from "../services/testSessionService";
import type { TestSessionResponse } from "../types";

const Dashboard = () => {
  const [sessions, setSessions] = useState<TestSessionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchSessions = async () => {
      if (!isAuthenticated || !user) {
        navigate("/login");
        return;
      }
      
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
  }, [isAuthenticated, user, navigate]);

  // Get score and result from session data
  const getScore = (session: TestSessionResponse) => {
    return session.result || "--";
  };
  
  const getResult = (session: TestSessionResponse) => {
    if (session.completion_status !== "COMPLETED") return "Pending";
    
    switch (session.predict_dyslexia) {
      case "YES": return "Risk Detected";
      case "NO": return "No Risk";
      case "MAYBE": return "Maybe";
      default: return "Pending";
    }
  };
  
  const getResultColor = (session: TestSessionResponse) => {
    if (session.completion_status !== "COMPLETED") return "text-gray-500 font-semibold";
    
    switch (session.predict_dyslexia) {
      case "YES": return "text-red-500 font-bold";
      case "NO": return "text-teal-600 font-bold";
      case "MAYBE": return "text-yellow-500 font-bold";
      default: return "text-gray-500 font-semibold";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl w-full">
        {/* Profile Header */}
        {user && (
          <div className="mb-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome, {user.name || `Profile ${user.id}`}!
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">
                {user.profile_type === "PARENT" ? "👨‍👩‍👧‍👦 Parent" : "👶 Child"}
              </span>
              {user.year_of_birth && (
                <span>🎂 Age: {new Date().getFullYear() - user.year_of_birth}</span>
              )}
              <span>📊 Total Tests: {sessions.length}</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-teal-600">Test History</h2>
          <div className="flex gap-3">
            <button
              className="bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition"
              onClick={() => navigate("/test/dyslexia-child")}
            >
              🧠 Test Dyslexia (4-5 tuổi)
            </button>
            <button
              className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition"
              onClick={() => navigate("/human/")}
            >
              Start New Test
            </button>
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
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-teal-50">
                  <th className="py-2 px-4 text-left font-semibold">#</th>
                  <th className="py-2 px-4 text-left font-semibold">Date</th>
                  <th className="py-2 px-4 text-left font-semibold">Score</th>
                  <th className="py-2 px-4 text-left font-semibold">Result</th>
                  <th className="py-2 px-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, idx) => {
                  const score = getScore(session);
                  const result = getResult(session);
                  return (
                    <tr key={session.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-2 px-4 font-bold">{idx + 1}</td>
                      <td className="py-2 px-4">
                        {new Date(session.start_time).toLocaleDateString("en-GB")}
                      </td>
                      <td className="py-2 px-4">{score}</td>
                      <td className={`py-2 px-4 ${getResultColor(session)}`}>{result}</td>
                      <td className="py-2 px-4">
                        <button
                          className="text-teal-600 hover:underline hover:text-teal-800 font-medium"
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