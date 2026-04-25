'use client';

import { motion } from 'framer-motion';
import PremiumCard from '@/components/ui/PremiumCard';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import { useResponsiveMotion } from '@/hooks/useResponsiveMotion';
import { containerVariants, containerVariantsMobile, itemVariants } from '@/lib/animationVariants';
import { Clock, Heart } from 'lucide-react';

const pathways = [
  {
    title: 'Working Professionals',
    copy: 'Build a second income with flexible hours, digital support tools, and ongoing mentorship.',
    icon: Clock,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600',
    barColor: 'bg-violet-500',
  },
  {
    title: 'Homemakers (Bima Sakhi)',
    copy: 'For women who want flexible work, stipend support subject to LIC rules, and practical guidance. Minimum qualification: 10th pass.',
    icon: Heart,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
    barColor: 'bg-amber-500',
  },
];

export default function PathwaySection() {
  const intensity = useResponsiveMotion();
  const containerVar = intensity === 'full' ? containerVariants : containerVariantsMobile;

  return (
    <section className="py-10 md:py-16 px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeInOnScroll className="mb-8 md:mb-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Career Pathways</p>
            <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface mb-4 text-center">
              Find Your Path
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto">
              Whether you&apos;re starting fresh or looking for a flexible income stream, we have a pathway for you.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Pathway Cards Grid */}
        <motion.div
          variants={containerVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-5 md:grid-cols-3"
        >
          {pathways.map((pathway) => {
            const IconComponent = pathway.icon;
            return (
              <motion.div
                key={pathway.title}
                variants={itemVariants}
              >
                <PremiumCard
                  hover
                  className="h-full p-6 md:p-6 bg-white rounded-2xl group cursor-default"
                >
                  <div className="flex flex-col gap-5 h-full">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl ${pathway.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-5 h-5 ${pathway.iconColor}`} />
                    </div>

                    {/* Accent Bar */}
                    <div className={`h-1 w-10 rounded-full ${pathway.barColor}`} />

                    <div className="flex-1">
                      <h3 className="font-headline text-xl font-bold text-on-surface mb-2">
                        {pathway.title}
                      </h3>
                      <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                        {pathway.copy}
                      </p>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
