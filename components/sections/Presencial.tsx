"use client";

import { motion } from "framer-motion";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { WHATSAPP_MESSAGES } from "@/lib/landing";
import { trackEvent } from "@/lib/analytics";

export function Presencial() {
  const href = getWhatsAppHref(WHATSAPP_MESSAGES.presencial);

  return (
    <section
      id="presencial"
      className="py-20 md:py-28 bg-[var(--color-surface)] text-[var(--secondary)]"
      aria-labelledby="presencial-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          id="presencial-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl mb-6"
        >
          Entrenamiento presencial
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="text-[var(--color-muted)] text-base md:text-lg leading-relaxed mb-10"
        >
          También trabajo de forma presencial en Mendoza para quienes buscan
          acompañamiento directo en cada entrenamiento.
        </motion.p>
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          onClick={() => trackEvent("whatsapp_click", { location: "presencial" })}
          className="inline-flex items-center justify-center px-8 py-4 bg-[var(--primary)] text-white font-display font-bold text-lg uppercase rounded-lg hover:opacity-90 transition-opacity shadow-md"
        >
          Consultar por WhatsApp
        </motion.a>
      </div>
    </section>
  );
}
