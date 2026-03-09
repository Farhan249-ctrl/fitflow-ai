import Card from "../components/Card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Configure your FitFlow AI experience: units, notifications, and integrations.
        </p>
      </section>

      <Card>
        <p className="text-sm font-medium text-slate-800">
          Settings dashboard coming soon
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Account preferences, integrations, and notification controls will appear here.
        </p>
      </Card>
    </div>
  );
}

