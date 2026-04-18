"use client";

import { useEffect, useState } from "react";

type StepKind = "llm" | "tool" | "pause" | "resume" | "success";

type Step = {
  id: number;
  kind: StepKind;
  color: string;
  title: string;
  subtitle?: string;
  snippet: string;
  meta?: string[];
  wait?: number;
  payload: Record<string, unknown>;
  width?: number;
};

const RUN_STEPS: Step[] = [
  {
    id: 0,
    kind: "llm",
    color: "var(--tok-llm)",
    title: "LLM Call",
    subtitle: "iter 1 · plan",
    snippet: '"I need to read the user\'s sheet first."',
    meta: ["1,247 tok", "842ms", "$0.004"],
    payload: {
      model: "claude-sonnet-4-6",
      input_tokens: 1247,
      output_tokens: 183,
      latency_ms: 842,
    },
    width: 55,
  },
  {
    id: 1,
    kind: "tool",
    color: "var(--tok-tool)",
    title: "search_web",
    subtitle: "server tool",
    snippet: 'search_web(query="AAPL revenue FY25")',
    meta: ["1.8s", "ok"],
    payload: {
      tool: "search_web",
      target: "server",
      args: { query: "AAPL revenue FY25" },
      result_bytes: 2413,
    },
    width: 62,
  },
  {
    id: 2,
    kind: "llm",
    color: "var(--tok-llm)",
    title: "LLM Call",
    subtitle: "iter 2",
    snippet: '"Found revenue data. Need user\'s fiscal year cell."',
    meta: ["1,890 tok", "701ms", "$0.006"],
    payload: {
      input_tokens: 1890,
      output_tokens: 224,
      latency_ms: 701,
    },
    width: 48,
  },
  {
    id: 3,
    kind: "pause",
    color: "var(--tok-pause)",
    title: "WAITING_CLIENT_TOOL",
    subtitle: "read_excel_range",
    snippet: "Sheet1!A1:B10 · agent paused, client handling",
    wait: 4.2,
    payload: {
      state: "WAITING_CLIENT_TOOL",
      pending: [{ tool: "read_excel_range", args: { sheet: "Sheet1", range: "A1:B10" } }],
      wait_seconds: 4.2,
    },
    width: 70,
  },
  {
    id: 4,
    kind: "resume",
    color: "var(--tok-resume)",
    title: "Client returned",
    subtitle: "tool result",
    snippet: "12 cells received · run resumed",
    meta: ["0.1s", "resumed"],
    payload: {
      state: "RUNNING",
      received: { rows: 10, cols: 2 },
      resume_latency_ms: 114,
    },
    width: 22,
  },
  {
    id: 5,
    kind: "llm",
    color: "var(--tok-llm)",
    title: "LLM Call",
    subtitle: "iter 3 · synthesis",
    snippet: '"Writing analysis with fiscal-year alignment."',
    meta: ["2,104 tok", "983ms", "$0.008"],
    payload: { input_tokens: 2104, output_tokens: 412, latency_ms: 983 },
    width: 58,
  },
  {
    id: 6,
    kind: "success",
    color: "var(--tok-success)",
    title: "finish()",
    subtitle: "run complete",
    snippet: "Updated 12 cells · $0.018 · 6 iterations",
    meta: ["SUCCESS"],
    payload: { status: "SUCCESS", total_tokens: 5241, total_cost: 0.018, iterations: 6 },
    width: 30,
  },
];

const METRIC_LABELS = ["duration", "tokens", "cost", "status"];

export function RunTimeline({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(3);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (revealed >= RUN_STEPS.length) return;
    const t = setTimeout(() => setRevealed((r) => r + 1), 260);
    return () => clearTimeout(t);
  }, [revealed]);

  const step = RUN_STEPS[active];

  return (
    <div className="timeline-card" id="timeline">
      <div className="timeline-head">
        <span className="run-id">run_01JR5M9K...</span>
        <span className="run-title">spreadsheet_analysis</span>
        <span className="status-chip">
          <span className="dot" style={{ background: "var(--tok-pause)" }} />
          WAITING_CLIENT_TOOL
        </span>
      </div>
      <div className="timeline-body">
        <div className="tl-spine-wrap">
          {RUN_STEPS.slice(0, revealed).map((s, i) => (
            <TLNode
              key={s.id}
              step={s}
              active={active === i}
              onClick={() => setActive(i)}
              compact={compact}
            />
          ))}
        </div>
        {!compact && (
          <aside className="tl-inspector">
            <div className="insp-head">Inspector · node {active + 1}</div>
            <div className="insp-title">{step.title}</div>
            <div className="insp-row">
              <span className="k">kind</span>
              <span className="v" style={{ color: step.color }}>
                {step.kind}
              </span>
            </div>
            {step.meta &&
              step.meta.map((m, i) => (
                <div className="insp-row" key={i}>
                  <span className="k">{METRIC_LABELS[i] || "meta"}</span>
                  <span className="v">{m}</span>
                </div>
              ))}
            <div className="insp-payload">
              {Object.entries(step.payload).map(([k, v]) => (
                <div key={k}>
                  <span style={{ color: "var(--tok-text-muted)" }}>{k}:</span>{" "}
                  {typeof v === "object" ? JSON.stringify(v) : String(v)}
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

type TLNodeProps = {
  step: Step;
  active: boolean;
  onClick: () => void;
  compact: boolean;
};

function TLNode({ step, active, onClick, compact }: TLNodeProps) {
  const style = { "--color": step.color } as React.CSSProperties;
  if (step.kind === "pause") {
    return (
      <div
        className={`tl-node is-pause ${active ? "is-active" : ""}`}
        style={style}
        onClick={onClick}
      >
        <div className="marker">
          <div className="dot" />
        </div>
        <div className="content">
          <div className="title-row">
            <span>{step.title}</span>
            <span className="tag">pause</span>
          </div>
          <div className="snippet">{step.snippet}</div>
          <div className="wait">
            {step.wait?.toFixed(1)}
            <span className="unit">s wait</span>
          </div>
        </div>
        <div className="breath" />
      </div>
    );
  }
  return (
    <div
      className={`tl-node ${active ? "is-active" : ""}`}
      style={style}
      onClick={onClick}
    >
      <div className="rail" />
      <div className="marker">
        <div className="dot" />
      </div>
      <div className="content">
        <div className="title-row">
          <span>{step.title}</span>
          <span className="tag">{step.kind}</span>
          {step.subtitle && (
            <span className="dim-text mono" style={{ fontSize: 11, marginLeft: "auto" }}>
              {step.subtitle}
            </span>
          )}
        </div>
        <div className="snippet">{step.snippet}</div>
        {step.meta && (
          <div className="meta">
            {step.meta.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        )}
        {!compact && step.width !== undefined && (
          <div className="bar" style={{ width: `${step.width}%` }} />
        )}
      </div>
    </div>
  );
}
