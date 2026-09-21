"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import Envelope from "@/components/Envelope";
import AmbientHearts from "@/components/AmbientHearts";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Location from "@/components/Location";
import RSVPForm from "@/components/RSVPForm";


export default function Home() {
  const [opened, setOpened] = useState(false);

  // всегда открываем сайт с начала, а не с прошлой позиции скролла
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="top" className="relative">
      <AnimatePresence>
        {!opened && <Envelope key="envelope" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && <AmbientHearts />}
      <Hero started={opened} />

      {/* soft section divider */}
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <Timeline />
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <Location />
      <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <RSVPForm />

      <footer className="border-t border-sand/70 px-6 py-12 text-center">
        <Heart className="mx-auto h-5 w-5 fill-rosewood text-rosewood" />
        <p className="mt-4 font-script text-3xl text-ink">
          Денис и Елизавета
        </p>
        <p className="mt-2 font-serif text-xs uppercase tracking-[0.35em] text-cocoa">
          08 · 07 · 2027 — Усадьба «Рыжий кот»
        </p>
      </footer>
    </main>
  );
}
