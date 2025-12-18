import axiosInstance from "./axiosInstance";

/**
 * Fetch profile statistics
 * (events created & events attended)
 */
export const getProfileStats = () => {
  return axiosInstance.get("/api/users/profile-stats");
};
