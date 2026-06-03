/**
 * Datos ficticios para desarrollo sin Sanity configurado
 */
import type { Trainer, Plan, Testimonial, Transformation, Post } from "./types";

export const mockTrainer: Trainer = {
  name: "Agustín Chaparro",
  title: "Profesor de Educación Física",
  bio: [
    {
      _type: "block",
      _key: "a1",
      children: [
        {
          _type: "span",
          _key: "a1-1",
          text: "Mi nombre es Agustín Chaparro. Entrenador especializado en hipertrofia, recomposición corporal y preparación física. Actualmente trabajo de manera online con alumnos de distintos países y también de forma presencial en Mendoza.",
        },
      ],
      markDefs: [],
    },
  ],
  photo: "/hero-coach.jpg",
  experiences: [
    "Coach de entrenamiento online",
    "Instructor de musculación",
    "Experiencia en CrossFit",
    "Experiencia en HIIT y Funcional",
    "Más de 5 años entrenando personas",
  ],
  metrics: {
    clients: 0,
    years: 5,
    countries: 0,
  },
  certifications: [],
};

export const mockPlans: Plan[] = [
  {
    _id: "plan-2x",
    name: "Plan 2X",
    description: "Ideal para quienes disponen de poco tiempo o están comenzando.",
    features: ["2 entrenamientos personalizados por semana"],
    whatsappKey: "plan2x",
    isFeatured: false,
    isActive: true,
  },
  {
    _id: "plan-3x",
    name: "Plan 3X",
    description: "Ideal para quienes buscan progresar de forma constante.",
    features: ["3 entrenamientos personalizados por semana"],
    whatsappKey: "plan3x",
    isFeatured: true,
    isActive: true,
  },
  {
    _id: "plan-4x",
    name: "Plan 4X",
    description:
      "Ideal para quienes buscan maximizar resultados y entrenar con mayor frecuencia.",
    features: ["4 entrenamientos personalizados por semana"],
    whatsappKey: "plan4x",
    isFeatured: false,
    isActive: true,
  },
];

export const mockTestimonials: Testimonial[] = [];

export const mockTransformations: Transformation[] = [
  {
    _id: "1",
    clientName: "Consuelo",
    beforePhoto: "https://images.unsplash.com/photo-1518611012118-696083aaae1e?w=400",
    afterPhoto: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    duration: "4 meses",
  },
  {
    _id: "2",
    clientName: "Santiago",
    beforePhoto: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    afterPhoto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    duration: "6 meses",
  },
  {
    _id: "3",
    clientName: "Martina",
    beforePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    afterPhoto: "https://images.unsplash.com/photo-1518611012118-696083aaae1e?w=400",
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
    {
      step: 1,
      title: "Completás un formulario inicial",
      description: "Contame tu objetivo, experiencia y disponibilidad.",
    },
    {
      step: 2,
      title: "Analizo tu perfil",
      description: "Reviso tus objetivos, experiencia y disponibilidad.",
    },
    {
      step: 3,
      title: "Recibís tu planificación",
      description: "Tu rutina personalizada queda lista en la app.",
    },
    {
      step: 4,
      title: "Seguimiento constante",
      description: "Ajustamos el plan según tu progreso y feedback.",
    },
  ],
};
