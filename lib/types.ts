export interface Trainer {
  name?: string;
  bio?: unknown; // PortableText
  photo?: string;
  metrics?: {
    clients?: number;
    years?: number;
    countries?: number;
  };
  certifications?: { title: string; icon?: string }[];
}

export interface Plan {
  _id: string;
  name: string;
  price?: number;
  billingPeriod?: string;
  features?: string[];
  harbizUrl?: string;
  isFeatured?: boolean;
  isActive?: boolean;
  quizScore?: number;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientPhoto?: string;
  text: string;
  rating?: number;
  videoUrl?: string;
  discipline?: string;
}

export interface Transformation {
  _id: string;
  clientName?: string;
  beforePhoto?: string;
  afterPhoto?: string;
  duration?: string;
  discipline?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug?: string;
  coverImage?: string;
  excerpt?: string;
  body?: unknown;
  category?: string;
  publishedAt?: string;
  seoDescription?: string;
}

export interface Service {
  title: string;
  description: string;
  icon?: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}
