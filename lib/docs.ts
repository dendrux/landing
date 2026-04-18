import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export const DOCS_ROOT = path.resolve(process.cwd(), "content/docs");

export type DocFrontmatter = {
  title: string;
  description?: string;
};

export type DocPage = {
  slug: string[];
  frontmatter: DocFrontmatter;
  content: string;
};

/** Load one MDX page by slug array. `[]` resolves to overview.mdx. */
export async function loadDoc(slug: string[]): Promise<DocPage | null> {
  const candidates = resolveCandidates(slug);
  for (const filePath of candidates) {
    try {
      const raw = await readFile(filePath, "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: {
          title: (data.title as string) ?? slug[slug.length - 1] ?? "Overview",
          description: data.description as string | undefined,
        },
        content,
      };
    } catch {
      // try next candidate
    }
  }
  return null;
}

function resolveCandidates(slug: string[]): string[] {
  if (slug.length === 0) {
    return [path.join(DOCS_ROOT, "overview.mdx")];
  }
  const joined = slug.join("/");
  return [
    path.join(DOCS_ROOT, `${joined}.mdx`),
    path.join(DOCS_ROOT, joined, "index.mdx"),
  ];
}

/** All MDX files under DOCS_ROOT, as slug arrays. Used for static params. */
export async function listAllDocs(): Promise<string[][]> {
  const out: string[][] = [];
  await walk(DOCS_ROOT, [], out);
  return out;
}

async function walk(dir: string, prefix: string[], out: string[][]) {
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) {
      await walk(full, [...prefix, entry], out);
    } else if (entry.endsWith(".mdx") && entry !== "overview.mdx") {
      out.push([...prefix, entry.replace(/\.mdx$/, "")]);
    }
  }
}
