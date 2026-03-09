import Card from "../components/Card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Monitor your nutrition, workouts, and recovery in one place.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Today&apos;s calories
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">—</p>
          <p className="mt-1 text-xs text-slate-500">
            Track intake with the AI Food Scanner.
          </p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Activity
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">—</p>
          <p className="mt-1 text-xs text-slate-500">
            Connect workouts in the Workouts tab (coming soon).
          </p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Consistency
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">—</p>
          <p className="mt-1 text-xs text-slate-500">
            Your streak and trend insights will appear here.
          </p>
        </Card>
      </div>
    </div>
  );
}

