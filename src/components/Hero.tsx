"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import Countdown from "./Countdown";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* parallax decor */}
      <motion.div
        style={{ y: yBg, opacity: opacityBg }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute -left-28 top-16 h-80 w-80 animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(239,220,214,0.85),transparent_70%)]" />
        <div className="absolute -right-32 top-1/3 h-64 w-64 animate-float rounded-full bg-[radial-gradient(circle,rgba(156,174,143,0.35),transparent_70%)]" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 animate-float rounded-full bg-[radial-gradient(circle,rgba(195,162,101,0.25),transparent_70%)]" />
      </motion.div>
      <div className="texture-grain pointer-events-none absolute inset-0" />

      <motion.div
        variants={container}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          variants={item}
          className="font-serif text-xs uppercase tracking-[0.45em] text-gold sm:text-sm"
        >
          Приглашение на свадьбу
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-6 font-script text-6xl leading-[1.05] text-ink sm:whitespace-nowrap sm:text-7xl lg:text-8xl"
        >
          Дениса
          <span className="mx-3 inline-block font-serif text-4xl italic text-rosewood sm:mx-5 sm:text-6xl">
            и
          </span>
          Елизаветы
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-8 flex items-center gap-4 text-cocoa"
        >
          <span className="h-px w-12 bg-gold/70 sm:w-20" />
          <p className="font-serif text-lg tracking-[0.2em] sm:text-2xl">
            08 · 07 · 2027
          </p>
          <span className="h-px w-12 bg-gold/70 sm:w-20" />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-2 font-serif text-base font-semibold uppercase tracking-[0.3em] text-ink sm:text-lg"
        >
          Четверг
        </motion.p>

        <motion.p
          variants={item}
          className="mt-1 font-serif text-sm font-semibold uppercase tracking-[0.3em] text-rosewood sm:text-base"
        >
          Прибытие к 16:00
        </motion.p>

        <motion.a
          variants={item}
          href="#location"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 font-sans text-sm tracking-wide text-cocoa transition-colors hover:border-gold hover:text-ink"
        >
          <MapPin className="h-4 w-4 text-rosewood" />
          Усадьба «Рыжий кот»
        </motion.a>

        <motion.div variants={item} className="mt-12 w-full max-w-xl">
          <Countdown />
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex items-center justify-center"
        >
          <div className="relative aspect-[3/4] w-44 -rotate-2 overflow-hidden rounded-2xl border-4 border-white shadow-[0_18px_40px_-18px_rgba(70,62,53,0.5)] transition-transform duration-500 hover:rotate-0 sm:w-56">
            <Image
              src="/images/couple-1.jpg"
              alt="Денис и Лиза на закате у воды"
              fill
              sizes="(max-width: 640px) 50vw, 230px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#program"
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cocoa/70 transition-colors hover:text-ink"
        aria-label="Листать вниз"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.span>
      </motion.a>
    </section>
  );
}
