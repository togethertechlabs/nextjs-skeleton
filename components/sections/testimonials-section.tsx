import { siteConfig } from "@/lib/site-config";
import { Container, DarkCard, SectionHeading } from "@/components/ui";

export function TestimonialsSection() {
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
              <div className="text-primary">★★★★★</div>
              <p className="mt-8 text-3xl leading-tight text-white/90">“{item.quote}”</p>
              <p className="mt-10 text-lg uppercase tracking-[0.3em] text-white/55">{item.name}</p>
            </DarkCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
