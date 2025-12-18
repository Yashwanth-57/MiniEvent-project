import axiosInstance from "./axiosInstance";

export const loginUser = (credentials) => {
  return axiosInstance.post("/api/auth/login", credentials);
};

export const registerUser = (userData) => {
  return axiosInstance.post("/api/auth/register", userData);
};

export const getProfile = () => {
  return axiosInstance.get("//api/auth/profile");
};
