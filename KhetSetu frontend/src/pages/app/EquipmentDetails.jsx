import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stock from "../../assets/stock.jpg";

export default function EquipmentDetails() {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    // ==========================================
    // TODO:
    // GET `${baseUrl}/api/equipment/${id}`
    //
    // headers: {
    //   Authorization: Bearer token
    // }
    // credentials: "include"
    //
    // setEquipment(responseData)
    // ==========================================

    // Temporary static example
    setEquipment({
      id,
      name: "Tractor",
      description:
        "High-power tractor suitable for large farms and heavy-duty ploughing.",
      price: 2000,
      owner: "Ramesh Kumar",
      contact: "Available via platform booking",
      image: stock,
    });
  }, [id]);

  if (!equipment) return <div className="p-16">Loading...</div>;

  return (
    <div className="px-16 py-12 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-3xl p-10 border grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Image */}
        <div className="h-96 bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={equipment.image}
            alt={equipment.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold">{equipment.name}</h1>

            <p className="text-gray-600 mt-6 leading-relaxed">
              {equipment.description}
            </p>

            <div className="mt-8 space-y-3 text-sm text-gray-600">
              <p>
                <strong>Owner:</strong> {equipment.owner}
              </p>
              <p>
                <strong>Contact:</strong> {equipment.contact}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-2xl font-semibold text-green-600 mb-6">
              ₹{equipment.price} / day
            </p>

            <button
              className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              onClick={() => {
                // ==========================================
                // TODO:
                // POST `${baseUrl}/api/booking`
                // body: { equipmentId: id }
                // ==========================================
              }}
            >
              Confirm Rent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
