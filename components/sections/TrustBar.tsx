import { SiteConfig } from '@/lib/types';
import { getTheme } from '@/lib/theme';

export default function TrustBar({ config }: { config: SiteConfig }) {
  const theme = getTheme(config.brand.theme);
  return (
    <section className="bg-slate-950 pb-10 text-white" style={{ ['--primary' as string]: theme.primary }}>
      <div className="section-shell">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur md:grid-cols-4">
          {config.trustBar.map((item) => (
            <div key={item.label} className="border-l border-white/10 pl-4 first:border-l-0 first:pl-0">
              <div className="text-3xl font-black" style={{ color: theme.primary }}>{item.label}</div>
              <div className="mt-1 text-sm uppercase tracking-[0.24em] text-slate-400">{item.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
