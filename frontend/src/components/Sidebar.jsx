import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/food-scanner", label: "AI Food Scanner", icon: "🍽️" },
  { to: "/workouts", label: "Workouts", icon: "💪" },
  { to: "/nutrition", label: "Nutrition", icon: "📊" },
  { to: "/profile", label: "Profile", icon: "👤" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-60 flex-col gap-4 border-r border-slate-200/80 bg-white/95 px-3 py-4 shadow-sm lg:flex">
      <div className="mb-4 flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold text-white">
          FF
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">FitFlow AI</p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
            Fitness Intelligence
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 text-sm">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-xl px-3 py-2.5 transition text-slate-600",
                isActive
                  ? "bg-slate-900 text-slate-50 shadow-sm"
                  : "hover:bg-slate-100",
              ].join(" ")
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

