import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t mt-16">
      <div className="px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">
        {/* Left */}
        <div
          className="font-semibold text-gray-800 cursor-pointer"
          onClick={() => navigate("/")}
        >
          KhetSetu
        </div>

        {/* Center Links */}
        <div className="flex gap-8">
          <button
            onClick={() => navigate("/")}
            className="hover:text-black transition"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-black transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/equipment")}
            className="hover:text-black transition"
          >
            Equipment
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="hover:text-black transition"
          >
            Profile
          </button>
        </div>

        {/* Right */}
        <div className="text-gray-500">
          © {new Date().getFullYear()} KhetSetu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
