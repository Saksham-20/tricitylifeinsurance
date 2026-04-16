'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';
import {
  containerVariants,
  containerVariantsMobile,
  itemVariants,
} from '@/lib/animationVariants';
import { useResponsiveMotion } from '@/hooks/useResponsiveMotion';
import PremiumButton from '@/components/ui/PremiumButton';
import {
  BadgeCheck,
  BriefcaseBusiness,
  ShieldCheck,
} from 'lucide-react';

const heroHighlights = [
  'Mentor-led onboarding from day one',
  'Practical training for field readiness',
  'Flexible pathways for professionals and homemakers',
];

const proofStats = [
  { value: '28+', label: 'Years of guidance' },
  { value: '300+', label: 'Advisors supported' },
  { value: '60+', label: 'Active team members' },
];

export default function HeroSection() {
  const intensity = useResponsiveMotion();
  const variants = intensity === 'full' ? containerVariants : containerVariantsMobile;

  return (
    <section className="relative overflow-hidden px-6 pb-10 pt-8 md:px-10 md:pb-14 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="surface-panel relative overflow-hidden rounded-[2.5rem] px-7 py-8 md:px-10 md:py-10 lg:px-14 lg:py-14">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-secondary-container/20 blur-3xl" />

          <div className="grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="relative z-10 space-y-7"
            >
              <motion.div
                variants={itemVariants}
                className="section-tag"
              >
                <BadgeCheck className="h-4 w-4 text-primary" />
                <span>Trusted by 300+ advisors across Chandigarh Tricity</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="max-w-3xl font-headline text-4xl font-extrabold leading-[1.02] tracking-tight text-on-surface md:text-5xl lg:text-[4.25rem]"
              >
                Build a career in life insurance with
                <span className="mt-2 block gradient-text">clarity, confidence, and mentorship.</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-xl"
              >
                Join a mentorship-driven LIC team in Chandigarh Tricity. From IRDAI preparation to field support, every step is structured so you can start strong and grow with purpose.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3 pt-2 sm:flex-row"
              >
                <Link href="/apply">
                  <PremiumButton
                    variant="primary"
                    size="lg"
                    showArrow
                    onClick={() =>
                      trackEvent('cta_click', {
                        location: 'home_hero',
                        cta_type: 'apply',
                      })
                    }
                  >
                    Start Your Application
                  </PremiumButton>
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-2xl border border-primary/15 bg-white px-6 py-4 font-headline text-base font-bold text-on-surface transition-all duration-300 hover:border-primary/30"
                >
                  Meet Your Mentor
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
                {heroHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-sm font-medium leading-relaxed text-on-surface-variant">{item}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid gap-4 rounded-[1.75rem] border border-primary/10 bg-[#0f1829] px-5 py-5 text-white shadow-[0_20px_60px_rgba(15,24,41,0.12)] sm:grid-cols-3 sm:px-6"
              >
                {proofStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="space-y-1 border-white/10 sm:border-l sm:pl-5 first:sm:border-l-0 first:sm:pl-0"
                  >
                    <p className="font-headline text-3xl font-extrabold text-white">{stat.value}</p>
                    <p className="text-sm text-white/65">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-10"
            >
              <div className="relative">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_20px_60px_rgba(15,24,41,0.1)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src="/images/mentor/mentor-portrait-1.jpg"
                      alt="Subhash Panjla — LIC Career Mentor with 25+ years experience"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1829]/70 via-[#0f1829]/10 to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0f1829]/65 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
                      <BriefcaseBusiness className="h-4 w-4 text-secondary-container" />
                      Mentorship Since 1997
                    </div>

                    <div className="absolute inset-x-5 bottom-5 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,24,41,0.12)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Subhash Panjla</p>
                          <p className="mt-2 font-headline text-lg font-bold text-on-surface md:text-xl">Founder and Lead Mentor</p>
                          <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                            Practical guidance for new advisors, part-time professionals, and women entering through the Bima Sakhi pathway.
                          </p>
                        </div>
                        <div className="rounded-2xl bg-primary/10 px-3 py-2 text-right">
                          <p className="font-headline text-lg font-bold text-primary">300+</p>
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">Team Trained</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
