import ProfileForm from "./ProfileForm";
import FoodUpload from "./FoodUpload";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex justify-center py-16">
      <div className="w-full max-w-3xl space-y-10">

        {/* HEADER */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            FitFlow AI
          </h1>
          <p className="text-slate-500 mt-2">
            Intelligent fitness analysis powered by AI
          </p>
        </header>

        {/* PROFILE */}
        <ProfileForm />

        {/* FOOD ANALYSIS */}
        <FoodUpload />

      </div>
    </div>
  );
}