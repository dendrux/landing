"use client";

import { useEffect, useRef, useState } from "react";

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
  // Stable id per mount — avoids useId quirks in some Next.js RSC paths
  // and gives mermaid a clean DOM identifier to mutate.
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 11)}`);
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
          securityLevel: "loose",
          flowchart: { curve: "basis", useMaxWidth: true },
        });
        // Dedent the chart — MDX template literals preserve leading
        // whitespace that confuses mermaid's parser on some lines.
        const dedented = chart
          .split("\n")
          .map((line) => line.replace(/^ +/, ""))
          .join("\n")
          .trim();
        // No mermaid.parse() preflight — v11 has a regression where
        // parse() itself throws an internal "Cannot read properties of
        // undefined (reading 'replace')" on charts that render fine.
        const { svg: rendered } = await mermaid.render(idRef.current, dedented);
        if (!cancelled) setSvg(rendered);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (!cancelled) setError(message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart]);

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
