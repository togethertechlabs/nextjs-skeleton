import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

function FooterA() {
  return (
    <footer className="panel py-14 text-white">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.6fr_0.4fr] lg:items-end">
        <div>
          <p className="text-3xl font-black">{siteConfig.brand.name}</p>
          <p className="mt-3 text-sm uppercase tracking-[0.35em] text-slate-400">{siteConfig.footer.address}</p>
        </div>
        <div className="text-left lg:text-right">
          <p className="text-lg text-slate-200">{siteConfig.footer.copyright}</p>
          <p className="mt-3 text-lg text-slate-300">{siteConfig.footer.serviceText}</p>
          <p className="mt-3 text-xl font-semibold">{siteConfig.brand.phone}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterB() {
  return (
    <footer className="surface py-16">
      <div className="section-shell rounded-[2.5rem] border line panel p-10 text-white shadow-premium">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_0.55fr]">
          <div>
            <p className="text-3xl font-black">{siteConfig.brand.name}</p>
            <p className="mt-3 max-w-md text-base text-white/70">{siteConfig.brand.tagline}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Pages</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <p><Link href="/services">Services</Link></p>
                <p><Link href="/about">About</Link></p>
                <p><Link href="/contact">Contact</Link></p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Contact</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                <p>{siteConfig.brand.phone}</p>
                <p>{siteConfig.brand.email}</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">Coverage</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                {siteConfig.coverage.areas.slice(0, 3).map((area) => <p key={area}>{area}</p>)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60">{siteConfig.footer.copyright}</div>
      </div>
    </footer>
  );
}

export function SiteFooter() {
  return siteConfig.layout.footerVariant === 'footer-b' ? <FooterB /> : <FooterA />;
}
