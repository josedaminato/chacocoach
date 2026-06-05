"use client";

import { motion } from "framer-motion";
import type { Plan } from "@/lib/types";
import { PLAN_INCLUDES, WHATSAPP_MESSAGES } from "@/lib/landing";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";

interface PlansProps {
  plans: Plan[];
}

export function Plans({ plans }: PlansProps) {
  const activePlans = plans?.filter((p) => p.isActive !== false) ?? [];
  if (activePlans.length === 0) return null;

  return (
    <section
      id="planes"
      className="py-20 md:py-28 bg-[var(--secondary)] text-white"
      aria-labelledby="planes-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="planes-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl text-center mb-4"
        >
          Planes de entrenamiento online
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="text-center text-white/70 mb-12 max-w-2xl mx-auto"
        >
          Elegí la frecuencia que mejor se adapte a tu rutina. Todos los planes
          incluyen lo mismo; cambia la cantidad de entrenamientos por semana.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 max-w-3xl mx-auto"
        >
          <p className="font-display text-sm uppercase tracking-wider text-[var(--primary)] mb-4 text-center">
            Todos los planes incluyen
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {PLAN_INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/90">
                <span className="text-[var(--primary)] shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {activePlans.map((plan, i) => (
            <motion.article
              key={plan._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className={`relative flex flex-col rounded-2xl p-6 md:p-8 border-2 ${
                plan.isFeatured
                  ? "border-[var(--primary)] bg-white/10 shadow-lg shadow-[var(--primary)]/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.isFeatured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--primary)] text-white text-xs font-display font-bold uppercase rounded-full">
                  Más elegido
                </span>
              )}
              <h3 className="font-display text-2xl md:text-3xl mb-2">{plan.name}</h3>
              {plan.description && (
                <p className="text-white/75 text-sm mb-4 leading-relaxed">
                  {plan.description}
                </p>
              )}
              {plan.features && plan.features.length > 0 && (
                <ul className="space-y-2 mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="text-[var(--primary)]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              <a
                href={getWhatsAppHref(WHATSAPP_MESSAGES.planification)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", {
                    location: "plans",
                    plan: plan.name,
                  })
                }
                className="mt-auto inline-flex items-center justify-center w-full px-6 py-4 bg-[var(--primary)] text-white font-display font-bold text-base uppercase rounded-lg hover:opacity-90 transition-opacity"
                aria-label={`Quiero el ${plan.name}`}
              >
                Quiero este plan
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
