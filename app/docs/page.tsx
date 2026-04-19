import Link from "next/link";
import type { Metadata } from "next";
import { loadDoc } from "@/lib/docs";
import { MdxContent } from "@/components/docs/mdx-content";

export const metadata: Metadata = {
  title: "Docs — Dendrux",
  description:
    "Dendrux docs: architecture, quickstart, and task-shaped recipes for the async Python agent runtime.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Docs — Dendrux",
    description:
      "Dendrux docs: architecture, quickstart, and task-shaped recipes for the async Python agent runtime.",
    url: "/docs",
    type: "website",
  },
};

export default async function DocsOverviewPage() {
  const doc = await loadDoc([]);
  if (!doc) {
    return (
      <div className="text-ink-muted">
        Docs not synced. Run <code>npm run sync-docs</code>.
      </div>
    );
  }

  return (
    <>
      <MdxContent source={doc.content} />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {OVERVIEW_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="surface surface-hover group block p-6 transition-colors"
          >
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {card.eyebrow}
            </div>
            <div className="font-display mb-2 text-[18px] font-semibold text-ink">
              {card.title}
            </div>
            <div className="text-[13.5px] leading-[1.6] text-ink-muted">
              {card.body}
            </div>
            <div className="mt-4 text-[12px] font-medium text-accent transition-transform group-hover:translate-x-0.5">
              Read →
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

const OVERVIEW_CARDS = [
  {
    eyebrow: "01",
    title: "Architecture",
    body: "How dendrux works under the hood — the run state machine, persistence, governance, and why each piece is shaped the way it is.",
    href: "/docs/architecture/runs",
  },
  {
    eyebrow: "02",
    title: "Quickstart",
    body: "Install and run a real pause/resume agent in five minutes. Two scripts, two processes, one database.",
    href: "/docs/quickstart",
  },
  {
    eyebrow: "03",
    title: "Recipes",
    body: "Task-shaped guides for human-in-the-loop approval, browser-side tools, cancelling runs, and mounting the read router.",
    href: "/docs/recipes/hitl-approval",
  },
];
