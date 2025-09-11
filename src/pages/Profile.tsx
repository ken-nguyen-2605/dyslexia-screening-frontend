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
    await selectProfile(profileId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Profile Management</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Current Profile Info */}
        {user && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Active Profile</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{user.name || `Profile ${user.id}`}</p>
                <p className="text-gray-600">
                  {user.profile_type} • {user.year_of_birth ? `Age: ${new Date().getFullYear() - user.year_of_birth}` : 'Age not set'}
                </p>
                {user.hobbies && (
                  <p className="text-gray-600 mt-1">Hobbies: {user.hobbies}</p>
                )}
              </div>
              <button
                onClick={() => setEditingProfile(user)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* All Profiles */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">All Profiles</h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Create New Profile
            </button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`border rounded-lg p-4 ${
                  profile.id === user?.id ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{profile.name || `Profile ${profile.id}`}</h3>
                    <p className="text-gray-600 text-sm">
                      {profile.profile_type} • {profile.year_of_birth ? `Age: ${new Date().getFullYear() - profile.year_of_birth}` : 'Age not set'}
                    </p>
                  </div>
                  {profile.id === user?.id && (
                    <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded">Active</span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {profile.id !== user?.id && (
                    <button
                      onClick={() => handleSelectProfile(profile.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded transition-colors"
                    >
                      Switch To
                    </button>
                  )}
                  <button
                    onClick={() => setEditingProfile(profile)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm px-3 py-2 rounded transition-colors"
                  >
                    Edit
                  </button>
                  {profiles.length > 1 && (
                    <button
                      onClick={() => handleDeleteProfile(profile.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-2 rounded transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Profile Modal */}
        {editingProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-800 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:border-teal-500 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block font-semibold text-gray-800 mb-1">Year of Birth</label>
                  <input
                    type="number"
                    min="1900"
                    max="2025"
                    value={formData.year_of_birth}
                    onChange={(e) => setFormData(prev => ({ ...prev, year_of_birth: parseInt(e.target.value) }))}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:border-teal-500 focus:outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block font-semibold text-gray-800 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as "MALE" | "FEMALE" }))}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:border-teal-500 focus:outline-none"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-semibold text-gray-800 mb-1">Hobbies</label>
                  <input
                    type="text"
                    value={formData.hobbies}
                    onChange={(e) => setFormData(prev => ({ ...prev, hobbies: e.target.value }))}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:border-teal-500 focus:outline-none"
                    placeholder="e.g., Reading, Gaming, Sports"
                    required
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProfile(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Profile Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-xl font-semibold mb-4">Create New Profile</h3>
              
              <form onSubmit={handleCreateProfile} className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-800 mb-1">Profile Name</label>
                  <input
                    type="text"
                    value={newProfileData.name}
                    onChange={(e) => setNewProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:border-teal-500 focus:outline-none"
                    placeholder="Enter profile name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block font-semibold text-gray-800 mb-1">Profile Type</label>
                  <select
                    value={newProfileData.profile_type}
                    onChange={(e) => setNewProfileData(prev => ({ ...prev, profile_type: e.target.value as ProfileType }))}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:border-teal-500 focus:outline-none"
                  >
                    <option value="CHILD">Child</option>
                    <option value="PARENT">Parent</option>
                  </select>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Profile"}
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