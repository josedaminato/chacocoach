"use client";

import { motion } from "framer-motion";
import { TRANSFORM_PROGRAM, WHATSAPP_MESSAGES } from "@/lib/landing";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function TransformProgram() {
  const href = getWhatsAppHref(WHATSAPP_MESSAGES.transformProgram);
  const { id, title, subtitle, includes, highlight, cta } = TRANSFORM_PROGRAM;

  return (
    <section
      id={id}
      className="py-20 md:py-28 bg-white text-[var(--secondary)]"
      aria-labelledby="programa-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[var(--primary)] font-display text-sm uppercase tracking-widest mb-3"
        >
          Programa Entrená con Chaco
        </motion.p>
        <motion.h2
          id="programa-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl text-center mb-4 leading-tight"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[var(--color-muted)] mb-10 text-base md:text-lg leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 md:p-8 border border-slate-200 bg-[var(--color-surface)] mb-8"
        >
          <p className="font-display text-sm uppercase tracking-wider text-[var(--primary)] mb-5 text-center">
            Qué incluye
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-[var(--primary)] shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-5 md:p-6 rounded-xl bg-[var(--secondary)] text-white mb-8"
        >
          <p className="text-center text-sm md:text-base leading-relaxed text-white/90">
            {highlight}
          </p>
        </motion.div>

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
              trackEvent("whatsapp_click", { location: "programa", action: "schedule_call" })
            }
            className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 bg-[var(--primary)] text-white font-display font-bold text-lg uppercase rounded-lg hover:opacity-90 transition-opacity shadow-md"
          >
            {cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
