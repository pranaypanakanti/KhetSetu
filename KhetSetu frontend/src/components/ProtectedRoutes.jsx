import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [isAuth, setIsAuth] = useState(null); // null = checking

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/auth/refresh`, {
          method: "POST",
          credentials: "include", // 🔥 required for refresh cookie
        });

        if (!res.ok) {
          setIsAuth(false);
          return;
        }

        const data = await res.json();

        // 🔥 store new access token
        if (data.accessToken) {
          localStorage.setItem("token", data.accessToken);
        }

        setIsAuth(true);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [baseUrl]);

  // 🔹 Still checking
  if (isAuth === null) return <div>Checking login...</div>;

  // 🔹 Not authenticated
  if (!isAuth) return <Navigate to="/signin" replace />;

  // 🔹 Authenticated
  return <Outlet />;
}

export default ProtectedRoutes;
