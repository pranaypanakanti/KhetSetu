import React, { useState, useEffect } from "react";
import {apiFetch} from "../../services/apiFetch.js";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiFetch("/api/user/profile", {
          method: "GET",
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return <div className="p-12 text-gray-500">Loading profile...</div>;

  if (!profile)
    return <div className="p-12 text-gray-500">No profile found</div>;

  return (
    <div className="px-16 py-12">
      <h1 className="text-3xl font-semibold mb-8">Profile</h1>

      <div className="bg-white p-8 rounded-2xl border max-w-xl space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Name</p>
          <p className="text-lg font-medium">{profile.name}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Email</p>
          <p className="text-lg font-medium">{profile.email}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Region</p>
          <p className="text-lg font-medium">{profile.region}</p>
        </div>
      </div>
    </div>
  );
}
