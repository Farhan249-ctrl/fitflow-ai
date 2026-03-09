export default function NutritionResultCard({ analysis }) {
  const calories = Number(analysis?.calories ?? 0);
  const protein = Number(analysis?.protein ?? 0);
  const carbs = Number(analysis?.carbs ?? 0);
  const fat = Number(analysis?.fat ?? 0);

  const totalMacros = protein + carbs + fat || 1;

  const proteinPct = Math.round((protein / totalMacros) * 100);
  const carbsPct = Math.round((carbs / totalMacros) * 100);
  const fatPct = Math.round((fat / totalMacros) * 100);

  const MacroBar = ({ label, grams, percent, colorClass }) => (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">
          {grams}g · {percent}%
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  );

  return (
    <section className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md md:p-6">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            AI Nutrition Result
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Visual breakdown of your meal&apos;s macros.
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-100">
          {analysis ? "Analyzed" : "Waiting for image"}
        </span>
      </header>

      {!analysis ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-10 text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/5 text-slate-700">
            <span className="text-lg">📊</span>
          </div>
          <p className="text-sm font-medium text-slate-800">
            No analysis yet
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Upload a meal photo on the left to see AI-powered nutrition insights.
          </p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col justify-between gap-6">
          {/* Top: Calories + Food name */}
          <div className="rounded-xl bg-slate-900 text-slate-50 px-4 py-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Estimated Calories
            </p>
            <div className="mt-2 flex items-end gap-3">
              <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {calories}
                <span className="ml-1 text-sm font-normal text-slate-300">
                  kcal
                </span>
              </p>
              <p className="text-xs text-slate-300">
                for{" "}
                <span className="font-medium text-slate-50">
                  {analysis.food || "your meal"}
                </span>
              </p>
            </div>
          </div>

          {/* Middle: Macro bars */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Macronutrient profile</span>
              <span>
                Total {Math.round(totalMacros)}g · 100%
              </span>
            </div>
            <div className="space-y-3">
              <MacroBar
                label="Protein"
                grams={protein}
                percent={proteinPct}
                colorClass="bg-emerald-500"
              />
              <MacroBar
                label="Carbs"
                grams={carbs}
                percent={carbsPct}
                colorClass="bg-sky-500"
              />
              <MacroBar
                label="Fat"
                grams={fat}
                percent={fatPct}
                colorClass="bg-amber-500"
              />
            </div>
          </div>

          {/* Bottom: Tags / summary */}
          <div className="mt-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
            <p className="mb-2 font-medium text-slate-700">AI summary</p>
            <div className="flex flex-wrap gap-2">
              {protein >= 20 && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                  High protein
                </span>
              )}
              {fat >= carbs && (
                <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-700 ring-1 ring-amber-100">
                  Higher fat
                </span>
              )}
              {calories > 600 && (
                <span className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-700 ring-1 ring-rose-100">
                  Calorie dense
                </span>
              )}
              <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-100">
                Estimates are approximate – confirm with a nutritionist.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

