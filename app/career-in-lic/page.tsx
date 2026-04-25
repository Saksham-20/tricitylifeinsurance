import Link from 'next/link';
import { ArrowRight, Award, Crown, TrendingUp, CheckCircle2 } from 'lucide-react';
import PulseDot from '@/components/ui/PulseDot';

const achievementMilestones = [
  {
    tier: 'Starting Out',
    role: 'LIC Agent / Bima Sakhi',
    earnings: 'Variable + stipend where eligible',
    benefits: ['Training & mentorship', 'IRDAI certification', 'Solo clients'],
    color: 'from-blue-500 to-indigo-500',
    bgLight: 'bg-blue-50',
    icon: TrendingUp,
  },
  {
    tier: 'Distinguished Club',
    role: 'Agent - Level 1',
    earnings: 'Rs50K-Rs75K/month',
    benefits: ['Bonus incentives', 'Office allowance', 'Recognition awards'],
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50',
    icon: Award,
  },
  {
    tier: 'Branch Manager Club',
    role: 'Agent - Level 2',
    earnings: 'Rs75K-Rs1.25L/month',
    benefits: ['Housing loan @5.5%', 'Foreign tours', 'Team building support'],
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50',
    icon: Award,
  },
  {
    tier: 'Zonal Manager Club',
    role: 'Agent - Level 3+',
    earnings: 'Rs1.25L-Rs2L+/month',
    benefits: ['Higher-tier benefits', 'Renewal income potential', 'Leadership roles'],
    color: 'from-slate-700 to-slate-900',
    bgLight: 'bg-slate-50',
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

export default function CareerInLicPage() {
  return (
    <main className="pb-28 lg:pb-0">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-primary/15 bg-gradient-to-br from-[#f6fbff] to-white p-8 shadow-[0_24px_65px_rgba(15,24,41,0.08)] md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Career & Training</p>
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
            Career in LIC
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            A career as an LIC agent can be a strong option if you are comfortable with people interaction, advisory selling, and independent work discipline. This is not a fixed-salary desk role; it is a performance-based professional pathway.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Independent Career</span>
            <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Training for IRDAI Exam</span>
            <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Long-Term Renewals</span>
          </div>
        </div>
      </section>

      <section className="mt-10 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-outline-variant/30 bg-white p-6 shadow-elevation-1 transition-all duration-200 hover:scale-[1.01]">
            <h2 className="font-headline text-2xl font-bold text-on-surface">What the job involves</h2>
            <p className="mt-3 leading-relaxed text-on-surface-variant">
              You sell life insurance policies, help clients choose plans, and earn commission on every policy. Over time, you build a client base that gives you recurring income through renewals.
            </p>
          </article>
          <article className="rounded-3xl border border-outline-variant/30 bg-white p-6 shadow-elevation-1 transition-all duration-200 hover:scale-[1.01]">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Why people choose it</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed text-on-surface-variant">
              <li>Low entry barrier: 10th/12th pass candidates can begin.</li>
              <li>Flexible schedule: You decide your working hours.</li>
              <li>Performance-linked income: Results depend on consistent, suitable advisory work.</li>
              <li>No investment needed: LIC provides training and support.</li>
            </ul>
          </article>
          <article className="rounded-3xl border border-outline-variant/30 bg-white p-6 shadow-elevation-1 transition-all duration-200 hover:scale-[1.01]">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Challenges (don&apos;t ignore these)</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed text-on-surface-variant">
              <li>Income is unstable at first: First 6-12 months can be slow.</li>
              <li>Sales responsibility: You need to explain plans clearly and handle questions professionally.</li>
              <li>Rejection is common: in sales, consistency matters.</li>
              <li>Self-discipline required: No boss means no one pushing you daily.</li>
            </ul>
          </article>
          <article className="rounded-3xl border border-outline-variant/30 bg-white p-6 shadow-elevation-1 transition-all duration-200 hover:scale-[1.01]">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Skills that matter</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed text-on-surface-variant">
              <li>Communication and persuasion</li>
              <li>Basic financial understanding</li>
              <li>Networking (friends, family, referrals, social channels)</li>
              <li>Consistency and patience</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="mt-10 px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-blue-200/60 bg-gradient-to-br from-blue-50 to-indigo-50 p-7 md:p-10">
          <div className="flex items-center gap-2">
            <PulseDot />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Growth Opportunity</p>
          </div>
          <h2 className="mt-3 font-headline text-3xl font-bold text-on-surface">What progress can look like</h2>
          <p className="mt-3 max-w-3xl text-on-surface-variant">
            Start as an agent and grow based on performance. The structure is designed to help you build momentum instead of figuring everything out alone.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {achievementMilestones.map((milestone, idx) => {
              const IconComponent = milestone.icon;
              return (
                <article key={milestone.tier} className={`rounded-3xl border border-white/70 ${milestone.bgLight} p-5 shadow-[0_16px_34px_rgba(15,24,41,0.06)] transition-all duration-200 hover:scale-[1.01]`}>
                  <div className="mb-4 flex items-start justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${milestone.color} text-white`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface">
                      Level {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-surface">{milestone.tier}</h3>
                  <p className="mt-1 text-sm font-semibold text-on-surface-variant">{milestone.role}</p>
                  <div className="mt-4 rounded-2xl border border-white/75 bg-white/80 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/90">Typical Monthly Earnings</p>
                    <p className="mt-1.5 font-headline text-xl font-bold text-on-surface">{milestone.earnings}</p>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-on-surface-variant">
                    {milestone.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-10 px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] border border-purple-200/50 bg-gradient-to-br from-purple-50 to-white p-7 md:p-10">
          <h2 className="font-headline text-3xl font-bold text-on-surface">Complete benefits package</h2>
          <p className="mt-3 max-w-2xl text-on-surface-variant">
            Benefits can vary by performance tier and company policy. This structure highlights common long-term support provisions.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {completeBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-xl border border-purple-100 bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-purple-600" />
                <span className="text-sm text-on-surface-variant">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-outline-variant/30 bg-white p-6 shadow-elevation-1">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Growth path</h2>
            <p className="mt-3 leading-relaxed text-on-surface-variant">If you perform well, you can:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-on-surface-variant">
              <li>Become a Development Officer (after 4/5 years experience)</li>
              <li>Qualify for bonuses, recognition, and travel benefits as per performance rules</li>
              <li>Build long-term renewal income through sustained client service</li>
            </ul>
          </article>
          <article className="rounded-3xl border border-outline-variant/30 bg-white p-6 shadow-elevation-1">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Who it suits best</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed text-on-surface-variant">
              <li>People who like meeting others and talking</li>
              <li>Those okay with variable income</li>
              <li>Individuals who want side income or entrepreneurship</li>
            </ul>
            <h3 className="mt-5 font-headline text-xl font-bold text-on-surface">Reality check</h3>
            <p className="mt-2 leading-relaxed text-on-surface-variant">
              If you expect quick results without consistent effort, this may not be the right fit. If you commit to structured activity and learning, it can become a stable long-term career.
            </p>
          </article>
        </div>
      </section>

      <section className="mt-10 px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-r from-primary to-primary-dim p-8 md:p-12">
          <h2 className="font-headline text-3xl font-extrabold text-white md:text-4xl">Want a personalized career breakdown?</h2>
          <p className="mt-3 max-w-3xl text-white/80">
            Get a practical discussion on joining steps, training expectations, and role suitability for your background.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/apply" className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3 font-headline text-sm font-bold text-primary">
              Apply for Callback
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/mdrt" className="inline-flex items-center gap-2 rounded-2xl border border-white/35 px-7 py-3 font-headline text-sm font-bold text-white">
              Explore MDRT Page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
