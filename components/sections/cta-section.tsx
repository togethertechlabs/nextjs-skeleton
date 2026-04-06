import { siteConfig } from "@/lib/site-config";
import { Container, PrimaryButton, SecondaryButton, SectionHeading } from "@/components/ui";

export function CtaSection() {
  return (
    <section className="bg-white pb-24">
      <Container>
        <div className="rounded-[2.5rem] bg-gradient-to-r from-slate-800 to-slate-300 p-10 text-white shadow-glow md:p-16">
          <SectionHeading
            eyebrow={siteConfig.cta.eyebrow}
            title={siteConfig.cta.heading}
            description={siteConfig.cta.body}
            invert
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton href="/contact">{siteConfig.cta.button}</PrimaryButton>
            <SecondaryButton href="/services">See services</SecondaryButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
