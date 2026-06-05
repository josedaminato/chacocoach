/**
 * Datos ficticios para desarrollo sin Sanity configurado
 */
import type { Trainer, Plan, Testimonial, Transformation, Post } from "./types";

function bioParagraph(text: string, key: string) {
  return {
    _type: "block" as const,
    _key: key,
    children: [{ _type: "span" as const, _key: `${key}-1`, text }],
    markDefs: [],
  };
}

export const mockTrainer: Trainer = {
  name: "Agustín Chaparro",
  bio: [
    bioParagraph(
      "Soy Agustín Chaparro, entrenador especializado en hipertrofia, recomposición corporal y preparación física.",
      "a1"
    ),
    bioParagraph(
      "Trabajo de manera online con personas que buscan mejorar su físico, ganar confianza y desarrollar hábitos que puedan sostener a largo plazo.",
      "a2"
    ),
    bioParagraph(
      "Además de mi experiencia como coach, también tengo trayectoria en CrossFit, entrenamiento funcional y musculación.",
      "a3"
    ),
    bioParagraph(
      "Actualmente trabajo tanto de manera online como presencial en Mendoza.",
      "a4"
    ),
  ],
  photo: "/fotoprincipal.jpeg",
  experiences: [
    "Coach de entrenamiento online",
    "Instructor de musculación",
    "Experiencia en CrossFit",
    "Experiencia en entrenamiento funcional",
    "Más de 5 años ayudando personas a transformar su físico",
  ],
  certifications: [],
};

export const mockPlans: Plan[] = [];

export const mockTestimonials: Testimonial[] = [];

export const mockTransformations: Transformation[] = [
  {
    _id: "1",
    clientName: "Consuelo",
    beforePhoto: "/transformaciones/M1.jpeg",
    afterPhoto: "/transformaciones/M2.jpeg",
    duration: "4 meses",
  },
  {
    _id: "2",
    clientName: "Santiago",
    beforePhoto: "/transformaciones/H2.jpeg",
    afterPhoto: "/transformaciones/H1.jpeg",
    duration: "6 meses",
  },
  {
    _id: "3",
    clientName: "Martina",
    beforePhoto: "/transformaciones/MI1.jpeg",
    afterPhoto: "/transformaciones/MI2.jpeg",
    duration: "8 meses",
  },
];

export const mockPosts: Post[] = [
  {
    _id: "1",
    title: "5 errores que te impiden ganar músculo",
    slug: "5-errores-ganar-musculo",
    coverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    excerpt: "Evitá estos errores comunes y maximizá tus ganancias.",
    category: "Entrenamiento",
    publishedAt: "2024-03-15T10:00:00Z",
    seoDescription: "Guía para evitar errores en el entrenamiento de hipertrofia.",
  },
];

export const mockServices = {
  services: [],
  howItWorks: [
    { step: 1, title: "Completás un formulario inicial", description: "" },
    {
      step: 2,
      title: "Analizo tu situación, experiencia y objetivos",
      description: "",
    },
    { step: 3, title: "Diseño tu planificación personalizada", description: "" },
    {
      step: 4,
      title: "Comenzás a entrenar con una estructura clara y adaptada a vos",
      description: "",
    },
  ],
};
