import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import { siteConfig } from '@/lib/site-config';

export function ServicesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-mist py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Premium support built around uptime"
          description="High-trust, high-response service positioning with cards designed to feel more agency-built than starter-template."
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {siteConfig.services.map((service, index) => (
              <article
                key={service.slug || `${service.title}-${index}`}
                className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft">
              <Image
                src={siteConfig.images.services[index] || siteConfig.images.services[0]}
                alt={service.title}
                width={800}
                height={500}
                className="h-56 w-full object-cover"
              />
              <div className="p-8">
                <h3 className="text-3xl font-black text-ink">{service.title}</h3>
                <p className="mt-4 text-lg leading-8 text-slate-600">{service.description}</p>
                {!compact ? (
                  <Link
                    href={service.slug ? `/services#${service.slug}` : '/services'}
                    className="mt-6 inline-flex font-semibold text-blue-600">
                      Learn more →
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
