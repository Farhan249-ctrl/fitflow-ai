import ProfileForm from "../ProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Keep your training, body, and medical details up to date so FitFlow AI can
          personalize your plans.
        </p>
      </section>

      <ProfileForm />
    </div>
  );
}

