import { SiteConfig } from '@/lib/types';

export default function TopBar({ config }: { config: SiteConfig }) {
  return (
    <div className="py-3 text-sm font-medium text-slate-950" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="section-shell flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
        <div>Call us now: <span className="font-bold">{config.brand.phone}</span></div>
        <div>{config.brand.location} • {config.brand.industry}</div>
      </div>
    </div>
  );
}
