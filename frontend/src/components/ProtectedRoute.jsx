// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.js";

const ProtectedRoute = ({ children, requireAuth = false, allowedRoles = [] }) => {
  const { authUser } = useAuthStore();

  if (requireAuth && !authUser) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAuth && authUser) {
    return <Navigate to="/" replace />;
  }

  if (requireAuth && allowedRoles.length > 0) {
    if (!authUser?.role || !allowedRoles.includes(authUser.role)) {
      return <Navigate to="/forbidden" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
