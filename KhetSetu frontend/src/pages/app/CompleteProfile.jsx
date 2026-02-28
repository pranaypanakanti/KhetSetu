import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompleteProfile() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    villageId: null,
  });

  const [villageQuery, setVillageQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 🔎 Search villages
  const searchVillage = async (query) => {
    if (!query) return;

    try {
      const res = await fetch(`${baseUrl}/api/village/search?name=${query}`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setSuggestions(data);
      }
    } catch (err) {
      console.error("Village search failed", err);
    }
  };

  const handleVillageChange = (e) => {
    const value = e.target.value;
    setVillageQuery(value);
    searchVillage(value);
  };

  const selectVillage = (village) => {
    setVillageQuery(village.name);
    setFormData({ ...formData, villageId: village.id });
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.villageId) {
      alert("Please select a valid village");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/user/new-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert("Failed to create profile");
      }
    } catch (err) {
      console.error("Profile creation failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-[450px] relative">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-4 py-3 border rounded-lg"
            required
          />

          {/* Optional Email */}
          <input
            type="email"
            placeholder="Email (Optional)"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="px-4 py-3 border rounded-lg"
          />

          {/* Village Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Village"
              value={villageQuery}
              onChange={handleVillageChange}
              className="px-4 py-3 border rounded-lg w-full"
            />

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute bg-white border w-full mt-1 rounded-lg shadow-md max-h-40 overflow-y-auto z-50">
                {suggestions.map((village) => (
                  <div
                    key={village.id}
                    onClick={() => selectVillage(village)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {village.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
