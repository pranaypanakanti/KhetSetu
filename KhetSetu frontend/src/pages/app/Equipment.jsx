import React, { useEffect, useState } from "react";
import EquipmentCard from "../../components/app_components/EquipmentCard";

export default function Equipment() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [equipments, setEquipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEquipments = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const trimmedQuery = searchQuery.trim();

      const url = `${baseUrl}/api/products/search?query=${encodeURIComponent(
        trimmedQuery,
      )}`;

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Backend error:", data);
        setError("Failed to fetch products");
        setEquipments([]);
        return;
      }

      setEquipments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error");
      setEquipments([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Auto search only when input has value
  useEffect(() => {
    const trimmed = searchQuery.trim();

    if (!trimmed) {
      setEquipments([]);
      setLoading(false);
      return;
    }

    const debounce = setTimeout(() => {
      fetchEquipments();
    }, 400);

    return () => clearTimeout(debounce);
  }, [searchQuery, category]);

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
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* No Results */}
      {searchQuery.trim() && !loading && !error && equipments.length === 0 && (
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
