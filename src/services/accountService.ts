import apiClient from "./apiClient";

/**
 * Service for handling account-related operations.
 */
class AccountService {
  /**
   * Select a profile for the user.
   */
  async selectProfile(profileId: number) {
    const response = await apiClient.post(`/account/profiles/${profileId}/select`);
    return response.data;
  }

  /**
   * Get profile information
   */
  async getProfileInfo() {
    const response = await apiClient.get(`/user/profile`);
    return response.data;
  }
}

export default new AccountService();