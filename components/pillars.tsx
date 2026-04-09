import { Reveal } from "./reveal";
import {
  ShieldIcon,
  GaugeIcon,
  EyeIcon,
  NetworkIcon,
  PauseBridgeIcon,
} from "./icons";
import type { ComponentType, SVGProps } from "react";

type Pillar = {
  number: string;
  title: string;
  desc: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  bullets: string[];
  accent: string;
};

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Survive failure",
    desc: "Durable writes, sweep stale runs, retry with prior context, idempotency keys. Runs never lie about state.",
    icon: ShieldIcon,
    bullets: ["Durable persistence", "Sweep + retry", "Idempotency keys"],
    accent: "from-accent/30 to-transparent",
  },
  {
    number: "02",
    title: "Control execution",
    desc: "Tool constraints, timeouts, parallel/sequential policy, delegation depth guards. The loop adapts — it doesn't crash.",
    icon: GaugeIcon,
    bullets: ["max_calls_per_run", "timeout_seconds", "parallel=False"],
    accent: "from-cyan-glow/30 to-transparent",
  },
  {
    number: "03",
    title: "Explain everything",
    desc: "Every LLM call, tool execution, pause, and lifecycle event is persisted as evidence. Recorder fail-closed, notifier best-effort.",
    icon: EyeIcon,
    bullets: ["Full message traces", "Token usage + timing", "Redaction hooks"],
    accent: "from-violet-glow/30 to-transparent",
  },
  {
    number: "04",
    title: "Coordinate agents",
    desc: "Use agents as tools inside other agents. Parent-child links tracked automatically via contextvars. Zero developer code.",
    icon: NetworkIcon,
    bullets: ["Parent-child linking", "Depth guards", "Lifecycle coupling"],
    accent: "from-accent/30 to-transparent",
  },
  {
    number: "05",
    title: "Pause for the real world",
    desc: "Define tools that run on the client — browser, mobile, Excel. The agent pauses, the bridge handles SSE + polling, the run resumes.",
    icon: PauseBridgeIcon,
    bullets: ["Client-tool bridge", "SSE + polling", "Pause / resume"],
    accent: "from-cyan-glow/30 to-transparent",
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {"// Five pillars"}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-gradient md:text-5xl">
                Built around five
                <br />
                design commitments.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] text-ink-muted">
              Each pillar maps to a real failure mode that breaks naive agent loops in
              production. Dendrux makes the right behavior the default.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.05}>
              <PillarCard pillar={p} />
            </Reveal>
          ))}

          {/* Last empty card with dendrite art */}
          <Reveal delay={PILLARS.length * 0.05}>
            <div className="surface relative flex h-full min-h-[260px] items-center justify-center overflow-hidden p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-violet-glow/10" />
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative text-center">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  Library, not a platform
                </p>
                <p className="mt-3 max-w-[260px] font-display text-xl font-medium text-ink">
                  Own your server, your auth, your infra.
                </p>
                <p className="mt-3 text-sm text-ink-muted">
                  Dendrux gives you <code className="font-mono text-accent">agent.run()</code>{" "}
                  and gets out of the way.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <div className="surface surface-hover group relative h-full overflow-hidden p-7">
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${pillar.accent} opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-accent">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-mono text-xs text-ink-dim">{pillar.number}</span>
        </div>
        <h3 className="mt-6 font-display text-xl font-semibold text-ink">
          {pillar.title}
        </h3>
        <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-muted">{pillar.desc}</p>
        <ul className="mt-5 space-y-2">
          {pillar.bullets.map((b) => (
            <li
              key={b}
              className="flex items-center gap-2 font-mono text-[12px] text-ink-muted"
            >
              <span className="h-1 w-1 rounded-full bg-accent" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
