import React from "react";
import background from "../../assets/background.jpg";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen  relative">
      {/* 🌿 Transparent Navbar */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 
             bg-white/20 backdrop-blur-md 
             px-8 py-3 rounded-full 
             flex gap-8 text-white shadow-lg"
      >
        <button
          onClick={() => navigate("/")}
          className="hover:text-lime-300 transition"
        >
          Home
        </button>

        <button
          onClick={() => navigate("/about")}
          className="hover:text-lime-300 transition"
        >
          About
        </button>

        <button
          onClick={() => navigate("/signin")}
          className="hover:text-lime-300 transition"
        >
          Sign In
        </button>
      </div>

      {/* 🌾 Hero Section */}
      <div className="relative h-screen w-full">
        {/* Background Image FULL */}
        <img
          src={background}
          alt="mainimage"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Text Bottom Left */}
        <div className="absolute bottom-20 left-16 text-white z-10 max-w-2xl">
          <h1 className="text-6xl font-bold leading-tight">
            Smart Farming for <br />
            <span className="italic font-light">Future Generations</span>
          </h1>

          <p className="mt-6 text-gray-200 text-lg">
            Share and rent agricultural equipment easily within your community.
            Empowering farmers with modern tools.
          </p>

          <button
            className="mt-8 bg-white text-black 
                       px-10 py-4 text-lg 
                       rounded-full font-semibold 
                       hover:scale-105 transition"
          >
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
}
