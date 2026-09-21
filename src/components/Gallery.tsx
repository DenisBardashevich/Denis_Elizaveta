"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "./Section";

const PHOTOS = [
  { src: "/images/couple-1.jpg", alt: "Денис и Лиза на закате у воды" },
  { src: "/images/couple-2.jpg", alt: "Денис и Лиза — селфи у реки" },
  { src: "/images/couple-3.jpg", alt: "Лиза у неоновой вывески" },
  { src: "/images/couple-4.jpg", alt: "Денис с надписью «Люблю Лизу»" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-24 sm:py-32">
      <SectionHeading overline="Немного о нас" title="Галерея" />

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {PHOTOS.map((p, i) => (
          <motion.div
            key={p.src}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: (i % 4) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_16px_40px_-20px_rgba(70,62,53,0.45)]"
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
