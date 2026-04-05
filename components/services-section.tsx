import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { siteConfig } from '@/lib/site-config';

function ServiceLink({ slug }: { slug: string }) {
  return <Link href={`/services#${slug}`} className="mt-6 inline-flex font-semibold" style={{ color: 'var(--primary)' }}>Learn more →</Link>;
}

function ServicesA() {
  return (
    <section className="surface py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Services" title="Premium support built around uptime" description="High-trust, high-response service positioning with cards designed to feel more agency-built than starter-template." />
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => (
            <article key={service.slug} className="overflow-hidden rounded-[2rem] border line surface-2 shadow-premium">
              <Image src={siteConfig.images.services[index] || siteConfig.images.services[0]} alt={service.title} width={800} height={500} className="h-56 w-full object-cover" />
              <div className="p-8">
                <h3 className="text-3xl font-black" style={{ color: 'var(--text)' }}>{service.title}</h3>
                <p className="mt-4 text-lg leading-8 text-muted">{service.description}</p>
                <ServiceLink slug={service.slug} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesB() {
  return (
    <section className="surface-2 py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Services" title="Structured for trust, speed and clarity" description="This variant introduces a stronger editorial layout while still relying on the same JSON content." />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => (
            <article key={service.slug} className="rounded-[2rem] border line surface p-5 shadow-premium">
              <div className="overflow-hidden rounded-[1.5rem]">
                <Image src={siteConfig.images.services[index] || siteConfig.images.services[0]} alt={service.title} width={800} height={500} className="h-48 w-full object-cover" />
              </div>
              <div className="px-2 pb-2 pt-6">
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent)' }}>Core service</p>
                <h3 className="mt-3 text-2xl font-black" style={{ color: 'var(--text)' }}>{service.title}</h3>
                <p className="mt-3 text-base leading-8 text-muted">{service.description}</p>
                <ServiceLink slug={service.slug} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesC() {
  return (
    <section className="surface py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.38fr_0.62fr]">
        <div>
          <SectionHeading eyebrow="Services" title="A stronger services layout for premium local businesses" description="Use this variant when you want more contrast between intro copy and the service cards themselves." />
        </div>
        <div className="grid gap-6">
          {siteConfig.services.map((service, index) => (
            <article key={service.slug} className="grid overflow-hidden rounded-[2rem] border line surface-2 shadow-premium md:grid-cols-[0.36fr_0.64fr]">
              <Image src={siteConfig.images.services[index] || siteConfig.images.services[0]} alt={service.title} width={800} height={500} className="h-full min-h-56 w-full object-cover" />
              <div className="p-8">
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent)' }}>Featured service</p>
                <h3 className="mt-4 text-3xl font-black" style={{ color: 'var(--text)' }}>{service.title}</h3>
                <p className="mt-4 text-lg leading-8 text-muted">{service.description}</p>
                <ServiceLink slug={service.slug} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  switch (siteConfig.layout.servicesVariant) {
    case 'services-b':
      return <ServicesB />;
    case 'services-c':
      return <ServicesC />;
    default:
      return <ServicesA />;
  }
}
