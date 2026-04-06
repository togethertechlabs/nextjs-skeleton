import { Container, DarkCard, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

function TestimonialsA() {
  return (
    <section className="bg-shell py-24 text-white">
      <Container>
        <SectionHeading
          eyebrow={siteConfig.testimonials.eyebrow}
          title={siteConfig.testimonials.heading}
          description={siteConfig.testimonials.body}
          invert
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {siteConfig.testimonials.items.map((item) => (
            <DarkCard key={item.name} className="p-10">
              <div className="text-primary">5-star review</div>
              <p className="mt-8 text-3xl leading-tight text-white/90">"{item.quote}"</p>
              <p className="mt-10 text-lg uppercase tracking-[0.3em] text-white/55">{item.name}</p>
            </DarkCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialsB() {
  return (
    <section className="bg-panel py-24">
      <Container>
        <SectionHeading
          eyebrow={siteConfig.testimonials.eyebrow}
          title={siteConfig.testimonials.heading}
          description={siteConfig.testimonials.body}
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {siteConfig.testimonials.items.map((item, index) => (
            <article key={item.name} className="rounded-[2rem] border border-line bg-white p-8 shadow-soft">
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

export function TestimonialsSection() {
  return siteConfig.layout.testimonialsVariant === "testimonials-b" ? <TestimonialsB /> : <TestimonialsA />;
}
