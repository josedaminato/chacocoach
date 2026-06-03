"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { trainerConfig } from "@/lib/getConfig";
import { trackEvent } from "@/lib/analytics";

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
  const mediaSrc = trainerConfig.heroMedia;

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
              alt=""
              fill
              className="object-cover object-top md:object-center"
              priority
              sizes="100vw"
              unoptimized={mediaSrc.startsWith("http")}
              onError={() => setImgError(true)}
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--secondary)] via-[var(--secondary)]/70 to-[var(--secondary)]/40" />
        </div>
      )}
      {!mediaSrc && (
        <div className="absolute inset-0 bg-[var(--secondary)]" />
      )}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:py-32">
        <div className="max-w-2xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-[var(--primary)] font-display text-sm md:text-base tracking-widest uppercase mb-3"
          >
            {trainerConfig.tagline}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 leading-none"
          >
            {trainerConfig.heroHeadline}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl text-white font-medium mb-3"
          >
            {trainerConfig.heroSubheadline}
          </motion.p>
          {"heroDescription" in trainerConfig && trainerConfig.heroDescription && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="text-base md:text-lg text-white/85 mb-8 leading-relaxed"
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
              onClick={() => trackEvent("cta_click", { location: "hero", target: "planes" })}
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
