import { Metadata } from 'next';
import { SectionHeading } from '@/components/section-heading';
import { ServicesSection } from '@/components/services-section';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata('Services', 'Explore the services offered by this premium local business.', '/services');

export default function ServicesPage() {
  return (
    <>
      <section className="surface py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Services" title="A proper services page, not just homepage cards" description="This page lets each generated site feel more complete and gives you room for richer service copy later." />
        </div>
      </section>
      <ServicesSection />
    </>
  );
}
