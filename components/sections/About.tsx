"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { assetUrl } from "@/lib/assetUrl";
import { ABOUT_TITLE } from "@/lib/landing";

interface Trainer {
  name?: string;
  title?: string;
  bio?: unknown;
  photo?: string;
  experiences?: string[];
  certifications?: { title: string; icon?: string }[];
}

interface AboutProps {
  trainer: Trainer | null;
}

export function About({ trainer }: AboutProps) {
  if (!trainer) return null;

  const experiences =
    trainer.experiences?.length
      ? trainer.experiences
      : trainer.certifications?.map((c) => c.title) ?? [];

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-[var(--secondary)] text-white"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full aspect-[997/1577] max-w-md mx-auto md:max-w-none rounded-2xl overflow-hidden ring-2 ring-[var(--primary)]/30 bg-[var(--secondary)]"
          >
            {trainer.photo ? (
              <Image
                src={assetUrl(trainer.photo)}
                unoptimized={!trainer.photo.startsWith("http")}
                alt={trainer.name ? `Foto de ${trainer.name}` : "Entrenador"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 50vw"
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-5xl mb-6 leading-tight"
            >
              {ABOUT_TITLE}
            </motion.h2>
            {Array.isArray(trainer.bio) ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="prose prose-invert max-w-none mb-8 space-y-4 [&_p]:text-white/90 [&_p]:leading-relaxed [&_p]:text-base md:[&_p]:text-lg [&_p]:mb-4"
              >
                <PortableText value={trainer.bio} />
              </motion.div>
            ) : null}
            {experiences.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 }}
              >
                <h3 className="font-display text-sm uppercase tracking-wider text-white/70 mb-4">
                  Experiencia
                </h3>
                <ul className="space-y-2">
                  {experiences.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-white/90 text-sm md:text-base"
                    >
                      <span className="text-[var(--primary)] mt-0.5 shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
