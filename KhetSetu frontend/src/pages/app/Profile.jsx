import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
// /api/user/new-profile
// /api/user/profile
// /api/user/update-profile
// /api/user/delete-profile
export default function Profile() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/user/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
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
  }, [baseUrl]);

  if (loading) return <div>Loading profile...</div>;

  if (!profile) return <div>No profile found</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-xl">
        <p><strong>Name:</strong> {profile.name}</p>
        <p className="mt-4"><strong>Email:</strong> {profile.email}</p>
        <p className="mt-4"><strong>Region:</strong> {profile.region}</p>
      </div>
    </div>
  );
}

