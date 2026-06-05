export const ABOUT_TITLE = "¿Quién está detrás de Chaco Coach?";

export const HOW_IT_WORKS_TITLE = "Un proceso simple y personalizado";

/** Anclas del menú → secciones de la home */
export const NAV_LINKS = [
  { label: "Presentación", sectionId: "presentacion" },
  { label: "Sobre mí", sectionId: "about" },
  { label: "Cómo trabajo", sectionId: "como-trabajo" },
  { label: "Planificación", sectionId: "planificacion" },
  { label: "Programa", sectionId: "programa" },
  { label: "Resultados", sectionId: "transformaciones" },
] as const;

export const MONTHLY_PLANNING = {
  id: "planificacion",
  title: "Planificación personalizada mensual",
  subtitle:
    "Ideal para quienes buscan una rutina profesional adaptada a sus objetivos.",
  includes: [
    "Rutina 100% personalizada",
    "App de entrenamiento incluida",
    "Videos demostrativos de ejercicios",
    "Adaptación según equipamiento disponible",
    "Actualizaciones periódicas",
    "Diseñada según tus objetivos y experiencia",
  ],
  highlight:
    "Una solución simple para quienes necesitan estructura, claridad y una planificación profesional.",
  cta: "Quiero mi planificación",
} as const;

export const TRANSFORM_PROGRAM = {
  id: "programa",
  title: "¿Buscás una transformación completa?",
  subtitle:
    "Si tu objetivo es lograr un cambio físico real, mejorar tus hábitos y contar con acompañamiento profesional durante todo el proceso, mi programa de transformación puede ser para vos.",
  includes: [
    "Evaluación inicial",
    "Estrategia personalizada",
    "Seguimiento individual",
    "Ajustes continuos",
    "Acompañamiento durante el proceso",
    "Comunicación directa",
  ],
  highlight:
    "Antes de ingresar al programa realizamos una llamada para analizar tu situación y verificar si podemos trabajar juntos.",
  cta: "Agendar llamada",
} as const;

export const WHATSAPP_MESSAGES = {
  general: "Hola Agustín, me interesa tu servicio de entrenamiento.",
  planification:
    "Hola Agustín, quiero información sobre la planificación personalizada mensual.",
  transformProgram:
    "Hola Agustín, me interesa el programa Entrená con Chaco y quiero agendar una llamada.",
  presencial: "Hola Agustín, me interesa el entrenamiento presencial en Mendoza.",
  scheduleCall:
    "Hola Agustín, quiero agendar una llamada para conocer más sobre tus planes.",
} as const;

/** @deprecated Usar MONTHLY_PLANNING.includes */
export const PLAN_INCLUDES = MONTHLY_PLANNING.includes;
