"use client";

import { useEffect, useState } from "react";

const TARGET = new Date(2027, 6, 8, 16, 0, 0); // 8 июля 2027

const LABELS = ["дней", "часов", "минут", "секунд"] as const;

function getParts() {
  const diff = Math.max(0, TARGET.getTime() - Date.now());
  return [
    Math.floor(diff / 86_400_000),
    Math.floor(diff / 3_600_000) % 24,
    Math.floor(diff / 60_000) % 60,
    Math.floor(diff / 1_000) % 60,
  ];
}

export default function Countdown() {
  const [parts, setParts] = useState<number[] | null>(null);

  useEffect(() => {
    setParts(getParts());
    const id = setInterval(() => setParts(getParts()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {LABELS.map((label, i) => (
        <div
          key={label}
          className="glass texture-paper rounded-2xl px-2 py-4 text-center shadow-[0_10px_30px_-12px_rgba(70,62,53,0.25)] sm:px-4 sm:py-6"
        >
          <div className="font-serif text-3xl font-semibold tabular-nums text-ink sm:text-5xl">
            {parts ? String(parts[i]).padStart(2, "0") : "--"}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-cocoa sm:text-xs">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
