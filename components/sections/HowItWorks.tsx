"use client";

import { motion } from "framer-motion";
import type { HowItWorksStep } from "@/lib/types";
import { HOW_IT_WORKS_TITLE } from "@/lib/landing";

interface HowItWorksProps {
  steps: HowItWorksStep[];
}

export function HowItWorks({ steps }: HowItWorksProps) {
  if (!steps?.length) return null;

  return (
    <section
      id="como-trabajo"
      className="py-20 md:py-28 bg-white text-[var(--secondary)]"
      aria-labelledby="como-trabajo-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="como-trabajo-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-5xl text-center mb-14"
        >
          {HOW_IT_WORKS_TITLE}
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.article
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="relative p-6 rounded-2xl border border-slate-200 bg-[var(--color-surface)]"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primary)] text-white font-display text-lg mb-4">
                {step.step}
              </span>
              <h3 className="font-display text-lg md:text-xl leading-tight">
                {step.title}
              </h3>
              {step.description ? (
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                  {step.description}
                </p>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
