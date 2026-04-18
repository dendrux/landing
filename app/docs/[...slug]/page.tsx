import { notFound } from "next/navigation";
import Link from "next/link";
import { listAllDocs, loadDoc } from "@/lib/docs";
import { MdxContent } from "@/components/docs/mdx-content";
import { DOCS_NAV } from "@/lib/docs-nav";

type Params = { slug: string[] };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await listAllDocs();
  return all.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const doc = await loadDoc(params.slug);
  if (!doc) return {};
  return {
    title: `${doc.frontmatter.title} — Dendrux docs`,
    description: doc.frontmatter.description,
  };
}

export default async function DocPage({ params }: { params: Params }) {
  const doc = await loadDoc(params.slug);
  if (!doc) notFound();

  const { prev, next } = neighbors(`/docs/${params.slug.join("/")}`);

  return (
    <>
      {doc.frontmatter.description && (
        <p className="mb-8 text-[15px] text-ink-dim">
          {doc.frontmatter.description}
        </p>
      )}
      <MdxContent source={doc.content} />
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

function neighbors(currentSlug: string) {
  const flat = DOCS_NAV.flatMap((s) => s.links);
  const idx = flat.findIndex((l) => l.slug === currentSlug);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
