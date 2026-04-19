import { notFound } from "next/navigation";
import Link from "next/link";
import { listAllDocs, loadDoc } from "@/lib/docs";
import { MdxContent } from "@/components/docs/mdx-content";
import { DOCS_NAV } from "@/lib/docs-nav";

type Params = { slug: string[] };

function navEntryForPath(pathname: string) {
  return DOCS_NAV.flatMap((s) => s.links).find((l) => l.slug === pathname);
}

/**
 * Pre-render every slug that exists in the nav OR on disk. Union so nav-only
 * entries (docs that haven't been written yet) become static "Coming soon"
 * pages instead of 404s — the nav link stays clickable, the visitor gets a
 * graceful placeholder, and the URL is indexable once the real content
 * lands. Build time trades one extra static page per stub for one fewer
 * broken link.
 */
export async function generateStaticParams(): Promise<Params[]> {
  const fromDisk = await listAllDocs();
  const fromNav = DOCS_NAV.flatMap((s) => s.links)
    .map((l) => l.slug)
    .filter((s) => s.startsWith("/docs/") && s !== "/docs")
    .map((s) => s.replace(/^\/docs\//, "").split("/"));

  const seen = new Set<string>();
  const out: Params[] = [];
  for (const slug of [...fromDisk, ...fromNav]) {
    const key = slug.join("/");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ slug });
  }
  return out;
}

export async function generateMetadata({ params }: { params: Params }) {
  const pathname = `/docs/${params.slug.join("/")}`;
  const doc = await loadDoc(params.slug);
  const navEntry = navEntryForPath(pathname);

  const title = doc?.frontmatter.title ?? navEntry?.title;
  const description = doc?.frontmatter.description;

  if (!title) return {};
  return {
    title: `${title} — Dendrux docs`,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title: `${title} — Dendrux docs`,
      description,
      url: pathname,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Dendrux docs`,
      description,
    },
    // Coming-soon pages shouldn't be indexed until they have content.
    ...(doc ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function DocPage({ params }: { params: Params }) {
  const pathname = `/docs/${params.slug.join("/")}`;
  const doc = await loadDoc(params.slug);
  const navEntry = navEntryForPath(pathname);

  // Slug not in nav and no MDX → real 404.
  if (!doc && !navEntry) notFound();

  const { prev, next } = neighbors(pathname);

  return (
    <>
      {doc ? (
        <>
          {doc.frontmatter.description && (
            <p className="mb-8 text-[15px] text-ink-dim">
              {doc.frontmatter.description}
            </p>
          )}
          <MdxContent source={doc.content} />
        </>
      ) : (
        <ComingSoon title={navEntry!.title} />
      )}
      {(prev || next) && (
        <nav className="mt-16 grid grid-cols-2 gap-4 border-t border-line pt-8">
          <div>
            {prev && (
              <Link
                href={prev.slug}
                className="surface surface-hover block p-4 transition-colors"
              >
                <div className="mb-1 text-[11px] uppercase tracking-[0.14em] text-ink-dim">
                  Previous
                </div>
                <div className="text-[14px] font-medium text-ink">
                  {prev.title}
                </div>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link
                href={next.slug}
                className="surface surface-hover block p-4 text-right transition-colors"
              >
                <div className="mb-1 text-[11px] uppercase tracking-[0.14em] text-ink-dim">
                  Next
                </div>
                <div className="text-[14px] font-medium text-ink">
                  {next.title}
                </div>
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="surface mt-2 flex flex-col items-start gap-4 p-8">
      <span className="pill">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Coming soon
      </span>
      <h1 className="font-display text-[28px] font-semibold leading-tight text-ink">
        {title}
      </h1>
      <p className="max-w-[52ch] text-[15px] leading-[1.6] text-ink-muted">
        This page is planned but not yet written. The implementation lives in the{" "}
        <a
          href="https://github.com/dendrux/dendrux"
          target="_blank"
          rel="noreferrer noopener"
          className="text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
        >
          dendrux repo
        </a>
        ; docs land here as they&apos;re finished. In the meantime, start with the{" "}
        <Link href="/docs/quickstart" className="text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent">
          Quickstart
        </Link>
        .
      </p>
    </div>
  );
}

function neighbors(currentSlug: string) {
  const flat = DOCS_NAV.flatMap((s) => s.links);
  const idx = flat.findIndex((l) => l.slug === currentSlug);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
