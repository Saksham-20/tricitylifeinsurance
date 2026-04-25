'use client';

import Link from 'next/link';
import { CheckCircle, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import PremiumButton from '@/components/ui/PremiumButton';
import AutoPlayVideo from '@/components/landing/AutoPlayVideo';

export default function BimaSakhiHeroSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
  const whatsappHref = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hi, I want details about the Bima Sakhi opportunity.')}`;

  return (
    <section className="bg-white px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="lg:hidden">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: '100px' }}
            >
              <AutoPlayVideo
                videoId="bsGkAey-gpI"
                title="How Women Earn Through LIC - Bima Sakhi Stories"
                description="Discover how women across India are building sustainable income with LIC's Bima Sakhi opportunity while maintaining flexibility and independence."
                showIntro={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true, margin: '100px' }}
              className="mx-auto mt-6 max-w-2xl text-center"
            >
              <div className="mb-4 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700 md:text-xs">Women-First Opportunity</p>
              </div>
              <h2 className="font-headline text-3xl font-extrabold leading-[1.12] tracking-tight text-on-surface sm:text-4xl">
                See the Bima Sakhi path before you decide.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg">
                Watch the story first, then understand how women in Tricity are building flexible income with mentor-led guidance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, margin: '100px' }}
              className="mt-6 rounded-[2rem] border border-amber-200/50 bg-gradient-to-br from-amber-50/70 to-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary md:text-sm">Mentor-led by Subhash Panjla</p>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant md:text-base">
                    Clear guidance, practical onboarding, and a calm first step for women who want to start with confidence.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                { label: '₹7,000/mo', value: 'Year 1 support' },
                { label: '18-70', value: 'Women eligible' },
                { label: 'Tricity', value: 'Local guidance' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-[0_8px_20px_rgba(15,23,42,0.03)]">
                  <p className="font-headline text-xl font-extrabold tracking-tight text-on-surface">{stat.label}</p>
                  <p className="mt-1 text-sm font-medium text-on-surface-variant">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <Link href="/apply" className="block">
                <PremiumButton variant="primary" showArrow className="w-full">
                  Apply as Bima Sakhi
                </PremiumButton>
              </Link>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="block">
                <div className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-3.5 text-center text-sm font-bold text-amber-700 transition-all hover:bg-amber-100 md:text-base">
                  <MessageCircle className="h-5 w-5" />
                  Ask on WhatsApp
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '100px' }}
            className="mb-12"
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Women-First Opportunity</p>
            </div>
            <h2 className="font-headline text-3xl font-extrabold leading-[1.12] tracking-tight text-on-surface md:text-4xl lg:text-5xl">
              Bima Sakhi: Earn with flexibility.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              Stipend support starts at ₹7,000/month in year 1, with commission opportunities subject to LIC rules. Built for women who want flexibility and mentor support.
            </p>
          </motion.div>

          {/* Two Column Grid: Video + Benefits */}
          <div className="grid gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:items-start lg:gap-16">
            {/* Left: Video */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '100px' }}
              className="order-2 lg:order-1"
            >
              <AutoPlayVideo
                videoId="bsGkAey-gpI"
                title="How Women Earn Through LIC - Bima Sakhi Stories"
                description="Discover how women across India are building sustainable income with LIC's Bima Sakhi opportunity while maintaining flexibility and independence."
              />
            </motion.div>

            {/* Right: Benefits + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: '100px' }}
              className="order-1 lg:order-2"
            >
              {/* Benefits */}
              <div className="mb-10 space-y-5">
                <h3 className="font-headline text-2xl font-bold tracking-tight text-on-surface">Why Bima Sakhi?</h3>

                {[
                  {
                    icon: <CheckCircle className="h-6 w-6" />,
                    title: 'Stipend Support',
                    description: 'Year-wise stipend support, subject to LIC conditions',
                  },
                  {
                    icon: <CheckCircle className="h-6 w-6" />,
                    title: 'Schedule Flexibility',
                    description: 'Part-time or full-time - you decide how many hours to commit',
                  },
                  {
                    icon: <CheckCircle className="h-6 w-6" />,
                    title: 'Mentor Support',
                    description: 'Structured training, IC38 prep, and weekly guidance sessions',
                  },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-4 rounded-3xl border border-amber-200/40 bg-amber-50/40 p-5 shadow-[0_8px_20px_rgba(251,191,36,0.04)]">
                    <div className="mt-0.5 flex-shrink-0 text-amber-600">{benefit.icon}</div>
                    <div>
                      <p className="text-base font-bold text-on-surface">{benefit.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Row */}
              <div className="mb-10 grid grid-cols-3 gap-4 rounded-3xl border border-amber-200/50 bg-amber-50 p-5 shadow-[0_8px_20px_rgba(251,191,36,0.04)]">
                {[
                  { label: '₹7,000/mo', value: 'Stipend Year 1' },
                  { label: '3 Years', value: 'Structured Support' },
                  { label: 'Women-only', value: 'Age 18-70' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="font-headline text-xl font-extrabold tracking-tight text-on-surface">{stat.label}</p>
                    <p className="mt-1 text-sm font-medium text-on-surface-variant">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="space-y-4">
                <Link href="/apply" className="block">
                  <PremiumButton variant="primary" showArrow className="w-full">
                    Apply as Bima Sakhi
                  </PremiumButton>
                </Link>
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="block">
                  <div className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-center text-base font-bold text-amber-700 transition-all hover:bg-amber-100">
                    <MessageCircle className="h-5 w-5" />
                    Ask on WhatsApp
                  </div>
                </a>
              </div>

              {/* Info Box */}
              <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <p className="text-sm leading-relaxed text-blue-800">
                  <span className="font-bold text-blue-900">Eligibility:</span> 10th pass or above, women aged 18-70, Chandigarh Tricity. Application &rarr; Training &rarr; Certification &rarr; Advisory Launch.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
