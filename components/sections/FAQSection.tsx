import { SiteConfig } from '@/lib/types';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQItem from '@/components/ui/FAQItem';

export default function FAQSection({ config }: { config: SiteConfig }) {
  return (
    <section id="faq" className="section-spacing bg-white">
      <div className="section-shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers that reduce friction"
          description="Built-in FAQ improves conversion confidence and gives the generator more SEO depth."
        />
        <div className="mt-12 grid gap-4">
          {config.faq.map((item) => (
            <FAQItem key={item.question} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
