import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const [isAuth, setIsAuth] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const res = await fetch(`${baseUrl}/api/auth/me`, {
  //         method: "GET",
  //         credentials: "include", //check endpoint for this
  //       });

  //       if (res.ok) {
  //         setIsAuth(true);
  //       } else {
  //         setIsAuth(false);
  //       }
  //     } catch {
  //       setIsAuth(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  if (isAuth === null) return <div>Checking login...</div>;

  if (!isAuth) return <Navigate to="/signin" replace />;

  return <Outlet />;
}

export default ProtectedRoutes;
