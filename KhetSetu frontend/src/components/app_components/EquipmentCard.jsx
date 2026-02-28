import React from "react";
import { useNavigate } from "react-router-dom";

export default function EquipmentCard({ id, name, description, price, image }) {
  const navigate = useNavigate();

  return (
    <div className="border rounded-xl overflow-hidden bg-white transition hover:border-gray-400">
      <div className="h-52 bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="p-6 flex flex-col justify-between h-44">
        <div>
          <h2 className="text-lg font-medium">{name}</h2>
          <p className="text-sm text-gray-500 mt-2">{description}</p>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="font-semibold text-green-600">₹{price} / day</span>

          <button
            onClick={() => navigate(`/equipment/${id}`)}
            className="text-sm px-4 py-2 border rounded-md hover:bg-gray-100 transition"
          >
            Rent
          </button>
        </div>
      </div>
    </div>
  );
}
