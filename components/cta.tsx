export function CTA() {
  return (
    <section className="proto-cta">
      <h2>
        Start with <em>ten lines</em>.
        <br />
        Scale without rewrites.
      </h2>
      <p>
        Dendrux is in active development at v0.2.0a1. Core API stabilizing. Apache 2.0.
        Bring your own infra.
      </p>
      <div className="cta-row">
        <a className="proto-btn proto-btn-primary" href="#install">
          pip install dendrux <span className="arrow">→</span>
        </a>
        <a className="proto-btn proto-btn-ghost" href="/docs">
          Read the docs
        </a>
      </div>
    </section>
  );
}
