import rawConfig from '@/site-config.json';
import { SiteConfig } from '@/lib/types';

export async function getSiteConfig(): Promise<SiteConfig> {
  return rawConfig as SiteConfig;
}
