'use client';

import { motion } from 'framer-motion';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import PremiumCard from '@/components/ui/PremiumCard';
import { useResponsiveMotion } from '@/hooks/useResponsiveMotion';
import { containerVariants, containerVariantsMobile, itemVariants } from '@/lib/animationVariants';
import { Clock, Heart, CircleDollarSign, BookOpen, Handshake, Shield } from 'lucide-react';

const pathways = [
  {
    title: 'Working Professionals',
    copy: 'Build a second income with flexible hours, digital support tools, and ongoing mentorship.',
    icon: Clock,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-600',
    barColor: 'bg-violet-500',
    type: 'pathway',
  },
  {
    title: 'Homemakers (Bima Sakhi)',
    copy: 'Exclusively for Women earning independent income with flexible hours and comprehensive support. Min qualification: 10th onwards.',
    icon: Heart,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
    barColor: 'bg-amber-500',
    type: 'pathway',
  },
];

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
    title: 'Free IRDAI Training',
    description: 'Complete your certification at zero cost. All study materials and mentoring included.',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-600',
    type: 'benefit',
  },
  {
    icon: Handshake,
    title: 'Lifetime Mentorship',
    description: 'Get coached by mentors with 28+ years of experience. Ongoing support for your entire career with advancement towards club tiers.',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-600',
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

        {/* Pathways Section */}
        <div className="mb-12 md:mb-16">
          <FadeInOnScroll className="mb-6 md:mb-8">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-2">Career Pathways</p>
              <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-on-surface">
                Find Your Path
              </h3>
              <p className="text-sm md:text-base text-on-surface-variant mt-2 max-w-2xl">
                Whether you&apos;re starting fresh or looking for a flexible income stream, we have a pathway for you.
              </p>
            </div>
          </FadeInOnScroll>

          <motion.div
            variants={containerVar}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 md:grid-cols-2"
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
                    className="h-full p-8 md:p-8 bg-white rounded-2xl group cursor-default"
                  >
                    <div className="flex flex-col gap-5 h-full">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl ${pathway.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-5 h-5 ${pathway.iconColor}`} />
                      </div>

                      {/* Accent Bar */}
                      <div className={`h-1 w-10 rounded-full ${pathway.barColor}`} />

                      <div className="flex-1">
                        <h4 className="font-headline text-xl font-bold text-on-surface mb-2">
                          {pathway.title}
                        </h4>
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

        {/* Benefits Section */}
        <div>
          <FadeInOnScroll className="mb-6 md:mb-8">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-2">Key Benefits</p>
              <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-on-surface">
                Your Support System
              </h3>
              <p className="text-sm md:text-base text-on-surface-variant mt-2 max-w-2xl">
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
                    className="h-full p-8 rounded-2xl bg-white transition-all duration-300 group cursor-default"
                  >
                    <div className="flex flex-col gap-4 h-full">
                      {/* Icon */}
                      <div className={`${benefit.iconBg} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`w-6 h-6 ${benefit.iconColor}`} />
                      </div>

                      {/* Title */}
                      <h4 className="font-headline text-lg font-bold text-on-surface leading-tight">
                        {benefit.title}
                      </h4>

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
      </div>
    </section>
  );
}
