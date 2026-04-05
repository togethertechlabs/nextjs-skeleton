import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';
import { siteConfig } from '@/lib/site-config';

function AboutA() {
  return (
    <section className="surface py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <SectionHeading eyebrow="About" title={siteConfig.about.heading} description={siteConfig.about.body} />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {siteConfig.about.bullets.map((bullet) => (
              <div key={bullet} className="rounded-[1.5rem] border line surface-2 p-6 text-xl font-semibold" style={{ color: 'var(--text)' }}>{bullet}</div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-premium" style={{ background: 'linear-gradient(135deg, var(--panel), #94a3b8)' }}>
          <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--primary)' }}>Why clients choose us</p>
          <h3 className="mt-6 text-5xl font-black leading-tight">Fast response. Clear communication. Strong presentation.</h3>
          <p className="mt-6 max-w-xl text-xl leading-9 text-white/80">This section is designed to feel substantial, premium and highly credible even before bespoke edits are added.</p>
          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
            <Image src={siteConfig.images.about} alt={siteConfig.about.heading} width={900} height={700} className="h-72 w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutB() {
  return (
    <section className="surface-2 py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="overflow-hidden rounded-[2.5rem] border line surface shadow-premium">
          <Image src={siteConfig.images.about} alt={siteConfig.about.heading} width={1100} height={900} className="h-full min-h-[28rem] w-full object-cover" />
        </div>
        <div>
          <SectionHeading eyebrow="About" title={siteConfig.about.heading} description={siteConfig.about.body} />
          <div className="mt-10 space-y-4">
            {siteConfig.about.bullets.map((bullet, index) => (
              <div key={bullet} className="rounded-[1.5rem] border line surface px-6 py-5 shadow-premium">
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent)' }}>Benefit 0{index + 1}</p>
                <p className="mt-2 text-2xl font-black" style={{ color: 'var(--text)' }}>{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return siteConfig.layout.aboutVariant === 'about-b' ? <AboutB /> : <AboutA />;
}
