import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SettingPage from "./pages/SettingPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ForbiddenPage from "./pages/ForbiddenPage.jsx"   // example page // example page
import useAuthStore from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-10 h-10 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        {/* Protected Routes (Logged-in users only) */}
        <Route
          path="/"
          element={
            <ProtectedRoute requireAuth>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute requireAuth>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

      

        {/* Public Routes (only when logged OUT) */}
        <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <SignupPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route path="/forbidden" element={<ForbiddenPage />} />

        {/* Open route (no restriction) */}
        <Route path="/settings" element={<SettingPage />} />
      </Routes>

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
