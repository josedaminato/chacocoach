"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { trainerConfig } from "@/lib/getConfig";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { WHATSAPP_MESSAGES } from "@/lib/landing";
import { trackEvent } from "@/lib/analytics";

export function CTABanner() {
  const whatsappHref = getWhatsAppHref(WHATSAPP_MESSAGES.general);

  return (
    <section
      id="contacto-cta"
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[var(--accent)] to-[var(--primary)]"
      aria-label="Llamado a la acción final"
    >
      <div className="absolute inset-0 bg-[var(--secondary)]/20" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl lg:text-6xl text-white mb-6"
        >
          {trainerConfig.ctaHeadline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-lg md:text-xl text-white/95 mb-10 leading-relaxed"
        >
          {trainerConfig.ctaSubheadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/#planes"
            onClick={() => trackEvent("cta_click", { location: "cta_final", target: "planes" })}
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-[var(--secondary)] font-display font-bold text-lg uppercase rounded-lg hover:opacity-95 transition-opacity"
          >
            Ver planes
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { location: "cta_final" })}
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white font-display font-bold text-lg uppercase rounded-lg hover:bg-white hover:text-[var(--secondary)] transition-colors"
          >
            WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
