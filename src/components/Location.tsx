"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Clock, X } from "lucide-react";
import { SectionHeading, Reveal } from "./Section";

const VENUE_PHOTOS = [
  { src: "/images/venue-house.jpg", alt: "Усадьба «Рыжий кот» вечером" },
  { src: "/images/venue-hall.jpg", alt: "Банкетный зал" },
  { src: "/images/venue-pool.jpg", alt: "Бассейн на территории" },
  { src: "/images/venue-jacuzzi.jpg", alt: "Джакузи и купол-глэмпинг" },
  { src: "/images/venue-sauna.jpg", alt: "Баня" },
  { src: "/images/venue-night.jpg", alt: "Джакузи под открытым небом" },
];

export default function Location() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setIndex((i) =>
        i === null ? i : (i + dir + VENUE_PHOTOS.length) % VENUE_PHOTOS.length
      ),
    []
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, step]);

  return (
    <section id="location" className="relative px-5 py-16 sm:px-6 sm:py-32">
      <SectionHeading overline="Где мы будем" title="Локация" />

      <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="glass texture-paper flex h-full flex-col justify-center gap-5 rounded-3xl p-5 shadow-[0_20px_50px_-25px_rgba(70,62,53,0.4)] sm:gap-6 sm:p-8">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
                Усадьба «Рыжий кот»
              </h3>
              <p className="mt-3 leading-relaxed text-cocoa">
                Уютная загородная усадьба с зелёной территорией и банкетным
                залом. А ещё там есть баня, бассейн и джакузи — берите
                купальники, полотенца выдаются на месте.
              </p>
            </div>

            <div className="flex items-start gap-3 text-sm text-cocoa">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <p>
                д. Мончаки, Центральная ул., 29А — ~25 км от Минска, за
                Острошицким Городком. В навигаторе ищите «Рыжий кот Redhouse».
              </p>
            </div>

            <div className="flex items-start gap-3 text-sm text-cocoa">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <p>
                Сбор гостей в 16:00 — просим прибывать вовремя, начинаем без
                опозданий.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-3">
          <div className="group flex justify-center overflow-hidden rounded-3xl border border-sand bg-[#eef2ea] shadow-[0_20px_50px_-25px_rgba(70,62,53,0.4)]">
            <Image
              src="/images/map.jpg"
              alt="Карта проезда к усадьбе «Рыжий кот» — д. Мончаки, Центральная ул., 29А"
              width={591}
              height={718}
              className="h-[340px] w-auto transition-transform duration-700 group-hover:scale-[1.03] sm:h-[420px]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-ink/5" />
          </div>
        </Reveal>
      </div>

      {/* фотографии усадьбы */}
      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-3">
        {VENUE_PHOTOS.map((p, i) => (
          <motion.button
            key={p.src}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-2xl shadow-[0_16px_40px_-20px_rgba(70,62,53,0.45)]"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 p-3 text-left text-xs tracking-wide text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {p.alt}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/85 p-4"
            onClick={close}
          >
            <motion.figure
              key={index}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[80svh] w-full max-w-4xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={VENUE_PHOTOS[index].src}
                alt={VENUE_PHOTOS[index].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.figure>

            <button
              onClick={close}
              aria-label="Закрыть"
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Назад"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Вперёд"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/25 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
