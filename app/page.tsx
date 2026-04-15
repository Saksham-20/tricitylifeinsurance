'use client';

import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import AchievementPathSection from '@/components/sections/AchievementPathSection';
import WhatYouGetSection from '@/components/sections/WhatYouGetSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <main className="pt-16 md:pt-20 lg:pt-24">
      <HeroSection />
      <StatsSection />
      <AchievementPathSection />
      <WhatYouGetSection />
      <TestimonialsSection />
    </main>
  );
}
