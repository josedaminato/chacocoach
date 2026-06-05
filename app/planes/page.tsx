export const revalidate = 3600;

import type { Metadata } from "next";
import { MonthlyPlanning } from "@/components/sections/MonthlyPlanning";
import { TransformProgram } from "@/components/sections/TransformProgram";
import { CTABanner } from "@/components/sections/CTABanner";
import { trainerConfig } from "@/lib/getConfig";

export const metadata: Metadata = {
  title: "Servicios",
  description: `Planificación online y programa de transformación con ${trainerConfig.name}.`,
};

export default function PlanesPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-[var(--secondary)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl mb-4">Servicios</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Planificación mensual o acompañamiento completo según tu objetivo
          </p>
        </div>
      </section>
      <MonthlyPlanning />
      <TransformProgram />
      <CTABanner />
    </>
  );
}
