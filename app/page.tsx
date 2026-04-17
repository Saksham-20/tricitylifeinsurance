'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import PremiumButton from '@/components/ui/PremiumButton';
import PulseDot from '@/components/ui/PulseDot';

const trustStats = [
  { value: '28+', label: 'Years of mentoring experience' },
  { value: '300+', label: 'Advisors guided across Tricity' },
  { value: '60+', label: 'Active advisors in team network' },
  { value: 'Since 1997', label: 'LIC leadership journey' },
];

const audienceSegments = [
  { title: 'Working Professionals', copy: 'Build a second income with weekend and evening support.' },
  { title: 'Homemakers', copy: 'Start through Bima Sakhi with guided onboarding and flexibility.' },
  { title: 'Fresh Graduates', copy: 'Learn practical selling and advisory skills from day one.' },
  { title: 'Sales-Oriented Individuals', copy: 'Grow with a structured path from agent to advanced clubs.' },
];

const processSteps = [
  { title: '1. Quick Discussion', copy: 'Call or WhatsApp to discuss your profile and availability.' },
  { title: '2. Eligibility & Role Fit', copy: 'Get clarity on LIC Agent or Bima Sakhi pathway.' },
  { title: '3. Training Roadmap', copy: 'Receive exam guidance, onboarding checklist, and mentor support.' },
  { title: '4. Guided Launch', copy: 'Begin with field assistance and regular review sessions.' },
];

const testimonials = [
  {
    quote: 'The support system gave me confidence in client meetings. I started part-time and built steady renewals within months.',
    name: 'R. K.',
    role: 'Part-time Advisor',
    city: 'Mohali',
  },
  {
    quote: 'As a homemaker, I wanted respectful guidance and flexibility. The Bima Sakhi route was clear and practical.',
    name: 'S. D.',
    role: 'Bima Sakhi Advisor',
    city: 'Panchkula',
  },
  {
    quote: 'The mentor review process helped me avoid beginner mistakes. I knew exactly what to do each week.',
    name: 'A. V.',
    role: 'LIC Agent',
    city: 'Chandigarh',
  },
];

const faqs = [
  {
    q: 'Can I start part-time while working another job?',
    a: 'Yes. Many candidates begin part-time and scale gradually with planned weekly activity targets.',
  },
  {
    q: 'Is income fixed or variable?',
    a: 'Income is performance linked. Training is provided to help you build a predictable pipeline over time.',
  },
  {
    q: 'Do I need prior insurance experience?',
    a: 'No. You receive guidance for the certification process, product basics, and client conversations.',
  },
  {
    q: 'How soon will someone contact me after applying?',
    a: 'Most profiles are reviewed within one business day, and callback support is provided in your preferred time window.',
  },
];

export default function Home() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
  const whatsappHref = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hi, I want to discuss LIC career opportunities in Chandigarh Tricity.')}`;

  return (
    <main className="relative overflow-hidden pb-24 pt-20 md:pt-24 lg:pb-0 lg:pt-28">
      <section className="px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.25rem] border border-primary/10 bg-white p-6 shadow-[0_20px_70px_rgba(15,24,41,0.08)] md:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <FadeInOnScroll className="space-y-6">
            <p className="section-tag">
              <ShieldCheck className="h-4 w-4 text-primary" />
              LIC Career Recruitment Desk - Chandigarh Tricity
            </p>
            <h1 className="font-headline text-4xl font-extrabold leading-tight text-on-surface md:text-5xl">
              Build a reliable second income and long-term insurance career with mentor-led support.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
              For professionals, homemakers, fresh graduates, and sales-oriented individuals who want a structured LIC opportunity.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <PremiumButton
                  variant="primary"
                  size="md"
                  showArrow
                  attentionOnce
                  attentionKey="home-whatsapp"
                  onClick={() => trackEvent('cta_click', { location: 'home_hero', cta_type: 'whatsapp' })}
                >
                  Talk on WhatsApp
                </PremiumButton>
              </a>
              <Link href="/apply" onClick={() => trackEvent('cta_click', { location: 'home_hero', cta_type: 'apply' })}>
                <PremiumButton variant="secondary" size="md" showArrow>
                  Apply Now
                </PremiumButton>
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {trustStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-outline-variant/35 bg-surface-container-low p-4">
                  <p className="font-headline text-2xl font-extrabold text-on-surface">{stat.value}</p>
                  <p className="text-sm text-on-surface-variant">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeInOnScroll>
          <FadeInOnScroll direction="left">
            <div className="rounded-[1.75rem] border border-primary/10 bg-surface-container-low p-3">
              <div className="overflow-hidden rounded-[1.25rem] border border-primary/15 bg-[#0f1829]">
                <div className="flex items-start p-4">
                  <div className="inline-flex items-center rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                    Mentorship Since 1997
                  </div>
                </div>

                <div className="px-3 pb-3">
                  <div className="relative h-[360px] w-full overflow-hidden rounded-[1rem] md:h-[420px] lg:h-[480px]">
                    <Image
                      src="/images/home/mentor-portrait-1.jpg"
                      alt="Subhash Panjla, LIC Development Officer and mentor"
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                </div>

                <div className="m-3 mt-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,24,41,0.18)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Subhash Panjla</p>
                      <p className="mt-1 font-headline text-xl font-bold text-on-surface">Founder and Lead Mentor</p>
                      <p className="mt-1 text-sm text-on-surface-variant">Practical guidance for new advisors and women entering through the Bima Sakhi pathway.</p>
                    </div>
                    <div className="rounded-2xl bg-primary/10 px-3 py-2 text-right">
                      <p className="font-headline text-xl font-bold text-primary">300+</p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-on-surface-variant">Team Trained</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <section className="mt-12 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {audienceSegments.map((item) => (
            <FadeInOnScroll key={item.title}>
              <article className="h-full rounded-2xl border border-outline-variant/30 bg-white p-5 transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_12px_24px_rgba(15,24,41,0.08)]">
                <h2 className="font-headline text-xl font-bold text-on-surface">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{item.copy}</p>
              </article>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      <section className="mt-12 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <FadeInOnScroll>
            <article className="rounded-[2rem] border border-primary/15 bg-white p-7">
              <h3 className="font-headline text-3xl font-bold text-on-surface">Why join under this mentor</h3>
              <ul className="mt-5 space-y-3">
                {[
                  'Clear weekly action plan and field guidance',
                  'Practical support for client objections and follow-up',
                  'Local market knowledge for Chandigarh Tricity',
                  'Supportive team environment, not solo struggle',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-on-surface-variant">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </FadeInOnScroll>
          <FadeInOnScroll direction="left">
            <article className="rounded-[2rem] border border-primary/15 bg-[#0f1829] p-7 text-white">
              <h3 className="font-headline text-3xl font-bold">How it works</h3>
              <div className="mt-5 space-y-3">
                {processSteps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-1 text-sm text-white/75">{step.copy}</p>
                  </div>
                ))}
              </div>
            </article>
          </FadeInOnScroll>
        </div>
      </section>

      <section className="mt-12 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <FadeInOnScroll>
            <article className="rounded-[2rem] border border-amber-200 bg-amber-50/40 p-7">
              <div className="flex items-center gap-2">
                <PulseDot />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Bima Sakhi Opportunity</p>
              </div>
              <h3 className="mt-3 font-headline text-3xl font-bold text-on-surface">A supportive route for women re-starting careers</h3>
              <p className="mt-3 text-on-surface-variant">
                Flexible schedule, training support, and a confidence-first onboarding experience designed for homemakers and women professionals.
              </p>
              <Link href="/bima-sakhi" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Explore Bima Sakhi details <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </FadeInOnScroll>
          <FadeInOnScroll direction="left">
            <article className="rounded-[2rem] border border-primary/20 bg-primary/5 p-7">
              <div className="flex items-center gap-2">
                <PulseDot />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Growth Path Highlight</p>
              </div>
              <h3 className="mt-3 font-headline text-3xl font-bold text-on-surface">From beginner to high-performance advisor</h3>
              <p className="mt-3 text-on-surface-variant">
                Follow a realistic progression with ongoing mentoring, performance reviews, and advanced growth pathways including MDRT ambition.
              </p>
              <Link href="/mdrt" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                View MDRT pathway <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </FadeInOnScroll>
        </div>
      </section>

      <section className="mt-12 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <FadeInOnScroll>
            <h3 className="font-headline text-3xl font-bold text-on-surface md:text-4xl">Testimonials from local candidates</h3>
            <p className="mt-2 text-on-surface-variant">Names partially anonymized for privacy. Real outcomes vary by activity, consistency, and compliance.</p>
          </FadeInOnScroll>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <FadeInOnScroll key={item.quote}>
                <article className="h-full rounded-2xl border border-outline-variant/30 bg-white p-5">
                  <p className="text-sm leading-relaxed text-on-surface-variant">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-4 border-t border-outline-variant/20 pt-3">
                    <p className="font-headline text-base font-bold text-on-surface">{item.name}</p>
                    <p className="text-xs text-on-surface-variant">{item.role} - {item.city}</p>
                  </div>
                </article>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-primary/15 bg-white p-7">
          <FadeInOnScroll>
            <h3 className="font-headline text-3xl font-bold text-on-surface">Frequently asked questions</h3>
          </FadeInOnScroll>
          <div className="mt-5 space-y-3">
            {faqs.map((item) => (
              <FadeInOnScroll key={item.q}>
                <details className="group rounded-2xl border border-outline-variant/30 bg-surface-container-low p-4">
                  <summary className="cursor-pointer list-none font-semibold text-on-surface">{item.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{item.a}</p>
                </details>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#0f1829] p-8 text-white md:p-10">
          <FadeInOnScroll>
            <h3 className="font-headline text-3xl font-bold md:text-4xl">Ready to discuss your next step?</h3>
            <p className="mt-3 max-w-3xl text-white/75">
              Choose the channel that feels easiest. Our team shares role clarity first, then guides you through the process.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 font-headline font-bold text-white transition-all duration-200 hover:scale-[1.01]">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Now
              </a>
              <Link href="/apply" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 px-6 py-3 font-headline font-bold text-white transition-all duration-200 hover:scale-[1.01]">
                Apply for Callback
              </Link>
              <a href="tel:+918872364673" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 px-6 py-3 font-headline font-bold text-white transition-all duration-200 hover:scale-[1.01]">
                <PhoneCall className="h-4 w-4" />
                Call Now
              </a>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </main>
  );
}
