"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Plan } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

interface PlansProps {
  plans: Plan[];
}

export function Plans({ plans }: PlansProps) {
  if (!plans || plans.length === 0) return null;

  const periodLabel = (p: Plan) =>
    p.billingPeriod === "monthly"
      ? "/mes"
      : p.billingPeriod === "quarterly"
        ? "/trimestre"
        : p.billingPeriod === "yearly"
          ? "/año"
          : "";

  return (
    <section
      id="planes"
      className="py-20 md:py-28 bg-[var(--secondary)]"
      aria-labelledby="planes-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="planes-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl text-white text-center mb-16"
        >
          Planes y precios
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.article
              key={plan._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 bg-[var(--secondary)] text-white border-2 ${
                plan.isFeatured ? "border-[var(--primary)]" : "border-white/10"
              }`}
            >
              {plan.isFeatured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--primary)] text-[var(--secondary)] text-sm font-display font-bold uppercase">
                  Más popular
                </span>
              )}
              <h3 className="font-display text-2xl md:text-3xl mb-2">
                {plan.name}
              </h3>
              {plan.price != null && (
                <div className="mb-6">
                  <span className="font-display text-4xl md:text-5xl">
                    ${plan.price.toLocaleString("es-AR")}
                  </span>
                  <span className="text-white/70 ml-1">
                    {periodLabel(plan)}
                  </span>
                </div>
              )}
              {plan.features && plan.features.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-[var(--primary)] mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={plan.harbizUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("click_harbiz_cta", {
                    location: "plans",
                    plan: plan.name,
                  })
                }
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-lg uppercase hover:opacity-90 transition-opacity"
                aria-label={`Reservar plan ${plan.name}`}
              >
                Empezar ahora
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
