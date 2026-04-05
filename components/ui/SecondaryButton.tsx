export default function SecondaryButton({ label, href = '#' }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
    >
      {label}
    </a>
  );
}
