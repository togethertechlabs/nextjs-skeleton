import { SectionHeading } from '@/components/section-heading';
import { siteConfig } from '@/lib/site-config';

function TestimonialsA() {
  return (
    <section className="panel py-24 text-white">
      <div className="section-shell">
        <SectionHeading eyebrow="Testimonials" title="Social proof that feels premium" description="Short, clean testimonials help the site feel established and sales-ready from day one." invert />
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {siteConfig.testimonials.map((testimonial) => (
            <article key={testimonial.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-premium">
              <p className="text-3xl tracking-[0.35em]" style={{ color: 'var(--primary)' }}>★★★★★</p>
              <p className="mt-8 text-2xl leading-10 text-slate-100">“{testimonial.quote}”</p>
              <p className="mt-8 text-sm uppercase tracking-[0.35em] text-slate-400">{testimonial.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsB() {
  return (
    <section className="surface py-24">
      <div className="section-shell">
        <SectionHeading eyebrow="Testimonials" title="Confidence builders placed where they help conversion most" description="This alternate layout uses tighter cards and stronger visual anchors for a different overall feel." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {siteConfig.testimonials.map((testimonial, index) => (
            <article key={testimonial.name} className="rounded-[2rem] border line surface-2 p-8 shadow-premium">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.35em] text-muted">Review 0{index + 1}</p>
                <p className="font-black" style={{ color: 'var(--accent)' }}>5.0</p>
              </div>
              <p className="mt-6 text-xl leading-9 text-muted">“{testimonial.quote}”</p>
              <p className="mt-6 text-lg font-black" style={{ color: 'var(--text)' }}>{testimonial.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return siteConfig.layout.testimonialsVariant === 'testimonials-b' ? <TestimonialsB /> : <TestimonialsA />;
}
