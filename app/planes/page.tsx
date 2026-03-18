export const revalidate = 3600;

import type { Metadata } from "next";
import { getPlans } from "@/lib/sanity";
import { Plans } from "@/components/sections/Plans";
import { PlanQuiz } from "@/components/sections/PlanQuiz";
import { CTABanner } from "@/components/sections/CTABanner";
import { trainerConfig } from "@/lib/getConfig";

export const metadata: Metadata = {
  title: "Planes y precios",
  description: `Conocé los planes de entrenamiento de ${trainerConfig.name}. Precios y características. Reservá tu lugar en Harbiz.`,
};

export default async function PlanesPage() {
  const plans = await getPlans();

  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--secondary)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl mb-4">Planes y precios</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Elegí el plan que mejor se adapte a tus objetivos
          </p>
        </div>
      </section>
      <Plans plans={plans} />
      <PlanQuiz plans={plans} />
      <CTABanner />
    </>
  );
}
