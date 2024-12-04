import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem("admin");
  const isUser = sessionStorage.getItem("token");

  if (!isAdmin && !isUser) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;
