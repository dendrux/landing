import { Reveal } from "./reveal";

const PROVIDERS = [
  { name: "Anthropic", code: "claude-sonnet-4-6", primary: true },
  { name: "OpenAI", code: "gpt-4o · o-series", primary: true },
  { name: "vLLM", code: "self-hosted", primary: false },
  { name: "SGLang", code: "self-hosted", primary: false },
  { name: "Groq", code: "fast inference", primary: false },
  { name: "Together", code: "open-source models", primary: false },
  { name: "Ollama", code: "local first", primary: false },
  { name: "OpenAI Responses", code: "built-in tools", primary: false },
];

export function Providers() {
  return (
    <section id="providers" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {"// Providers"}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-gradient md:text-5xl">
                Swap one import.
                <br />
                Everything else stays.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.6] text-ink-muted">
                Anthropic, OpenAI Chat Completions, OpenAI Responses, and any
                OpenAI-compatible endpoint — vLLM, SGLang, Groq, Together, Ollama. Same{" "}
                <code className="font-mono text-ink">@tool()</code>, same loop, same
                evidence.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-wrap gap-2 font-mono text-[11px]">
                <span className="pill">max_tokens</span>
                <span className="pill">temperature</span>
                <span className="pill">timeout</span>
                <span className="pill">max_retries</span>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {PROVIDERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.04}>
                <div className="surface surface-hover group relative h-full overflow-hidden p-5">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          p.primary ? "bg-accent" : "bg-cyan-glow"
                        }`}
                      />
                      <p className="font-display text-[15px] font-medium text-ink">
                        {p.name}
                      </p>
                    </div>
                    <p className="mt-3 font-mono text-[11px] text-ink-dim">{p.code}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
