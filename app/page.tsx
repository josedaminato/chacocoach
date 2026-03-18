export const revalidate = 3600;

import {
  getTrainer,
  getPlans,
  getTestimonials,
  getTransformations,
  getPosts,
  getServices,
  getHowItWorks,
} from "@/lib/sanity";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Plans } from "@/components/sections/Plans";
import { PlanQuiz } from "@/components/sections/PlanQuiz";
import { Transformations } from "@/components/sections/Transformations";
import { Testimonials } from "@/components/sections/Testimonials";
import { BMICalculator } from "@/components/sections/BMICalculator";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { CTABanner } from "@/components/sections/CTABanner";

export default async function HomePage() {
  const [
    trainer,
    plans,
    testimonials,
    transformations,
    posts,
    services,
    howItWorks,
  ] = await Promise.all([
    getTrainer(),
    getPlans(),
    getTestimonials(),
    getTransformations(),
    getPosts(),
    getServices(),
    getHowItWorks(),
  ]);

  return (
    <>
      <Hero />
      <About trainer={trainer} />
      <Services services={services} howItWorks={howItWorks} />
      <Plans plans={plans} />
      <PlanQuiz plans={plans} />
      <Transformations transformations={transformations} />
      <Testimonials testimonials={testimonials} />
      <section id="calculadora" className="py-20 md:py-28 bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <BMICalculator />
        </div>
      </section>
      <BlogPreview posts={posts} />
      <InstagramFeed />
      <CTABanner />
    </>
  );
}
