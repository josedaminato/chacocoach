"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Transformation {
  _id: string;
  clientName?: string;
  beforePhoto?: string;
  afterPhoto?: string;
  duration?: string;
  discipline?: string;
}

interface TransformationsProps {
  transformations: Transformation[];
}

export function Transformations({ transformations }: TransformationsProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!transformations || transformations.length === 0) return null;

  const slides = transformations.flatMap((t) => {
    const imgs: { src: string; alt: string }[] = [];
    if (t.beforePhoto) imgs.push({ src: t.beforePhoto, alt: `Antes - ${t.clientName || "Cliente"}` });
    if (t.afterPhoto) imgs.push({ src: t.afterPhoto, alt: `Después - ${t.clientName || "Cliente"}` });
    return imgs;
  });

  return (
    <section
      id="transformaciones"
      className="py-20 md:py-28 bg-[var(--secondary)] text-white"
      aria-labelledby="transformaciones-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="transformaciones-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl text-center mb-16"
        >
          Transformaciones
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformations.map((t, i) => (
            <motion.article
              key={t._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
              onClick={() => {
                const idx = transformations
                  .slice(0, i)
                  .reduce((acc, x) => acc + (x.beforePhoto ? 1 : 0) + (x.afterPhoto ? 1 : 0), 0);
                setLightboxIndex(idx);
                setLightboxOpen(true);
              }}
            >
              <div className="grid grid-cols-2 gap-0">
                {t.beforePhoto && (
                  <div className="relative aspect-square">
                    <Image
                      src={t.beforePhoto}
                      alt={`Antes - ${t.clientName || "Cliente"}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      quality={85}
                    />
                    <span className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-1 rounded">
                      Antes
                    </span>
                  </div>
                )}
                {t.afterPhoto && (
                  <div className="relative aspect-square">
                    <Image
                      src={t.afterPhoto}
                      alt={`Después - ${t.clientName || "Cliente"}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      quality={85}
                    />
                    <span className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-1 rounded">
                      Después
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 bg-white/5">
                {t.clientName && (
                  <p className="font-display text-lg">{t.clientName}</p>
                )}
                {t.duration && (
                  <p className="text-sm text-white/70">{t.duration}</p>
                )}
                {t.discipline && (
                  <p className="text-sm text-[var(--primary)]">{t.discipline}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
      />
    </section>
  );
}
