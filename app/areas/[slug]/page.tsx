import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Card, Container, SectionHeading } from "@/components/ui";
import {
  getAreaBySlug,
  getAreaIntro,
  getAreaName,
  getAreaSlug,
  getAreaSummary,
  siteConfig
} from "@/lib/site-config";

export function generateStaticParams() {
  return siteConfig.coverage.areas.map((area) => ({
    slug: getAreaSlug(area)
  }));
}

export default async function AreaPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) notFound();

  return (
    <PageShell>
      <section className="bg-white py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHeading
              eyebrow="Coverage Area"
              title={`${siteConfig.brand.name} in ${getAreaName(area)}`}
              description={getAreaIntro(area)}
            />
          </div>

          <Card className="p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-muted">Local summary</p>
            <h2 className="mt-4 text-3xl font-black text-ink">{getAreaName(area)}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{getAreaSummary(area)}</p>
          </Card>
        </Container>
      </section>
    </PageShell>
  );
}
