import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

function CtaA() {
  return (
    <section className="surface-2 py-24">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[2.5rem] px-10 py-16 text-white shadow-premium lg:px-12" style={{ background: 'linear-gradient(90deg, var(--panel), #64748b, #cbd5e1)' }}>
          <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--primary)' }}>Ready to get started?</p>
          <h2 className="mt-6 max-w-4xl text-5xl font-black tracking-tight">{siteConfig.cta.heading}</h2>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-100">{siteConfig.cta.body}</p>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex rounded-2xl px-8 py-4 font-semibold text-white shadow-premium" style={{ background: 'var(--primary)' }}>
              {siteConfig.cta.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaB() {
  return (
    <section className="surface py-24">
      <div className="section-shell grid gap-8 rounded-[2.5rem] border line panel px-10 py-14 text-white shadow-premium lg:grid-cols-[0.7fr_0.3fr] lg:items-center lg:px-12">
        <div>
          <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--accent)' }}>Fast quote request</p>
          <h2 className="mt-6 text-5xl font-black tracking-tight">{siteConfig.cta.heading}</h2>
          <p className="mt-5 max-w-2xl text-xl leading-9 text-white/75">{siteConfig.cta.body}</p>
        </div>
        <div className="flex justify-start lg:justify-end">
          <Link href="/contact" className="inline-flex rounded-2xl px-8 py-4 font-semibold text-white shadow-premium" style={{ background: 'var(--primary)' }}>
            {siteConfig.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}

function CtaC() {
  return (
    <section className="surface-2 py-24">
      <div className="section-shell">
        <div className="grid gap-8 rounded-[2.5rem] border line surface p-10 shadow-premium lg:grid-cols-[0.55fr_0.45fr] lg:items-center lg:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--accent)' }}>Ready when you are</p>
            <h2 className="mt-6 text-5xl font-black tracking-tight" style={{ color: 'var(--text)' }}>{siteConfig.cta.heading}</h2>
            <p className="mt-5 max-w-2xl text-xl leading-9 text-muted">{siteConfig.cta.body}</p>
          </div>
          <div className="rounded-[2rem] panel p-8 text-white shadow-premium">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">Call</p>
            <p className="mt-3 text-3xl font-black">{siteConfig.brand.phone}</p>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-white/60">Email</p>
            <p className="mt-3 text-xl font-semibold">{siteConfig.brand.email}</p>
            <div className="mt-8">
              <Link href="/contact" className="inline-flex rounded-2xl px-8 py-4 font-semibold text-white shadow-premium" style={{ background: 'var(--primary)' }}>
                {siteConfig.cta.button}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaBanner() {
  switch (siteConfig.layout.ctaVariant) {
    case 'cta-b':
      return <CtaB />;
    case 'cta-c':
      return <CtaC />;
    default:
      return <CtaA />;
  }
}
