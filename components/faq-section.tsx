import { SectionHeading } from '@/components/section-heading';
import { siteConfig } from '@/lib/site-config';

function FaqA() {
  return (
    <section className="surface py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="FAQ" title="Answers that reduce friction" description="Built-in FAQ improves conversion confidence and gives the generator more SEO depth." />
        <div className="mt-16 space-y-6">
          {siteConfig.faq.map((item) => (
            <details key={item.question} className="group rounded-[1.75rem] border line surface-2 px-7 py-6 shadow-premium">
              <summary className="cursor-pointer list-none text-2xl font-bold" style={{ color: 'var(--text)' }}>{item.question}</summary>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqB() {
  return (
    <section className="surface-2 py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.4fr_0.6fr]">
        <SectionHeading eyebrow="FAQ" title="Built-in trust and objection handling" description="Use this layout when you want a more editorial split between section intro and accordion content." />
        <div className="space-y-5">
          {siteConfig.faq.map((item, index) => (
            <details key={item.question} className="group rounded-[1.75rem] border line surface px-7 py-6 shadow-premium" open={index === 0}>
              <summary className="cursor-pointer list-none text-xl font-black" style={{ color: 'var(--text)' }}>{item.question}</summary>
              <p className="mt-4 text-base leading-8 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return siteConfig.layout.faqVariant === 'faq-b' ? <FaqB /> : <FaqA />;
}
