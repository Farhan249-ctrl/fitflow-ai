import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import DashboardLayout from "./components/DashboardLayout";
import DashboardPage from "./pages/Dashboard";
import FoodScannerPage from "./pages/FoodScanner";
import NutritionPage from "./pages/Nutrition";
import WorkoutsPage from "./pages/Workouts";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/Settings";

function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        <span className="inline-flex h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/food-scanner" element={<FoodScannerPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}