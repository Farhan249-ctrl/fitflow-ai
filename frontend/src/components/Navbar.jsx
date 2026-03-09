import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
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
    <header className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur md:mb-8">
      <div className="flex flex-col">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Dashboard
        </p>
        <p className="mt-0.5 text-sm font-medium text-slate-900 sm:text-base">
          AI-powered fitness intelligence
        </p>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden text-right text-xs text-slate-600 sm:block">
            <p className="font-medium text-slate-800 line-clamp-1">
              {user.name}
            </p>
            <p className="text-slate-500 line-clamp-1">{user.email}</p>
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
    </header>
  );
}

