import React, { useEffect, useState } from "react";
import EquipmentCard from "../../components/app_components/EquipmentCard";
import stock from "../../assets/stock.jpg";

export default function Equipment() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [equipments, setEquipments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // =====================================================
    // TODO: Replace with backend API call
    //
    // GET `${baseUrl}/api/equipment`
    //
    // Optional (if backend supports search):
    // GET `${baseUrl}/api/equipment?search=${searchQuery}`
    //
    // Include:
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem("token")}`
    // }
    // credentials: "include"
    //
    // Then:
    // setEquipments(responseData)
    // =====================================================

    const staticData = [
      {
        id: 1,
        name: "Tractor",
        description: "High-power equipment suitable for large farms.",
        price: 2000,
        image: stock,
      },
      {
        id: 2,
        name: "Harvester",
        description: "Efficient harvesting machine for wheat & rice.",
        price: 3500,
        image: stock,
      },
      {
        id: 3,
        name: "Seeder",
        description: "Precision seeding equipment.",
        price: 1200,
        image: stock,
      },
    ];

    setEquipments(staticData);
  }, []);

  // 🔎 Temporary local filtering (until backend search is ready)
  const filteredEquipments = equipments.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="px-16 py-12">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Available Equipment
        </h1>
        <p className="text-gray-500 mt-2">
          Browse and rent equipment available in your region.
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search equipment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-96 px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredEquipments.length > 0 ? (
          filteredEquipments.map((item) => (
            <EquipmentCard
              key={item.id}
              id={item.id} //
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <div className="text-gray-500 text-sm col-span-full">
            No equipment found.
          </div>
        )}
      </div>
    </div>
  );
}
