"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
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
                залом. А ещё там есть баня, бассейн с подогревом и джакузи —
                берите купальники, будет тепло, а полотенца выдаются на месте.
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
              <p>Сбор гостей в 16:00 — просим прибывать вовремя.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-3">
          <div className="flex justify-center overflow-hidden rounded-3xl border border-sand bg-[#eef2ea] shadow-[0_20px_50px_-25px_rgba(70,62,53,0.4)]">
            <Image
              src="/images/map.jpg"
              alt="Карта проезда к усадьбе «Рыжий кот» — д. Мончаки, Центральная ул., 29А"
              width={591}
              height={718}
              className="h-[340px] w-auto sm:h-[420px]"
            />
          </div>
        </Reveal>
      </div>

      {/* фотографии усадьбы */}
      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-3">
        {VENUE_PHOTOS.map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: (i % 3) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_16px_40px_-20px_rgba(70,62,53,0.45)]"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
