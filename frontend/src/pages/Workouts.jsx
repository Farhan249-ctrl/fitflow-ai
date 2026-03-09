import Card from "../components/Card";

export default function WorkoutsPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Workouts
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Log and track your training sessions. AI-powered workout plans will appear here.
        </p>
      </section>

      <Card>
        <p className="text-sm font-medium text-slate-800">
          Workout planner coming soon
        </p>
        <p className="mt-1 text-xs text-slate-500">
          FitFlow AI will soon recommend structured workouts tailored to your goals and
          recovery.
        </p>
      </Card>
    </div>
  );
}

