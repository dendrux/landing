import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Pillars } from "@/components/pillars";
import { CodeShowcase } from "@/components/code-showcase";
import { Stats } from "@/components/stats";
import { Providers } from "@/components/providers";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Problem />
      <Pillars />
      <CodeShowcase />
      <Stats />
      <Providers />
      <CTA />
      <Footer />
    </main>
  );
}
