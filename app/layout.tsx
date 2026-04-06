import type { Metadata } from "next";
import "./globals.css";
import { buildPageMetadata } from "@/lib/metadata";
import { getThemeClass, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.canonical),
  ...buildPageMetadata()
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={getThemeClass(siteConfig.layout.theme)}>{children}</body>
    </html>
  );
}
