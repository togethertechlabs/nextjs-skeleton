import { SiteConfig } from '@/lib/types';

export default function Footer({ config }: { config: SiteConfig }) {
  return (
    <footer className="bg-slate-950 py-10 text-slate-300" id="contact">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-2xl font-bold text-white">{config.brand.name}</div>
          <div className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-500">{config.brand.location}</div>
        </div>
        <div className="text-sm leading-7 md:text-right">
          <div>{config.footer.copyright}</div>
          <div>{config.footer.serviceText}</div>
          <div>{config.brand.phone}</div>
        </div>
      </div>
    </footer>
  );
}
