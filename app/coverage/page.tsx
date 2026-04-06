import { Metadata } from 'next';
import { CoverageSection } from '@/components/coverage-section';
import { CtaBanner } from '@/components/cta-banner';
import { buildMetadata } from '@/lib/metadata';

export const areaName = typeof area === 'string' ? area : area.name;
const areaSlug =
  typeof area === 'string'
    ? area.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : area.slug || area.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const areaSummary =
  typeof area === 'string'
    ? `${siteConfig.brand.name} provides trusted services in ${area}.`
    : area.summary || `${siteConfig.brand.name} provides trusted services in ${area.name}.`;

export default function CoveragePage() {
  return (
    <>
      <CoverageSection />
      <CtaBanner />
    </>
  );
}
