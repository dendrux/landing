"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GaugeIcon, RetryIcon, PauseBridgeIcon, StreamIcon } from "./icons";
import type { ComponentType, SVGProps } from "react";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  gauge: GaugeIcon,
  retry: RetryIcon,
  bridge: PauseBridgeIcon,
  stream: StreamIcon,
};

type Example = {
  id: string;
  label: string;
  title: string;
  blurb: string;
  iconKey: keyof typeof ICONS;
  html: string;
};

export function CodeTabs({ examples }: { examples: Example[] }) {
  const [active, setActive] = useState(examples[0].id);
  const current = examples.find((e) => e.id === active) ?? examples[0];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      {/* Tab list */}
      <div className="flex flex-col gap-2">
        {examples.map((ex) => {
          const Icon = ICONS[ex.iconKey];
          const isActive = ex.id === active;
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => setActive(ex.id)}
              className={`group relative flex w-full items-start gap-4 rounded-xl border px-4 py-4 text-left transition-colors duration-200 ${
                isActive
                  ? "border-accent/40 bg-gradient-to-br from-accent/10 to-transparent"
                  : "border-line bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
              }`}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 ${
                  isActive
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-line bg-white/[0.03] text-ink-muted group-hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p
                  className={`font-display text-[15px] font-medium ${
                    isActive ? "text-ink" : "text-ink-muted group-hover:text-ink"
                  }`}
                >
                  {ex.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-[1.5] text-ink-dim">{ex.blurb}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Code panel */}
      <div className="relative">
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-accent/15 via-cyan-glow/8 to-violet-glow/10 opacity-50 blur-2xl" />
        <div className="surface relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
              <span className="ml-3 font-mono text-[12px] text-ink-dim">{current.label}</span>
            </div>
            <span className="font-mono text-[11px] text-ink-dim">python</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              dangerouslySetInnerHTML={{ __html: current.html }}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

