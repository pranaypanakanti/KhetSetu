import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddListing() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    templateId: "",
    description: "",
    condition: "Good",
    priceDay: "",
    maxRentalDistanceKm: 20,
  });

  // 🔥 Fetch Templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/public/templates`);
        const data = await res.json();
        setTemplates(data);
      } catch (err) {
        console.error("Template fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // 🔥 Handle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.templateId || !form.priceDay) {
      alert("Template and Price are required");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          templateId: form.templateId,
          description: form.description,
          condition: form.condition,
          priceDay: Number(form.priceDay),
          maxRentalDistanceKm: Number(form.maxRentalDistanceKm),
        }),
      });

      if (res.status === 201) {
        alert("Listing created successfully!");
        navigate("/dashboard");
      } else {
        const errorText = await res.text();
        console.log(errorText);
        alert("Failed to create listing");
      }
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen px-16 py-12">
      <div className="bg-white max-w-2xl mx-auto rounded-3xl p-10 border">
        <h1 className="text-2xl font-semibold mb-8">Add New Listing</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Template Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Equipment Template
            </label>
            <select
              name="templateId"
              value={form.templateId}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Equipment</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
              rows="3"
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block mb-2 text-sm font-medium">Condition</label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Price per Day (₹)
            </label>
            <input
              type="number"
              name="priceDay"
              value={form.priceDay}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Max Distance */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Max Rental Distance (Km)
            </label>
            <input
              type="number"
              name="maxRentalDistanceKm"
              value={form.maxRentalDistanceKm}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
}
