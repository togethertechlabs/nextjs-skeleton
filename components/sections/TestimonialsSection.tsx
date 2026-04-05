import { SiteConfig } from '@/lib/types';
import { getTheme } from '@/lib/theme';
import SectionHeading from '@/components/ui/SectionHeading';
import TestimonialCard from '@/components/ui/TestimonialCard';

export default function TestimonialsSection({ config }: { config: SiteConfig }) {
  const theme = getTheme(config.brand.theme);
  return (
    <section className="section-spacing bg-slate-950 text-white" style={{ ['--primary' as string]: theme.primary }}>
      <div className="section-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="Proof that builds trust quickly"
          description="Short, clean testimonials help the site feel established and sales-ready from day one."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {config.testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
