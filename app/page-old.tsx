'use client';

import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

const pathways = [
  {
    title: 'For Fresh Graduates',
    copy: 'Start with structured onboarding, practical scripts, and guided client meetings.',
    icon: 'school',
  },
  {
    title: 'For Working Professionals',
    copy: 'Build a second income stream with flexible hours and digital support tools.',
    icon: 'schedule',
  },
  {
    title: 'For Experienced Advisors',
    copy: 'Scale your book with leadership mentoring and sharper positioning support.',
    icon: 'trending_up',
  },
  {
    title: 'For Homemakers (Bima Sakhi)',
    copy: 'Grow an independent career with family-compatible workflows and coaching.',
    icon: 'woman',
  },
];

const highlights = [
  { label: 'Years of Mentorship', value: '25+' },
  { label: 'Advisors Trained', value: '300+' },
  { label: 'Active Team Strength', value: '60+' },
  { label: 'Dedicated Support', value: '6 Days/Week' },
];

const achievementShots = [
  '/images/events/event-award-1.jpg',
  '/images/events/event-award-2.jpg',
  '/images/events/event-award-3.jpg',
  '/images/events/event-award-4.jpg',
  '/images/events/event-award-5.jpg',
  '/images/events/event-audience.jpg',
];

export default function Home() {
  const handleWhatsAppClick = () => {
    trackEvent('cta_click', {
      location: 'home_hero',
      cta_type: 'whatsapp',
    });
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
    const message = encodeURIComponent('Hi, I want to explore LIC career opportunities.');
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <main className="pt-24 md:pt-28 pb-28 md:pb-16">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-[#f8fbff] via-white to-[#eef4ff] p-8 md:p-12 lg:p-16 shadow-[0_25px_80px_rgba(2,83,205,0.10)]">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                Professional LIC Career Mentorship
              </p>
              <h1 className="mt-6 font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface md:text-6xl lg:text-7xl">
                Build a Trusted Insurance Career With
                <span className="block text-primary">Clarity, Coaching, and Consistency.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
                Designed for graduates, professionals, experienced advisors, and women leaders. Get a practical pathway,
                personalized guidance, and a performance-focused support system from day one.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/apply">
                  <button
                    onClick={() =>
                      trackEvent('cta_click', {
                        location: 'home_hero',
                        cta_type: 'apply',
                      })
                    }
                    className="rounded-xl bg-primary px-8 py-4 font-headline text-base font-bold text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-dim md:text-lg"
                  >
                    Start Application
                  </button>
                </Link>
                <button
                  onClick={handleWhatsAppClick}
                  className="rounded-xl border-2 border-primary/20 bg-white px-8 py-4 font-headline text-base font-bold text-primary transition-all hover:bg-primary/5 md:text-lg"
                >
                  WhatsApp Inquiry
                </button>
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                Response window: usually within 24 business hours
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-[2rem] bg-primary p-4 sm:col-span-2">
                <Image
                  src="/images/mentor/mentor-portrait-1.jpg"
                  alt="Lead mentor portrait"
                  width={800}
                  height={460}
                  priority
                  className="h-64 w-full rounded-[1.5rem] object-cover object-top md:h-72"
                />
                <div className="absolute inset-x-8 bottom-8 rounded-2xl border border-white/20 bg-black/45 p-4 text-white backdrop-blur-sm">
                  <p className="font-headline text-lg font-bold">Mentor-Led Growth Framework</p>
                  <p className="text-sm text-white/80">Professional guidance, practical field support, and ethical client-first execution.</p>
                </div>
              </div>

              <Image
                src="/images/mentor/mentor-portrait-2.jpg"
                alt="Mentor portrait alternate"
                width={400}
                height={420}
                className="h-44 w-full rounded-[1.75rem] object-cover sm:h-52"
              />
              <Image
                src="/images/team/team-group-office.jpg"
                alt="Team members in office"
                width={400}
                height={420}
                className="h-44 w-full rounded-[1.75rem] object-cover sm:h-52"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-5 md:p-6">
              <p className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">{item.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant md:text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 md:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Career Pathways</p>
            <h2 className="mt-3 font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-5xl">
              One Professional Platform, Multiple Growth Journeys.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {pathways.map((path) => (
              <article key={path.title} className="rounded-3xl bg-surface-container-low p-6 md:p-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">{path.icon}</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-on-surface">{path.title}</h3>
                <p className="mt-3 leading-relaxed text-on-surface-variant">{path.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#0c1f47] p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary-container">Leadership Note</p>
              <h2 className="mt-4 font-headline text-3xl font-extrabold leading-tight md:text-5xl">
                Professional Culture. Measurable Progress. Long-Term Trust.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
                You receive direct mentorship, not generic advice. Our framework helps you build client confidence, stay compliant,
                and grow with consistency over time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/about">
                  <button className="rounded-xl bg-white px-6 py-3 font-headline font-bold text-[#0c1f47]">Meet the Leadership</button>
                </Link>
                <Link href="/training">
                  <button className="rounded-xl border border-white/25 px-6 py-3 font-headline font-bold text-white">View Training Model</button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {achievementShots.map((src, idx) => (
                <div key={src} className={`${idx === 0 ? 'col-span-2' : ''} overflow-hidden rounded-2xl`}>
                  <Image
                    src={src}
                    alt="Team achievement highlight"
                    width={640}
                    height={380}
                    className={`${idx === 0 ? 'h-48 md:h-56' : 'h-36 md:h-40'} w-full object-cover`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 md:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">How It Works</p>
            <h2 className="mt-3 font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-5xl">
              A Clear 4-Step Entry Process
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              { n: '01', t: 'Submit Profile', d: 'Share your details and preferred pathway.' },
              { n: '02', t: 'Mentor Connect', d: 'A short evaluation call with role alignment guidance.' },
              { n: '03', t: 'Training + License', d: 'Structured preparation and practical coaching support.' },
              { n: '04', t: 'Launch + Scale', d: 'Begin client work with ongoing team and sales enablement.' },
            ].map((step) => (
              <article key={step.n} className="rounded-3xl border border-outline-variant/30 bg-white p-6 md:p-8">
                <p className="text-5xl font-headline font-black text-primary/20">{step.n}</p>
                <h3 className="mt-3 font-headline text-xl font-bold text-on-surface">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{step.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-r from-primary to-primary-dim p-8 text-center md:p-14">
          <h2 className="font-headline text-3xl font-extrabold text-white md:text-5xl">Ready to Build Your Professional Growth Track?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            Choose your pathway and take the first step today. Apply now or start with a direct WhatsApp conversation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/apply">
              <button
                onClick={() =>
                  trackEvent('cta_click', {
                    location: 'home_final_cta',
                    cta_type: 'apply',
                  })
                }
                className="rounded-xl bg-secondary-container px-8 py-4 font-headline text-lg font-bold text-on-secondary-container shadow-xl"
              >
                Apply Now
              </button>
            </Link>
            <button
              onClick={handleWhatsAppClick}
              className="rounded-xl border-2 border-white/30 px-8 py-4 font-headline text-lg font-bold text-white"
            >
              WhatsApp First
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
