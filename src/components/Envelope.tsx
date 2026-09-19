"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MousePointerClick } from "lucide-react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const BURST_COLORS = ["#c98d8d", "#a96868", "#c3a265", "#e0b3b3"];

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [cardZ, setCardZ] = useState(10);
  const [flapZ, setFlapZ] = useState(30);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    // after the flap has rotated away, lift the card above the pocket
    window.setTimeout(() => {
      setCardZ(45);
      setFlapZ(5);
    }, 900);
    // fade the overlay once the card is out
    window.setTimeout(onOpen, 1900);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#f7f1e5_0%,#eee3d0_55%,#e4d5bd_100%)]"
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
    >
      {/* grain + soft bokeh */}
      <div className="texture-grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 animate-float rounded-full bg-[radial-gradient(circle,rgba(201,141,141,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(156,174,143,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/3 top-10 h-40 w-40 animate-float rounded-full bg-[radial-gradient(circle,rgba(195,162,101,0.25),transparent_70%)]" />

      <div className="relative flex flex-col items-center gap-10 px-6">
        {/* caption above */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: opening ? 0 : 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="font-serif text-sm uppercase tracking-[0.35em] text-cocoa">
            Вам пришло письмо
          </p>
          <h1 className="mt-3 font-script text-4xl text-ink sm:text-5xl">
            Приглашение на свадьбу
          </h1>
        </motion.div>

        {/* envelope */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{
            opacity: 1,
            y: opening ? 0 : [0, -10, 0],
            scale: opening ? 0.96 : 1,
          }}
          transition={
            opening
              ? { duration: 0.6 }
              : {
                  y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                }
          }
          whileHover={opening ? undefined : { scale: 1.03, rotate: -0.5 }}
          onClick={open}
          role="button"
          aria-label="Открыть приглашение"
          className="relative aspect-[8/5] w-[min(88vw,540px)] cursor-pointer select-none [perspective:1400px]"
        >
          {/* back wall */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#e3d7bf] to-[#d6c6a8] shadow-[0_30px_60px_-15px_rgba(70,62,53,0.45)]" />

          {/* letter card */}
          <motion.div
            style={{ zIndex: cardZ }}
            animate={
              opening
                ? {
                    y: "-118%",
                    rotateX: [10, 0],
                    scale: [1, 1.06],
                    transition: { delay: 0.9, duration: 0.95, ease: EASE_OUT },
                  }
                : { y: 0 }
            }
            className="absolute inset-x-[5%] bottom-[5%] top-[7%] rounded-md shadow-md [transform-style:preserve-3d]"
          >
            <div className="texture-paper flex h-full flex-col items-center justify-center gap-3 rounded-md border border-sand bg-[#fdfaf2] px-6 text-center">
              <span className="font-serif text-[10px] uppercase tracking-[0.4em] text-gold sm:text-xs">
                Мы женимся
              </span>
              <span className="font-script text-3xl leading-tight text-rosewood sm:text-5xl">
                Денис и Елизавета
              </span>
              <span className="h-px w-16 bg-gold/60" />
              <span className="font-serif text-sm tracking-[0.25em] text-cocoa sm:text-base">
                08 · 07 · 2027
              </span>
            </div>
          </motion.div>

          {/* pocket: left / right / bottom */}
          <div className="absolute inset-0 z-20 rounded-b-lg bg-gradient-to-br from-[#f0e6d2] to-[#e2d4b8] [clip-path:polygon(0_0,55%_50%,0_100%)]" />
          <div className="absolute inset-0 z-20 rounded-b-lg bg-gradient-to-bl from-[#eee2cb] to-[#ddcda9] [clip-path:polygon(100%_0,45%_50%,100%_100%)]" />
          <div className="absolute inset-0 z-20 rounded-b-lg bg-gradient-to-t from-[#f2e9d6] to-[#e6d8bd] shadow-[inset_0_2px_6px_rgba(70,62,53,0.12)] [clip-path:polygon(0_100%,50%_40%,100%_100%)]" />

          {/* flap */}
          <motion.div
            style={{ zIndex: flapZ, transformOrigin: "top center" }}
            animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-[52%] rounded-t-lg [transform-style:preserve-3d]"
          >
            <div className="h-full w-full bg-gradient-to-b from-[#e9ddc4] via-[#e0d1b3] to-[#d3c1a0] shadow-[inset_0_-3px_8px_rgba(70,62,53,0.15)] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          </motion.div>

          {/* wax seal */}
          <motion.div
            animate={
              opening
                ? { opacity: 0, scale: 0.4, rotate: 25 }
                : { opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.4 }}
            className="absolute left-1/2 top-[50%] z-40 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#c98383,#9d5a5a_60%,#7d4242)] shadow-lg ring-4 ring-rosewood/20 sm:h-20 sm:w-20">
              <span className="font-script text-xl text-[#f6e8e4] sm:text-2xl">
                Д&Л
              </span>
            </div>
          </motion.div>

          {/* heart burst on open */}
          {opening &&
            Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * Math.PI * 2 + (i % 3) * 0.2;
              const dist = 90 + (i % 5) * 45;
              const size = 12 + (i % 4) * 6;
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.3, rotate: 0 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist - 40,
                    opacity: 0,
                    scale: 1,
                    rotate: i % 2 === 0 ? 60 : -60,
                  }}
                  transition={{
                    duration: 1.1,
                    delay: 0.55 + (i % 4) * 0.05,
                    ease: "easeOut",
                  }}
                  className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2"
                >
                  <Heart
                    size={size}
                    fill={BURST_COLORS[i % BURST_COLORS.length]}
                    color="none"
                  />
                </motion.div>
              );
            })}
        </motion.div>

        {/* hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: opening ? 0 : [0.4, 1, 0.4] }}
          transition={{
            opacity: opening
              ? { duration: 0.3 }
              : { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
          }}
          className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.3em] text-cocoa"
        >
          <MousePointerClick className="h-4 w-4" />
          Нажмите, чтобы открыть
        </motion.p>
      </div>
    </motion.div>
  );
}
