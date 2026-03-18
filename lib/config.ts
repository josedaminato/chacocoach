/**
 * Configuración por defecto del trainer.
 * En producción con TRAINER_CONFIG en env, se usa esa config.
 * En desarrollo, se usa esta.
 */
export const defaultConfig = {
  // Info personal
  name: "Juan Pérez",
  tagline: "Entrenador Personal Online",
  bio: "Entrenador certificado con más de 10 años de experiencia transformando vidas.",
  email: "juan@example.com",
  phone: "+5492614000000",
  country: "Argentina",

  // Site (para SEO, sitemap - configurar NEXT_PUBLIC_SITE_URL en .env)
  siteUrl: "https://ejemplo.com",

  // Harbiz
  harbizUrl: "https://app.harbiz.com/juanperez",

  // Redes sociales
  instagram: "https://instagram.com/juanperez.fit",
  instagramEmbedUrl: "", // URL del widget embed de IG (opcional)
  youtube: "",
  tiktok: "",
  whatsapp: "https://wa.me/5492614000000",

  // Hero
  heroHeadline: "Transformá tu cuerpo. Cambiá tu vida.",
  heroSubheadline:
    "Entrenamiento online personalizado para alcanzar tus objetivos. Sin excusas, con resultados.",
  heroMedia: "/hero.jpg", // imagen o video local o URL

  // CTA Banner
  ctaHeadline: "¿Listo para empezar?",
  ctaSubheadline: "Los cupos son limitados.",

  // Tema visual
  theme: {
    primary: "#E8FF00",
    secondary: "#0A0A0A",
    accent: "#FF4500",
    text: "#FFFFFF",
    fontDisplay: "Bebas Neue",
    fontBody: "DM Sans",
  },
} as const;

export type TrainerConfig = typeof defaultConfig;
