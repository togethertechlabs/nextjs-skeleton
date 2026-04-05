export default function TestimonialCard({ name, quote }: { name: string; quote: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur">
      <div className="mb-5 text-xl" style={{ color: 'var(--primary)' }}>★★★★★</div>
      <p className="text-lg leading-8 text-slate-200">“{quote}”</p>
      <div className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">{name}</div>
    </div>
  );
}
