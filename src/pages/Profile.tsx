import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import accountService from "../services/accountService";
import userService from "../services/userService";
import type { ProfileSchema, ProfileUpdateRequest, ProfileType } from "../types";

const Profile = () => {
  const { user, profiles, createProfile, refreshProfiles, selectProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState<ProfileSchema | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: "",
    year_of_birth: new Date().getFullYear() - 5,
    gender: "MALE" as "MALE" | "FEMALE",
    hobbies: ""
  });
  
  const [newProfileData, setNewProfileData] = useState({
    name: "",
    profile_type: "CHILD" as ProfileType
  });

  useEffect(() => {
    if (editingProfile) {
      setFormData({
        name: editingProfile.name || "",
        year_of_birth: editingProfile.year_of_birth || new Date().getFullYear() - 5,
        gender: editingProfile.gender || "MALE",
        hobbies: editingProfile.hobbies || ""
      });
    }
  }, [editingProfile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const updateData: ProfileUpdateRequest = {
        name: formData.name,
        year_of_birth: formData.year_of_birth,
        gender: formData.gender,
        hobbies: formData.hobbies
      };
      
      if (editingProfile.id === user?.id) {
        // Update current user's profile
        await userService.updateProfile(updateData);
      }
      
      await refreshProfiles();
      setEditingProfile(null);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    
    try {
      await createProfile(newProfileData);
      setNewProfileData({ name: "", profile_type: "CHILD" });
      setShowCreateForm(false);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Profile creation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (profileId: number) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await accountService.deleteProfile(profileId);
      await refreshProfiles();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProfile = async (profileId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await selectProfile(profileId);
      // Success feedback could be added here if needed
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Profile selection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center">
          🎈 Quản Lý Profile
        </h1>
        
        {error && (
          <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl mb-6">
            {error}
          </div>
        )}

        {/* Current Profile Info */}
        {user && (
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border-2 border-pink-200">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              ⭐ Profile Hiện Tại
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg text-purple-700">
                  {user.profile_type === "PARENT" ? "👨‍👩‍👧‍👦" : "🧒"} {user.name || `Profile ${user.id}`}
                </p>
                <p className="text-purple-600 font-semibold">
                  {user.profile_type === "PARENT" ? "Phụ huynh" : "Trẻ em"} • {user.year_of_birth ? `Tuổi: ${new Date().getFullYear() - user.year_of_birth}` : 'Chưa đặt tuổi'}
                </p>
                {user.hobbies && (
                  <p className="text-purple-600 mt-1 font-semibold">🎯 Sở thích: {user.hobbies}</p>
                )}
              </div>
              <button
                onClick={() => setEditingProfile(user)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-6 py-3 rounded-2xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl font-[Fredoka,sans-serif]"
              >
                ✏️ Chỉnh Sửa
              </button>
            </div>
          </div>
        )}

        {/* All Profiles */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border-2 border-pink-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-pink-600 font-[Fredoka,sans-serif]">
              👥 Tất Cả Profiles
            </h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-3 rounded-2xl transition-all duration-200 font-bold shadow-lg hover:shadow-xl font-[Fredoka,sans-serif]"
            >
              ✨ Tạo Profile Mới
            </button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`border-2 rounded-3xl p-4 transition-all duration-200 shadow-lg hover:shadow-xl ${
                  profile.id === user?.id ? 'border-yellow-400 bg-yellow-50' : 'border-pink-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-purple-700 font-[Fredoka,sans-serif]">
                      {profile.profile_type === "PARENT" ? "👨‍👩‍👧‍👦" : "🧒"} {profile.name || `Profile ${profile.id}`}
                    </h3>
                    <p className="text-purple-600 text-sm font-semibold">
                      {profile.profile_type === "PARENT" ? "Phụ huynh" : "Trẻ em"} • {profile.year_of_birth ? `Tuổi: ${new Date().getFullYear() - profile.year_of_birth}` : 'Chưa đặt tuổi'}
                    </p>
                  </div>
                  {profile.id === user?.id && (
                    <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-bold">⭐ Đang dùng</span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {profile.id !== user?.id && (
                    <button
                      onClick={() => handleSelectProfile(profile.id)}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-sm px-3 py-2 rounded-2xl transition-all duration-200 font-bold font-[Fredoka,sans-serif] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "⏳ Đang chuyển..." : "🔄 Chuyển"}
                    </button>
                  )}
                  <button
                    onClick={() => setEditingProfile(profile)}
                    className="flex-1 bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white text-sm px-3 py-2 rounded-2xl transition-all duration-200 font-bold font-[Fredoka,sans-serif]"
                  >
                    ✏️ Sửa
                  </button>
                  {profiles.length > 1 && (
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white text-sm px-3 py-2 rounded-2xl transition-all duration-200 font-bold font-[Fredoka,sans-serif]"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile Modal */}
        {editingProfile && (
          <div className="fixed inset-0 bg-pink-100 bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl border-2 border-pink-200">
              <h3 className="text-2xl font-bold mb-6 text-pink-600 font-[Fredoka,sans-serif]">
                ✏️ Chỉnh Sửa Profile
              </h3>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block font-bold text-pink-700 mb-2 font-[Fredoka,sans-serif]">
                    🏷️ Tên
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border-2 border-pink-200 p-3 rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-200 font-[Fredoka,sans-serif]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block font-bold text-pink-700 mb-2 font-[Fredoka,sans-serif]">
                    🎂 Năm Sinh
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max="2025"
                    value={formData.year_of_birth}
                    onChange={(e) => setFormData(prev => ({ ...prev, year_of_birth: parseInt(e.target.value) }))}
                    className="w-full border-2 border-pink-200 p-3 rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-200 font-[Fredoka,sans-serif]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block font-bold text-pink-700 mb-2 font-[Fredoka,sans-serif]">
                    👫 Giới Tính
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as "MALE" | "FEMALE" }))}
                    className="w-full border-2 border-pink-200 p-3 rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-200 font-[Fredoka,sans-serif]"
                  >
                    <option value="MALE">👦 Nam</option>
                    <option value="FEMALE">👧 Nữ</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-bold text-pink-700 mb-2 font-[Fredoka,sans-serif]">
                    🎯 Sở Thích
                  </label>
                  <input
                    type="text"
                    value={formData.hobbies}
                    onChange={(e) => setFormData(prev => ({ ...prev, hobbies: e.target.value }))}
                    className="w-full border-2 border-pink-200 p-3 rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-200 font-[Fredoka,sans-serif]"
                    placeholder="VD: Đọc sách, Chơi game, Thể thao..."
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingProfile(null)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-2xl transition-all duration-200 font-bold font-[Fredoka,sans-serif]"
                  >
                    ❌ Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-3 rounded-2xl transition-all duration-200 disabled:opacity-50 font-bold font-[Fredoka,sans-serif]"
                  >
                    {loading ? "⏳ Đang lưu..." : "✅ Lưu"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Profile Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-pink-100 bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl border-2 border-pink-200">
              <h3 className="text-2xl font-bold mb-6 text-pink-600 font-[Fredoka,sans-serif]">
                ✨ Tạo Profile Mới
              </h3>
              
              <form onSubmit={handleCreateProfile} className="space-y-4">
                <div>
                  <label className="block font-bold text-pink-700 mb-2 font-[Fredoka,sans-serif]">
                    🏷️ Tên Profile
                  </label>
                  <input
                    type="text"
                    value={newProfileData.name}
                    onChange={(e) => setNewProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border-2 border-pink-200 p-3 rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-200 font-[Fredoka,sans-serif]"
                    placeholder="Nhập tên profile..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block font-bold text-pink-700 mb-2 font-[Fredoka,sans-serif]">
                    👥 Loại Profile
                  </label>
                  <select
                    value={newProfileData.profile_type}
                    onChange={(e) => setNewProfileData(prev => ({ ...prev, profile_type: e.target.value as ProfileType }))}
                    className="w-full border-2 border-pink-200 p-3 rounded-2xl focus:border-yellow-400 focus:outline-none transition-all duration-200 font-[Fredoka,sans-serif]"
                  >
                    <option value="CHILD">🧒 Trẻ em</option>
                    <option value="PARENT">👨‍👩‍👧‍👦 Phụ huynh</option>
                  </select>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-2xl transition-all duration-200 font-bold font-[Fredoka,sans-serif]"
                  >
                    ❌ Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-3 rounded-2xl transition-all duration-200 disabled:opacity-50 font-bold font-[Fredoka,sans-serif]"
                  >
                    {loading ? "⏳ Đang tạo..." : "✅ Tạo"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;