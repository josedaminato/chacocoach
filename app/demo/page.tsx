import type { Metadata } from "next";
import Link from "next/link";
import {
  demoTrainer,
  demoPlans,
  demoTestimonials,
  demoTransformations,
  demoPosts,
  demoServices,
  demoConfig,
} from "@/lib/demoMockData";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Plans } from "@/components/sections/Plans";
import { PlanQuiz } from "@/components/sections/PlanQuiz";
import { Transformations } from "@/components/sections/Transformations";
import { Testimonials } from "@/components/sections/Testimonials";
import { BMICalculator } from "@/components/sections/BMICalculator";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { DemoBanner } from "./DemoBanner";
import { DemoLayout } from "./DemoLayout";

export const metadata: Metadata = {
  title: "Demo",
  description: "Demo del template Harbiz Trainer Web",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return (
    <DemoLayout config={demoConfig}>
      <DemoBanner />
      <HeroDemo />
      <About trainer={demoTrainer} />
      <Services services={demoServices.services} howItWorks={demoServices.howItWorks} />
      <Plans plans={demoPlans} />
      <PlanQuiz plans={demoPlans} />
      <Transformations transformations={demoTransformations} />
      <Testimonials testimonials={demoTestimonials} />
      <section id="calculadora" className="py-20 md:py-28 bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <BMICalculator ctaHref="/contacto" />
        </div>
      </section>
      <BlogPreview posts={demoPosts} />
      <InstagramDemo />
      <CTABannerDemo />
    </DemoLayout>
  );
}

function HeroDemo() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Bienvenida"
    >
      <div className="absolute inset-0 bg-[var(--secondary)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-white mb-6">
          Transformá tu cuerpo en 90 días
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10">
          Entrenamiento online personalizado para alcanzar tus objetivos. Sin excusas, con resultados.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-lg uppercase hover:opacity-90 transition-opacity"
          >
            Empezá hoy
          </Link>
          <Link
            href="/#planes"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-display font-bold text-lg uppercase hover:bg-white hover:text-[var(--secondary)] transition-all"
          >
            Ver planes
          </Link>
        </div>
      </div>
    </section>
  );
}

function InstagramDemo() {
  return (
    <section
      id="instagram"
      className="py-20 md:py-28 bg-white text-[var(--secondary)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-4">@martinagarcia.fit</h2>
        <p className="text-[var(--secondary)]/70 mb-12">
          Seguime en Instagram para tips y detrás de escena
        </p>
        <Link
          href="/contacto"
          className="inline-block px-8 py-4 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-lg uppercase hover:opacity-90 transition-opacity"
        >
          Seguir en Instagram
        </Link>
      </div>
    </section>
  );
}

function CTABannerDemo() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
        }}
      />
      <div className="absolute inset-0 bg-[var(--secondary)]/80" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6">
          ¿Listo para empezar?
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-10">
          Los cupos son limitados.
        </p>
        <Link
          href="/contacto"
          className="inline-block px-12 py-5 bg-[var(--primary)] text-[var(--secondary)] font-display font-bold text-xl uppercase hover:opacity-90 transition-opacity"
        >
          Reservar ahora
        </Link>
      </div>
    </section>
  );
}
