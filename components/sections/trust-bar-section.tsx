import { Container, DarkCard } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

export function TrustBarSection() {
  return (
    <section className="bg-shell pb-16 text-white">
      <Container>
        <DarkCard className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.trustBar.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-2xl font-black text-primary">{item.label}</div>
              <p className="mt-3 text-white/65">{item.subtext}</p>
            </div>
          ))}
        </DarkCard>
      </Container>
    </section>
  );
}
