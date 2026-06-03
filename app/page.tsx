export const revalidate = 3600;

import {
  getTrainer,
  getPlans,
  getTransformations,
  getHowItWorks,
} from "@/lib/sanity";
import { Hero } from "@/components/sections/Hero";
import { VideoPresentation } from "@/components/sections/VideoPresentation";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Plans } from "@/components/sections/Plans";
import { Presencial } from "@/components/sections/Presencial";
import { Transformations } from "@/components/sections/Transformations";
import { BodyFatCalculator } from "@/components/sections/BodyFatCalculator";
import { CTABanner } from "@/components/sections/CTABanner";

export default async function HomePage() {
  const [trainer, plans, transformations, howItWorks] = await Promise.all([
    getTrainer(),
    getPlans(),
    getTransformations(),
    getHowItWorks(),
  ]);

  return (
    <>
      <Hero />
      <VideoPresentation />
      <About trainer={trainer} />
      <HowItWorks steps={howItWorks} />
      <Plans plans={plans} />
      <Presencial />
      <Transformations transformations={transformations} />
      <BodyFatCalculator />
      <CTABanner />
    </>
  );
}
