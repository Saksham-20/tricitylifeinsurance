'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import { containerVariants, containerVariantsMobile, itemVariants } from '@/lib/animationVariants';
import { useResponsiveMotion } from '@/hooks/useResponsiveMotion';
import { trackEvent } from '@/lib/analytics';
import PremiumButton from '@/components/ui/PremiumButton';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "The structured training completely changed how I approach clients. I went from zero to 15 policies in my first quarter with Subhash sir's guidance.",
    name: 'Priya Sharma',
    role: 'LIC Advisor',
    tenure: '3 years with team',
    rating: 5,
    initials: 'PS',
    color: 'from-blue-500 to-blue-600',
  },
  {
    quote: "As a working professional, I needed flexibility. The mentorship program let me build a second income without compromising my primary job.",
    name: 'Rahul Verma',
    role: 'Part-time Agent',
    tenure: '2 years with team',
    rating: 5,
    initials: 'RV',
    color: 'from-violet-500 to-violet-600',
  },
  {
    quote: "The Bima Sakhi program gave me confidence and financial independence. The coaching is practical, supportive, and designed for our schedules.",
    name: 'Sunita Devi',
    role: 'Bima Sakhi',
    tenure: '1.5 years with team',
    rating: 5,
    initials: 'SD',
    color: 'from-amber-500 to-amber-600',
  },
];

export default function TestimonialsSection() {
  const intensity = useResponsiveMotion();
  const containerVar = intensity === 'full' ? containerVariants : containerVariantsMobile;

  return (
    <section className="py-16 md:py-24 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeInOnScroll className="mb-10 md:mb-14 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">Testimonials</p>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-4">
            What Our Advisors Say
          </h2>
          <p className="text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">
            Hear from professionals who transformed their careers through our mentorship program.
          </p>
        </FadeInOnScroll>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 md:grid-cols-3 mb-16 md:mb-20"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="group"
            >
              <div className="h-full rounded-2xl border border-white/60 bg-white/80 backdrop-blur-sm p-8 shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 flex flex-col">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-base leading-relaxed text-on-surface-variant flex-1 mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-surface-variant/30">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white text-sm font-bold`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface text-sm">{testimonial.name}</p>
                    <p className="text-xs text-on-surface-variant">{testimonial.role} · {testimonial.tenure}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA — consolidated */}
        <FadeInOnScroll>
          <div className="rounded-3xl bg-gradient-to-br from-[#0f1829] via-[#162040] to-[#1a2744] p-10 md:p-16 text-center relative overflow-hidden">
            {/* Subtle decorative element */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <h3 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-base text-white/60 max-w-xl mx-auto mb-8">
                Apply today and take the first step towards a rewarding career in life insurance. Our team will guide you through every step.
              </p>
              <Link
                href="/apply"
                onClick={() =>
                  trackEvent('cta_click', {
                    location: 'final_cta',
                    cta_type: 'apply',
                  })
                }
              >
                <PremiumButton variant="primary" size="lg" showArrow>
                  Apply Now
                </PremiumButton>
              </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
