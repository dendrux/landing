import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark-default"],
      langs: ["python", "bash"],
    });
  }
  return highlighterPromise;
}

export async function highlight(code: string, lang: "python" | "bash" = "python") {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, {
    lang,
    theme: "github-dark-default",
    transformers: [
      {
        pre(node) {
          node.properties.class = "shiki-pre scrollbar-thin";
        },
      },
    ],
  });
}
