'use client';

import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import PathwaySection from '@/components/sections/PathwaySection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <main className="pt-16 md:pt-20 lg:pt-24">
      <HeroSection />
      <StatsSection />
      <PathwaySection />
      <BenefitsSection />
      <TestimonialsSection />
    </main>
  );
}
