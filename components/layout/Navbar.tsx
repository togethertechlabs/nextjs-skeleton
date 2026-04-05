import { SiteConfig } from '@/lib/types';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';

export default function Navbar({ config }: { config: SiteConfig }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="section-shell flex items-center justify-between py-5 text-white">
        <div>
          <div className="text-3xl font-black tracking-tight">{config.brand.logoText || config.brand.name}</div>
          <div className="text-xs uppercase tracking-[0.28em] text-slate-400">{config.brand.industry}</div>
        </div>
        <nav className="hidden items-center gap-10 text-sm font-semibold uppercase tracking-[0.18em] text-slate-300 lg:flex">
          <a href="#home" className="hover:text-white">Home</a>
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#coverage" className="hover:text-white">Coverage</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <PrimaryButton label="Call Now" href={`tel:${config.brand.phone}`} />
          <SecondaryButton label="Get a Quote" href="#contact" />
        </div>
      </div>
    </header>
  );
}
