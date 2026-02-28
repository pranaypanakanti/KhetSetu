import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingFooter() {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-black/70 backdrop-blur-md text-white mt-20 rounded-t-3xl px-10 py-12">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">🌾 Khetsetu</h2>
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            Empowering farmers through shared access to modern agricultural
            equipment. Building stronger rural communities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-lime-300 transition"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/about")}
              className="cursor-pointer hover:text-lime-300 transition"
            >
              About
            </li>
            <li
              onClick={() => navigate("/signin")}
              className="cursor-pointer hover:text-lime-300 transition"
            >
              Sign In
            </li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <p className="text-gray-300 text-sm">10,000+ Farmers Connected</p>
          <p className="text-gray-300 text-sm mt-2">
            Trusted Equipment Sharing Platform
          </p>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Khetsetu. All rights reserved.
      </div>
    </footer>
  );
}
