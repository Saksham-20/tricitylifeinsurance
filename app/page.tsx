import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ArrowDown,
  BadgeCheck,
  BookOpenCheck,
  ClipboardCheck,
  Compass,
  FileText,
  HeartHandshake,
  MapPin,
  MessageCircle,
  PhoneCall,
  Quote,
  ShieldCheck,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Stat from '@/components/ui/Stat';
import Pill from '@/components/ui/Pill';
import PersonaJourney, { Persona } from '@/components/landing/PersonaJourney';
import BimaSakhiHeroSection from '@/components/landing/BimaSakhiHeroSection';
import IncomeCalculator from '@/components/landing/IncomeCalculator';
import TransformationJourney from '@/components/landing/TransformationJourney';
import FAQAccordion from '@/components/landing/FAQAccordion';
import ConversationalLeadForm from '@/components/landing/ConversationalLeadForm';
import { JsonLd, faqSchema, jobPostingSchema } from '@/components/seo/JsonLd';
import { site, telLink, waLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'LIC Agent & Bima Sakhi Recruitment in Chandigarh Tricity',
  description:
    'Join LIC as an agent or Bima Sakhi in Chandigarh, Mohali, or Panchkula. Mentor-led guidance on eligibility, documents, IRDAI training, and IC38 — plus a free income planning tool.',
  alternates: { canonical: '/' },
};

const personas: Persona[] = [
  {
    id: 'professional',
    title: 'Working Professional',
    label: 'You want a second income, but your time is limited.',
    doubt: 'I already have a job. Will I really have time for this?',
    path: 'Start with evenings, weekends, and a clear weekly activity rhythm.',
    firstStep:
      'The first discussion maps your available hours, comfort level, and realistic role fit before you commit to anything.',
    ctaMessage: 'Hi, I am a working professional and want to understand the LIC career path with part-time support.',
  },
  {
    id: 'homemaker',
    title: 'Homemaker',
    label: 'You want respectful work that fits around family life.',
    doubt: 'I have been away from formal work. Will I feel confident?',
    path: 'Begin with a supportive Bima Sakhi conversation and confidence-first guidance.',
    firstStep:
      'You get clarity on eligibility, stipend conditions, documents, and how the first month can feel manageable.',
    ctaMessage: 'Hi, I am interested in the Bima Sakhi pathway and want guidance from Subhash Panjla.',
  },
  {
    id: 'graduate',
    title: 'Fresh Graduate',
    label: 'You want skills, income, and a career direction.',
    doubt: 'I am new. What if I do not know how to talk to clients?',
    path: 'Learn the basics, prepare for IC38, and build your first conversations slowly.',
    firstStep:
      'Mentoring starts with product basics, exam preparation, and practical communication habits for beginners.',
    ctaMessage: 'Hi, I am a fresh graduate and want to explore LIC career mentorship in Chandigarh Tricity.',
  },
  {
    id: 'sales',
    title: 'Sales-Minded',
    label: 'You like people, persuasion, and performance-based growth.',
    doubt: 'Can this become a serious long-term career?',
    path: 'Use your people skills inside a structured growth and review system.',
    firstStep:
      'The first call helps you understand activity targets, client conversations, and the long-term advisor path.',
    ctaMessage: 'Hi, I have sales interest and want to understand growth as an LIC advisor.',
  },
  {
    id: 'self-employed',
    title: 'Self-Employed',
    label: 'You already know your local market and relationships.',
    doubt: 'Can I add this without disturbing my existing work?',
    path: 'Turn your network into a disciplined advisory opportunity.',
    firstStep:
      'You can discuss how LIC advisory fits around your current business, city network, and weekly schedule.',
    ctaMessage: 'Hi, I am self-employed and want to explore LIC advisory as an additional income path.',
  },
];

const howItWorksSteps = [
  {
    title: 'Discuss fit',
    copy: 'A short WhatsApp or call to understand your background, available time, and preferred path.',
    icon: MessageCircle,
  },
  {
    title: 'Check eligibility',
    copy: 'LIC agent path starts at 18+ and 10th pass+. Bima Sakhi is women-only, 18-70, 10th pass+.',
    icon: ShieldCheck,
  },
  {
    title: 'Prepare documents',
    copy: 'Get practical clarity on education proof, PAN, address proof, photos, and bank details as advised.',
    icon: FileText,
  },
  {
    title: 'Training + IC38',
    copy: 'Move through 25 hours of life insurance pre-recruitment training and exam preparation.',
    icon: BookOpenCheck,
  },
  {
    title: 'Guided launch',
    copy: 'Start with field confidence, weekly review, and simple activity habits instead of solo guessing.',
    icon: Compass,
  },
];

const trustPoints = [
  { title: 'Local mentor', copy: 'Guidance for Chandigarh, Mohali, and Panchkula.', icon: MapPin },
  { title: 'Clear eligibility', copy: 'Role fit explained before paperwork.', icon: ClipboardCheck },
  { title: 'Exam guidance', copy: 'Support for IC38 preparation and onboarding.', icon: BookOpenCheck },
  { title: 'WhatsApp support', copy: 'Start with the channel that feels easiest.', icon: MessageCircle },
  { title: 'Privacy-first form', copy: 'Your details are used only for recruitment guidance.', icon: ShieldCheck },
  { title: 'Comfortable first discussion', copy: 'Understand the role first, then decide at your pace.', icon: HeartHandshake },
];

const faqs = [
  {
    q: 'Can I start part-time while working?',
    a: 'Yes. Many candidates begin with evenings or weekends. The first discussion should clarify your available time and a realistic activity rhythm.',
  },
  {
    q: 'Is income fixed or variable?',
    a: 'LIC agent income is performance-linked. Bima Sakhi stipend support is available for three years subject to LIC norms and performance conditions.',
  },
  {
    q: 'Do I need prior insurance experience?',
    a: 'No. The path includes training, IC38 preparation, product basics, and practical guidance for client conversations.',
  },
  {
    q: 'Who can apply for Bima Sakhi?',
    a: 'As per LIC guidance, Bima Sakhi is a women-only path for candidates aged 18 to 70 with 10th pass or higher qualification, subject to LIC conditions.',
  },
  {
    q: 'What documents are usually needed?',
    a: 'Typical documents include education proof, PAN, address proof, passport-size photos, and bank details. The exact checklist is shared during onboarding.',
  },
  {
    q: 'How soon will someone contact me?',
    a: 'Most submitted profiles are reviewed within one business day. You can also continue immediately on WhatsApp.',
  },
];

const testimonials = [
  {
    quote: 'I did not need pressure. I needed someone to tell me what to do next.',
    name: 'R. K.',
    role: 'Part-time Advisor, Mohali',
    detail: 'Started with limited hours and used weekly reviews to build confidence in client conversations.',
  },
  {
    quote: 'The Bima Sakhi path felt respectful because everything was explained simply.',
    name: 'S. D.',
    role: 'Bima Sakhi Advisor, Panchkula',
  },
  {
    quote: 'I knew the exam, documents, and first activity plan before I started.',
    name: 'A. V.',
    role: 'LIC Agent, Chandigarh',
  },
];

const heroStats = [
  { value: 'Since 1997', label: 'LIC journey' },
  { value: '300+', label: 'Advisors guided' },
  { value: 'Tricity', label: 'Local support' },
];

const mentorStats = [
  { value: '28+', label: 'Years of mentoring experience' },
  { value: '300+', label: 'Advisors guided' },
  { value: '60+', label: 'Active team network' },
];

const whatsappHref = waLink(
  'Hi, I want to discuss LIC career opportunities in Chandigarh Tricity with Subhash Panjla.'
);

export default function Home() {
  const whatsappNumber = site.whatsapp;

  return (
    <div className="flex flex-col">
      <JsonLd
        data={[
          faqSchema(faqs),
          jobPostingSchema({
            title: 'LIC Agent (Insurance Advisor) — Chandigarh Tricity',
            description:
              'Performance-linked insurance advisory role with mentor-led onboarding, IRDAI pre-recruitment training, and IC38 certification support. Part-time or full-time.',
            path: '/career-in-lic',
            employmentType: 'CONTRACTOR',
            educationRequirement: '10th pass or above, minimum age 18.',
          }),
          jobPostingSchema({
            title: 'Bima Sakhi — Women-only LIC Advisory Programme',
            description:
              'Three-year structured programme for women aged 18-70 with stipend support, training, and certification, subject to LIC rules.',
            path: '/bima-sakhi',
            employmentType: 'PART_TIME',
            educationRequirement: '10th pass or above, women aged 18-70.',
          }),
        ]}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 ink-grid" aria-hidden />
        <div className="pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-primary/25 blur-[120px]" aria-hidden />
        <div className="shell relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
          <Reveal className="order-2 lg:order-1">
            <Pill tone="invert" icon={<BadgeCheck className="h-3.5 w-3.5" aria-hidden />}>
              LIC Career Mentor · Chandigarh Tricity
            </Pill>
            <h1 className="mt-6 text-display font-semibold text-white">
              <span className="lg:hidden">Not sure where your LIC path starts?</span>
              <span className="hidden lg:inline">A career feels easier when someone walks the first steps with you.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lead text-white/70">
              <span className="lg:hidden">Pick the situation closest to you, then see the first step without pressure.</span>
              <span className="hidden lg:inline">
                Become an LIC advisor or Bima Sakhi in Chandigarh Tricity with clear guidance from Subhash Panjla.
              </span>
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href={whatsappHref}
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="h-5 w-5" aria-hidden />}
                track={{ location: 'home_hero', ctaType: 'whatsapp' }}
              >
                Start with WhatsApp
              </Button>
              <Button
                href="#journey"
                variant="onInk"
                size="lg"
                showArrow
                track={{ location: 'home_hero', ctaType: 'journey' }}
              >
                Find my starting point
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {heroStats.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} invert />
              ))}
            </dl>

            <a
              href="#journey"
              className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-white/60 transition-colors hover:text-white lg:hidden"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20">
                <ArrowDown className="h-4 w-4" aria-hidden />
              </span>
              Job · home · college · business
            </a>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <figure className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/12 shadow-xl lg:ml-auto lg:max-w-[30rem]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/home/hero-mentor-portrait.jpg"
                  alt="Subhash Panjla, LIC career mentor"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 88vw, 30rem"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" aria-hidden />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-eyebrow font-semibold uppercase text-primary-300">{site.mentor}</p>
                <p className="mt-2 font-headline text-lg font-semibold text-white">Mentor-led LIC career guidance</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------- Credibility strip ---------- */}
      <Section tone="surface" tight as="div">
        <div className="shell">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BadgeCheck, text: 'LIC Development Officer led' },
              { icon: BookOpenCheck, text: 'IRDAI training & IC38 support' },
              { icon: MapPin, text: 'Chandigarh · Mohali · Panchkula' },
              { icon: ShieldCheck, text: 'Response within one business day' },
            ].map(({ icon: Icon, text }, index) => (
              <Reveal as="li" key={text} index={index} className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-medium text-content">{text}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- The quiet truth ---------- */}
      <Section tone="tint" texture>
        <div className="shell-narrow text-center">
          <Reveal>
            <p className="eyebrow">The quiet truth</p>
            <p className="mt-6 font-headline text-h1 font-semibold text-content">
              You are not confused because you are weak.
            </p>
            <p className="mt-5 font-headline text-h3 font-medium text-content-muted">
              You are confused because no one has explained the path simply.
            </p>
            <p className="mx-auto mt-8 max-w-prose text-lead text-content-muted">
              Income, exams, documents, clients, confidence — most people simply need the path explained in the right
              order.
            </p>
          </Reveal>
        </div>
      </Section>

      <PersonaJourney personas={personas} whatsappNumber={whatsappNumber} />

      {/* ---------- Mentor authority ---------- */}
      <Section tone="canvas">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <figure className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[5/4]">
                <Image
                  src="/images/about/about-leadership-team-celebration.jpg"
                  alt="Subhash Panjla with LIC career team members"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 44vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" aria-hidden />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-eyebrow font-semibold uppercase text-primary-300">Mentor note</p>
                <p className="mt-3 font-headline text-h3 font-semibold text-white">
                  The first win is not a sale. The first win is knowing what to do next.
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeader
              eyebrow="Mentor authority"
              title="Meet the mentor behind the system."
              description="Subhash Panjla has guided advisors across Chandigarh, Mohali, and Panchkula with practical onboarding, field confidence, and steady review."
            />
            <Reveal delay={0.08}>
              <dl className="mt-10 grid gap-8 sm:grid-cols-3">
                {mentorStats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-primary-200 pl-5">
                    <Stat value={stat.value} label={stat.label} />
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <Button href="/about" variant="secondary" showArrow track={{ location: 'home_mentor', ctaType: 'about' }}>
                  More about the mentor
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- How it works ---------- */}
      <Section tone="surface">
        <div className="shell">
          <SectionHeader
            eyebrow="How it works"
            title="A clear path, not a vague promise."
            description="Each step is meant to remove uncertainty before asking you to move forward."
          />

          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal as="li" key={step.title} index={index}>
                  <div className="card card-hover h-full p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="font-headline text-2xl font-semibold text-line-strong tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-6 font-headline text-lg font-semibold text-content">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-content-muted">{step.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-4xl rounded-2xl border border-line bg-surface-sunken p-5 text-sm leading-relaxed text-content-muted">
              <strong className="font-semibold text-content">Official context:</strong> LIC agent appointment includes
              eligibility checks and pre-recruitment training. Bima Sakhi stipend and eligibility are subject to LIC
              rules and performance norms.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Mobile visitors see the Bima Sakhi track first; desktop keeps it in narrative order. */}
      <div className="order-first lg:order-none">
        <BimaSakhiHeroSection />
      </div>

      <IncomeCalculator />

      <TransformationJourney />

      {/* ---------- Testimonials ---------- */}
      <Section tone="surface">
        <div className="shell">
          <SectionHeader
            eyebrow="Stories"
            title="What changes when guidance is present?"
            aside={
              <p className="text-sm leading-relaxed text-content-muted">
                Names are partially anonymized for privacy. Individual results vary by activity, consistency,
                compliance, and suitability.
              </p>
            }
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-ink p-8 text-white md:p-10">
                <div className="pointer-events-none absolute inset-0 ink-grid" aria-hidden />
                <div className="relative">
                  <Quote className="h-9 w-9 text-primary-300" aria-hidden />
                  <blockquote className="mt-8 max-w-2xl font-headline text-h2 font-semibold leading-tight text-white">
                    “{testimonials[0].quote}”
                  </blockquote>
                </div>
                <footer className="relative mt-12 border-t border-white/10 pt-7">
                  <p className="font-headline text-lg font-semibold text-white">{testimonials[0].name}</p>
                  <p className="mt-1 text-sm text-white/55">{testimonials[0].role}</p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">{testimonials[0].detail}</p>
                </footer>
              </article>
            </Reveal>

            <div className="grid gap-5">
              {testimonials.slice(1).map((item, index) => (
                <Reveal key={item.quote} index={index + 1}>
                  <article className="card h-full p-7 md:p-8">
                    <Quote className="h-6 w-6 text-primary" aria-hidden />
                    <blockquote className="mt-5 font-headline text-h3 font-semibold text-content">
                      “{item.quote}”
                    </blockquote>
                    <footer className="mt-7 border-t border-line pt-5">
                      <p className="font-semibold text-content">{item.name}</p>
                      <p className="mt-0.5 text-sm text-content-muted">{item.role}</p>
                    </footer>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- Trust points ---------- */}
      <Section tone="canvas">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          <SectionHeader
            eyebrow="Trust"
            title="Simple reasons people feel comfortable starting here."
          />
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {trustPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <Reveal as="li" key={point.title} index={index} className="flex gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-headline font-semibold text-content">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-content-muted">{point.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section tone="surface" id="faq">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader
            eyebrow="Questions"
            title="Clear answers before you decide."
            description="The first conversation is for clarity. These answers help you arrive with less doubt."
          />
          <Reveal delay={0.05}>
            <FAQAccordion items={faqs} />
          </Reveal>
        </div>
      </Section>

      {/* ---------- Final CTA ---------- */}
      <Section tone="ink" texture>
        <div className="shell-narrow text-center">
          <Reveal>
            <p className="eyebrow-invert justify-center">Next step</p>
            <h2 className="mt-5 text-h1 font-semibold text-white">You do not have to decide everything today.</h2>
            <p className="mx-auto mt-5 max-w-prose text-lead text-white/70">Just start the conversation.</p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                href={whatsappHref}
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="h-5 w-5" aria-hidden />}
                track={{ location: 'final_cta', ctaType: 'whatsapp' }}
              >
                WhatsApp Subhash Panjla
              </Button>
              <Button
                href="#application-form"
                variant="onInkSolid"
                size="lg"
                showArrow
                track={{ location: 'final_cta', ctaType: 'apply' }}
              >
                Apply for a callback
              </Button>
            </div>
            <a
              href={telLink}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-colors hover:text-white"
            >
              <PhoneCall className="h-4 w-4" aria-hidden />
              Or call {site.phoneDisplay}
            </a>
          </Reveal>
        </div>
      </Section>

      <ConversationalLeadForm whatsappNumber={whatsappNumber} />
    </div>
  );
}
