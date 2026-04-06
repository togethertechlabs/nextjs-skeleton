import { Container, PrimaryButton, SecondaryButton, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

function CtaA() {
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

function CtaB() {
  return (
    <section className="bg-panel py-24">
      <Container className="grid gap-8 rounded-[2.5rem] border border-line bg-shell px-10 py-14 text-white shadow-glow lg:grid-cols-[0.7fr_0.3fr] lg:items-center lg:px-12">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-accent">{siteConfig.cta.eyebrow}</p>
          <h2 className="mt-6 text-5xl font-black tracking-tight">{siteConfig.cta.heading}</h2>
          <p className="mt-5 max-w-2xl text-xl leading-9 text-white/75">{siteConfig.cta.body}</p>
        </div>
        <div className="flex justify-start lg:justify-end">
          <PrimaryButton href="/contact">{siteConfig.cta.button}</PrimaryButton>
        </div>
      </Container>
    </section>
  );
}

function CtaC() {
  return (
    <section className="bg-panel py-24">
      <Container>
        <div className="grid gap-8 rounded-[2.5rem] border border-line bg-white p-10 shadow-soft lg:grid-cols-[0.55fr_0.45fr] lg:items-center lg:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-accent">{siteConfig.cta.eyebrow}</p>
            <h2 className="mt-6 text-5xl font-black tracking-tight text-ink">{siteConfig.cta.heading}</h2>
            <p className="mt-5 max-w-2xl text-xl leading-9 text-muted">{siteConfig.cta.body}</p>
          </div>
          <div className="rounded-[2rem] bg-shell p-8 text-white shadow-glow">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Call</p>
            <p className="mt-3 text-3xl font-black">{siteConfig.brand.phone}</p>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/60">Email</p>
            <p className="mt-3 text-xl font-semibold">{siteConfig.brand.email}</p>
            <div className="mt-8">
              <PrimaryButton href="/contact">{siteConfig.cta.button}</PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CtaSection() {
  switch (siteConfig.layout.ctaVariant) {
    case "cta-b":
      return <CtaB />;
    case "cta-c":
      return <CtaC />;
    default:
      return <CtaA />;
  }
}
