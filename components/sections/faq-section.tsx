import { Card, Container, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

function FaqA() {
  return (
    <section className="bg-white py-24">
      <Container>
        <SectionHeading eyebrow={siteConfig.faq.eyebrow} title={siteConfig.faq.heading} description={siteConfig.faq.body} />

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

function FaqB() {
  return (
    <section className="bg-panel py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
        <SectionHeading eyebrow={siteConfig.faq.eyebrow} title={siteConfig.faq.heading} description={siteConfig.faq.body} />

        <div className="space-y-5">
          {siteConfig.faq.items.map((item, index) => (
            <details key={item.question} className="rounded-[1.75rem] border border-line bg-white px-7 py-6 shadow-soft" open={index === 0}>
              <summary className="cursor-pointer list-none text-xl font-black text-ink">{item.question}</summary>
              <p className="mt-4 text-base leading-8 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FaqSection() {
  return siteConfig.layout.faqVariant === "faq-b" ? <FaqB /> : <FaqA />;
}
