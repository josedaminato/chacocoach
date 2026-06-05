export const revalidate = 3600;

import { getTrainer, getTransformations, getHowItWorks } from "@/lib/sanity";
import { Hero } from "@/components/sections/Hero";
import { VideoPresentation } from "@/components/sections/VideoPresentation";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { MonthlyPlanning } from "@/components/sections/MonthlyPlanning";
import { TransformProgram } from "@/components/sections/TransformProgram";
import { Presencial } from "@/components/sections/Presencial";
import { Transformations } from "@/components/sections/Transformations";
import { CTABanner } from "@/components/sections/CTABanner";

export default async function HomePage() {
  const [trainer, transformations, howItWorks] = await Promise.all([
    getTrainer(),
    getTransformations(),
    getHowItWorks(),
  ]);

  return (
    <>
      <Hero />
      <VideoPresentation />
      <About trainer={trainer} />
      <HowItWorks steps={howItWorks} />
      <MonthlyPlanning />
      <TransformProgram />
      <Presencial />
      <Transformations transformations={transformations} />
      <CTABanner />
    </>
  );
}
