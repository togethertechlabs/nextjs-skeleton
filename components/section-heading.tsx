export function SectionHeading({
  eyebrow,
  title,
  description,
  invert = false
}: {
  eyebrow: string;
  title: string;
  description?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm uppercase tracking-[0.35em] ${invert ? 'text-[var(--accent)]' : 'text-[var(--accent)]'}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-5 text-4xl font-black tracking-tight sm:text-5xl ${invert ? 'text-white' : 'text-[var(--text)]'}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-lg leading-8 ${invert ? 'text-white/70' : 'text-[var(--muted)]'}`}>{description}</p>
      ) : null}
    </div>
  );
}
