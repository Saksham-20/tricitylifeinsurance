import Image from 'next/image';
import type { Metadata } from 'next';
import { CheckCircle2, MessageCircle, PhoneCall, Sparkles } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Pill from '@/components/ui/Pill';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { site, telLink, waLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Bima Sakhi Yojana in Chandigarh Tricity — Eligibility & Stipend',
  description:
    'Bima Sakhi is a women-only LIC programme: ₹7,000/month stipend support in year 1, three years of structured training, and flexible hours. Check eligibility and apply in Chandigarh, Mohali, or Panchkula.',
  alternates: { canonical: '/bima-sakhi' },
  openGraph: { url: '/bima-sakhi', title: 'Bima Sakhi Yojana in Chandigarh Tricity — Eligibility & Stipend' },
};

const benefits = [
  'Flexible schedule with part-time and full-time options',
  'Structured training and practical business guidance',
  'Independent earnings with long-term growth potential',
  'Supportive guidance for women starting or restarting work',
];

const compensationBreakdown = [
  { year: '1st Year', amount: '₹7,000/month', description: 'Stipend support + commission + bonus, subject to LIC rules' },
  { year: '2nd Year', amount: '₹6,000/month', description: 'Stipend support + commission + bonus, subject to LIC rules' },
  { year: '3rd Year', amount: '₹5,000/month', description: 'Stipend support + commission + bonus, subject to LIC rules' },
  { year: 'Year 4+', amount: 'Commission-based', description: 'Transition to full agent commission model' },
];

const eligibilityDetails = [
  'Minimum 10th Pass education or above',
  'Homemakers exploring independent income',
  'Private employees wanting additional income',
  'Marketing professionals with sales experience',
  'College students seeking practical work experience',
  'Self-employed individuals diversifying income',
];

const programRequirements = [
  {
    title: 'Policy Coverage Target',
    copy: 'Complete and cover minimum 24+ lives (policies) during the 3-year program to ensure quality and client relationships.',
  },
  {
    title: 'Commission Milestone',
    copy: 'Achieve minimum ₹48,000 in commission per calendar year to unlock full benefits and career advancement path.',
  },
  {
    title: 'Training & Certification',
    copy: 'Attend the required IRDAI-approved training and complete certification steps before advisory work begins.',
  },
  {
    title: 'Program Duration',
    copy: 'A 3-year structured program with stipend support. After completion, eligible candidates may continue on the full agent model.',
  },
];

const photosRecognitionGallery = [
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-01.jpg', alt: 'Professional recognition moment' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-02.jpg', alt: 'Individual achievement recognition' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-03.jpg', alt: 'Community recognition celebration' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-05.jpg', alt: 'LIC celebration event with team members' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-06.jpg', alt: 'Individual achievement award presentation' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-07.jpg', alt: 'Recognition moment with team' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-08.jpg', alt: 'Achievement award ceremony' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-09.jpg', alt: 'Success milestone celebration' },
];

const whatsappHref = waLink('Hi, I want details about the Bima Sakhi opportunity.');

export default function BimaSakhiPage() {
  return (
    <div className="flex flex-col">
      <JsonLd data={breadcrumbSchema([{ name: 'Bima Sakhi', path: '/bima-sakhi' }])} />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 ink-grid" aria-hidden />
        <div className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-gold-500/15 blur-[120px]" aria-hidden />
        <div className="shell relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal>
            <Pill tone="invert" icon={<Sparkles className="h-3.5 w-3.5" aria-hidden />}>
              Bima Sakhi – Tricity
            </Pill>
            <h1 className="mt-6 text-h1 font-semibold text-white">
              Build a respectful, flexible income path with Bima Sakhi.
            </h1>
            <p className="mt-5 max-w-prose text-lead text-white/70">
              Designed for women in Chandigarh Tricity who want clarity, support, and a steady introduction to LIC
              advisory work.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href={whatsappHref}
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="h-5 w-5" aria-hidden />}
                track={{ location: 'bima_hero', ctaType: 'whatsapp' }}
              >
                Talk on WhatsApp
              </Button>
              <Button
                href="/apply"
                variant="onInk"
                size="lg"
                showArrow
                track={{ location: 'bima_hero', ctaType: 'apply' }}
              >
                Apply for Bima Sakhi
              </Button>
            </div>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm text-white/55">
              Mentor support led by {site.mentor} · 28+ years LIC experience · Women career specialist
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/12 shadow-xl">
              <Image
                src="/images/bima-sakhi/bima-sakhi-photos-recognition-14.png"
                alt="Women-focused training and seminar session"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Why choose ---------- */}
      <Section tone="surface">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <SectionHeader
            eyebrow="Women-focused opportunity"
            title="Why choose the Bima Sakhi program"
            description="Typical progression: Application → Training → Certification → Advisory Launch."
          />
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item, index) => (
                <Reveal as="li" key={item} index={index}>
                  <div className="card flex h-full gap-3 p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" aria-hidden />
                    <span className="text-sm leading-relaxed text-content-muted">{item}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------- Compensation ---------- */}
      <Section tone="gold">
        <div className="shell">
          <SectionHeader
            eyebrow="Compensation"
            title="Program Compensation &amp; Support"
            description="Receive stipend support for three years, along with commission and bonus opportunities, subject to LIC rules and performance conditions."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {compensationBreakdown.map((item, index) => (
              <Reveal as="li" key={item.year} index={index}>
                <div className="card h-full border-gold-200 p-6">
                  <p className="text-eyebrow font-semibold uppercase text-gold-700">{item.year}</p>
                  <p className="mt-3 font-headline text-2xl font-semibold text-content">{item.amount}</p>
                  <p className="mt-3 text-sm leading-relaxed text-content-muted">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.1}>
            <p className="mt-8 rounded-2xl border border-gold-200 bg-surface p-5 text-sm leading-relaxed text-content">
              <span className="font-semibold">Key point: </span>
              Income potential can grow with consistent activity and policy quality. Actual earnings vary by
              performance.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Eligibility ---------- */}
      <Section tone="surface">
        <div className="shell">
          <SectionHeader
            eyebrow="Eligibility"
            title="Who Can Apply?"
            description="The Bima Sakhi program is designed for women who want flexible work, practical guidance, and a respectful way to explore LIC advisory."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eligibilityDetails.map((item, index) => (
              <Reveal as="li" key={item} index={index}>
                <div className="card card-hover flex h-full gap-3 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                  <span className="text-sm leading-relaxed text-content-muted">{item}</span>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <p className="mt-8 rounded-2xl border border-primary-100 bg-primary-50 p-5 text-sm leading-relaxed text-primary-900">
              <span className="font-semibold">Minimum requirement: </span>
              Education: 10th pass or above. A willingness to learn and follow the process matters just as much.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Requirements & timeline ---------- */}
      <Section tone="canvas">
        <div className="shell">
          <SectionHeader
            eyebrow="Milestones"
            title="Program Requirements &amp; Timeline"
            description="To succeed in the Bima Sakhi program and transition to a full career, meet these key milestones."
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {programRequirements.map((item, index) => (
              <Reveal as="li" key={item.title} index={index}>
                <div className="card card-hover flex h-full gap-5 p-6 md:p-7">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white tabular-nums">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-headline text-lg font-semibold text-content">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-content-muted">{item.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------- Apply CTA ---------- */}
      <Section tone="surface">
        <div className="shell">
          <div className="rounded-3xl border border-gold-200 bg-gold-50 p-8 md:p-12">
            <SectionHeader
              title="Take the first step with confidence."
              description="Share your details and receive a clear onboarding discussion tailored to your schedule and goals. The first step is simply to understand your fit."
            />
            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/apply" showArrow track={{ location: 'bima_cta', ctaType: 'apply' }}>
                  Apply as Bima Sakhi
                </Button>
                <Button
                  href={whatsappHref}
                  variant="secondary"
                  icon={<MessageCircle className="h-4 w-4" aria-hidden />}
                  track={{ location: 'bima_cta', ctaType: 'whatsapp' }}
                >
                  Ask on WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- Gallery ---------- */}
      <Section tone="canvas">
        <div className="shell">
          <SectionHeader
            eyebrow="Photos &amp; recognition"
            title="Photos &amp; Recognition"
            description="Meet our community members as they reach milestones and celebrate their achievements in the Bima Sakhi program."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {photosRecognitionGallery.map((photo, index) => (
              <Reveal as="li" key={photo.src} index={index}>
                <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={700}
                    height={520}
                    loading="lazy"
                    className="h-44 w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.04] motion-reduce:transform-none md:h-52"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <p className="mt-8 rounded-2xl border border-gold-200 bg-gold-50 p-5 text-sm leading-relaxed text-content">
              <span className="font-semibold">Real success stories: </span>
              These are real event moments from our network. Individual outcomes vary based on activity, consistency,
              and policy quality.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Direct guidance ---------- */}
      <Section tone="ink" texture>
        <div className="shell">
          <Reveal className="max-w-2xl">
            <h2 className="text-h2 font-semibold text-white">Need direct guidance before applying?</h2>
            <p className="mt-4 text-lead text-white/70">
              Talk to our team and understand eligibility, timing, and how to begin comfortably.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={whatsappHref}
                variant="whatsapp"
                icon={<MessageCircle className="h-4 w-4" aria-hidden />}
                track={{ location: 'bima_support', ctaType: 'whatsapp' }}
              >
                Talk on WhatsApp
              </Button>
              <Button
                href={telLink}
                variant="onInk"
                icon={<PhoneCall className="h-4 w-4" aria-hidden />}
                track={{ location: 'bima_support', ctaType: 'call' }}
              >
                Call support
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
