import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const API_BASE = "http://127.0.0.1:8000";

export default function ProfileForm() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    goal: "Fat Loss",
    fitness_level: "Beginner",
    medical_condition: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProfile() {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to load profile");
        }
        const data = await res.json();
        if (!cancelled) {
          setFormData({
            age: data.age ?? "",
            weight: data.weight ?? "",
            goal: data.goal || "Fat Loss",
            fitness_level: data.fitness_level || "Beginner",
            medical_condition: data.medical_condition || "",
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load profile");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          age: formData.age ? Number(formData.age) : null,
          weight: formData.weight ? Number(formData.weight) : null,
          goal: formData.goal,
          fitness_level: formData.fitness_level,
          medical_condition: formData.medical_condition,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      await res.json();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="group rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md md:p-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Profile
          </p>
          <h2 className="mt-1 text-sm font-medium text-slate-900 sm:text-base">
            Training & health baseline
          </h2>
        </div>
        <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200 sm:inline-flex">
          Personalizes your AI insights
        </span>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div className="space-y-1.5">
          <label
            htmlFor="age"
            className="text-xs font-medium text-slate-600"
          >
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="28"
            value={formData.age}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="weight"
            className="text-xs font-medium text-slate-600"
          >
            Weight (kg)
          </label>
          <input
            id="weight"
            name="weight"
            type="number"
            placeholder="72"
            value={formData.weight}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="goal"
            className="text-xs font-medium text-slate-600"
          >
            Primary goal
          </label>
          <select
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
          >
            <option>Fat Loss</option>
            <option>Muscle Gain</option>
            <option>Endurance</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="fitness_level"
            className="text-xs font-medium text-slate-600"
          >
            Fitness level
          </label>
          <select
            id="fitness_level"
            name="fitness_level"
            value={formData.fitness_level}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <label
            htmlFor="condition"
            className="text-xs font-medium text-slate-600"
          >
            Medical considerations
          </label>
          <input
            id="medical_condition"
            name="medical_condition"
            type="text"
            placeholder="e.g. asthma, knee pain, none"
            value={formData.medical_condition}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
          />
        </div>

        <div className="md:col-span-2 mt-2 flex flex-col gap-2">
          <button
            type="submit"
            disabled={saving || loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600 disabled:shadow-none disabled:transform-none"
          >
            {saving && (
              <span className="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {loading ? "Loading..." : saving ? "Saving..." : "Save profile"}
          </button>

          {success && (
            <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
              Profile updated successfully.
            </p>
          )}
          {error && (
            <p className="text-xs text-rose-700 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}