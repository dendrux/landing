import { highlight } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

export async function CodeBlock({
  code,
  lang = "python",
  filename,
  className,
}: {
  code: string;
  lang?: "python" | "bash";
  filename?: string;
  className?: string;
}) {
  const html = await highlight(code, lang);

  return (
    <div className={`surface overflow-hidden ${className ?? ""}`}>
      {filename && (
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
            <span className="ml-3 font-mono text-[12px] text-ink-dim">{filename}</span>
          </div>
          <CopyButton text={code} label="Copy code" />
        </div>
      )}
      <div
        className="relative"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
