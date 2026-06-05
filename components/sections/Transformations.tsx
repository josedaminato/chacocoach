"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { assetUrl } from "@/lib/assetUrl";

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
    if (t.beforePhoto)
      imgs.push({ src: assetUrl(t.beforePhoto), alt: `Antes - ${t.clientName || "Cliente"}` });
    if (t.afterPhoto)
      imgs.push({ src: assetUrl(t.afterPhoto), alt: `Después - ${t.clientName || "Cliente"}` });
    return imgs;
  });

  return (
    <section
      id="transformaciones"
      className="py-20 md:py-28 bg-white text-[var(--secondary)]"
      aria-labelledby="transformaciones-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="transformaciones-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl text-center mb-4"
        >
          Casos de éxito
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[var(--color-muted)] mb-14"
        >
          Resultados reales de alumnos que confiaron en el proceso.
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {transformations.map((t, i) => (
            <motion.article
              key={t._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                const idx = transformations
                  .slice(0, i)
                  .reduce(
                    (acc, x) =>
                      acc + (x.beforePhoto ? 1 : 0) + (x.afterPhoto ? 1 : 0),
                    0
                  );
                setLightboxIndex(idx);
                setLightboxOpen(true);
              }}
            >
              <div className="grid grid-cols-2 gap-0">
                {t.beforePhoto && (
                  <div className="relative aspect-[3/4] bg-[var(--secondary)]">
                    <Image
                      src={assetUrl(t.beforePhoto)}
                      alt={`Antes - ${t.clientName || "Cliente"}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 20vw"
                      quality={85}
                      unoptimized={!t.beforePhoto.startsWith("http")}
                    />
                    <span className="absolute bottom-2 left-2 text-xs bg-[var(--secondary)]/80 text-white px-2 py-1 rounded">
                      Antes
                    </span>
                  </div>
                )}
                {t.afterPhoto && (
                  <div className="relative aspect-[3/4] bg-[var(--secondary)]">
                    <Image
                      src={assetUrl(t.afterPhoto)}
                      alt={`Después - ${t.clientName || "Cliente"}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 20vw"
                      quality={85}
                      unoptimized={!t.afterPhoto.startsWith("http")}
                    />
                    <span className="absolute bottom-2 left-2 text-xs bg-[var(--primary)] text-white px-2 py-1 rounded">
                      Después
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 bg-[var(--color-surface)]">
                {t.clientName && (
                  <p className="font-display text-xl">{t.clientName}</p>
                )}
                {t.duration && (
                  <p className="text-sm text-[var(--color-muted)]">{t.duration}</p>
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
