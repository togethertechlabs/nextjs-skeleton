import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/coverage', label: 'Coverage' },
  { href: '/contact', label: 'Contact' }
];

function HeaderA() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:rgba(15,23,42,0.86)] backdrop-blur-xl">
      <div className="border-b border-white/5 bg-white text-sm" style={{ color: 'var(--text)' }}>
        <div className="section-shell flex items-center justify-between py-3">
          <p className="font-semibold">Call us now: {siteConfig.brand.phone}</p>
          <p className="hidden text-muted sm:block">{siteConfig.brand.location} • {siteConfig.brand.industry}</p>
        </div>
      </div>
      <div className="section-shell flex items-center justify-between py-5">
        <Link href="/" className="group">
          <p className="text-3xl font-black text-white transition">{siteConfig.brand.name}</p>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{siteConfig.brand.industry}</p>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-200 transition hover:text-white">{item.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <a href={`tel:${siteConfig.brand.phone.replace(/\s+/g, '')}`} className="rounded-full px-6 py-3 font-semibold text-white shadow-premium" style={{ background: 'color-mix(in srgb, var(--primary) 14%, transparent)', border: '1px solid color-mix(in srgb, var(--primary) 35%, transparent)' }}>Call Now</a>
          <Link href="/contact" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white">Get a Quote</Link>
        </div>
      </div>
    </header>
  );
}

function HeaderB() {
  return (
    <header className="sticky top-0 z-50 border-b line surface/90 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl panel text-lg font-black text-white">{siteConfig.brand.name.slice(0, 1)}</div>
          <div>
            <p className="text-2xl font-black" style={{ color: 'var(--text)' }}>{siteConfig.brand.name}</p>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">{siteConfig.brand.location}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold uppercase tracking-[0.25em] text-muted transition" style={{ color: 'var(--text)' }}>{item.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={`tel:${siteConfig.brand.phone.replace(/\s+/g, '')}`} className="rounded-full border line px-5 py-3 font-semibold" style={{ color: 'var(--text)' }}>Call Now</a>
          <Link href="/contact" className="rounded-full px-5 py-3 font-semibold text-white shadow-premium" style={{ background: 'var(--primary)' }}>Get a Quote</Link>
        </div>
      </div>
    </header>
  );
}

export function SiteHeader() {
  return siteConfig.layout.headerVariant === 'header-b' ? <HeaderB /> : <HeaderA />;
}
