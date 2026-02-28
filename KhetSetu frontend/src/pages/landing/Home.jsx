import React from "react";
import background from "../../assets/background.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <img
          src={background}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

        {/* Branding */}
        <div className="absolute top-8 left-12 text-white text-2xl font-semibold tracking-wide z-10">
          KhetSetu
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-full px-12 lg:px-24">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Smart Farming for{" "}
              <span className="italic font-light">Future Generations</span>
            </h1>

            <p className="mt-6 text-lg text-gray-200 leading-relaxed">
              Share and rent agricultural equipment easily within your
              community. Empowering farmers with modern tools and efficient
              access to machinery.
            </p>

            <button
              onClick={() => navigate("/equipment")}
              className="mt-10 bg-white text-black px-8 py-4 text-lg rounded-full font-semibold hover:scale-105 transition duration-300"
            >
              Get Started →
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHAT IS KHETSETU ================= */}
      <section className="bg-white py-28 px-8 md:px-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-10">
          What is KhetSetu?
        </h2>

        <p className="max-w-4xl mx-auto text-lg text-gray-600 leading-relaxed">
          KhetSetu is a community-driven agricultural equipment sharing platform
          designed to help small and medium-scale farmers access modern
          machinery without the heavy cost of ownership. By connecting farmers
          within regions, districts, and local communities, KhetSetu enables
          efficient equipment rental, increased productivity, and smarter
          farming practices.
        </p>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-gray-50 py-28 px-8 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-10 bg-white rounded-2xl border hover:border-gray-400 transition text-center">
            <h3 className="text-xl font-semibold mb-4">Affordable Rentals</h3>
            <p className="text-gray-600 leading-relaxed">
              Access high-quality farming equipment at a fraction of ownership
              cost.
            </p>
          </div>

          <div className="p-10 bg-white rounded-2xl border hover:border-gray-400 transition text-center">
            <h3 className="text-xl font-semibold mb-4">Region-Based Search</h3>
            <p className="text-gray-600 leading-relaxed">
              Find equipment available in your state, district, or local area
              easily.
            </p>
          </div>

          <div className="p-10 bg-white rounded-2xl border hover:border-gray-400 transition text-center">
            <h3 className="text-xl font-semibold mb-4">Secure OTP Login</h3>
            <p className="text-gray-600 leading-relaxed">
              Fast and secure authentication using mobile OTP verification.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
