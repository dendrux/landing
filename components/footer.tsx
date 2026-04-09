import { LogoMark, GitHubIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative border-t border-line py-14">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2">
              <LogoMark className="h-7 w-7" />
              <span className="font-display text-[15px] font-semibold text-ink">
                Dendrux
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[13.5px] leading-[1.6] text-ink-muted">
              The async Python runtime for agents that survive failure, persist
              everything, and bridge to the real world.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/dendrux/dendrux"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-white/25 hover:text-ink"
              >
                <GitHubIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim">
              Project
            </p>
            <ul className="mt-4 space-y-3 text-[13.5px] text-ink-muted">
              <li>
                <a href="#pillars" className="transition-colors hover:text-ink">
                  Five pillars
                </a>
              </li>
              <li>
                <a href="#examples" className="transition-colors hover:text-ink">
                  Examples
                </a>
              </li>
              <li>
                <a href="#providers" className="transition-colors hover:text-ink">
                  Providers
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dendrux/dendrux"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim">
              Resources
            </p>
            <ul className="mt-4 space-y-3 text-[13.5px] text-ink-muted">
              <li>
                <a
                  href="https://github.com/dendrux/dendrux#readme"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dendrux/dendrux/tree/main/packages/python/examples"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  Code examples
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/dendrux/dendrux/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  Apache 2.0
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-[12px] text-ink-dim md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Dendrux. Apache 2.0.</p>
          <p className="font-mono">v0.1.0a4 — actively developed</p>
        </div>
      </div>
    </footer>
  );
}
