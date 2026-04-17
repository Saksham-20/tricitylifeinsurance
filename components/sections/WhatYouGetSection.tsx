'use client';

import { motion } from 'framer-motion';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import PremiumCard from '@/components/ui/PremiumCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { useResponsiveMotion } from '@/hooks/useResponsiveMotion';
import { containerVariants, containerVariantsMobile, itemVariants } from '@/lib/animationVariants';
import { CircleDollarSign, BookOpen, Handshake, Shield } from 'lucide-react';

const benefits = [
  {
    icon: CircleDollarSign,
    title: 'Unlimited Commission',
    description: 'Earn based on your performance with no cap. Top advisors earn ₹50K–₹2L+ monthly.',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-600',
    type: 'benefit',
  },
  {
    icon: BookOpen,
    title: 'Training for IRDAI Exam',
    description: 'Complete your certification at zero cost. All study materials and mentoring included.',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
    type: 'benefit',
  },
  {
    icon: Handshake,
    title: 'Lifetime Mentorship',
    description: 'Get coached by mentors with 28+ years of experience. Ongoing support for your entire career with advancement towards club tiers.',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-600',
    type: 'benefit',
  },
  {
    icon: Shield,
    title: 'Career Growth Tiers',
    description: 'Advance from Agent to Distinguished Club, Branch Manager & beyond. Housing loans, bonuses, and premium benefits await.',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
    type: 'benefit',
  },
];

export default function WhatYouGetSection() {
  const intensity = useResponsiveMotion();
  const containerVar = intensity === 'full' ? containerVariants : containerVariantsMobile;

  return (
    <section className="page-section">
      <div className="mx-auto max-w-7xl">
        <FadeInOnScroll className="mb-10 md:mb-14">
          <SectionHeading
            eyebrow="Why Join Us"
            title="Support That Feels Practical From Day One"
            description="Everything you need to build a successful insurance career, with systems that help you learn faster and move forward with confidence."
          />
        </FadeInOnScroll>

        <div className="surface-panel rounded-[2.5rem] p-6 md:p-8 lg:p-10">
          <div>
            <FadeInOnScroll className="mb-6 md:mb-8">
              <div className="text-center md:text-left">
                <p className="section-tag">Key Benefits</p>
                <h3 className="mt-4 font-headline text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
                  Your Support System
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-on-surface-variant md:text-base">
                  Comprehensive benefits and support at every stage of your career.
                </p>
              </div>
            </FadeInOnScroll>

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
                      className="group h-full rounded-[1.75rem] bg-white/85 p-8 transition-all duration-300 cursor-default"
                    >
                      <div className="flex h-full flex-col gap-4">
                        <div className={`${benefit.iconBg} flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110`}>
                          <IconComponent className={`h-6 w-6 ${benefit.iconColor}`} />
                        </div>

                        <h4 className="font-headline text-lg font-bold leading-tight text-on-surface">
                          {benefit.title}
                        </h4>

                        <p className="flex-grow text-sm leading-relaxed text-on-surface-variant">
                          {benefit.description}
                        </p>
                      </div>
                    </PremiumCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
