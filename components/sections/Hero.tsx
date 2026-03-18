"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { trainerConfig } from "@/lib/getConfig";
import { trackEvent } from "@/lib/analytics";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.15 },
  }),
};

export function Hero() {
  const mediaSrc = trainerConfig.heroMedia?.startsWith("http")
    ? trainerConfig.heroMedia
    : trainerConfig.heroMedia;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Bienvenida"
    >
      {mediaSrc && (
        <div className="absolute inset-0 z-0">
          {mediaSrc.endsWith(".mp4") || mediaSrc.endsWith(".webm") ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              aria-hidden
            >
              <source src={mediaSrc} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={mediaSrc}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-[var(--secondary)]/80" />
        </div>
      )}
      {!mediaSrc && (
        <div className="absolute inset-0 bg-[var(--secondary)]" />
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="font-display text-6xl sm:text-7xl md:text-8xl text-white mb-6"
        >
          {trainerConfig.heroHeadline}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10"
        >
          {trainerConfig.heroSubheadline}
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={trainerConfig.harbizUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_harbiz_cta", { location: "hero" })}
            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-lg uppercase hover:opacity-90 transition-opacity"
            aria-label="Empezá hoy en Harbiz"
          >
            Empezá hoy
          </Link>
          <Link
            href="/#planes"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-display font-bold text-lg uppercase hover:bg-white hover:text-[var(--secondary)] transition-all"
            aria-label="Ver planes"
          >
            Ver planes
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
