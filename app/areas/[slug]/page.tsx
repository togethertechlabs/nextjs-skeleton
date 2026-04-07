import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { Card, Container, SectionHeading } from "@/components/ui";
import { buildPageMetadata } from "@/lib/metadata";
import { getAreaBySlug, getAreaSlug, siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return siteConfig.coverage.areas.map((area) => ({
    slug: getAreaSlug(area)
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    return buildPageMetadata({
      title: `Area not found | ${siteConfig.brand.name}`,
      path: `/areas/${slug}`
    });
  }

  return buildPageMetadata({
    title: `${siteConfig.brand.name} in ${area.name}`,
    description: area.intro,
    path: `/areas/${area.slug}`
  });
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
      <section className="industry-section bg-white py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <SectionHeading eyebrow="Coverage area" title={`${siteConfig.brand.name} in ${area.name}`} description={area.intro} />
          </div>

          <Card className="p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-muted">Local summary</p>
            <h2 className="industry-heading mt-4 text-3xl font-black text-ink">{area.name}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{area.summary}</p>
          </Card>
        </Container>
      </section>
    </PageShell>
  );
}
