'use client';

import { motion } from 'framer-motion';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import SectionHeading from '@/components/ui/SectionHeading';
import { Award, CheckCircle2, TrendingUp, Crown } from 'lucide-react';

const achievementMilestones = [
  {
    tier: 'Starting Out',
    role: 'LIC Agent / Bima Sakhi',
    earnings: 'Variable + stipend where eligible',
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
    benefits: ['Higher-tier benefits', 'Renewal income potential', 'Leadership roles'],
    color: 'from-slate-700 to-slate-900',
    bgLight: 'bg-slate-50',
    icon: Crown,
  },
];

export default function AchievementPathSection() {
  return (
    <section className="page-section">
      <div className="mx-auto max-w-7xl">
        <FadeInOnScroll className="mb-10 md:mb-14">
          <SectionHeading
            eyebrow="Growth Path"
            title="What Progress Can Look Like"
            description="Consistent activity can open higher levels of recognition, income potential, and practical career advantages."
          />
        </FadeInOnScroll>

        <div className="surface-panel rounded-[2.5rem] p-6 md:p-8 lg:p-10">
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
                  <div className={`h-full rounded-[1.75rem] ${milestone.bgLight} border border-white/70 p-6 shadow-[0_16px_34px_rgba(15,24,41,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_22px_42px_rgba(15,24,41,0.08)]`}>
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${milestone.color} text-white shadow-[0_14px_24px_rgba(15,24,41,0.14)]`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-on-surface">
                        Level {idx + 1}
                      </span>
                    </div>

                    <h3 className="font-headline text-xl font-bold text-on-surface">{milestone.tier}</h3>
                    <p className="mt-1 text-sm font-semibold text-on-surface-variant">{milestone.role}</p>

                    <div className="mb-5 mt-5 rounded-2xl border border-white/75 bg-white/70 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary/80">Typical Monthly Earnings</p>
                      <p className="mt-2 font-headline text-2xl font-bold text-on-surface">{milestone.earnings}</p>
                    </div>

                    <ul className="space-y-2">
                      {milestone.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="mx-auto max-w-2xl text-base text-slate-600 md:text-lg">
              Start as an agent and grow based on performance. The structure is designed to help you build momentum instead of figuring everything out alone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
