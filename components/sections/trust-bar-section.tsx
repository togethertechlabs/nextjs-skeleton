import { Container, DarkCard } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

export function TrustBarSection() {
  return (
    <section className="bg-shell pb-14 text-white">
      <Container>
        <DarkCard className="industry-trust-grid grid gap-4 p-[var(--section-card-padding,var(--industry-card-padding))] md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.trustBar.map((item) => (
            <div key={item.label} className="industry-chip rounded-3xl border border-white/10 bg-white/5 p-[calc(var(--section-card-padding,var(--industry-card-padding))-0.35rem)]">
              <div className="industry-heading text-2xl font-black text-primary">{item.label}</div>
              <p className="mt-2.5 text-white/65">{item.subtext}</p>
            </div>
          ))}
        </DarkCard>
      </Container>
    </section>
  );
}
