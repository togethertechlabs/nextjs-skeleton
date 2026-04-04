import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

type HeroProps = {
  siteName: string;
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export default function Hero({ siteName, hero }: HeroProps) {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            {siteName}
          </p>
          <h1 className="text-5xl font-bold leading-tight">{hero.headline}</h1>
          <p className="mt-6 text-lg text-gray-600">{hero.subheadline}</p>
          <div className="mt-8 flex gap-4">
            <Button>{hero.primaryCta}</Button>
            <Button>{hero.secondaryCta}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
