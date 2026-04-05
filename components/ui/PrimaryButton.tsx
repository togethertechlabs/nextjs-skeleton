export default function PrimaryButton({ label, href = '#' }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold text-slate-950 shadow-glow transition hover:-translate-y-0.5"
      style={{ backgroundColor: 'var(--primary)' }}
    >
      {label}
    </a>
  );
}
