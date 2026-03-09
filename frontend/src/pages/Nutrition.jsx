import Card from "../components/Card";

export default function NutritionPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Nutrition overview
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Aggregate insights from your scanned meals will appear here.
        </p>
      </section>

      <Card>
        <p className="text-sm font-medium text-slate-800">
          Nutrition analytics coming soon
        </p>
        <p className="mt-1 text-xs text-slate-500">
          You&apos;ll soon be able to see macro trends, calorie history, and energy balance
          directly from this view.
        </p>
      </Card>
    </div>
  );
}

