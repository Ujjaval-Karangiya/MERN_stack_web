import { create } from "zustand";

import axiosInstance, { login, logout } from "../lib/axios";
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/auth/checkauth");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error checking auth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }

    },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Signup successful!");
        } catch (error) {
            console.log("Error signing up:", error);
            toast.error("Signup failed.");
        } finally {
            set({ isSigningUp: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout successful!");
        } catch (error) {
            console.log("Error logging out:", error);
            toast.error("Logout failed.", error.response.data.message);
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Login successful!");
        } catch (error) {
            console.log("Error logging in:", error);
            toast.error("Login failed.");
        } finally {
            set({ isLoggingIn: false });
        }
    },
       updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          // ✅ send as JSON (supports Base64 image string)
          const res = await axiosInstance.put("/auth/update", data);

          // backend returns { message, user }
          set({ authUser: res.data.user });

          toast.success(res.data.message || "Profile updated successfully!");
        } catch (error) {
          console.error("Error updating profile:", error);
          const errorMessage =
            error.response?.data?.message ||
            "Profile update failed. Please try again.";
          toast.error(errorMessage);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
    

}));

export default useAuthStore;
