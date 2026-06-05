"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { trainerConfig } from "@/lib/getConfig";
import { assetUrl } from "@/lib/assetUrl";
import { trackEvent } from "@/lib/analytics";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { WHATSAPP_MESSAGES } from "@/lib/landing";

const fadeUp = {
  hidden: { opacity: 1, y: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.12 },
  }),
};

export function Hero() {
  const [imgError, setImgError] = useState(false);
  const mediaSrc = assetUrl(trainerConfig.heroMedia);
  const scheduleHref = getWhatsAppHref(WHATSAPP_MESSAGES.scheduleCall);

  return (
    <section
      className="relative min-h-[100dvh] flex items-end md:items-center overflow-hidden"
      aria-label="Portada"
    >
      {mediaSrc && (
        <div className="absolute inset-0 z-0 bg-[var(--secondary)]">
          {!imgError ? (
            <Image
              src={mediaSrc}
              alt="Entrenamiento de fuerza en gimnasio"
              fill
              className="object-cover object-[center_22%] sm:object-[center_28%] md:object-[72%_center] lg:object-[68%_center]"
              priority
              sizes="100vw"
              unoptimized
              onError={() => setImgError(true)}
            />
          ) : null}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[var(--secondary)] from-0% via-[var(--secondary)]/88 via-45% to-[var(--secondary)]/15 to-100% md:via-[var(--secondary)]/72 md:via-38% md:to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[var(--secondary)] via-[var(--secondary)]/40 to-transparent md:from-[var(--secondary)]/80 md:via-transparent"
            aria-hidden
          />
        </div>
      )}
      {!mediaSrc && (
        <div className="absolute inset-0 bg-[var(--secondary)]" />
      )}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:py-32">
        <div className="max-w-xl md:max-w-md lg:max-w-xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-5"
          >
            <BrandLogo
              height={80}
              priority
              className="rounded-lg ring-1 ring-white/20 shadow-xl w-auto max-w-[240px] sm:max-w-[260px]"
            />
            <h1 className="sr-only">{trainerConfig.heroHeadline}</h1>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-2xl sm:text-3xl md:text-4xl text-white mb-4 leading-tight drop-shadow-md"
          >
            {trainerConfig.heroSubheadline}
          </motion.h2>
          {"heroDescription" in trainerConfig && trainerConfig.heroDescription && (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-base md:text-lg text-white/90 mb-8 leading-relaxed drop-shadow-md"
            >
              {trainerConfig.heroDescription}
            </motion.p>
          )}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              href="/#planificacion"
              onClick={() =>
                trackEvent("cta_click", { location: "hero", target: "planificacion" })
              }
              className="inline-flex items-center justify-center px-8 py-4 bg-[var(--primary)] text-white font-display font-bold text-base sm:text-lg uppercase rounded-lg hover:opacity-90 transition-opacity shadow-lg"
              aria-label="Quiero mi rutina - ver planes"
            >
              Quiero mi rutina
            </Link>
            <a
              href={scheduleHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", { location: "hero", action: "schedule_call" })
              }
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-display font-bold text-base sm:text-lg uppercase rounded-lg hover:bg-white hover:text-[var(--secondary)] transition-colors"
              aria-label="Agendar llamada por WhatsApp"
            >
              Agendar llamada
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
