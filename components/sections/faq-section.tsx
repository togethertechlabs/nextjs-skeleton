import { siteConfig } from "@/lib/site-config";
import { Card, Container, SectionHeading } from "@/components/ui";

export function FaqSection() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow={siteConfig.faq.eyebrow}
          title={siteConfig.faq.heading}
          description={siteConfig.faq.body}
        />

        <div className="mt-14 space-y-5">
          {siteConfig.faq.items.map((item) => (
            <Card key={item.question} className="p-8">
              <h3 className="text-2xl font-black text-ink">{item.question}</h3>
              <p className="mt-4 text-lg leading-8 text-muted">{item.answer}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
