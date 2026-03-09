import { useState } from "react";
import FoodUploadZone from "../components/FoodUploadZone";
import NutritionResultCard from "../NutritionResultCard";

export default function FoodScannerPage() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          AI Food Scanner
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Upload a photo, see macros, and understand how each meal fits your goals.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <FoodUploadZone onAnalysis={setAnalysis} />
        <NutritionResultCard analysis={analysis} />
      </div>
    </div>
  );
}

