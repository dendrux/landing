"use client";

import { motion, type MotionProps } from "framer-motion";
import { type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
} & MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
