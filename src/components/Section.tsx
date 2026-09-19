"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionHeading({
  overline,
  title,
}: {
  overline: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 text-center"
    >
      <p className="font-serif text-xs uppercase tracking-[0.45em] text-gold">
        {overline}
      </p>
      <h2 className="mt-3 font-script text-5xl text-ink sm:text-6xl">{title}</h2>
      <div className="mx-auto mt-5 flex items-center justify-center gap-3">
        <span className="h-px w-14 bg-gold/60" />
        <span className="h-1.5 w-1.5 rotate-45 bg-rosewood/70" />
        <span className="h-px w-14 bg-gold/60" />
      </div>
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
