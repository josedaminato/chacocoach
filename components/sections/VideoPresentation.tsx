"use client";

import { motion } from "framer-motion";
import { trainerConfig } from "@/lib/getConfig";

export function VideoPresentation() {
  const videoUrl = trainerConfig.presentationVideoUrl;

  return (
    <section
      id="presentacion"
      className="py-20 md:py-28 bg-[var(--color-surface)] text-[var(--secondary)]"
      aria-labelledby="video-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="video-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl md:text-5xl text-center mb-10"
        >
          Conocé cómo trabajo
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-[var(--secondary)] shadow-xl"
        >
          {videoUrl ? (
            videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
              <iframe
                src={toEmbedUrl(videoUrl)}
                title="Video de presentación Chaco Coach"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={videoUrl}
                controls
                playsInline
                className="w-full h-full object-cover"
                poster={trainerConfig.heroMedia}
              >
                <track kind="captions" />
              </video>
            )
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center text-white/80">
              <span className="w-16 h-16 rounded-full border-2 border-[var(--primary)] flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-[var(--primary)] ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <p className="text-sm md:text-base max-w-md">
                Subí tu video de presentación en la configuración
                (presentationVideoUrl).
              </p>
            </div>
          )}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center text-base md:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto"
        >
          {trainerConfig.presentationVideoCaption}
        </motion.p>
      </div>
    </section>
  );
}

function toEmbedUrl(url: string): string {
  try {
    const id =
      url.match(/(?:youtu\.be\/|v=)([^&?]+)/)?.[1] ??
      url.match(/embed\/([^?]+)/)?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
}
