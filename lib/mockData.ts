/**
 * Datos ficticios para desarrollo sin Sanity configurado
 */
import type { Trainer, Plan, Testimonial, Transformation, Post } from "./types";

export const mockTrainer: Trainer = {
  name: "Juan Pérez",
  bio: [
    {
      _type: "block",
      _key: "a1",
      children: [
        {
          _type: "span",
          _key: "a1-1",
          text: "Entrenador personal certificado con más de 10 años de experiencia. Especializado en transformaciones corporales y entrenamiento online.",
        },
      ],
      markDefs: [],
    },
  ],
  photo: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
  metrics: {
    clients: 500,
    years: 10,
    countries: 5,
  },
  certifications: [
    { title: "NASM-CPT", icon: "cert" },
    { title: "Nutrición deportiva", icon: "nutrition" },
    { title: "CrossFit L1", icon: "crossfit" },
  ],
};

export const mockPlans: Plan[] = [
  {
    _id: "1",
    name: "Básico",
    price: 29900,
    billingPeriod: "monthly",
    features: [
      "Plan de entrenamiento personalizado",
      "4 sesiones por mes",
      "Acceso a app",
      "Soporte por WhatsApp",
    ],
    harbizUrl: "https://app.harbiz.com/juanperez/plan/basic",
    isFeatured: false,
    isActive: true,
    quizScore: 1,
  },
  {
    _id: "2",
    name: "Premium",
    price: 49900,
    billingPeriod: "monthly",
    features: [
      "Todo lo del Básico",
      "8 sesiones por mes",
      "Plan nutricional",
      "Seguimiento semanal",
      "Video-llamadas",
    ],
    harbizUrl: "https://app.harbiz.com/juanperez/plan/premium",
    isFeatured: true,
    isActive: true,
    quizScore: 2,
  },
  {
    _id: "3",
    name: "Elite",
    price: 79900,
    billingPeriod: "monthly",
    features: [
      "Todo lo del Premium",
      "Sesiones ilimitadas",
      "Nutrición personalizada",
      "Acompañamiento diario",
      "Prioridad en horarios",
    ],
    harbizUrl: "https://app.harbiz.com/juanperez/plan/elite",
    isFeatured: false,
    isActive: true,
    quizScore: 3,
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    _id: "1",
    clientName: "María González",
    clientPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    text: "En 3 meses bajé 12kg y gané masa muscular. Juan es increíble, muy profesional y motivador.",
    rating: 5,
    discipline: "Pérdida de peso",
  },
  {
    _id: "2",
    clientName: "Carlos Rodríguez",
    clientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    text: "El mejor entrenador que tuve. Planes claros, seguimiento constante y resultados reales.",
    rating: 5,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    _id: "3",
    clientName: "Ana Martínez",
    text: "Entrenamiento online que funciona. Flexible, adaptado a mi rutina y con resultados visibles.",
    rating: 5,
    discipline: "Fitness general",
  },
];

export const mockTransformations: Transformation[] = [
  {
    _id: "1",
    clientName: "Pedro",
    beforePhoto: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    afterPhoto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    duration: "4 meses",
    discipline: "Hipertrofia",
  },
  {
    _id: "2",
    clientName: "Laura",
    beforePhoto: "https://images.unsplash.com/photo-1518611012118-696083aaae1e?w=400",
    afterPhoto: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    duration: "6 meses",
    discipline: "Pérdida de peso",
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
  {
    _id: "2",
    title: "Cómo organizar tu alimentación para el gym",
    slug: "organizar-alimentacion-gym",
    coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    excerpt: "Tips prácticos para comer bien y rendir más.",
    category: "Nutrición",
    publishedAt: "2024-03-10T10:00:00Z",
    seoDescription: "Consejos de nutrición para entrenamiento.",
  },
  {
    _id: "3",
    title: "Rutina de 20 minutos para principiantes",
    slug: "rutina-20-min-principiantes",
    coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    excerpt: "Una rutina efectiva cuando tenés poco tiempo.",
    category: "Rutinas",
    publishedAt: "2024-03-05T10:00:00Z",
    seoDescription: "Rutina corta para principiantes.",
  },
];

export const mockServices = {
  services: [
    {
      title: "Entrenamiento online",
      description: "Sesiones personalizadas desde donde estés. Planes adaptados a tu rutina y objetivos.",
      icon: "laptop",
    },
    {
      title: "Entrenamiento presencial",
      description: "Sesiones one-on-one con seguimiento directo. Ideal para maximizar resultados.",
      icon: "dumbbell",
    },
    {
      title: "Nutrición",
      description: "Plan alimentario que complementa tu entrenamiento. Sin dietas extremas.",
      icon: "apple",
    },
    {
      title: "Seguimiento continuo",
      description: "Ajustes semanales, feedback y motivación constante para que no abandones.",
      icon: "chart",
    },
  ],
  howItWorks: [
    { step: 1, title: "Contacto", description: "Contame tus objetivos y disponibilidad" },
    { step: 2, title: "Plan", description: "Armamos un plan a tu medida" },
    { step: 3, title: "Seguimiento", description: "Acompañamiento y ajustes constantes" },
  ],
};
