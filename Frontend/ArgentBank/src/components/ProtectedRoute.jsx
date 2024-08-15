// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasToken) {
    return <Navigate to="/error" />;
  }
  return children;
};

export default ProtectedRoute;
