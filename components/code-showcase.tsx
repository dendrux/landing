import { highlight } from "@/lib/highlight";
import { Reveal } from "./reveal";
import { CodeTabs } from "./code-tabs";

const EXAMPLES = [
  {
    id: "constraints",
    label: "tools.py",
    title: "Tool constraints",
    blurb: "Cap calls, set timeouts, run in parallel — declaratively.",
    iconKey: "gauge" as const,
    code: `from dendrux import tool

@tool(max_calls_per_run=3, timeout_seconds=120)
async def search(query: str) -> str:
    """Search the web. Limited to 3 calls per run."""
    ...

@tool(parallel=True)     # runs concurrently (default)
async def fast_lookup(id: str) -> str: ...

@tool(parallel=False)    # runs alone, in order
async def write_to_db(data: str) -> str: ...`,
  },
  {
    id: "retry",
    label: "retry.py",
    title: "Retry terminal runs",
    blurb: "Resume a failed run with prior context reconstructed from traces.",
    iconKey: "retry" as const,
    code: `# A failed, cancelled, or timed-out run can be retried
# with prior context from persisted traces.
result = await agent.retry("01JR7XK4Q8...")

# Idempotency: same key + same input returns the existing run.
result = await agent.run(
    "Analyze Q3 report",
    idempotency_key="q3-analysis-2026",
)`,
  },
  {
    id: "bridge",
    label: "bridge.py",
    title: "Client-tool bridge",
    blurb: "Define tools that run on the client. The agent pauses and waits.",
    iconKey: "bridge" as const,
    code: `from dendrux import bridge, tool

@tool(target="client")
async def read_excel_range(sheet: str, range: str) -> str:
    """Read cells from the user's spreadsheet."""
    return ""  # filled in by the client

# Mount SSE + polling endpoints into your existing app
app.mount("/dendrux", bridge(agent, allow_insecure_dev_mode=True))`,
  },
  {
    id: "streaming",
    label: "stream.py",
    title: "Streaming",
    blurb: "Token-by-token text, tool calls, lifecycle events.",
    iconKey: "stream" as const,
    code: `# Full event stream
async for event in agent.stream("analyze revenue"):
    print(event.type, event.text or "")

# Just the text
async for chunk in agent.stream("analyze revenue").text():
    print(chunk, end="")

# With cleanup — early break cancels the run cleanly
async with agent.stream("analyze revenue") as stream:
    async for event in stream:
        ...`,
  },
];

export async function CodeShowcase() {
  const highlighted = await Promise.all(
    EXAMPLES.map(async (ex) => ({
      id: ex.id,
      label: ex.label,
      title: ex.title,
      blurb: ex.blurb,
      iconKey: ex.iconKey,
      html: await highlight(ex.code, "python"),
    })),
  );

  return (
    <section id="examples" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {"// The API"}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-gradient md:text-5xl">
              Three concepts.
              <br />
              Everything else is opt-in.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[16px] leading-[1.6] text-ink-muted">
              <code className="font-mono text-ink">Agent</code>,{" "}
              <code className="font-mono text-ink">@tool()</code>, and a{" "}
              <code className="font-mono text-ink">provider</code>. Layer on persistence,
              retry, streaming, and the client bridge as you need them.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14">
            <CodeTabs examples={highlighted} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
