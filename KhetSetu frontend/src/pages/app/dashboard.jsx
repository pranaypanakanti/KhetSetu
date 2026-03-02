import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch Dashboard
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/bookings/dashboard`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Dashboard fetch failed:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("Dashboard data:", data);
        setDashboard(data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [baseUrl, token]);

  // 🔥 Delete Listing
  const handleDeleteListing = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        // refresh dashboard
        setDashboard((prev) => ({
          ...prev,
          myListings: prev.myListings.filter((item) => item.id !== id),
        }));
      } else if (res.status === 409) {
        alert("Cannot delete. Product is currently rented.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // 🔥 Cancel Booking
  const cancelBooking = async (id) => {
    await fetch(`${baseUrl}/api/bookings/${id}/cancel`, {
      method: "PATCH",
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  // 🔥 Complete Booking (Owner)
  const completeBooking = async (id) => {
    await fetch(`${baseUrl}/api/bookings/${id}/complete`, {
      method: "PATCH",
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  if (loading) return <div className="p-10">Loading dashboard...</div>;
  if (!dashboard) return <div className="p-10">No dashboard data</div>;

  return (
    <div className="bg-gray-100 min-h-screen px-16 py-12 space-y-10">
      {/* STATS */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-gray-500 text-sm">Renting Now</p>
          <p className="text-3xl font-semibold">
            {dashboard.currentRentals.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-gray-500 text-sm">My Listings</p>
          <p className="text-3xl font-semibold">
            {dashboard.myListings.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <p className="text-gray-500 text-sm">My Renters</p>
          <p className="text-3xl font-semibold">
            {dashboard.activeBookingsOnMyListings.length}
          </p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/equipment")}
          className="px-6 py-3 border rounded-xl hover:bg-gray-200"
        >
          Rent Equipment
        </button>

        <button
          onClick={() => navigate("/add-listing")}
          className="px-6 py-3 bg-green-600 text-white rounded-xl"
        >
          Add Listing
        </button>
      </div>

      {/* RENTING NOW */}
      <div className="bg-white p-8 rounded-3xl border">
        <h2 className="text-lg font-semibold mb-6">Renting Now</h2>

        {dashboard.currentRentals.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border rounded-lg px-4 py-3 mb-3"
          >
            <div>
              <p className="font-medium">{item.productName}</p>
              <p className="text-gray-500 text-sm">
                ₹{item.totalPrice} | {item.status}
              </p>
            </div>
            <button
              onClick={() => cancelBooking(item.id)}
              className="text-red-500 text-sm"
            >
              Cancel
            </button>
          </div>
        ))}
      </div>

      {/* MY LISTINGS */}
      <div className="bg-white p-8 rounded-3xl border">
        <h2 className="text-lg font-semibold mb-6">My Listings</h2>

        {dashboard.myListings.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border rounded-lg px-4 py-3 mb-3"
          >
            <div>
              <p className="font-medium">{item.templateName}</p>
              <p className="text-gray-500 text-sm">
                ₹{item.priceDay} | {item.status}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/edit-listing/${item.id}`)}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteListing(item.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MY RENTERS */}
      <div className="bg-white p-8 rounded-3xl border">
        <h2 className="text-lg font-semibold mb-6">
          Active Rentals On My Listings
        </h2>

        {dashboard.activeBookingsOnMyListings.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border rounded-lg px-4 py-3 mb-3"
          >
            <div>
              <p className="font-medium">{item.productName}</p>
              <p className="text-gray-500 text-sm">Renter: {item.renterName}</p>
            </div>
            <button
              onClick={() => completeBooking(item.id)}
              className="text-green-600 text-sm"
            >
              Mark Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
