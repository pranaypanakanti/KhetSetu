import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const [isAuth, setisAuth] = useState(false);

  useEffect(() => {
    fetch("apiendpoint", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setisAuth(true);
        } else {
          setisAuth(false);
        }
      })
      .catch(() => {
        setisAuth(false);
      });
  });

  if (isAuth === null) return <div>checking login</div>;
  if (!isAuth) return <Navigate to={"/login"} />;
}

export default ProtectedRoutes;
