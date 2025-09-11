import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import type { ProfileType } from "../types";

const ProfileSelection = () => {
  const { profiles, createProfile, selectProfile, loading, error } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileType, setNewProfileType] = useState<ProfileType>("CHILD");

  const handleSelectProfile = async (profileId: number) => {
    await selectProfile(profileId);
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfileName.trim()) return;
    
    await createProfile({
      profile_type: newProfileType,
      name: newProfileName.trim()
    });
    
    // Reset form
    setNewProfileName("");
    setNewProfileType("CHILD");
    setShowCreateForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-8 shadow-xl border-2 border-pink-200">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200 border-t-pink-500 mx-auto"></div>
          <p className="mt-4 text-pink-600 font-bold text-lg">
            ⏳ Đang tải profiles...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full border-2 border-pink-200">
        <h1 className="text-3xl text-pink-600 font-bold text-center mb-6">
          🎈 Chọn Profile
        </h1>
        
        {error && (
          <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl mb-4">
            {error}
          </div>
        )}

        {profiles.length > 0 && (
          <div className="space-y-3 mb-6">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => handleSelectProfile(profile.id)}
                className="w-full p-4 border-2 border-pink-200 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200 text-left shadow-md hover:shadow-lg"
                disabled={loading}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-pink-700 text-lg">
                      {profile.profile_type === "PARENT" ? "👨‍👩‍👧‍👦" : "🧒"} {profile.name || `Profile ${profile.id}`}
                    </p>
                    <p className="text-sm text-purple-600 font-semibold">
                      {profile.profile_type === "PARENT" ? "Phụ huynh" : "Trẻ em"} • 
                      {profile.year_of_birth ? ` Tuổi: ${new Date().getFullYear() - profile.year_of_birth}` : " Chưa đặt tuổi"}
                    </p>
                  </div>
                  <div className="text-yellow-500 text-2xl font-bold">
                    →
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {!showCreateForm ? (
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            ✨ Tạo Profile Mới
          </button>
        ) : (
          <form onSubmit={handleCreateProfile} className="space-y-4">
            <div>
              <label htmlFor="profileName" className="block font-bold text-pink-700 mb-2">
                🏷️ Tên Profile
              </label>
              <input
                type="text"
                id="profileName"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="w-full border-2 border-pink-200 p-3 rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-200"
                placeholder="Nhập tên profile..."
                required
              />
            </div>
            
            <div>
              <label htmlFor="profileType" className="block font-bold text-pink-700 mb-2">
                👥 Loại Profile
              </label>
              <select
                id="profileType"
                value={newProfileType}
                onChange={(e) => setNewProfileType(e.target.value as ProfileType)}
                className="w-full border-2 border-pink-200 p-3 rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-200"
              >
                <option value="CHILD">🧒 Trẻ em</option>
                <option value="PARENT">👨‍👩‍👧‍👦 Phụ huynh</option>
              </select>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-4 rounded-2xl transition-all duration-200"
              >
                ❌ Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "⏳ Đang tạo..." : "✅ Tạo"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileSelection;
