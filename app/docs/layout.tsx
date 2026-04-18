import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DocsSidebar } from "@/components/docs/sidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="container-x pt-32 pb-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[220px_minmax(0,1fr)]">
          <aside>
            <DocsSidebar />
          </aside>
          <main className="min-w-0">
            <article className="max-w-[72ch]">{children}</article>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
