type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold">{title}</h2>
      {subtitle ? <p className="mt-3 text-gray-600">{subtitle}</p> : null}
    </div>
  );
}
