import { Container, DarkCard, SectionHeading } from "@/components/ui";
import { siteBranding } from "@/lib/site-branding";
import type { TestimonialsVariant } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";

type TestimonialsSectionProps = {
  variantOverride?: TestimonialsVariant;
  spacingClassName?: string;
};

function TestimonialsA({ spacingClassName = "" }: Pick<TestimonialsSectionProps, "spacingClassName">) {
  return (
    <section className={`bg-shell py-24 text-white ${spacingClassName}`}>
      <Container>
        <SectionHeading
          eyebrow={siteConfig.testimonials.eyebrow}
          title={siteConfig.testimonials.heading}
          description={siteConfig.testimonials.body}
          invert
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {siteConfig.testimonials.items.map((item) => (
            <DarkCard key={item.name} className="industry-testimonial-card p-10">
              <div className="industry-eyebrow text-primary">5-star review</div>
              <p className="mt-8 text-3xl leading-tight text-white/90">"{item.quote}"</p>
              <p className="mt-10 text-lg uppercase tracking-[0.3em] text-white/55">{item.name}</p>
            </DarkCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialsB({ spacingClassName = "" }: Pick<TestimonialsSectionProps, "spacingClassName">) {
  return (
    <section className={`bg-panel py-24 ${spacingClassName}`}>
      <Container>
        <SectionHeading
          eyebrow={siteConfig.testimonials.eyebrow}
          title={siteConfig.testimonials.heading}
          description={siteConfig.testimonials.body}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {siteConfig.testimonials.items.map((item, index) => (
            <article key={item.name} className="industry-testimonial-card rounded-[2rem] border border-line bg-white p-8 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.35em] text-muted">Review 0{index + 1}</p>
                <p className="font-black text-primary">5.0</p>
              </div>
              <p className="mt-6 text-xl leading-9 text-muted">"{item.quote}"</p>
              <p className="mt-6 text-lg font-black text-ink">{item.name}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsSection({
  variantOverride,
  spacingClassName
}: TestimonialsSectionProps) {
  const variant = variantOverride || siteConfig.layout.testimonialsVariant;

  return variant === "testimonials-b"
    ? <TestimonialsB spacingClassName={spacingClassName} />
    : <TestimonialsA spacingClassName={spacingClassName} />;
}
