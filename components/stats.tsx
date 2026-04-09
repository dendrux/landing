"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Reveal } from "./reveal";

const STATS: { value: number; suffix: string; label: string; sub: string }[] = [
  {
    value: 12900,
    suffix: "+",
    label: "lines of source",
    sub: "Lean, focused runtime",
  },
  {
    value: 16500,
    suffix: "+",
    label: "lines of tests",
    sub: "1.28 : 1 test-to-source",
  },
  {
    value: 773,
    suffix: "",
    label: "test functions",
    sub: "80% min coverage enforced",
  },
  {
    value: 3,
    suffix: "",
    label: "Python versions",
    sub: "3.11, 3.12, 3.13",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => {
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    }
  }, [inView, motionValue, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {"// The numbers"}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-gradient md:text-5xl">
              Tests-first.
              <br />
              Strict types. Zero magic.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="bg-bg-soft p-8">
              <p className="font-display text-4xl font-semibold tracking-tight text-gradient-accent md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[14px] font-medium text-ink">{s.label}</p>
              <p className="mt-1 text-[12.5px] text-ink-dim">{s.sub}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
