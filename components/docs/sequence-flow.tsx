import { Children, type ReactNode } from "react";

/**
 * Vertical timeline of ordered run events for docs pages.
 *
 * Composition API: pass <SequenceEvent> children, not data props.
 * MDX-in-RSC cannot pass nested object/array literals as JSX attributes,
 * so every prop on every component must be a primitive (string/number).
 *
 * Usage in MDX:
 *
 *   <SequenceFlow>
 *     <SequenceEvent seq="0" type="run.started"  iter="0" note="loop-level" />
 *     <SequenceEvent seq="1" type="llm.completed" iter="1" />
 *   </SequenceFlow>
 */
export function SequenceFlow({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  return (
    <div className="my-10 rounded-2xl border border-line bg-bg-card/40 p-6 md:p-8">
      <ol className="relative space-y-3 pl-0">
        <div
          className="absolute left-[22px] top-2 bottom-2 w-px bg-line"
          aria-hidden
        />
        {items}
      </ol>
    </div>
  );
}

/**
 * One row in a SequenceFlow. Render-only — the parent positions it.
 */
export function SequenceEvent({
  seq,
  type,
  iter,
  note,
  highlight,
}: {
  seq: string;
  type: string;
  iter?: string;
  note?: string;
  highlight?: string;
}) {
  const isHighlighted = highlight === "true";
  return (
    <li className="relative flex items-center gap-4">
      <div
        className={
          "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-mono text-[12px] " +
          (isHighlighted
            ? "border-accent/60 bg-accent/10 text-accent"
            : "border-line bg-bg-card text-ink-muted")
        }
      >
        {seq}
      </div>
      <div
        className={
          "flex flex-1 flex-col rounded-xl border px-4 py-3 " +
          (isHighlighted
            ? "border-accent/40 bg-white/[0.04]"
            : "border-line bg-white/[0.02]")
        }
      >
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[13px] font-medium text-ink">
            {type}
          </span>
          {iter !== undefined && (
            <span className="font-mono text-[11px] text-ink-dim">
              iter={iter}
            </span>
          )}
        </div>
        {note && (
          <div className="mt-1 text-[12.5px] leading-snug text-ink-muted">
            {note}
          </div>
        )}
      </div>
    </li>
  );
}
