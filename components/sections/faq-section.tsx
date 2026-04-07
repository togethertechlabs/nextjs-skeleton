import { Card, Container, SectionHeading } from "@/components/ui";
import { resolveModuleSpacing, type ResolvedModuleSpacing } from "@/lib/module-spacing";
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

function FaqA({ spacing }: { spacing: ResolvedModuleSpacing }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-white`}>
      <Container>
        <SectionHeading eyebrow={siteConfig.faq.eyebrow} title={siteConfig.faq.heading} description={siteConfig.faq.body} />

        <div className={`${spacing.leadClass} module-stack ${spacing.innerClass}`}>
          {siteConfig.faq.items.map((item) => (
            <Card key={item.question} className={`${spacing.cardClass} module-card-pad`}>
              <h3 className="text-2xl font-black text-ink">{item.question}</h3>
              <p className="mt-3 text-lg leading-8 text-muted">{item.answer}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqB({ spacing }: { spacing: ResolvedModuleSpacing }) {
  return (
    <section className={`module-section ${spacing.wrapperClass} bg-panel`}>
      <Container className={`module-grid ${spacing.gridClass} grid lg:grid-cols-[0.4fr_0.6fr]`}>
        <SectionHeading eyebrow={siteConfig.faq.eyebrow} title={siteConfig.faq.heading} description={siteConfig.faq.body} />

        <div className={`module-stack ${spacing.innerClass}`}>
          {siteConfig.faq.items.map((item, index) => (
            <details key={item.question} className={`module-card-pad ${spacing.cardClass} rounded-[1.75rem] border border-line bg-white shadow-soft`} open={index === 0}>
              <summary className="cursor-pointer list-none text-xl font-black text-ink">{item.question}</summary>
              <p className="mt-3 text-base leading-8 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FaqSection({ spacing = getDefaultFaqSpacing() }: { spacing?: ResolvedModuleSpacing }) {
  return siteConfig.layout.faqVariant === "faq-b" ? <FaqB spacing={spacing} /> : <FaqA spacing={spacing} />;
}
