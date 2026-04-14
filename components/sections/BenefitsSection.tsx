'use client';

import { motion } from 'framer-motion';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import PremiumCard from '@/components/ui/PremiumCard';
import { useResponsiveMotion } from '@/hooks/useResponsiveMotion';
import { containerVariants, containerVariantsMobile, itemVariants } from '@/lib/animationVariants';
import {
  CircleDollarSign,
  BookOpen,
  Handshake,
  Shield,
} from 'lucide-react';

const benefits = [
  {
    icon: CircleDollarSign,
    title: 'Unlimited Commission',
    description: 'Earn based on your performance with no cap. Top advisors earn ₹50K–₹2L+ monthly.',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600',
  },
  {
    icon: BookOpen,
    title: 'Free IRDAI Training',
    description: 'Complete your certification at zero cost. All study materials and mentoring included.',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
  },
  {
    icon: Handshake,
    title: 'Lifetime Mentorship',
    description: 'Get coached by mentors with 25+ years of experience. Ongoing support for your entire career.',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-600',
  },
  {
    icon: Shield,
    title: 'Job Security & Growth',
    description: 'Stable income with LIC backing. Clear promotion path from Agent to Development Officer.',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
  },
];

export default function BenefitsSection() {
  const intensity = useResponsiveMotion();
  const containerVar = intensity === 'full' ? containerVariants : containerVariantsMobile;

  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeInOnScroll className="mb-10 md:mb-14">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Why Join Us</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-4">
              What You Get
            </h2>
            <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">
              Everything you need to build a successful career in insurance — from training to long-term growth.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Benefits Grid — 4 key items */}
        <motion.div
          variants={containerVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div key={benefit.title} variants={itemVariants}>
                <PremiumCard
                  hover
                  className="h-full p-8 rounded-2xl bg-white transition-all duration-300 group cursor-default"
                >
                  <div className="flex flex-col gap-4 h-full">
                    {/* Icon */}
                    <div className={`${benefit.iconBg} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-6 h-6 ${benefit.iconColor}`} />
                    </div>

                    {/* Title */}
                    <h3 className="font-headline text-lg font-bold text-on-surface leading-tight">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-on-surface-variant flex-grow leading-relaxed">
                      {benefit.description}
                    </p>
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
