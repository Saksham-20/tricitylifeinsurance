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
import { BadgeCheck } from 'lucide-react';

export default function HeroSection() {
  const intensity = useResponsiveMotion();
  const variants = intensity === 'full' ? containerVariants : containerVariantsMobile;

  return (
    <section className="relative pt-8 md:pt-16 pb-8 md:pb-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 relative">
        <div className="rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-xl p-8 md:p-12 lg:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Content */}
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Trust Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-2 border border-primary/15"
              >
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  Trusted by 300+ Advisors
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="font-headline text-4xl font-extrabold leading-[1.1] tracking-tight text-on-surface md:text-5xl lg:text-[3.5rem] xl:text-6xl"
              >
                Build Your Career
                <span className="block gradient-text">in Life Insurance</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemVariants}
                className="max-w-lg text-base leading-relaxed text-on-surface-variant md:text-lg"
              >
                Join a mentorship-driven team in Chandigarh Tricity. Get certified, trained, and start earning — with full support from day one.
              </motion.p>

              {/* Single Primary CTA */}
              <motion.div
                variants={itemVariants}
                className="pt-2"
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
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <Image
                  src="/images/mentor/mentor-portrait-1.jpg"
                  alt="Subhash Panjla — LIC Career Mentor with 25+ years experience"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 0vw, 40vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1829]/60 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-elevation-2 border border-white/50">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Subhash  Panjla</p>
                  <p className="text-sm font-semibold text-on-surface mt-1">Founder & Lead Mentor</p>
                  <p className="text-xs text-on-surface-variant mt-2">25+ Years Experience • 300+ Advisors Trained</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
