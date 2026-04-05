import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CtaBanner } from '@/components/cta-banner';
import { SectionHeading } from '@/components/section-heading';
import { buildMetadata } from '@/lib/metadata';
import { getAreaBySlug, siteConfig } from '@/lib/site-config';

export function generateStaticParams() {
  return siteConfig.coverage.areas.map((area) => ({
    slug: area.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return buildMetadata();
  return buildMetadata(
    `${siteConfig.brand.industry} in ${area} | ${siteConfig.brand.name}`,
    `${siteConfig.brand.name} provides ${siteConfig.brand.industry.toLowerCase()} services in ${area} with fast response and premium presentation.`,
    `/areas/${slug}`
  );
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  return (
    <>
      <section className="surface py-24">
        <div className="section-shell">
          <SectionHeading eyebrow="Local page" title={`${siteConfig.brand.industry} services in ${area}`} description={`${siteConfig.brand.name} serves ${area} with local-first positioning, stronger SEO depth and a page structure ready for future expansion.`} />
          <div className="mt-12 rounded-[2rem] border line surface-2 p-10 shadow-premium">
            <p className="text-xl leading-9 text-muted">This area page is here so your generator can scale beyond one-page sites. Duplicate the pattern for more towns, services or service-area combinations.</p>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
