'use client';

import HeroSection from '@/components/sections/HeroSection';
import AchievementPathSection from '@/components/sections/AchievementPathSection';
import WhatYouGetSection from '@/components/sections/WhatYouGetSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <main className="relative overflow-hidden pb-24 pt-16 md:pt-20 lg:pb-0 lg:pt-24">
      <HeroSection />
      <AchievementPathSection />
      <WhatYouGetSection />
      <TestimonialsSection />
    </main>
  );
}
