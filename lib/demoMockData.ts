/**
 * Datos ficticios atractivos para la página /demo
 * Nunca usa Sanity — pensado para mostrar a trainers potenciales
 */
import type { Trainer, Plan, Testimonial, Transformation, Post } from "./types";

export const demoConfig = {
  name: "Martina García",
  tagline: "Transformá tu cuerpo en 90 días",
  theme: {
    primary: "#E8FF00",
    secondary: "#0A0A0A",
    accent: "#FF4500",
    text: "#FFFFFF",
  },
};

export const demoTrainer: Trainer = {
  name: "Martina García",
  bio: [
    {
      _type: "block",
      _key: "a1",
      children: [
        {
          _type: "span",
          _key: "a1-1",
          text: "Entrenadora personal certificada. Especialista en transformaciones en 90 días. Más de 8 años ayudando a personas a alcanzar sus objetivos con planes personalizados y seguimiento constante.",
        },
      ],
      markDefs: [],
    },
  ],
  photo: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800",
  metrics: {
    clients: 320,
    years: 8,
    countries: 3,
  },
  certifications: [
    { title: "NASM-CPT", icon: "cert" },
    { title: "Nutrición deportiva", icon: "nutrition" },
    { title: "Preparación física", icon: "crossfit" },
  ],
};

export const demoPlans: Plan[] = [
  {
    _id: "1",
    name: "Básico",
    price: 15000,
    billingPeriod: "monthly",
    features: [
      "Plan de entrenamiento personalizado",
      "4 sesiones por mes",
      "Acceso a app de seguimiento",
      "Soporte por WhatsApp",
    ],
    harbizUrl: "/contacto",
    isFeatured: false,
    isActive: true,
    quizScore: 1,
  },
  {
    _id: "2",
    name: "Pro",
    price: 25000,
    billingPeriod: "monthly",
    features: [
      "Todo lo del Básico",
      "8 sesiones por mes",
      "Plan nutricional incluido",
      "Seguimiento semanal",
      "Video-llamadas de check-in",
    ],
    harbizUrl: "/contacto",
    isFeatured: true,
    isActive: true,
    quizScore: 2,
  },
  {
    _id: "3",
    name: "Elite",
    price: 40000,
    billingPeriod: "monthly",
    features: [
      "Todo lo del Pro",
      "Sesiones ilimitadas",
      "Nutrición personalizada",
      "Acompañamiento diario",
      "Prioridad en horarios",
    ],
    harbizUrl: "/contacto",
    isFeatured: false,
    isActive: true,
    quizScore: 3,
  },
];

export const demoTestimonials: Testimonial[] = [
  {
    _id: "1",
    clientName: "Florencia Martínez",
    clientPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    text: "En 12 semanas bajé 8kg y gané definición. Martina es increíble, muy profesional y te motiva en cada paso.",
    rating: 5,
    discipline: "Pérdida de peso",
  },
  {
    _id: "2",
    clientName: "Lucas Fernández",
    clientPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    text: "El mejor entrenador que tuve. Planes claros, seguimiento constante y resultados que se ven.",
    rating: 5,
    discipline: "Hipertrofia",
  },
  {
    _id: "3",
    clientName: "Valentina Rodríguez",
    text: "Entrenamiento online que funciona. Flexible, adaptado a mi rutina y con resultados visibles en 2 meses.",
    rating: 5,
    discipline: "Fitness general",
  },
  {
    _id: "4",
    clientName: "Diego Pérez",
    clientPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    text: "Después de años sin entrenar, Martina me ayudó a volver de a poco. Hoy estoy en la mejor forma de mi vida.",
    rating: 5,
    discipline: "Principiante",
  },
  {
    _id: "5",
    clientName: "Camila López",
    text: "La combinación de entrenamiento + nutrición fue clave. En 16 semanas logré el cuerpo que siempre quise.",
    rating: 5,
    discipline: "Transformación completa",
  },
  {
    _id: "6",
    clientName: "Matías González",
    clientPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    text: "Profesional, dedicada y con un método que funciona. La recomiendo 100%.",
    rating: 5,
    discipline: "Rendimiento",
  },
];

export const demoTransformations: Transformation[] = [
  {
    _id: "1",
    clientName: "Sofía",
    beforePhoto: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    afterPhoto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    duration: "8 semanas",
    discipline: "Pérdida de peso",
  },
  {
    _id: "2",
    clientName: "Javier",
    beforePhoto: "https://images.unsplash.com/photo-1518611012118-696083aaae1e?w=400",
    afterPhoto: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    duration: "12 semanas",
    discipline: "Hipertrofia",
  },
  {
    _id: "3",
    clientName: "Lucía",
    beforePhoto: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    afterPhoto: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    duration: "16 semanas",
    discipline: "Transformación completa",
  },
  {
    _id: "4",
    clientName: "Tomás",
    beforePhoto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    afterPhoto: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    duration: "12 semanas",
    discipline: "Definición",
  },
];

export const demoPosts: Post[] = [
  {
    _id: "1",
    title: "5 errores que te impiden ganar músculo",
    slug: "5-errores-ganar-musculo",
    coverImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    excerpt: "Evitá estos errores comunes y maximizá tus ganancias musculares.",
    category: "Entrenamiento",
    publishedAt: "2024-03-15T10:00:00Z",
    seoDescription: "Guía para evitar errores en el entrenamiento de hipertrofia.",
  },
  {
    _id: "2",
    title: "Cómo organizar tu alimentación para el gym",
    slug: "organizar-alimentacion-gym",
    coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    excerpt: "Tips prácticos para comer bien y rendir más en tus entrenamientos.",
    category: "Nutrición",
    publishedAt: "2024-03-10T10:00:00Z",
    seoDescription: "Consejos de nutrición para entrenamiento.",
  },
  {
    _id: "3",
    title: "Rutina de 20 minutos para principiantes",
    slug: "rutina-20-min-principiantes",
    coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    excerpt: "Una rutina efectiva cuando tenés poco tiempo. Ideal para empezar.",
    category: "Rutinas",
    publishedAt: "2024-03-05T10:00:00Z",
    seoDescription: "Rutina corta para principiantes.",
  },
  {
    _id: "4",
    title: "Proteína: cuánta necesitás realmente",
    slug: "proteina-cuanta-necesitas",
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    excerpt: "Desmitificando la proteína. Cantidades recomendadas según tu objetivo.",
    category: "Nutrición",
    publishedAt: "2024-02-28T10:00:00Z",
    seoDescription: "Guía de proteína para fitness.",
  },
  {
    _id: "5",
    title: "Por qué el descanso es parte del entrenamiento",
    slug: "descanso-parte-entrenamiento",
    coverImage: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
    excerpt: "Dormir bien y recuperar correctamente para mejores resultados.",
    category: "Recuperación",
    publishedAt: "2024-02-20T10:00:00Z",
    seoDescription: "Importancia del descanso en el fitness.",
  },
];

export const demoServices = {
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
