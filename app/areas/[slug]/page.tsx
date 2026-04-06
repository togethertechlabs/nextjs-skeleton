import { notFound } from 'next/navigation';
import { PageShell } from '@/components/page-shell';
import { Container, SectionHeading, Card } from '@/components/ui';
import { getAreaBySlug, siteConfig } from '@/lib/site-config';

function areaToSlug(
  area: string | { slug?: string; name: string; summary?: string; intro?: string }
) {
  if (typeof area === 'string') {
    return area.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  if (area.slug) {
    return area.slug;
  }

  return area.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function areaToName(
  area: string | { slug?: string; name: string; summary?: string; intro?: string }
) {
  return typeof area === 'string' ? area : area.name;
}

function areaToSummary(
  area: string | { slug?: string; name: string; summary?: string; intro?: string }
) {
  if (typeof area === 'string') {
    return `${siteConfig.brand.name} provides trusted services in ${area}.`;
  }

  return area.summary || `${siteConfig.brand.name} provides trusted services in ${area.name}.`;
}

function areaToIntro(
  area: string | { slug?: string; name: string; summary?: string; intro?: string }
) {
  if (typeof area === 'string') {
    return `${siteConfig.brand.name} supports customers across ${area} with reliable service, strong presentation and local expertise.`;
  }

  return (
    area.intro ||
    `${siteConfig.brand.name} supports customers across ${area.name} with reliable service, strong presentation and local expertise.`
  );
}

export function generateStaticParams() {
  return siteConfig.coverage.areas.map((area) => ({
    slug: areaToSlug(area)
  }));
}

export default async function AreaPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const areaName = areaToName(area);
  const areaSummary = areaToSummary(area);
  const areaIntro = areaToIntro(area);

  return (
    <PageShell>
      <section className="bg-white py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHeading
              eyebrow="Coverage Area"
              title={`${siteConfig.brand.name} in ${areaName}`}
              body={areaIntro}
            />
          </div>

          <Card className="p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-muted">Local summary</p>
            <h2 className="mt-4 text-3xl font-black text-ink">{areaName}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{areaSummary}</p>
          </Card>
        </Container>
      </section>
    </PageShell>
  );
}