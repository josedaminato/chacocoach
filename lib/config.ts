/**
 * Configuración por defecto del trainer.
 * En producción con TRAINER_CONFIG en env, se usa esa config.
 * En desarrollo, se usa esta.
 */
export const defaultConfig = {
  name: "Chaco Coach",
  tagline: "Entrenamiento online personalizado",
  bio: "Entrenador especializado en hipertrofia, recomposición corporal y preparación física.",
  email: "contacto@chacocoach.com",
  phone: "+5492614000000",
  country: "Argentina",

  siteUrl: "https://chacocoach.com",

  harbizUrl: "",

  instagram: "https://www.instagram.com/coachchaco",
  instagramHandle: "@coachchaco",
  instagramEmbedUrl: "",
  youtube: "",
  tiktok: "",
  whatsapp: "https://wa.me/5492614000000",

  logo: "/logo.png",

  heroHeadline: "CHACO COACH",
  heroSubheadline:
    "Entrenamiento online personalizado para lograr resultados reales.",
  heroDescription:
    "Planes de entrenamiento adaptados a tu objetivo, experiencia y disponibilidad. Seguimiento profesional y acompañamiento constante.",
  /** Imagen local en public/hero.jpg (gimnasio / pesas) — evita caché de URLs externas */
  heroMedia: "/hero.jpg",

  presentationVideoUrl: "" as string,
  presentationVideoCaption:
    "Mi objetivo es ayudarte a construir un físico fuerte, saludable y sostenible, con una planificación adaptada a tu realidad y a tus objetivos.",

  ctaHeadline: "¿Listo para empezar?",
  ctaSubheadline:
    "Elegí tu plan online o escribime por WhatsApp para recibir más información.",

  theme: {
    primary: "#0EA5E9",
    secondary: "#0F172A",
    accent: "#0284C7",
    text: "#FFFFFF",
    fontDisplay: "Bebas Neue",
    fontBody: "DM Sans",
  },
} as const;

export type TrainerConfig = typeof defaultConfig;
