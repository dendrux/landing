"use client";

import { useEffect, useState } from "react";

const PHASE_DURATIONS = [2600, 2600, 2000, 2800];
const PHASE_LABELS = ["running", "paused", "bridging", "resumed"];

export function BridgeAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase((p) => (p + 1) % 4), PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  const pauseActive = phase >= 1 && phase <= 2;
  const resumed = phase === 3;

  return (
    <div className="bridge-stage">
      <svg
        className="bridge-svg"
        viewBox="0 0 600 340"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <text x="90" y="30" className="label">server</text>
        <text x="510" y="30" className="label" textAnchor="end">client</text>

        {/* Server column top */}
        <line x1="90" y1="50" x2="90" y2="140" className="spine" />
        <circle cx="90" cy="70" r="8" className="node" stroke="var(--tok-llm)" />
        <text x="110" y="74" className="value">llm.call</text>
        <circle cx="90" cy="120" r="8" className="node" stroke="var(--tok-tool)" />
        <text x="110" y="124" className="value">tool.server</text>

        {/* Pause band */}
        <rect
          x="50"
          y="150"
          width="500"
          height="60"
          rx="8"
          fill={pauseActive ? "color-mix(in oklab, var(--tok-pause) 12%, transparent)" : "transparent"}
          stroke={pauseActive ? "var(--tok-pause)" : "var(--tok-border-soft)"}
          strokeOpacity={pauseActive ? 1 : 0.4}
          style={{ transition: "all .4s ease" }}
        />
        <text
          x="70"
          y="175"
          className="label"
          fill={pauseActive ? "var(--tok-pause)" : "var(--tok-text-muted)"}
          style={{ transition: "fill .4s ease" }}
        >
          {pauseActive ? "WAITING_CLIENT_TOOL" : "boundary"}
        </text>
        <text
          x="70"
          y="198"
          className="value"
          fill={pauseActive ? "var(--tok-pause)" : "var(--tok-text-muted)"}
          style={{ transition: "fill .4s ease", fontSize: 18 }}
        >
          {phase === 1 ? "2.1s" : phase === 2 ? "4.2s" : "—"}
        </text>

        {/* Bridge arc */}
        <path
          d="M 90 150 C 150 100, 450 100, 510 150"
          stroke="var(--tok-resume)"
          strokeWidth="2"
          fill="none"
          className={phase === 2 ? "" : "dashed"}
          opacity={phase >= 1 ? 1 : 0.3}
          style={{ transition: "opacity .4s ease" }}
        />

        {phase === 2 && (
          <circle r="5" fill="var(--tok-resume)" filter="url(#soft)">
            <animateMotion dur="2000ms" fill="freeze">
              <mpath href="#bridgePath" />
            </animateMotion>
          </circle>
        )}
        <path id="bridgePath" d="M 510 150 C 450 100, 150 100, 90 150" fill="none" opacity="0" />

        {/* Client column */}
        <line
          x1="510"
          y1="210"
          x2="510"
          y2="310"
          className="spine"
          strokeDasharray={phase === 1 ? "0" : "5 6"}
          opacity={phase >= 1 ? 1 : 0.2}
          style={{ transition: "opacity .4s ease" }}
        />
        <circle
          cx="510"
          cy="230"
          r="8"
          className="node"
          stroke="var(--tok-pause)"
          opacity={phase >= 1 ? 1 : 0.2}
          style={{ transition: "opacity .4s ease" }}
        >
          {phase === 1 && <animate attributeName="r" values="8;11;8" dur="1.8s" repeatCount="indefinite" />}
        </circle>
        <text
          x="490"
          y="234"
          className="value"
          textAnchor="end"
          opacity={phase >= 1 ? 1 : 0.2}
          style={{ transition: "opacity .4s ease" }}
        >
          read_range
        </text>
        <circle
          cx="510"
          cy="280"
          r="8"
          className="node"
          stroke="var(--tok-resume)"
          opacity={phase === 2 || phase === 3 ? 1 : 0.15}
          style={{ transition: "opacity .4s ease" }}
        />
        <text
          x="490"
          y="284"
          className="value"
          textAnchor="end"
          opacity={phase === 2 || phase === 3 ? 1 : 0.15}
          style={{ transition: "opacity .4s ease" }}
        >
          result
        </text>

        {/* Server column bottom (resumed finish) */}
        <circle
          cx="90"
          cy="280"
          r="8"
          className="node"
          stroke="var(--tok-success)"
          opacity={resumed ? 1 : 0.12}
          style={{ transition: "opacity .4s ease" }}
        />
        <text
          x="110"
          y="284"
          className="value"
          opacity={resumed ? 1 : 0.12}
          style={{ transition: "opacity .4s ease" }}
        >
          resumed · finish
        </text>
        <line
          x1="90"
          y1="210"
          x2="90"
          y2="270"
          className="spine"
          strokeDasharray="5 6"
          opacity={resumed ? 1 : 0.2}
          style={{ transition: "opacity .4s ease" }}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--tok-text-muted)",
          letterSpacing: ".08em",
          textTransform: "uppercase",
        }}
      >
        phase {phase + 1}/4 · {PHASE_LABELS[phase]}
      </div>
    </div>
  );
}
