import type { Metadata } from 'next';
import { Award, CheckCircle2, Crown, TrendingUp } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Pill from '@/components/ui/Pill';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Career in LIC — Agent Job, Income, Benefits & Growth Path',
  description:
    'What an LIC agent career actually involves in Chandigarh Tricity: the work, honest challenges, skills that matter, club-level earnings, the full benefits package, and the growth path to Development Officer.',
  alternates: { canonical: '/career-in-lic' },
  openGraph: { url: '/career-in-lic', title: 'Career in LIC — Agent Job, Income, Benefits & Growth Path' },
};

const achievementMilestones = [
  {
    tier: 'Starting Out',
    role: 'LIC Agent / Bima Sakhi',
    earnings: 'Variable + stipend where eligible',
    benefits: ['Training & mentorship', 'IRDAI certification', 'Solo clients'],
    icon: TrendingUp,
  },
  {
    tier: 'Distinguished Club',
    role: 'Agent - Level 1',
    earnings: 'Rs50K-Rs75K/month',
    benefits: ['Bonus incentives', 'Office allowance', 'Recognition awards'],
    icon: Award,
  },
  {
    tier: 'Branch Manager Club',
    role: 'Agent - Level 2',
    earnings: 'Rs75K-Rs1.25L/month',
    benefits: ['Housing loan @5.5%', 'Foreign tours', 'Team building support'],
    icon: Award,
  },
  {
    tier: 'Zonal Manager Club',
    role: 'Agent - Level 3+',
    earnings: 'Rs1.25L-Rs2L+/month',
    benefits: ['Higher-tier benefits', 'Renewal income potential', 'Leadership roles'],
    icon: Crown,
  },
];

const completeBenefits = [
  'Commission plus performance bonus where applicable',
  'Housing Loan @5.5% interest rate',
  'Festival Advance (additional funds during festivals)',
  'Mediclaim Insurance coverage',
  'Group Insurance protection',
  'Interest-free Two Wheeler / Car Advance',
  'Office Allowance support',
  'Renewal and continuity benefits as per rules',
  'Recognition & awards for achievers',
  'Gratuity benefits',
  'Ongoing mentorship and review support',
];

const roleCards = [
  {
    title: 'What the job involves',
    body: (
      <p className="mt-4 leading-relaxed text-content-muted">
        You sell life insurance policies, help clients choose plans, and earn commission on every policy. Over time, you
        build a client base that gives you recurring income through renewals.
      </p>
    ),
  },
  {
    title: 'Why people choose it',
    body: (
      <ul className="mt-4 space-y-2.5">
        {[
          'Low entry barrier: 10th/12th pass candidates can begin.',
          'Flexible schedule: You decide your working hours.',
          'Performance-linked income: Results depend on consistent, suitable advisory work.',
          'No investment needed: LIC provides training and support.',
        ].map((item) => (
          <li key={item} className="flex gap-3 text-content-muted">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Challenges (don't ignore these)",
    body: (
      <ul className="mt-4 space-y-2.5">
        {[
          'Income is unstable at first: First 6-12 months can be slow.',
          'Sales responsibility: You need to explain plans clearly and handle questions professionally.',
          'Rejection is common: in sales, consistency matters.',
          'Self-discipline required: No boss means no one pushing you daily.',
        ].map((item) => (
          <li key={item} className="flex gap-3 text-content-muted">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Skills that matter',
    body: (
      <ul className="mt-4 space-y-2.5">
        {[
          'Communication and persuasion',
          'Basic financial understanding',
          'Networking (friends, family, referrals, social channels)',
          'Consistency and patience',
        ].map((item) => (
          <li key={item} className="flex gap-3 text-content-muted">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export default function CareerInLicPage() {
  return (
    <div className="flex flex-col">
      <JsonLd data={breadcrumbSchema([{ name: 'Career in LIC', path: '/career-in-lic' }])} />

      {/* ---------- Hero ---------- */}
      <Section tone="tint" texture>
        <div className="shell">
          <Reveal className="max-w-4xl">
            <p className="eyebrow">Career &amp; training</p>
            <h1 className="mt-4 text-h1 font-semibold text-content">Career in LIC</h1>
            <p className="mt-6 max-w-prose text-lead text-content-muted">
              A career as an LIC agent can be a strong option if you are comfortable with people interaction, advisory
              selling, and independent work discipline. This is not a fixed-salary desk role; it is a performance-based
              professional pathway.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Pill>Independent Career</Pill>
              <Pill>Training for IRDAI Exam</Pill>
              <Pill>Long-Term Renewals</Pill>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Honest overview ---------- */}
      <Section tone="surface">
        <div className="shell grid gap-5 md:grid-cols-2">
          {roleCards.map((card, index) => (
            <Reveal key={card.title} index={index}>
              <article className="card card-hover h-full p-7 md:p-8">
                <h2 className="text-h3 font-semibold text-content">{card.title}</h2>
                {card.body}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Progression ---------- */}
      <Section tone="ink" texture>
        <div className="shell">
          <SectionHeader
            eyebrow="Growth opportunity"
            title="What progress can look like"
            description="Start as an agent and grow based on performance. The structure is designed to help you build momentum instead of figuring everything out alone."
            invert
          />

          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {achievementMilestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <Reveal as="li" key={milestone.tier} index={index}>
                  <article className="card-ink flex h-full flex-col p-6">
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-primary-300">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/60">
                        Level {index + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-headline text-lg font-semibold text-white">{milestone.tier}</h3>
                    <p className="mt-1 text-sm text-white/55">{milestone.role}</p>
                    <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.05] p-4">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary-300">
                        Typical monthly earnings
                      </p>
                      <p className="mt-2 font-headline text-lg font-semibold text-white">{milestone.earnings}</p>
                    </div>
                    <ul className="mt-5 space-y-2 text-sm text-white/70">
                      {milestone.benefits.map((benefit) => (
                        <li key={benefit} className="flex gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-300" aria-hidden />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* ---------- Benefits package ---------- */}
      <Section tone="canvas">
        <div className="shell">
          <SectionHeader
            eyebrow="Support provisions"
            title="Complete benefits package"
            description="Benefits can vary by performance tier and company policy. This structure highlights common long-term support provisions."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completeBenefits.map((benefit, index) => (
              <Reveal as="li" key={benefit} index={index}>
                <div className="card card-hover flex h-full gap-3 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                  <span className="text-sm leading-relaxed text-content-muted">{benefit}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Growth path + fit ---------- */}
      <Section tone="surface">
        <div className="shell grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="card h-full p-7 md:p-8">
              <h2 className="text-h3 font-semibold text-content">Growth path</h2>
              <p className="mt-4 leading-relaxed text-content-muted">If you perform well, you can:</p>
              <ul className="mt-3 space-y-2.5">
                {[
                  'Become a Development Officer (after 4/5 years experience)',
                  'Qualify for bonuses, recognition, and travel benefits as per performance rules',
                  'Build long-term renewal income through sustained client service',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-content-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="card h-full p-7 md:p-8">
              <h2 className="text-h3 font-semibold text-content">Who it suits best</h2>
              <ul className="mt-4 space-y-2.5">
                {[
                  'People who like meeting others and talking',
                  'Those okay with variable income',
                  'Individuals who want side income or entrepreneurship',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-content-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-7 font-headline text-lg font-semibold text-content">Reality check</h3>
              <p className="mt-3 leading-relaxed text-content-muted">
                If you expect quick results without consistent effort, this may not be the right fit. If you commit to
                structured activity and learning, it can become a stable long-term career.
              </p>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* ---------- CTA ---------- */}
      <Section tone="canvas">
        <div className="shell">
          <div className="overflow-hidden rounded-3xl bg-primary p-8 text-white md:p-12">
            <Reveal>
              <h2 className="text-h2 font-semibold text-white">Want a personalized career breakdown?</h2>
              <p className="mt-4 max-w-prose text-lead text-white/80">
                Get a practical discussion on joining steps, training expectations, and role suitability for your
                background.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="/apply"
                  variant="onInkSolid"
                  showArrow
                  track={{ location: 'career_cta', ctaType: 'apply' }}
                >
                  Apply for callback
                </Button>
                <Button href="/mdrt" variant="onInk" showArrow track={{ location: 'career_cta', ctaType: 'mdrt' }}>
                  Explore MDRT page
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
}
