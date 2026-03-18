"use client";

import { motion } from "framer-motion";
import { trainerConfig } from "@/lib/getConfig";

export function InstagramFeed() {
  const embedUrl = trainerConfig.instagramEmbedUrl as string;

  if (embedUrl && embedUrl.length > 0) {
    const isHtml = embedUrl.trim().startsWith("<");
    return (
      <section
        id="instagram"
        className="py-20 md:py-28 bg-white text-[var(--secondary)]"
        aria-labelledby="instagram-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            id="instagram-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl text-center mb-12"
          >
            Instagram
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            {isHtml ? (
              <div dangerouslySetInnerHTML={{ __html: embedUrl }} />
            ) : (
              <iframe
                src={embedUrl}
                title="Instagram feed"
                className="w-full max-w-md h-[500px] border-0"
              />
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  const handle = trainerConfig.instagram?.replace(
    /^https?:\/\/(www\.)?instagram\.com\//,
    ""
  ).replace(/\/$/, "") || "juanperez.fit";

  return (
    <section
      id="instagram"
      className="py-20 md:py-28 bg-white text-[var(--secondary)]"
      aria-labelledby="instagram-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="instagram-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl text-center mb-4"
        >
          @{handle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[var(--secondary)]/70 mb-12"
        >
          Seguime en Instagram para tips y detrás de escena
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={trainerConfig.instagram || `https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-lg uppercase hover:opacity-90 transition-opacity"
          >
            Seguir en Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
