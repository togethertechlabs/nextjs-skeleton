import { SiteConfig } from '@/lib/types';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';

export default function ServicesSection({ config }: { config: SiteConfig }) {
  return (
    <section id="services" className="section-spacing bg-slate-100">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services"
          title="Premium support built around uptime"
          description="High-trust, high-response service positioning with cards designed to feel more agency-built than starter-template."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {config.services.map((service) => (
            <ServiceCard key={service.title} title={service.title} description={service.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
