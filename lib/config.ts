/**
 * Configuración por defecto del trainer.
 * En producción con TRAINER_CONFIG en env, se usa esa config.
 * En desarrollo, se usa esta.
 */
export const defaultConfig = {
  name: "Chaco Coach",
  tagline: "Entrenamiento online personalizado",
  bio: "Entrenador especializado en hipertrofia, recomposición corporal y preparación física.",
  email: "Agustinchapa27@gmail.com",
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
  /** Logo sobre la foto del home (public/hero-logo.png) */
  heroLogo: "/hero-logo.png",

  heroHeadline: "CHACO COACH",
  heroSubheadline:
    "Transformá tu cuerpo con un plan de entrenamiento diseñado para vos.",
  heroDescription:
    "Entrenamiento online personalizado para ganar músculo, perder grasa y construir hábitos sostenibles, sin importar tu nivel actual.",
  /** Foto principal del home (public/hero.jpg) */
  heroMedia: "/hero.jpg",

  presentationVideoUrl: "" as string,
  presentationVideoCaption:
    "No creo en soluciones rápidas. Mi trabajo es ayudarte a construir resultados reales mediante entrenamiento inteligente, seguimiento y hábitos sostenibles.",

  ctaHeadline: "Tu cambio empieza hoy",
  ctaSubheadline:
    "Elegí una planificación personalizada o agendá una llamada para conocer si el programa Entrená con Chaco es para vos.",

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
