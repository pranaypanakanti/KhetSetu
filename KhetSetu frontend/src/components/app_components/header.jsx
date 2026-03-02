import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const onLogoutClicked = async () => {
    try {
      await fetch(`${baseUrl}/api/auth/logout`, {
        method: "POST", //
        credentials: "include", //
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Clear token from localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-sky-500 flex justify-between items-center px-12 py-4 rounded-b-2xl">
      {/* Logo */}
      <div
        className="text-2xl font-semibold tracking-wide text-white cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        KhetSetu
      </div>

      {/* Navigation */}
      <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-2">
        <ul className="flex items-center gap-8 text-white font-medium">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:bg-white/30 px-4 py-2 rounded-full transition duration-200"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/equipments")}
            className="hover:bg-white/30 px-4 py-2 rounded-full transition duration-200"
          >
            Equipments
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="hover:bg-white/30 px-4 py-2 rounded-full transition duration-200"
          >
            Profile
          </button>
        </ul>
      </div>

      {/* Logout */}
      <div>
        <button
          onClick={onLogoutClicked} // ✅ now connected
          className="bg-white text-sky-600 font-medium px-5 py-2 rounded-full hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
