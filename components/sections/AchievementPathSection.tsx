'use client';

import { motion } from 'framer-motion';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import { ArrowRight, Award, TrendingUp, Crown } from 'lucide-react';

const achievementMilestones = [
  {
    tier: 'Starting Out',
    role: 'LIC Agent / Bima Sakhi',
    earnings: 'Variable + Stipend',
    benefits: ['Training & mentorship', 'IRDAI certification', 'Solo clients'],
    color: 'from-blue-500 to-indigo-500',
    bgLight: 'bg-blue-50',
    icon: TrendingUp,
  },
  {
    tier: 'Distinguished Club',
    role: 'Agent - Level 1',
    earnings: '₹50K–₹75K/month',
    benefits: ['Bonus incentives', 'Office allowance', 'Recognition awards'],
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50',
    icon: Award,
  },
  {
    tier: 'Branch Manager Club',
    role: 'Agent - Level 2',
    earnings: '₹75K–₹1.25L/month',
    benefits: ['Housing loan @5.5%', 'Foreign tours', 'Team building support'],
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
    icon: Award,
  },
  {
    tier: 'Zonal Manager Club',
    role: 'Agent - Level 3+',
    earnings: '₹1.25L–₹2L+/month',
    benefits: ['Premium benefits', 'Hereditary commission', 'Leadership roles'],
    color: 'from-purple-500 to-pink-500',
    bgLight: 'bg-purple-50',
    icon: Crown,
  },
];

export default function AchievementPathSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeInOnScroll className="mb-10 md:mb-14">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Growth Path</p>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-4">
              What You Can Achieve
            </h2>
            <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">
              Performance today leads to prestige tomorrow. Clear pathways and tangible rewards at each level.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Achievement Progression */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {achievementMilestones.map((milestone, idx) => {
            const IconComponent = milestone.icon;
            return (
              <motion.div
                key={milestone.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`h-full rounded-2xl ${milestone.bgLight} border-2 border-transparent hover:border-primary/30 p-6 md:p-8 transition-all duration-300`}>
                  {/* Icon & Tier Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/60 text-on-surface">
                      Level {idx + 1}
                    </span>
                  </div>

                  {/* Tier Name */}
                  <h3 className="font-headline text-xl font-bold text-on-surface mb-1">
                    {milestone.tier}
                  </h3>
                  <p className="text-sm text-on-surface-variant font-semibold mb-3">
                    {milestone.role}
                  </p>

                  {/* Earnings */}
                  <div className="mb-4 p-3 rounded-lg bg-white/50 border border-white">
                    <p className="text-xs text-on-surface-variant mb-1">Typical Monthly Earnings</p>
                    <p className="font-headline text-lg font-bold text-on-surface">
                      {milestone.earnings}
                    </p>
                  </div>

                  {/* Benefits List */}
                  <ul className="space-y-2">
                    {milestone.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-on-surface-variant">
                        <span className="text-primary font-bold mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Arrow (except last) */}
                  {idx < achievementMilestones.length - 1 && (
                    <div className="hidden lg:flex justify-center mt-6">
                      <ArrowRight className="w-5 h-5 text-primary/50 rotate-90" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-base md:text-lg text-on-surface-variant mb-4 max-w-2xl mx-auto">
            Start as an agent and progress based on your performance. Our proven system supports every step of your journey.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/30">
            <span className="text-sm font-semibold text-primary">Performance Today → Prestige Tomorrow</span>
          </div>
        </div>
      </div>
    </section>
  );
}
