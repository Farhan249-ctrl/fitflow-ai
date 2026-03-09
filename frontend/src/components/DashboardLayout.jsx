import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl gap-0 px-4 py-4 md:px-6 md:py-6 lg:px-8">
        <Sidebar />

        <div className="flex min-h-full flex-1 flex-col lg:pl-4">
          <Navbar />
          <main className="flex-1 pb-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

