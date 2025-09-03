import axios from "axios";

// ✅ Create axios instance
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "/api", // production fallback
  withCredentials: true, // ✅ important: send/receive cookies
  headers: {
    "Content-Type": "application/json",
  },
});
