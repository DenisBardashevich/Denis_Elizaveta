"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";
import {
  Users,
  UtensilsCrossed,
  Waves,
  MoonStar,
  Heart,
} from "lucide-react";
import { SectionHeading } from "./Section";

type FxKind = "hearts" | "champagne" | "water" | "stars";

const EVENTS: {
  time: string;
  title: string;
  text: string;
  Icon: typeof Users;
  fx: FxKind;
}[] = [
  {
    time: "16:00",
    title: "Сбор гостей",
    text: "Встречаемся в усадьбе — просим прибывать к 16:00",
    Icon: Users,
    fx: "hearts",
  },
  {
    time: "16:30",
    title: "Банкет",
    text: "Вкусный ужин, музыка, веселье и душевные разговоры — вечер в кругу самых близких",
    Icon: UtensilsCrossed,
    fx: "champagne",
  },
  {
    time: "21:00",
    title: "Баня, бассейн и джакузи",
    text: "Свободное время: баня, бассейн с подогревом и джакузи — берите купальники, будет тепло",
    Icon: Waves,
    fx: "water",
  },
  {
    time: "23:00",
    title: "Завершение вечера",
    text: "",
    Icon: MoonStar,
    fx: "stars",
  },
];

const BUBBLE_COLORS = ["#c3a265", "#d9b877", "#e8d5a8"];
const HEART_COLORS = ["#c98d8d", "#a96868", "#e0b3b3"];
const WATER_COLORS = ["#8fb8c9", "#a9cede", "#7aa7bd"];
const STAR_COLORS = ["#c3a265", "#e8d5a8", "#f0e6cf"];

const FX_MS = 2800;

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** rising particles: bubbles / hearts / champagne fizz */
function RisingFX({
  colors,
  count,
  heart,
}: {
  colors: string[];
  count: number;
  heart?: boolean;
}) {
  const parts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: rand(2, 96),
        size: rand(8, 18),
        delay: rand(0, 0.7),
        dur: rand(1.4, 2.4),
        rise: rand(240, 380),
        drift: rand(-45, 45),
        color: colors[i % colors.length],
      })),
    [colors, count]
  );
  return (
    <>
      {parts.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: 0, x: 0, opacity: 0 }}
          animate={{
            y: -p.rise,
            x: [0, p.drift, 0],
            opacity: [0, 0.95, 0.85, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: "easeOut",
          }}
          className="absolute bottom-0"
          style={{ left: `${p.left}%` }}
        >
          {heart ? (
            <Heart size={p.size + 5} fill={p.color} color="none" />
          ) : (
            <span
              className="block rounded-full"
              style={{
                width: p.size,
                height: p.size,
                border: `1.5px solid ${p.color}`,
                background: `${p.color}33`,
              }}
            />
          )}
        </motion.span>
      ))}
    </>
  );
}

/** twinkling stars for the evening finale */
function StarsFX() {
  const stars = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: rand(2, 96),
        top: rand(5, 92),
        size: rand(5, 12),
        delay: rand(0, 1.2),
        color: STAR_COLORS[i % STAR_COLORS.length],
      })),
    []
  );
  return (
    <>
      {stars.map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1, 0.3], rotate: 90 }}
          transition={{ duration: 1.5, delay: s.delay, ease: "easeInOut" }}
          className="absolute"
          style={{ left: `${s.left}%`, top: `${s.top}%` }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 10 10">
            <path
              d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z"
              fill={s.color}
            />
          </svg>
        </motion.span>
      ))}
    </>
  );
}

function EventFX({ kind }: { kind: FxKind }) {
  return (
    <div
      className="pointer-events-none absolute -inset-y-24 left-1/2 z-20 w-[min(94vw,720px)] -translate-x-1/2"
      aria-hidden
    >
      {kind === "water" && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_62%,rgba(140,190,215,0.45),rgba(140,190,215,0)_72%)]"
          />
          <RisingFX colors={WATER_COLORS} count={18} />
        </>
      )}
      {kind === "champagne" && <RisingFX colors={BUBBLE_COLORS} count={16} />}
      {kind === "hearts" && <RisingFX colors={HEART_COLORS} count={12} heart />}
      {kind === "stars" && <StarsFX />}
    </div>
  );
}

function TimelineItem({
  e,
  left,
  lineProgress,
  containerRef,
}: {
  e: (typeof EVENTS)[number];
  left: boolean;
  lineProgress: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  const [fx, setFx] = useState(false);
  const [threshold, setThreshold] = useState(1);

  // where along the rail this item's node sits (0..1)
  useEffect(() => {
    const measure = () => {
      if (ref.current && containerRef.current) {
        const h = containerRef.current.offsetHeight || 1;
        setThreshold((ref.current.offsetTop + 20) / h);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [containerRef]);

  // fire the moment the filling line reaches this node
  useMotionValueEvent(lineProgress, "change", (v) => {
    if (!fired.current && v >= threshold) {
      fired.current = true;
      setFx(true);
      window.setTimeout(() => setFx(false), FX_MS);
    }
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-start gap-6 pl-14 sm:w-1/2 sm:pl-0 ${
        left ? "sm:pr-14 sm:text-right" : "sm:ml-auto sm:pl-14"
      }`}
    >
      {fx && <EventFX kind={e.fx} />}

      {/* node */}
      <div
        className={`absolute left-5 top-1 z-10 -translate-x-1/2 sm:top-2 ${
          left
            ? "sm:left-full sm:translate-x-[-50%]"
            : "sm:left-0 sm:-translate-x-1/2"
        }`}
      >
        <motion.div
          animate={fx ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 bg-ivory shadow-[0_6px_16px_-6px_rgba(70,62,53,0.35)]"
        >
          <e.Icon className="h-4 w-4 text-rosewood" />
        </motion.div>
      </div>

      <div className="glass texture-paper relative w-full overflow-hidden rounded-2xl p-5 shadow-[0_14px_36px_-18px_rgba(70,62,53,0.35)] sm:p-6">
        <p className="font-serif text-sm font-semibold tracking-[0.25em] text-gold">
          {e.time}
        </p>
        <h3 className="mt-1 font-serif text-2xl font-semibold text-ink">
          {e.title}
        </h3>
        {e.text && (
          <p className="mt-2 text-sm leading-relaxed text-cocoa">{e.text}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  return (
    <section id="program" className="relative px-6 py-24 sm:py-32">
      <SectionHeading overline="Как пройдёт день" title="Программа" />

      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* rail */}
        <div className="absolute left-5 top-0 h-full w-px -translate-x-1/2 bg-sand sm:left-1/2" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-5 top-0 h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-gold via-rosewood to-sage sm:left-1/2"
        />

        <div className="space-y-12">
          {EVENTS.map((e, i) => (
            <TimelineItem
              key={e.title}
              e={e}
              left={i % 2 === 0}
              lineProgress={lineScale}
              containerRef={ref}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
