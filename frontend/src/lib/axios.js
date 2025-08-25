// src/lib/axios.js
import axios from "axios";

// ✅ Create instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // important for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Export instance
export default axiosInstance;

// ✅ Helper functions
export const checkAuth = () => axiosInstance.get("/auth/checkauth");
export const login = (data) => axiosInstance.post("/auth/login", data);
export const signup = (data) => axiosInstance.post("/auth/signup", data);
export const logout = () => axiosInstance.post("/auth/logout");
export const updateProfile = (data) => {
  // Using FormData to handle file upload
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.profilePic) formData.append("profilePic", data.profilePic);
  if (data.password) formData.append("password", data.password);

  return axiosInstance.put("/auth/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
