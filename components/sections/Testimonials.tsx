"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { Testimonial } from "@/lib/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function getEmbedUrl(url: string): string {
  if (url.includes("youtube.com")) {
    const id = url.split("v=")[1]?.split("&")[0] || "";
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("vimeo.com")) {
    const id = url.split("vimeo.com/")[1]?.split("?")[0] || "";
    return `https://player.vimeo.com/video/${id}`;
  }
  return url;
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section
      id="testimonios"
      className="py-20 md:py-28 bg-white text-[var(--secondary)]"
      aria-labelledby="testimonios-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="testimonios-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-5xl text-center mb-16"
        >
          Testimonios
        </motion.h2>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t._id}
              testimonial={t}
              index={i}
              onVideoClick={() => t.videoUrl && setVideoModal(t.videoUrl)}
            />
          ))}
        </div>

        {/* Mobile: Embla carousel */}
        <div className="md:hidden overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {testimonials.map((t, i) => (
              <div key={t._id} className="flex-[0_0_85%] min-w-0">
                <TestimonialCard
                  testimonial={t}
                  index={i}
                  onVideoClick={() => t.videoUrl && setVideoModal(t.videoUrl)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Video testimonio"
          onClick={() => setVideoModal(null)}
        >
          <button
            type="button"
            onClick={() => setVideoModal(null)}
            className="absolute top-4 right-4 text-white text-2xl"
            aria-label="Cerrar"
          >
            ×
          </button>
          <div
            className="aspect-video w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getEmbedUrl(videoModal)}
              title="Video testimonio"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
  onVideoClick,
}: {
  testimonial: Testimonial;
  index: number;
  onVideoClick: () => void;
}) {
  const stars = testimonial.rating
    ? Array.from({ length: 5 }, (_, i) => i < testimonial.rating!)
    : [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl p-6 md:p-8 bg-[var(--secondary)]/5 border border-[var(--secondary)]/10 text-[var(--secondary)]"
    >
      {testimonial.videoUrl ? (
        <button
          type="button"
          onClick={onVideoClick}
          className="aspect-video rounded-xl overflow-hidden mb-4 w-full relative group bg-[var(--secondary)]/20"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl text-[var(--primary)] group-hover:scale-110 transition-transform">
              ▶
            </span>
          </div>
          <span className="absolute bottom-2 left-2 text-sm">Ver video testimonio</span>
        </button>
      ) : testimonial.clientPhoto ? (
        <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4">
          <Image
            src={testimonial.clientPhoto}
            alt={testimonial.clientName}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      ) : null}
      {stars.length > 0 && (
        <div
          className="flex gap-1 mb-3"
          aria-label={`${testimonial.rating} de 5 estrellas`}
        >
          {stars.map((filled, i) => (
            <span
              key={i}
              className={filled ? "text-[var(--primary)]" : "text-[var(--secondary)]/30"}
            >
              ★
            </span>
          ))}
        </div>
      )}
      <p className="text-lg mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
      <div>
        <span className="font-display text-lg">{testimonial.clientName}</span>
        {testimonial.discipline && (
          <span className="text-[var(--secondary)]/60 ml-2">
            — {testimonial.discipline}
          </span>
        )}
      </div>
    </motion.article>
  );
}
