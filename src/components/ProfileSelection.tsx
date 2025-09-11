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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full">
        <h1 className="text-3xl text-teal-600 font-bold text-center mb-6">
          Select Profile
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {profiles.length > 0 && (
          <div className="space-y-3 mb-6">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => handleSelectProfile(profile.id)}
                className="w-full p-4 border border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors text-left"
                disabled={loading}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{profile.name || `Profile ${profile.id}`}</p>
                    <p className="text-sm text-gray-600">
                      {profile.profile_type === "PARENT" ? "Parent" : "Child"} • 
                      {profile.year_of_birth ? ` Age: ${new Date().getFullYear() - profile.year_of_birth}` : " Age not set"}
                    </p>
                  </div>
                  <div className="text-teal-600">
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
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            + Create New Profile
          </button>
        ) : (
          <form onSubmit={handleCreateProfile} className="space-y-4">
            <div>
              <label htmlFor="profileName" className="block font-semibold text-gray-800 mb-1">
                Profile Name
              </label>
              <input
                type="text"
                id="profileName"
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:border-teal-500 focus:outline-none transition"
                placeholder="Enter profile name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="profileType" className="block font-semibold text-gray-800 mb-1">
                Profile Type
              </label>
              <select
                id="profileType"
                value={newProfileType}
                onChange={(e) => setNewProfileType(e.target.value as ProfileType)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:border-teal-500 focus:outline-none transition"
              >
                <option value="CHILD">Child</option>
                <option value="PARENT">Parent</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileSelection;
