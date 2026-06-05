"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { trainerConfig } from "@/lib/getConfig";
import { assetUrl } from "@/lib/assetUrl";
import { trackEvent } from "@/lib/analytics";
import { BrandLogo } from "@/components/layout/BrandLogo";

const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.12 },
  }),
};

export function Hero() {
  const [imgError, setImgError] = useState(false);
  const mediaSrc = assetUrl(trainerConfig.heroMedia);

  return (
    <section
      className="relative min-h-[100dvh] flex items-end md:items-center overflow-hidden"
      aria-label="Portada"
    >
      {mediaSrc && (
        <div className="absolute inset-0 z-0 bg-[var(--secondary)]">
          {!imgError ? (
            <Image
              src={mediaSrc}
              alt="Entrenamiento de fuerza en gimnasio"
              fill
              className="object-cover object-[center_22%] sm:object-[center_28%] md:object-[72%_center] lg:object-[68%_center]"
              priority
              sizes="100vw"
              unoptimized
              onError={() => setImgError(true)}
            />
          ) : null}
          {/* Oscurece la izquierda para el texto; en desktop deja ver al atleta a la derecha */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[var(--secondary)] from-0% via-[var(--secondary)]/88 via-45% to-[var(--secondary)]/15 to-100% md:via-[var(--secondary)]/72 md:via-38% md:to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[var(--secondary)] via-[var(--secondary)]/40 to-transparent md:from-[var(--secondary)]/80 md:via-transparent"
            aria-hidden
          />
        </div>
      )}
      {!mediaSrc && (
        <div className="absolute inset-0 bg-[var(--secondary)]" />
      )}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:py-32">
        <div className="max-w-xl md:max-w-lg lg:max-w-xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-[var(--primary)] font-display text-sm md:text-base tracking-widest uppercase mb-3 drop-shadow-sm"
          >
            {trainerConfig.tagline}
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mb-5"
          >
            <BrandLogo
              height={80}
              priority
              className="rounded-lg ring-1 ring-white/20 shadow-xl w-auto max-w-[240px] sm:max-w-[260px]"
            />
            <h1 className="sr-only">{trainerConfig.heroHeadline}</h1>
          </motion.div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl text-white font-medium mb-3 drop-shadow-md"
          >
            {trainerConfig.heroSubheadline}
          </motion.p>
          {"heroDescription" in trainerConfig && trainerConfig.heroDescription && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-base md:text-lg text-white/90 mb-8 leading-relaxed drop-shadow-md"
            >
              {trainerConfig.heroDescription}
            </motion.p>
          )}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <Link
              href="/#planes"
              onClick={() =>
                trackEvent("cta_click", { location: "hero", target: "planes" })
              }
              className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-[var(--primary)] text-white font-display font-bold text-lg uppercase rounded-lg hover:opacity-90 transition-opacity shadow-lg"
              aria-label="Quiero empezar - ver planes"
            >
              Quiero empezar
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
