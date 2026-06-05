"use client";

import { motion } from "framer-motion";
import { MONTHLY_PLANNING, WHATSAPP_MESSAGES } from "@/lib/landing";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function MonthlyPlanning() {
  const href = getWhatsAppHref(WHATSAPP_MESSAGES.planification);
  const { id, title, subtitle, includes, highlight, cta } = MONTHLY_PLANNING;

  return (
    <section
      id={id}
      className="py-20 md:py-28 bg-[var(--secondary)] text-white"
      aria-labelledby="planificacion-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="planificacion-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl text-center mb-4"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white/75 mb-10 text-base md:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 md:p-8 border border-white/10 bg-white/5 mb-8"
        >
          <p className="font-display text-sm uppercase tracking-wider text-[var(--primary)] mb-5 text-center">
            Incluye
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/90">
                <span className="text-[var(--primary)] shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white/90 text-base md:text-lg leading-relaxed mb-8 px-2"
        >
          {highlight}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("whatsapp_click", { location: "planificacion" })
            }
            className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-[var(--primary)] text-white font-display font-bold text-lg uppercase rounded-lg hover:opacity-90 transition-opacity shadow-lg"
          >
            {cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
