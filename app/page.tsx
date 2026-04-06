import { HomeSections } from "@/components/home-sections";
import { PageShell } from "@/components/page-shell";

export default function HomePage() {
  return (
    <PageShell pageKind="home">
      <HomeSections />
    </PageShell>
  );
}
