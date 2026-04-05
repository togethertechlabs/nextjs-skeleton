import { siteConfig } from '@/lib/site-config';

export function TrustBar() {
  return (
    <section className="panel py-6 text-white">
      <div className="section-shell grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6 md:grid-cols-2 xl:grid-cols-4">
        {siteConfig.trustBar.map((item) => (
          <div key={item.label} className="border-white/10 xl:border-r xl:pr-6 xl:last:border-r-0">
            <p className="text-2xl font-black" style={{ color: 'var(--primary)' }}>{item.label}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/60">{item.subtext}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
