import React, { useState, useEffect } from "react";

export default function Profile() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (retry = false) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${baseUrl}/api/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      // 🔁 If access token expired → refresh
      if (res.status === 401 && !retry) {
        const refreshRes = await fetch(`${baseUrl}/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          localStorage.setItem("token", refreshData.accessToken);

          // Retry once with new token
          return fetchProfile(true);
        }
      }

      if (!res.ok) {
        setProfile(null);
        return;
      }

      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("Profile fetch failed:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="p-10">Loading profile...</div>;

  if (!profile)
    return <div className="p-10 text-red-500">No profile found</div>;

  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-white p-8 rounded-2xl shadow-md max-w-xl space-y-4">
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Mobile:</strong> {profile.mobile}
        </p>
        <p>
          <strong>Email:</strong> {profile.email || "Not set"}
        </p>
        <p>
          <strong>Village:</strong> {profile.villageName || "Not set"}
        </p>
        <p>
          <strong>Trust Score:</strong> ⭐ {profile.trustScore}
        </p>
      </div>
    </div>
  );
}
