import { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    goal: "Fat Loss",
    level: "Beginner",
    condition: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Profile:", formData);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        Profile Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          name="weight"
          type="number"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-lg p-3"
        >
          <option>Fat Loss</option>
          <option>Muscle Gain</option>
          <option>Endurance</option>
        </select>

        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-lg p-3"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <input
          name="condition"
          type="text"
          placeholder="Medical Condition"
          value={formData.condition}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Save Profile
        </button>

      </form>
    </div>
  );
}