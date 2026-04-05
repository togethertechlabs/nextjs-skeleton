import { Metadata } from 'next';
import { AboutSection } from '@/components/about-section';
import { CtaBanner } from '@/components/cta-banner';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata('About', 'Learn more about this premium local business.', '/about');

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <CtaBanner />
    </>
  );
}
