import { LogoMark } from "./icons";

export function Footer() {
  return (
    <footer className="proto-footer">
      <div className="wrap">
        <div>
          <div className="brand-foot">
            <LogoMark className="h-5 w-5" />
            dendrux
          </div>
          <div className="tagline">
            The async Python runtime for agents that survive failure, persist everything,
            and bridge to the real world.
          </div>
          <div className="meta-foot">
            v0.1.0a5 · Apache 2.0 · 1,225 tests · 17,600+ loc
          </div>
        </div>
        <div>
          <h4>Product</h4>
          <a href="/#timeline">Timeline</a>
          <a href="/#pillars">Pillars</a>
          <a href="/#features">Features</a>
          <a href="/docs">Dashboard</a>
        </div>
        <div>
          <h4>Developers</h4>
          <a href="/docs">Docs</a>
          <a href="/docs/quickstart">Quick start</a>
          <a href="https://github.com/dendrux/dendrux/tree/main/packages/python/examples">
            Examples
          </a>
          <a href="/docs/cli">CLI</a>
        </div>
        <div>
          <h4>Community</h4>
          <a href="https://github.com/dendrux/dendrux">GitHub</a>
          <a href="#">Discord</a>
          <a href="#">Sponsor</a>
          <a href="https://pypi.org/project/dendrux/">PyPI</a>
        </div>
      </div>
    </footer>
  );
}
