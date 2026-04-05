export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <div className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-amber-500">{eyebrow}</div> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p> : null}
    </div>
  );
}
