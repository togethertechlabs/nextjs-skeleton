export default function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 h-1.5 w-16 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
      <h3 className="text-2xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
    </div>
  );
}
