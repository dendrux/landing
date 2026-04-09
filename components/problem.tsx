import { Reveal } from "./reveal";

export function Problem() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            {"// The problem"}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-4xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-gradient md:text-5xl">
            Most agent frameworks assume tools run on the server and finish instantly.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-lg leading-[1.6] text-ink-muted">
            Real agents crash mid-run, need human approval, interact with browsers and
            spreadsheets, and must explain what they did after the fact. Dendrux is the
            runtime that handles this — without becoming a hosted platform you can&apos;t
            own.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {[
            {
              k: "Crashes",
              v: "Runs die mid-execution. State drifts. Nobody knows what actually happened.",
            },
            {
              k: "Pauses",
              v: "Tools live on the client — spreadsheets, browsers, humans. The agent has to wait.",
            },
            {
              k: "Evidence",
              v: "Every LLM call, tool result, and decision needs to be auditable after the fact.",
            },
          ].map((item, i) => (
            <Reveal key={item.k} delay={i * 0.06} className="bg-bg-soft p-7">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                {item.k}
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-ink-muted">{item.v}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
