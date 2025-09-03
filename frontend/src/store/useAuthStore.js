import { create } from "zustand";
// import  axiosInstance  from "../lib/axios.js";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

//   checkAuth: async () => {
//   set({ isCheckingAuth: true });
//   try {
//     const res = await axiosInstance.get("/auth/check");
//     const user = res.data?.user || res.data; // adjust depending on backend response
//     if (user) {
//       set({ authUser: user });
//       if (!get().isSocketConnected) {
//         get().connectSocket();
//       }
//     } else {
//       set({ authUser: null });
//     }
//   } catch (error) {
//     console.error("Error in checkAuth:", error);
//     set({
//       authUser: null,
//       authError: error.response?.data?.message || "Authentication failed",
//     });
//   } finally {
//     set({ isCheckingAuth: false });
//   }
// },


  // signup: async (data) => {
  //   set({ isSigningUp: true });
  //   try {
  //     const res = await axiosInstance.post("/auth/signup", data);
  //     set({ authUser: res.data });
  //     toast.success("Account created successfully");
  //     get().connectSocket();
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   } finally {
  //     set({ isSigningUp: false });
  //   }
  // },
checkAuth: async () => {
  set({ isCheckingAuth: true, authError: null });

  try {
    const res = await axiosInstance.get("/auth/check");

    // 🔑 Adjust depending on your backend response
    const user = res.data?.user || res.data;

    if (user) {
      set({ authUser: user });

      // ✅ Connect socket only if not already connected
      if (!get().isSocketConnected) {
        get().connectSocket();
      }
    } else {
      set({ authUser: null });
    }
  } catch (error) {
    console.error("❌ Error in checkAuth:", error);

    set({
      authUser: null,
      authError:
        error.response?.data?.message || "Authentication check failed",
    });
  } finally {
    set({ isCheckingAuth: false });
  }
},

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log(res); // Add this line to inspect the response
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/updateprofile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
