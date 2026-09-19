"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";

const COLORS = ["#c98d8d", "#a96868", "#c3a265", "#9cae8f", "#e0b3b3"];

type HeartSpec = {
  left: number;
  size: number;
  fallDuration: number;
  fallDelay: number;
  sway: number;
  swayDuration: number;
  rotate: number;
  color: string;
  opacity: number;
};

export default function AmbientHearts() {
  const reduceMotion = useReducedMotion();
  const hearts = useMemo<HeartSpec[]>(() => {
    const count =
      typeof window !== "undefined" && window.innerWidth < 640 ? 7 : 10;
    return Array.from({ length: count }, (_, i) => ({
      left: 3 + Math.random() * 94,
      size: 10 + Math.random() * 16,
      fallDuration: 16 + Math.random() * 16,
      fallDelay: Math.random() * 14,
      sway: 16 + Math.random() * 42,
      swayDuration: 3 + Math.random() * 4,
      rotate: 15 + Math.random() * 25,
      color: COLORS[i % COLORS.length],
      opacity: 0.18 + Math.random() * 0.25,
    }));
  }, []);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${h.left}%`, top: 0 }}
          initial={{ y: "-12vh" }}
          animate={{ y: "112vh" }}
          transition={{
            duration: h.fallDuration,
            delay: h.fallDelay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <motion.div
            animate={{
              x: [0, h.sway, -h.sway, 0],
              rotate: [-h.rotate, h.rotate, -h.rotate],
            }}
            transition={{
              duration: h.swayDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart
              size={h.size}
              fill={h.color}
              color="none"
              style={{ opacity: h.opacity }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
