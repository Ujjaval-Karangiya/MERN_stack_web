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
