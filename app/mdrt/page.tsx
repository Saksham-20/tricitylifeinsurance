import type { Metadata } from 'next';
import { Award, Crown, GraduationCap, Globe2, MessageCircle, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Pill from '@/components/ui/Pill';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { site, telLink, waLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'MDRT Roadmap for LIC Advisors in Chandigarh Tricity',
  description:
    'Work toward MDRT — the global top 1% benchmark in life insurance — with a step-by-step roadmap, personal mentorship, and a practical advisory system in Chandigarh, Mohali, and Panchkula.',
  alternates: { canonical: '/mdrt' },
  openGraph: { url: '/mdrt', title: 'MDRT Roadmap for LIC Advisors in Chandigarh Tricity' },
};

const propositions = [
  {
    icon: TrendingUp,
    title: 'Performance-Linked Income',
    copy: 'Your earnings grow with consistent activity, client trust, and policy quality.',
  },
  { icon: Users, title: 'Work on Your Own Terms', copy: 'Flexible timing, full independence' },
  { icon: ShieldCheck, title: "Secure People's Future", copy: 'Help families achieve financial protection & stability' },
];

const mdrtMeaning = [
  { icon: Award, text: 'Top 1% financial professionals worldwide' },
  { icon: ShieldCheck, text: 'Recognized for ethics, performance & client trust' },
  { icon: Crown, text: 'A symbol of excellence in the industry' },
];

const mdrtBenefits = [
  { icon: Globe2, label: 'Global Recognition', copy: 'Stand among the top performers worldwide' },
  {
    icon: TrendingUp,
    label: 'Income Growth',
    copy: 'MDRT-focused advisors work toward stronger performance through structure',
  },
  { icon: Users, label: 'International Networking', copy: 'Connect with top advisors across the globe' },
  { icon: Award, label: 'Practical Sales System', copy: 'Learn tested habits for ethical advisory conversations' },
  { icon: GraduationCap, label: 'Continuous Learning', copy: 'Training, mentorship, and wider industry exposure' },
];

const whyJoin = [
  'Strong Leadership: Led by an experienced mentor with decades in LIC',
  'MDRT Roadmap: Step-by-step guidance for advisors who want to progress',
  'Personal Mentorship: We work closely with every agent',
  'Growth-Oriented Environment: Supportive team culture focused on success',
];

const whoCanJoin = [
  'Students (18+)',
  'Working professionals',
  'Business owners',
  'Homemakers',
  'People willing to learn, meet clients, and stay consistent',
];

const lookingFor = ['Performance-linked income potential', 'Flexible working hours', 'Respect & recognition in society'];

const whatsappHref = waLink('Hi, I want to start my journey toward MDRT. Please share the next steps.');

export default function MdrtPage() {
  return (
    <div className="flex flex-col">
      <JsonLd data={breadcrumbSchema([{ name: 'MDRT', path: '/mdrt' }])} />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 ink-grid" aria-hidden />
        <div className="shell relative py-16 md:py-24">
          <Reveal className="max-w-3xl">
            <Pill tone="invert" icon={<Crown className="h-3.5 w-3.5" aria-hidden />}>
              High achievement track
            </Pill>
            <h1 className="mt-6 text-display font-semibold text-white">MDRT</h1>
            <p className="mt-5 font-headline text-h2 font-semibold text-white/90">
              Become an MDRT Achiever with Us
            </p>
            <p className="mt-4 text-lead font-semibold text-primary-300">Build a Career, Not Just Income</p>
            <p className="mt-5 max-w-prose text-lead text-white/70">
              Join a practical mentoring system for advisors who want to work toward MDRT-level performance.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href={whatsappHref}
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="h-5 w-5" aria-hidden />}
                track={{ location: 'mdrt_hero', ctaType: 'whatsapp' }}
              >
                Talk on WhatsApp
              </Button>
              <Button
                href="/apply"
                variant="onInk"
                size="lg"
                showArrow
                track={{ location: 'mdrt_hero', ctaType: 'apply' }}
              >
                Apply as Advisor
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Value props ---------- */}
      <Section tone="surface">
        <div className="shell grid gap-5 md:grid-cols-3">
          {propositions.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} index={index}>
                <article className="card card-hover h-full p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="mt-6 font-headline text-lg font-semibold text-content">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-content-muted">{item.copy}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------- Start your journey + what is MDRT ---------- */}
      <Section tone="canvas">
        <div className="shell grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full p-7 md:p-9">
              <Pill>High achievement track</Pill>
              <h2 className="mt-5 text-h3 font-semibold text-content">Start Your Journey in Life Insurance</h2>
              <p className="mt-4 text-content-muted">Are you looking for:</p>
              <ul className="mt-3 space-y-2">
                {lookingFor.map((item) => (
                  <li key={item} className="flex gap-3 text-content-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 leading-relaxed text-content-muted">
                This path may be a strong fit if you are ready to learn and work consistently.
              </p>
              <p className="mt-2 leading-relaxed text-content-muted">The focus is not only appointment.</p>
              <p className="mt-1 font-semibold text-primary">The focus is building professional advisors.</p>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="card h-full p-7 md:p-9">
              <Pill tone="gold">Global benchmark</Pill>
              <h2 className="mt-5 text-h3 font-semibold text-content">What is MDRT?</h2>
              <p className="mt-4 leading-relaxed text-content-muted">
                Million Dollar Round Table (MDRT) is the global benchmark of success in life insurance.
              </p>
              <ul className="mt-6 rule-list">
                {mdrtMeaning.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 text-content-muted">
                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" aria-hidden />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Benefits ---------- */}
      <Section tone="surface">
        <div className="shell">
          <SectionHeader eyebrow="What you gain" title="MDRT Benefits You Can Achieve" />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {mdrtBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Reveal as="li" key={benefit.label} index={index}>
                  <div className="card card-hover h-full p-6">
                    <Icon className="h-6 w-6 text-primary" aria-hidden />
                    <h3 className="mt-5 font-headline font-semibold text-content">{benefit.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-content-muted">{benefit.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* ---------- Why join + who can join ---------- */}
      <Section tone="canvas">
        <div className="shell grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full p-7 md:p-9">
              <h2 className="text-h3 font-semibold text-content">Why Join Our Team?</h2>
              <ul className="mt-6 space-y-4">
                {whyJoin.map((item) => (
                  <li key={item} className="flex gap-3 text-content-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="card h-full p-7 md:p-9">
              <h2 className="text-h3 font-semibold text-content">Who Can Join?</h2>
              <ul className="mt-6 space-y-3">
                {whoCanJoin.map((item) => (
                  <li key={item} className="flex gap-3 text-content-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-xl border border-line bg-surface-sunken p-4 text-sm font-medium text-content">
                No prior experience required — we train you
              </p>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Final CTA ---------- */}
      <Section tone="ink" texture>
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <p className="eyebrow-invert">Next step</p>
              <h2 className="mt-4 text-h2 font-semibold text-white">Take the First Step Today</h2>
              <p className="mt-4 max-w-prose text-lead text-white/70">
                Start with a clear discussion about the work, expectations, and growth path.
              </p>
              <div className="mt-8 space-y-1.5 text-white/80">
                <p>
                  <span className="text-white/50">Call / WhatsApp: </span>
                  <a href={telLink} className="font-semibold text-white hover:underline">
                    8872364673
                  </a>
                </p>
                <p>
                  <span className="text-white/50">Join Now: </span>
                  <span className="font-semibold text-white">TricityLifeInsurance</span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card-ink p-7 md:p-8">
                <h3 className="font-headline text-lg font-semibold text-white">Final Call to Action</h3>
                <ul className="mt-5 space-y-2.5 text-white/70">
                  <li>Start with the right mentor.</li>
                  <li>Build the habits behind long-term advisory growth.</li>
                  <li>Work toward MDRT with structure and review.</li>
                </ul>
                <div className="mt-7">
                  <Button
                    href={whatsappHref}
                    variant="whatsapp"
                    size="lg"
                    fullWidth
                    icon={<MessageCircle className="h-5 w-5" aria-hidden />}
                    track={{ location: 'mdrt_final_cta', ctaType: 'whatsapp' }}
                  >
                    Talk on WhatsApp
                  </Button>
                </div>
                <p className="mt-4 text-center text-xs text-white/40">
                  {site.hours} · Response within one business day
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
}
