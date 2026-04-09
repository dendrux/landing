"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type EventKind = "llm" | "tool" | "pause" | "done";

type TraceEvent = {
  id: string;
  kind: EventKind;
  label: string;
  meta: string; // duration / tokens
};

type Run = {
  model: string;
  prompt: string;
  events: Omit<TraceEvent, "id">[];
  total: string;
};

const RUNS: Run[] = [
  {
    model: "claude-sonnet-4-6",
    prompt: "Analyze Q3 revenue from sheet",
    events: [
      { kind: "llm", label: "llm.invoke", meta: "1.2k tok" },
      { kind: "tool", label: "read_excel_range", meta: "142ms" },
      { kind: "tool", label: "compute_growth", meta: "31ms" },
      { kind: "llm", label: "llm.invoke", meta: "0.8k tok" },
      { kind: "done", label: "completed", meta: "2.34s" },
    ],
    total: "2.34s",
  },
  {
    model: "gpt-4o",
    prompt: "Research competitor launches",
    events: [
      { kind: "llm", label: "llm.invoke", meta: "1.6k tok" },
      { kind: "tool", label: "web_search", meta: "880ms" },
      { kind: "tool", label: "fetch_url", meta: "412ms" },
      { kind: "tool", label: "summarize", meta: "1.1s" },
      { kind: "done", label: "completed", meta: "3.91s" },
    ],
    total: "3.91s",
  },
  {
    model: "claude-sonnet-4-6",
    prompt: "Update tracker with latest deals",
    events: [
      { kind: "llm", label: "llm.invoke", meta: "0.9k tok" },
      { kind: "pause", label: "waiting on client", meta: "approve" },
      { kind: "tool", label: "write_to_db", meta: "78ms" },
      { kind: "done", label: "completed", meta: "1.62s" },
    ],
    total: "1.62s",
  },
];

const KIND_COLOR: Record<EventKind, string> = {
  llm: "text-violet-glow",
  tool: "text-cyan-glow",
  pause: "text-amber-300",
  done: "text-accent",
};

const KIND_DOT: Record<EventKind, string> = {
  llm: "bg-violet-glow",
  tool: "bg-cyan-glow",
  pause: "bg-amber-300",
  done: "bg-accent",
};

export function TraceCard() {
  const [runIdx, setRunIdx] = useState(0);
  const [shown, setShown] = useState<TraceEvent[]>([]);
  const [phase, setPhase] = useState<"streaming" | "settled" | "resetting">(
    "streaming",
  );

  const run = RUNS[runIdx];

  useEffect(() => {
    if (phase !== "streaming") return;

    if (shown.length === run.events.length) {
      const settle = setTimeout(() => setPhase("settled"), 1400);
      return () => clearTimeout(settle);
    }

    const timer = setTimeout(
      () => {
        const next = run.events[shown.length];
        setShown((prev) => [
          ...prev,
          { id: `${runIdx}-${shown.length}`, ...next },
        ]);
      },
      shown.length === 0 ? 350 : 540 + Math.random() * 250,
    );
    return () => clearTimeout(timer);
  }, [shown, run, phase, runIdx]);

  useEffect(() => {
    if (phase !== "settled") return;
    const reset = setTimeout(() => setPhase("resetting"), 200);
    return () => clearTimeout(reset);
  }, [phase]);

  useEffect(() => {
    if (phase !== "resetting") return;
    const next = setTimeout(() => {
      setShown([]);
      setRunIdx((i) => (i + 1) % RUNS.length);
      setPhase("streaming");
    }, 480);
    return () => clearTimeout(next);
  }, [phase]);

  const isDone = shown.some((e) => e.kind === "done");

  return (
    <div className="surface relative overflow-hidden">
      {/* Soft top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${
                isDone ? "bg-accent" : "bg-cyan-glow"
              } ${isDone ? "" : "animate-ping"} opacity-75`}
            />
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                isDone ? "bg-accent" : "bg-cyan-glow"
              }`}
            />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            {isDone ? "RUN COMPLETED" : "RUN STREAMING"}
          </span>
        </div>
        <span className="font-mono text-[11px] text-ink-dim">
          {isDone ? run.total : "live"}
        </span>
      </div>

      {/* Body */}
      <div className="relative px-4 pt-4 pb-4">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] text-ink-dim">
            <span className="text-ink-muted">model</span>{" "}
            <span className="text-ink">{run.model}</span>
          </p>
        </div>
        <p className="mt-1 font-mono text-[12px] text-ink-muted">
          <span className="text-ink-dim">$</span>{" "}
          <span className="text-ink">{`agent.run("${run.prompt}")`}</span>
        </p>

        <div className="mt-4 flex flex-col gap-1.5 font-mono text-[12px]">
          <AnimatePresence mode="popLayout">
            {shown.map((e) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -8, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 8 }}
                transition={{
                  duration: 0.32,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center gap-3 overflow-hidden"
              >
                <span
                  className={`mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                    KIND_DOT[e.kind]
                  } ${e.kind !== "done" && e.kind !== "pause" ? "" : ""}`}
                />
                <span className={`flex-1 truncate ${KIND_COLOR[e.kind]}`}>
                  <span className="text-ink-dim">{kindPrefix(e.kind)}</span>{" "}
                  {e.label}
                </span>
                <span className="text-ink-dim">{e.meta}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Streaming caret bar */}
      {!isDone && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <div className="h-full w-1/3 animate-[shimmer_2.4s_linear_infinite] bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        </div>
      )}
    </div>
  );
}

function kindPrefix(kind: EventKind) {
  switch (kind) {
    case "llm":
      return "→";
    case "tool":
      return "·";
    case "pause":
      return "❘❘";
    case "done":
      return "✓";
  }
}
