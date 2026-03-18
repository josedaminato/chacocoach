"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface Trainer {
  name?: string;
  bio?: unknown;
  photo?: string;
  certifications?: { title: string; icon?: string }[];
  metrics?: {
    clients?: number;
    years?: number;
    countries?: number;
  };
}

interface AboutProps {
  trainer: Trainer | null;
}

export function About({ trainer }: AboutProps) {
  if (!trainer) return null;

  const metrics = [
    { value: trainer.metrics?.years ?? 0, label: "Años de experiencia" },
    { value: trainer.metrics?.clients ?? 0, label: "Clientes transformados" },
    { value: trainer.metrics?.countries ?? 0, label: "Países" },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-[var(--secondary)] text-white"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            {trainer.photo ? (
              <Image
                src={trainer.photo}
                alt={trainer.name || "Trainer"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                <span className="text-6xl font-display text-white/30">?</span>
              </div>
            )}
          </motion.div>
          <div>
            <motion.h2
              id="about-heading"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-display text-4xl md:text-6xl mb-6"
            >
              Sobre mí
            </motion.h2>
            {Array.isArray(trainer.bio) ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="prose prose-invert prose-lg mb-8 [&_p]:text-white/90 [&_p]:leading-relaxed"
              >
                <PortableText value={trainer.bio} />
              </motion.div>
            ) : null}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              {metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <span className="block font-display text-4xl md:text-5xl text-[var(--primary)]">
                    {m.value}+
                  </span>
                  <span className="text-sm text-white/70">{m.label}</span>
                </div>
              ))}
            </motion.div>
            {trainer.certifications && trainer.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="font-display text-sm uppercase tracking-wider mb-3">
                  Certificaciones
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trainer.certifications.map((cert) => (
                    <span
                      key={cert.title}
                      className="px-3 py-1 rounded-full bg-white/10 text-sm flex items-center gap-2"
                    >
                      {cert.icon && (
                        <CertIcon name={cert.icon} className="w-4 h-4" />
                      )}
                      {cert.title}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CertIcon({ className }: { name: string; className?: string }) {
  return (
    <span className={className} aria-hidden>
      ✓
    </span>
  );
}
