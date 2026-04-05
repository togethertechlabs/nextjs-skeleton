import { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';
import { SectionHeading } from '@/components/section-heading';
import { buildMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = buildMetadata('Contact', 'Get in touch for quotes, bookings and enquiries.', '/contact');

export default function ContactPage() {
  return (
    <section className="surface-2 py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Contact" title="Built-in contact page for higher trust" description="Turn the generated site into something that feels complete, local and ready for lead generation." />
          <div className="mt-10 space-y-5 rounded-[2rem] panel p-8 text-white shadow-premium">
            <p className="text-lg"><strong>Phone:</strong> {siteConfig.brand.phone}</p>
            <p className="text-lg"><strong>Email:</strong> {siteConfig.brand.email}</p>
            <p className="text-lg"><strong>Base:</strong> {siteConfig.brand.location}</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
