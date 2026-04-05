import { Metadata } from 'next';
import { CoverageSection } from '@/components/coverage-section';
import { CtaBanner } from '@/components/cta-banner';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata('Coverage', 'See the towns and areas covered by this business.', '/coverage');

export default function CoveragePage() {
  return (
    <>
      <CoverageSection />
      <CtaBanner />
    </>
  );
}
