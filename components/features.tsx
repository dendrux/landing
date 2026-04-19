// First-class provider implementations in dendrux.
const PRIMARY_PROVIDERS = ["Anthropic", "OpenAI Chat", "OpenAI Responses"];

// OpenAI-compatible endpoints — reached via OpenAIProvider with a custom
// base_url, not separate provider classes.
const OPENAI_COMPATIBLE = ["vLLM", "SGLang", "Groq", "Together", "Ollama"];

export function Features() {
  return (
    <section className="proto-section" id="features">
      <div className="proto-wrap">
        <div className="eyebrow">What&apos;s in the box</div>
        <h2 className="section-h2" style={{ marginTop: 16, maxWidth: 720 }}>
          Production essentials, <em>opt-in</em>.
        </h2>

        <div className="features-grid">
          <div className="feat span-6">
            <div className="tag">Governance</div>
            <h3 style={{ marginTop: 10 }}>Four layers, all kwargs.</h3>
            <p>
              Tool deny. Human approval. Advisory budgets. Content guardrails with PII
              redaction and secret detection. Stack them or don&apos;t.
            </p>
            <div
              style={{
                marginTop: 18,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {["deny", "require_approval", "budget", "guardrails"].map((k) => (
                <span
                  key={k}
                  className="mono"
                  style={{
                    fontSize: 11,
                    padding: "4px 9px",
                    border: "1px solid var(--tok-border)",
                    borderRadius: 6,
                    color: "var(--tok-accent-soft)",
                  }}
                >
                  {k}=
                </span>
              ))}
            </div>
          </div>

          <div className="feat span-6">
            <div className="tag">Streaming</div>
            <h3 style={{ marginTop: 10 }}>Token-by-token, clean cancel.</h3>
            <p>
              Stream text, tool calls, and lifecycle events. Break early and the run
              cancels cleanly. Works with every provider.
            </p>
            <div
              style={{
                marginTop: 18,
                padding: 14,
                borderRadius: 8,
                background: "color-mix(in oklab, var(--tok-bg) 60%, transparent)",
                border: "1px solid var(--tok-border-soft)",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--tok-text-sec)",
              }}
            >
              <span style={{ color: "var(--tok-text-muted)" }}>async for</span> chunk{" "}
              <span style={{ color: "var(--tok-text-muted)" }}>in</span>{" "}
              agent.stream(q).text():
              <br />
              &nbsp;&nbsp;print(chunk, end=
              <span style={{ color: "var(--tok-success)" }}>{'""'}</span>)
            </div>
          </div>

          <div className="feat span-4">
            <div className="tag">Delegation</div>
            <h3 style={{ marginTop: 10 }}>Agents as tools.</h3>
            <p>
              Parent-child run linking via contextvars. Zero developer code. Dashboard
              shows the full tree.
            </p>
          </div>

          <div className="feat span-4">
            <div className="tag">Persistence</div>
            <h3 style={{ marginTop: 10 }}>SQLite to Postgres.</h3>
            <p>
              Zero config for dev. One env var for prod. Alembic migrations included.
            </p>
          </div>

          <div className="feat span-4">
            <div className="tag">MCP</div>
            <h3 style={{ marginTop: 10 }}>Tool source, not rival.</h3>
            <p>
              MCP servers become dendrux tools automatically. Schema translated,
              rate-limited, traced.
            </p>
          </div>

          <div className="feat span-12">
            <div className="tag">Providers</div>
            <h3 style={{ marginTop: 10 }}>Swap one import. Everything else stays.</h3>
            <p>
              Three first-class provider classes. Any OpenAI-compatible server works
              through <code className="mono" style={{ color: "var(--tok-accent-soft)" }}>OpenAIProvider</code>{" "}
              with a custom base_url.
            </p>
            <div
              style={{
                marginTop: 24,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div>
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--tok-text-muted)",
                    marginBottom: 8,
                  }}
                >
                  First-class
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {PRIMARY_PROVIDERS.map((name) => (
                    <span key={name} className="prov-chip">
                      <span className="dot" />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--tok-text-muted)",
                    marginBottom: 8,
                  }}
                >
                  OpenAI-compatible · via OpenAIProvider(base_url=…)
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {OPENAI_COMPATIBLE.map((name) => (
                    <span key={name} className="prov-chip">
                      <span className="dot" />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
