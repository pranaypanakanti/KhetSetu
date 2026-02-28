import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [stats, setStats] = useState({
    rented: 2,
    listings: 1,
    bookings: 3,
  });

  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    // ==========================================
    // TODO:
    // GET `${baseUrl}/api/dashboard`
    // headers: Authorization Bearer token
    // credentials: "include"
    // Then populate stats & sections
    // ==========================================
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen px-16 py-12 space-y-10">
      {/* TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT BIG OVERVIEW CARD */}
        <div className="bg-white rounded-3xl p-8 border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Dashboard Overview</h2>
            <button className="text-sm border px-4 py-1 rounded-full">
              Weekly
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            <div>
              <p className="text-sm text-gray-500">Rented</p>
              <p className="text-3xl font-semibold mt-2">{stats.rented}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Listings</p>
              <p className="text-3xl font-semibold mt-2">{stats.listings}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Bookings</p>
              <p className="text-3xl font-semibold mt-2">{stats.bookings}</p>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="mt-10 h-40 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            Chart placeholder (Bookings Trend)
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="bg-white rounded-3xl p-8 border">
          <h2 className="text-xl font-semibold mb-6">Activity Breakdown</h2>

          <div className="h-40 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            Pie / Donut Chart Placeholder
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/equipment")}
          className="px-6 py-3 border rounded-xl hover:bg-gray-200 transition"
        >
          Rent Equipment
        </button>

        <button
          onClick={() => navigate("/add-listing")}
          className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          Add Listing
        </button>
      </div>

      {/* LOWER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT RENTALS */}
        <div className="bg-white rounded-3xl p-8 border">
          <h2 className="text-lg font-semibold mb-4">Recent Rentals</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Tractor - 12 Jan 2025</p>
            <p>• Seeder - 18 Jan 2025</p>
          </div>
        </div>

        {/* MY LISTINGS WITH THREE DOTS */}
        <div className="bg-white rounded-3xl p-8 border relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">My Listings</h2>
          </div>

          <div className="space-y-4 text-sm text-gray-600">
            {/* Example Listing */}
            <div className="flex justify-between items-center border rounded-lg px-4 py-3">
              <div>
                <p className="font-medium">Harvester</p>
                <p className="text-gray-500">₹3500/day</p>
              </div>

              {/* Three Dots */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(menuOpen === 1 ? null : 1)}
                  className="text-gray-500 hover:text-black text-xl"
                >
                  ⋮
                </button>

                {/* Dropdown */}
                {menuOpen === 1 && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg text-sm shadow-sm">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => navigate("/edit-listing")}
                    >
                      Edit
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      onClick={() => {
                        // TODO:
                        // DELETE `${baseUrl}/api/listing/{id}`
                        // headers: Authorization Bearer token
                        // credentials: "include"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
