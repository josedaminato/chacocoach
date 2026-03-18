"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { trainerConfig } from "@/lib/getConfig";
import { trackEvent } from "@/lib/analytics";

export function CTABanner() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Llamado a la acción"
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[var(--secondary)]/80" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6"
        >
          {trainerConfig.ctaHeadline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-white/90 mb-10"
        >
          {trainerConfig.ctaSubheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href={trainerConfig.harbizUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_harbiz_cta", { location: "cta_banner" })}
            className="inline-block px-12 py-5 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-xl uppercase hover:opacity-90 transition-opacity"
            aria-label="Reservar en Harbiz"
          >
            Reservar ahora
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
