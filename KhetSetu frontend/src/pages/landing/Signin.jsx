import React, { useState } from "react";

export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;
// /api/auth
  const handleSendOtp = () => {
    if (phone && phone.length === 10) {
      
      

      console.log("Send OTP to:", phone);

      setOtpSent(true); // Show OTP input after successful response
    } else if (!phone) {
      alert("Enter phone number");
    } else {
      alert("Enter valid 10-digit phone number");
    }
  };

  const handleVerifyOtp = () => {
    if (otp) {
      // 🔹 TODO: Call backend API
      // POST `${baseUrl}/auth/verify-otp`
      // Body: { phone, otp }

      console.log("Verify OTP:", otp);

      // 🔹 TODO:
      // If success:
      // 1. Store token in localStorage
      // 2. Redirect to dashboard
    } else {
      alert("Enter OTP");
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start gap-40 bg-gradient-to-br from-sky-200 to-sky-100">
      <div className="w-full p-4 font-bold text-lg">KhetSetu</div>

      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 w-[380px] flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Signin to KhetSetu
        </h1>

        {/* Phone Input */}
        <input
          type="tel"
          maxLength={10}
          placeholder="Phone number"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          value={phone}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setPhone(value);
          }}
        />

        {/* Send OTP Button */}
        {!otpSent && (
          <button
            className="mt-5 w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        )}

        {/* OTP Section */}
        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="mt-5 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              className="mt-5 w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
