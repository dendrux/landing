import { LogoMark, GitHubIcon } from "./icons";

export function Nav() {
  return (
    <header className="proto-nav">
      <a href="/" className="brand" aria-label="Dendrux home">
        <LogoMark className="h-[22px] w-[22px]" />
        dendrux
      </a>
      <nav className="links">
        <a href="/#timeline">Timeline</a>
        <a href="/#pillars">Pillars</a>
        <a href="/#features">Features</a>
        <a href="/docs">Docs</a>
      </nav>
      <div className="spacer" />
      <a
        href="https://github.com/dendrux/dendrux"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Dendrux on GitHub"
        className="gh-link"
      >
        <GitHubIcon className="h-4 w-4" />
      </a>
      <span className="status-pill">
        <span className="dot" />
        v0.1.0a5 · alpha
      </span>
      <a className="cta" href="/docs/quickstart">
        Get started <span>→</span>
      </a>
    </header>
  );
}
