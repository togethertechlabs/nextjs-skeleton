import { Container, DarkCard, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { resolveModuleStyling, type ResolvedModuleStyling } from "@/lib/module-styling";
import { siteBranding } from "@/lib/site-branding";
import type { TestimonialsVariant } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";

type TestimonialsSectionProps = {
  variantOverride?: TestimonialsVariant;
  spacingClassName?: string;
  spacing?: ResolvedModuleSpacing;
  styling?: ResolvedModuleStyling;
};

function getDefaultTestimonialsSpacing() {
  return resolveModuleSpacing({
    current: "testimonials",
    designDominance: siteBranding.designDominance,
    premiumMode: siteBranding.premiumMode,
    contentDensity: siteBranding.contentDensity
  });
}

function getDefaultTestimonialsStyling() {
  return resolveModuleStyling({
    current: "testimonials",
    branding: siteBranding
  });
}

function TestimonialsA({
  spacingClassName = "",
  spacing,
  styling
}: {
  spacingClassName: string;
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass} ${spacingClassName}`}>
      <Container>
        <SectionHeading
          eyebrow={siteConfig.testimonials.eyebrow}
          title={siteConfig.testimonials.heading}
          description={siteConfig.testimonials.body}
          eyebrowClassName={styling.eyebrowClass}
          titleClassName={styling.titleClass}
          descriptionClassName={styling.bodyClass}
        />

        <div className={`module-grid ${spacing.gridClass} ${spacing.leadClass} grid md:grid-cols-2`}>
          {siteConfig.testimonials.items.map((item) => (
            <DarkCard key={item.name} className={`industry-testimonial-card ${styling.cardClass} ${spacing.cardClass} module-card-pad`}>
              <div className={`industry-eyebrow ${styling.eyebrowClass}`}>5-star review</div>
              <p className={`${styling.titleClass} mt-6 text-3xl leading-tight`}>"{item.quote}"</p>
              <p className={`${styling.mutedClass} mt-8 text-lg uppercase tracking-[0.3em]`}>{item.name}</p>
            </DarkCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialsB({
  spacingClassName = "",
  spacing,
  styling
}: {
  spacingClassName: string;
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass} ${spacingClassName}`}>
      <Container>
        <SectionHeading
          eyebrow={siteConfig.testimonials.eyebrow}
          title={siteConfig.testimonials.heading}
          description={siteConfig.testimonials.body}
          eyebrowClassName={styling.eyebrowClass}
          titleClassName={styling.titleClass}
          descriptionClassName={styling.bodyClass}
        />

        <div className={`module-grid ${spacing.gridClass} ${spacing.leadClass} grid md:grid-cols-2`}>
          {siteConfig.testimonials.items.map((item, index) => (
            <article key={item.name} className={`industry-testimonial-card ${styling.cardClass} ${spacing.cardClass} module-card-pad rounded-[2rem] border shadow-soft`}>
              <div className="flex items-center justify-between">
                <p className={`${styling.mutedClass} text-sm uppercase tracking-[0.35em]`}>Review 0{index + 1}</p>
                <p className={`${styling.accentClass} font-black`}>5.0</p>
              </div>
              <p className={`${styling.bodyClass} mt-5 text-xl leading-8`}>"{item.quote}"</p>
              <p className={`${styling.titleClass} mt-5 text-lg font-black`}>{item.name}</p>
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
  spacing = getDefaultTestimonialsSpacing(),
  styling = getDefaultTestimonialsStyling()
}: TestimonialsSectionProps) {
  const variant = variantOverride || siteConfig.layout.testimonialsVariant;

  return variant === "testimonials-b"
    ? <TestimonialsB spacing={spacing} spacingClassName={spacingClassName} styling={styling} />
    : <TestimonialsA spacing={spacing} spacingClassName={spacingClassName} styling={styling} />;
}
