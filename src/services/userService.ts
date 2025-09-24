import apiClient from "./apiClient";

interface UserUpdateInfo {
  name?: string;
  year_of_birth?: number;
  email?: string;
  gender?: string;
  mother_tongue?: string;
  official_dyslexia_diagnosis?: string;
}

const userService = {
  /**
   * Updates user profile information.
   * @param userInfo - The user information to update.
   */
  updateUserProfile: async (userInfo: UserUpdateInfo) => {
    const response = await apiClient.put("/user/profile", userInfo);
    if (response.status !== 200) {
      throw new Error("Failed to update user profile");
    }
    return response.data;
  }
};

export default userService;