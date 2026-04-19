import type { ReactNode } from "react";

type Pillar = {
  idx: string;
  title: string;
  body: string;
  glyph: ReactNode;
};

const PILLARS: Pillar[] = [
  {
    idx: "01",
    title: "Survive failure",
    body: "Durable writes with retry. Stale runs swept. Crashed runs retry with prior context. Runs never lie about state.",
    glyph: <circle cx="16" cy="16" r="10" />,
  },
  {
    idx: "02",
    title: "Control execution",
    body: "Tool constraints, timeouts, parallel/sequential policy, delegation depth guards. No runaways.",
    glyph: <rect x="6" y="6" width="20" height="20" />,
  },
  {
    idx: "03",
    title: "Govern behavior",
    body: "Tool deny, HITL approval, advisory budgets, PII redaction, secret detection. Four layers of runtime governance.",
    glyph: <path d="M16 4 L28 10 V20 C28 25 22 28 16 28 C10 28 4 25 4 20 V10 Z" />,
  },
  {
    idx: "04",
    title: "Explain everything",
    body: "Every LLM call, tool execution, pause, and lifecycle event is persisted as evidence. Fail-closed recorder + best-effort notifier.",
    glyph: (
      <g>
        <line x1="6" y1="10" x2="26" y2="10" />
        <line x1="6" y1="16" x2="22" y2="16" />
        <line x1="6" y1="22" x2="26" y2="22" />
      </g>
    ),
  },
  {
    idx: "05",
    title: "Coordinate agents",
    body: "Parent-child delegation with automatic linking via contextvars. Depth guards and lifecycle coupling.",
    glyph: (
      <g>
        <circle cx="16" cy="6" r="3" />
        <circle cx="7" cy="24" r="3" />
        <circle cx="25" cy="24" r="3" />
        <path d="M16 9 L7 21 M16 9 L25 21" />
      </g>
    ),
  },
  {
    idx: "06",
    title: "Pause for the real world",
    body: "Client-side tool pause/resume for spreadsheets, browsers, and desktops. Domain-aware constraints.",
    glyph: (
      <g>
        <line x1="12" y1="8" x2="12" y2="24" />
        <line x1="20" y1="8" x2="20" y2="24" />
      </g>
    ),
  },
];

export function Pillars() {
  return (
    <section className="proto-section" id="pillars">
      <div className="proto-wrap">
        <div className="eyebrow">Six pillars</div>
        <h2
          className="section-h2"
          style={{ marginTop: 16, maxWidth: 720 }}
        >
          Six <em>commitments</em> the runtime makes.
        </h2>
        <p
          style={{
            marginTop: 16,
            color: "var(--tok-text-sec)",
            fontSize: 16,
            maxWidth: 560,
            lineHeight: 1.55,
          }}
        >
          Every feature in dendrux exists to serve one of these. No framework magic, no
          hidden loops.
        </p>
        <div className="pillars-grid">
          {PILLARS.map((p) => (
            <div className="pillar-cell" key={p.idx}>
              <svg className="glyph" viewBox="0 0 32 32">
                {p.glyph}
              </svg>
              <div className="idx">{p.idx}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
