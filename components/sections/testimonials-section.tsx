import { Container, DarkCard, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { siteBranding } from "@/lib/site-branding";
import type { TestimonialsVariant } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";

type TestimonialsSectionProps = {
  variantOverride?: TestimonialsVariant;
  spacingClassName?: string;
  spacing?: ResolvedModuleSpacing;
};

function getDefaultTestimonialsSpacing() {
  return resolveModuleSpacing({
    current: "testimonials",
    designDominance: siteBranding.designDominance,
    premiumMode: siteBranding.premiumMode,
    contentDensity: siteBranding.contentDensity
  });
}

function TestimonialsA({
  spacingClassName = "",
  spacing
}: Required<Pick<TestimonialsSectionProps, "spacingClassName" | "spacing">>) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-shell text-white ${spacingClassName}`}>
      <Container>
        <SectionHeading
          eyebrow={siteConfig.testimonials.eyebrow}
          title={siteConfig.testimonials.heading}
          description={siteConfig.testimonials.body}
          invert
        />

        <div className={`module-grid ${spacing.gridClass} ${spacing.leadClass} grid md:grid-cols-2`}>
          {siteConfig.testimonials.items.map((item) => (
            <DarkCard key={item.name} className={`industry-testimonial-card ${spacing.cardClass} module-card-pad`}>
              <div className="industry-eyebrow text-primary">5-star review</div>
              <p className="mt-6 text-3xl leading-tight text-white/90">"{item.quote}"</p>
              <p className="mt-8 text-lg uppercase tracking-[0.3em] text-white/55">{item.name}</p>
            </DarkCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialsB({
  spacingClassName = "",
  spacing
}: Required<Pick<TestimonialsSectionProps, "spacingClassName" | "spacing">>) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-panel ${spacingClassName}`}>
      <Container>
        <SectionHeading
          eyebrow={siteConfig.testimonials.eyebrow}
          title={siteConfig.testimonials.heading}
          description={siteConfig.testimonials.body}
        />

        <div className={`module-grid ${spacing.gridClass} ${spacing.leadClass} grid md:grid-cols-2`}>
          {siteConfig.testimonials.items.map((item, index) => (
            <article key={item.name} className={`industry-testimonial-card ${spacing.cardClass} module-card-pad rounded-[2rem] border border-line bg-white shadow-soft`}>
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.35em] text-muted">Review 0{index + 1}</p>
                <p className="font-black text-primary">5.0</p>
              </div>
              <p className="mt-5 text-xl leading-8 text-muted">"{item.quote}"</p>
              <p className="mt-5 text-lg font-black text-ink">{item.name}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsSection({
  variantOverride,
  spacingClassName = "",
  spacing = getDefaultTestimonialsSpacing()
}: TestimonialsSectionProps) {
  const variant = variantOverride || siteConfig.layout.testimonialsVariant;

  return variant === "testimonials-b"
    ? <TestimonialsB spacing={spacing} spacingClassName={spacingClassName} />
    : <TestimonialsA spacing={spacing} spacingClassName={spacingClassName} />;
}
