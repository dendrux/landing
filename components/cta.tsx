import { Reveal } from "./reveal";
import { InstallBlock } from "./install-block";
import { GitHubIcon } from "./icons";

export function CTA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="surface relative overflow-hidden p-10 text-center md:p-16">
          {/* Layered glows */}
          <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 top-0 h-80 w-80 rounded-full bg-violet-glow/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />

          <div className="relative">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {"// Ship it"}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
                Ship agents that
                <br />
                <span className="text-gradient-accent">don&apos;t lie about state.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.6] text-ink-muted">
                Three concepts. SQLite-by-default persistence. A bridge for the real
                world. Apache 2.0.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <InstallBlock />
                <a
                  href="https://github.com/dendrux/dendrux"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  <GitHubIcon className="h-4 w-4" />
                  Read the source
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
