import { Children, type ReactNode } from "react";

/**
 * Parent-child schema diagram for docs pages.
 *
 * Composition API: pass <SchemaItem> children, not data props.
 * MDX-in-RSC mis-parses nested object/array literals as JSX attributes,
 * so every prop on every component must be a primitive (string/number).
 *
 * Usage in MDX:
 *
 *   <SchemaDiagram
 *     parentName="agent_runs"
 *     parentSubtitle="ULID PK"
 *     edgeLabel="agent_run_id FK"
 *   >
 *     <SchemaItem name="react_traces" description="Conversation messages" />
 *     <SchemaItem name="tool_calls"   description="Per tool invocation" />
 *   </SchemaDiagram>
 */
export function SchemaDiagram({
  parentName,
  parentSubtitle,
  parentDescription,
  edgeLabel,
  children,
}: {
  parentName: string;
  parentSubtitle?: string;
  parentDescription?: string;
  edgeLabel?: string;
  children: ReactNode;
}) {
  const childArray = Children.toArray(children);
  const count = childArray.length;

  return (
    <div className="my-10 rounded-2xl border border-line bg-bg-card/40 p-6 md:p-10">
      <div className="flex flex-col items-center">
        <Card
          name={parentName}
          subtitle={parentSubtitle}
          description={parentDescription}
          tone="parent"
        />

        <div className="my-3 h-6 w-px bg-line" aria-hidden />
        {edgeLabel && (
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim">
            {edgeLabel}
          </div>
        )}
        <BranchConnector count={count} />

        <div
          className="grid w-full gap-3"
          style={{
            gridTemplateColumns: `repeat(${Math.min(count, 5)}, minmax(0, 1fr))`,
          }}
        >
          {childArray}
        </div>
      </div>
    </div>
  );
}

/**
 * One row in a SchemaDiagram. Render-only — the parent positions it.
 */
export function SchemaItem({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return <Card name={name} description={description} />;
}

function Card({
  name,
  subtitle,
  description,
  tone = "child",
}: {
  name: string;
  subtitle?: string;
  description?: ReactNode;
  tone?: "parent" | "child";
}) {
  const isParent = tone === "parent";
  return (
    <div
      className={
        "flex w-full flex-col rounded-xl border px-4 py-3 " +
        (isParent
          ? "max-w-md border-accent/40 bg-white/[0.04] shadow-[0_0_40px_-20px_rgba(62,224,143,0.4)]"
          : "border-line bg-white/[0.02]")
      }
    >
      <div
        className={
          "font-mono " +
          (isParent ? "text-[15px] font-semibold text-ink" : "text-[13px] font-medium text-ink")
        }
      >
        {name}
      </div>
      {subtitle && (
        <div className="mt-0.5 font-mono text-[11px] text-ink-dim">{subtitle}</div>
      )}
      {description && (
        <div
          className={
            "mt-2 leading-snug text-ink-muted " +
            (isParent ? "text-[12.5px]" : "text-[11.5px]")
          }
        >
          {description}
        </div>
      )}
    </div>
  );
}

function BranchConnector({ count }: { count: number }) {
  if (count <= 1) {
    return <div className="mb-3 h-6 w-px bg-line" aria-hidden />;
  }
  const stops = Array.from({ length: count }, (_, i) => `${(i / (count - 1)) * 100}%`);
  return (
    <div className="relative mb-3 w-full" aria-hidden>
      <div
        className="h-px bg-line"
        style={{
          marginLeft: stops[0],
          marginRight: `calc(100% - ${stops[stops.length - 1]})`,
        }}
      />
      <div className="relative h-6">
        {stops.map((left, i) => (
          <div
            key={i}
            className="absolute top-0 h-6 w-px bg-line"
            style={{ left }}
          />
        ))}
      </div>
    </div>
  );
}
