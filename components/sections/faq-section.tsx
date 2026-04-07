import { Card, Container, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
import { resolveModuleStyling, type ResolvedModuleStyling } from "@/lib/module-styling";
import { siteBranding } from "@/lib/site-branding";
import { siteConfig } from "@/lib/site-config";

function getDefaultFaqSpacing() {
  return resolveModuleSpacing({
    current: "faq",
    designDominance: siteBranding.designDominance,
    premiumMode: siteBranding.premiumMode,
    contentDensity: siteBranding.contentDensity
  });
}

function getDefaultFaqStyling() {
  return resolveModuleStyling({
    current: "faq",
    branding: siteBranding
  });
}

function FaqA({
  spacing,
  styling
}: {
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container>
        <SectionHeading
          eyebrow={siteConfig.faq.eyebrow}
          title={siteConfig.faq.heading}
          description={siteConfig.faq.body}
          eyebrowClassName={styling.eyebrowClass}
          titleClassName={styling.titleClass}
          descriptionClassName={styling.bodyClass}
        />

        <div className={`${spacing.leadClass} module-stack ${spacing.innerClass}`}>
          {siteConfig.faq.items.map((item) => (
            <Card key={item.question} className={`${styling.cardClass} ${spacing.cardClass} module-card-pad`}>
              <h3 className={`${styling.titleClass} text-2xl font-black`}>{item.question}</h3>
              <p className={`${styling.bodyClass} mt-3 text-lg leading-8`}>{item.answer}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqB({
  spacing,
  styling
}: {
  spacing: ResolvedModuleSpacing;
  styling: ResolvedModuleStyling;
}) {
  return (
    <section className={`module-section ${spacing.wrapperClass} ${styling.sectionClass}`}>
      <Container className={`module-grid ${spacing.gridClass} grid lg:grid-cols-[0.4fr_0.6fr]`}>
        <SectionHeading
          eyebrow={siteConfig.faq.eyebrow}
          title={siteConfig.faq.heading}
          description={siteConfig.faq.body}
          eyebrowClassName={styling.eyebrowClass}
          titleClassName={styling.titleClass}
          descriptionClassName={styling.bodyClass}
        />

        <div className={`module-stack ${spacing.innerClass}`}>
          {siteConfig.faq.items.map((item, index) => (
            <details key={item.question} className={`module-card ${styling.cardClass} module-card-pad ${spacing.cardClass} rounded-[1.75rem] border shadow-soft`} open={index === 0}>
              <summary className={`${styling.titleClass} cursor-pointer list-none text-xl font-black`}>{item.question}</summary>
              <p className={`${styling.bodyClass} mt-3 text-base leading-8`}>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FaqSection({
  spacing = getDefaultFaqSpacing(),
  styling = getDefaultFaqStyling()
}: {
  spacing?: ResolvedModuleSpacing;
  styling?: ResolvedModuleStyling;
}) {
  return siteConfig.layout.faqVariant === "faq-b"
    ? <FaqB spacing={spacing} styling={styling} />
    : <FaqA spacing={spacing} styling={styling} />;
}
