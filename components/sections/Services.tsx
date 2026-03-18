"use client";

import { motion } from "framer-motion";

interface Service {
  _id?: string;
  title: string;
  description?: string;
  icon?: string;
}

interface HowItWorksStep {
  step: number;
  title: string;
  description?: string;
}

interface ServicesProps {
  services: Service[];
  howItWorks: HowItWorksStep[];
}

const iconMap: Record<string, string> = {
  laptop: "💻",
  dumbbell: "🏋️",
  apple: "🍎",
  chart: "📈",
};

export function Services({ services, howItWorks }: ServicesProps) {
  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-white text-[var(--secondary)]"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="services-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl text-center mb-16"
        >
          Servicios
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {services.map((service, i) => (
            <motion.article
              key={service._id || service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-[var(--secondary)]/10 hover:border-[var(--primary)]/50 transition-colors"
            >
              <span className="block text-3xl mb-3">
                {service.icon ? iconMap[service.icon] || "•" : "•"}
              </span>
              <h3 className="font-display text-xl mb-3">{service.title}</h3>
              <p className="text-[var(--secondary)]/80 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl text-center mb-12"
          >
            ¿Cómo trabajo?
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <span className="block font-display text-5xl text-[var(--primary)] mb-4">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h4 className="font-display text-xl mb-2">{step.title}</h4>
                <p className="text-[var(--secondary)]/70 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
