import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import FoodUpload from "./FoodUpload";
import NutritionResultCard from "./NutritionResultCard";
import ProfileForm from "./ProfileForm";
import { useState } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [analysis, setAnalysis] = useState(null);
  const navigate = useNavigate();

  const initials =
    user?.name
      ?.split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "FF";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 md:px-8 md:py-6">

        {/* TOP NAV */}
        <nav className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur md:mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold text-white">
              FF
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                FitFlow AI
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Nutrition Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden text-right text-xs text-slate-600 sm:block">
                <p className="font-medium text-slate-800">{user.name}</p>
                <p className="text-slate-500">{user.email}</p>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/90 text-xs font-semibold text-slate-50">
                {initials}
              </div>
              <button
                onClick={handleLogout}
                className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md sm:inline-flex"
              >
                Log out
              </button>
            </div>
          </div>
        </nav>

        {/* HERO HEADER */}
        <header className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
              AI Food Scanner · Live preview
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              AI-powered nutrition intelligence
            </h1>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              Upload a photo, see macros, and tailor insights to your body in seconds.
            </p>
          </div>
        </header>

        {/* MAIN DASHBOARD */}
        <main className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* LEFT · HERO AI FOOD SCANNER */}
          <FoodUpload onAnalysis={setAnalysis} />

          {/* RIGHT · AI NUTRITION RESULT */}
          <NutritionResultCard analysis={analysis} />
        </main>

        {/* PROFILE */}
        <section className="mt-8 md:mt-10">
          <ProfileForm />
        </section>

        {/* MOBILE LOGOUT BUTTON */}
        <div className="mt-6 flex justify-center sm:hidden">
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

