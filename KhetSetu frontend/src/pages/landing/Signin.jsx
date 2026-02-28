import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  // 🔹 Send OTP
  const handleSendOtp = async () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }

    if (phone.length !== 10) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ mobile: phone }), // backend is using mobile
      });

      if (res.ok) {
        alert("OTP sent successfully");
        setOtpSent(true); // ✅ only here
        console.log(res.json);
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Server error");
    }
  };

  // 🔹 Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          mobile: phone,
          otp: otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        if (data.isNewUser) {
          navigate("/complete-profile");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start gap-40 bg-gradient-to-br from-sky-200 to-sky-100">
      <div className="w-full p-4 font-bold text-lg">KhetSetu</div>

      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 w-[380px] flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Sign in to KhetSetu
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
            onClick={handleSendOtp}
            className="mt-5 w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
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
              onClick={handleVerifyOtp}
              className="mt-5 w-full py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
