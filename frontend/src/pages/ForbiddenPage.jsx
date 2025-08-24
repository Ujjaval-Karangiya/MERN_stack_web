// src/pages/ForbiddenPage.jsx
import React from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <Lock className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">403 - Forbidden</h1>
      <p className="text-gray-600 mb-6">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="btn btn-primary px-6 py-2 rounded-lg transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ForbiddenPage;
