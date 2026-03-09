export default function Card({ className = "", children }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}

