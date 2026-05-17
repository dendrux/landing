"use client";

import { useEffect, useId, useState } from "react";

interface MermaidProps {
  chart: string;
}

/**
 * Renders a Mermaid diagram for docs pages.
 *
 * Client-only because mermaid renders to SVG via a browser DOM.
 * Dynamically imports the mermaid bundle so other pages don't pay
 * the cost.
 *
 * Usage in MDX:
 *
 *   <Mermaid chart={`flowchart TD
 *       A[Start] --> B[End]
 *   `} />
 */
export function Mermaid({ chart }: MermaidProps) {
  const reactId = useId();
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            background: "transparent",
            primaryColor: "#15192a",
            primaryTextColor: "#e8e8ee",
            primaryBorderColor: "#3a4258",
            lineColor: "#6b7280",
            secondaryColor: "#1a1f2e",
            tertiaryColor: "#0d1018",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
            fontSize: "14px",
          },
          flowchart: {
            curve: "basis",
            padding: 20,
            nodeSpacing: 50,
            rankSpacing: 60,
            useMaxWidth: true,
          },
        });
        const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(rendered);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (!cancelled) setError(message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (error) {
    return (
      <div className="my-8 rounded-2xl border border-red-500/40 bg-red-500/[0.04] p-6 text-sm text-red-300">
        <p className="font-semibold">Mermaid render failed</p>
        <pre className="mt-2 whitespace-pre-wrap text-xs opacity-80">{error}</pre>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl border border-line bg-bg-card/40 p-6 md:p-10">
      {svg ? (
        <div
          className="flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="flex h-32 items-center justify-center text-sm text-ink-dim">
          Loading diagram…
        </div>
      )}
    </div>
  );
}
