import React, { useEffect, useState } from "react";
import EquipmentCard from "../../components/app_components/EquipmentCard";

export default function Equipment() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const [equipments, setEquipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEquipments = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Not authenticated");
        return;
      }

      const safeQuery = searchQuery ? searchQuery.trim() : "";

      const url = `${baseUrl}/api/products/search?query=${encodeURIComponent(safeQuery)}`;

      const res = await fetch(url, {
        method: "GET",
        credentials: "include", // important for refresh cookie
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 REQUIRED
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Backend error:", data);
        setError("Failed to fetch products");
        return;
      }

      setEquipments(data);
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  return (
    <div className="px-16 py-12">
      <h1 className="text-3xl font-semibold mb-6">Available Equipment</h1>

      {/* 🔍 Search + Filter */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Search equipment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-80"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="ALL">All Categories</option>
          <option value="FARM_EQUIPMENT">Farm Equipment</option>
          <option value="IRRIGATION">Irrigation</option>
          <option value="TOOLS">Tools</option>
          <option value="VEHICLES">Vehicles</option>
          <option value="SEEDS">Seeds</option>
          <option value="FERTILIZERS">Fertilizers</option>
          <option value="OTHER">Other</option>
        </select>

        <button
          onClick={fetchEquipments}
          className="px-6 py-2 bg-sky-600 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && equipments.length === 0 && (
        <p>No products found.</p>
      )}

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {equipments.map((item) => (
          <EquipmentCard
            key={item.id}
            id={item.id}
            name={item.templateName}
            description={item.description}
            price={item.priceDay}
            image={item.imageUrls?.[0]}
            owner={item.ownerName}
            distance={item.distanceKm}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
}
