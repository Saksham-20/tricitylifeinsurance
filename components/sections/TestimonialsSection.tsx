'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import SectionHeading from '@/components/ui/SectionHeading';
import { containerVariants, containerVariantsMobile, itemVariants } from '@/lib/animationVariants';
import { useResponsiveMotion } from '@/hooks/useResponsiveMotion';
import { trackEvent } from '@/lib/analytics';
import PremiumButton from '@/components/ui/PremiumButton';
import { Quote, Sparkles, Star } from 'lucide-react';

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
    color: 'from-emerald-500 to-emerald-600',
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
    <section className="page-section">
      <div className="mx-auto max-w-7xl">
        <FadeInOnScroll className="mb-10 md:mb-14 text-center">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Advisors Say"
            description="Real experiences from professionals who grew with structured mentoring, flexibility, and day-to-day support."
          />
        </FadeInOnScroll>

        <motion.div
          variants={containerVar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 grid gap-6 md:mb-20 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="group"
            >
              <div className="surface-panel flex h-full flex-col rounded-[1.75rem] p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Quote className="h-4 w-4" />
                  </div>
                </div>

                <p className="mb-6 flex-1 text-base leading-relaxed text-on-surface-variant">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-surface-variant/30 pt-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.color} text-sm font-bold text-white`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-headline text-sm font-bold text-on-surface">{testimonial.name}</p>
                    <p className="text-xs text-on-surface-variant">{testimonial.role} · {testimonial.tenure}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <FadeInOnScroll>
          <div className="surface-panel-strong relative overflow-hidden rounded-[2.5rem] p-8 text-center md:p-14">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(92,139,255,0.18),transparent_55%)]" />

            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-secondary-container">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-white md:text-4xl">
                Ready to start your journey with a mentor-led team?
              </h3>
              <p className="mx-auto mb-8 mt-4 max-w-2xl text-base leading-relaxed text-white/68">
                Apply today and take the first step toward a rewarding career in life insurance. We&apos;ll guide you through training, expectations, and the right pathway for your goals.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
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
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-4 font-headline text-base font-bold text-white transition-colors hover:bg-white/10"
                >
                  {'Mentor contact & apply'}
                </Link>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
