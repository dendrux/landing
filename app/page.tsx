import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Pillars } from "@/components/pillars";
import { LiveRun } from "@/components/live-run";
import { PauseExplainer } from "@/components/pause-explainer";
import { Features } from "@/components/features";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <LiveRun />
      <Pillars />
      <PauseExplainer />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
