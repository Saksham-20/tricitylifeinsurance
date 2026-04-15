import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  'Flexible schedule with part-time and full-time options',
  'Structured training and practical business guidance',
  'Independent earnings with long-term growth potential',
  'Supportive ecosystem for women returning to workforce',
];

const compensationBreakdown = [
  { year: '1st Year', amount: '₹7,000/month', description: 'Monthly stipend + commission + bonus' },
  { year: '2nd Year', amount: '₹6,000/month', description: 'Monthly stipend + commission + bonus' },
  { year: '3rd Year', amount: '₹5,000/month', description: 'Monthly stipend + commission + bonus' },
  { year: 'Year 4+', amount: 'Commission-based', description: 'Transition to full agent commission model' },
];

const eligibilityDetails = [
  'Minimum 10th Pass education or above',
  'Housewives seeking financial independence',
  'Private employees wanting additional income',
  'Marketing professionals with sales experience',
  'College students seeking practical work experience',
  'Self-employed individuals diversifying income',
];

const programBenefits = [
  'Attractive commission plus performance bonus',
  'Housing Loan @5.5% interest rate',
  'Festival Advance (additional funds during festivals)',
  'Mediclaim Insurance coverage',
  'Group Insurance protection',
  'Interest-free Two Wheeler / Car Advance',
  'Office Allowance support',
  'Hereditary Commission (income continuity)',
  'Recognition & awards for achievers',
  'Gratuity benefits',
  'Lifetime mentorship and ongoing guidance',
];

export default function BimaSakhiPage() {
  return (
    <main className="pt-20 md:pt-28 lg:pt-32 pb-28 lg:pb-0">
      {/* Hero Section */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-[#0f234f] to-[#1b3674] p-8 text-white md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Bima Sakhi – Tricity</p>
              <h1 className="mt-4 font-headline text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Build Your Own Business — Be Your Own Boss.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                The Bima Sakhi model is designed for homemakers, professionals, and learners seeking flexible work, unlimited earnings, and guided growth in Tricity.
              </p>
            </div>
            <Image
              src="/images/events/event-award-2.jpg"
              alt="Professional recognition moment"
              width={900}
              height={600}
              priority
              className="h-64 w-full rounded-[1.75rem] object-cover md:h-80"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[2rem] border border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-white p-7 md:p-9">
            <h2 className="font-headline text-3xl font-bold text-on-surface">Why Choose the Bima Sakhi Program</h2>
            <ul className="mt-5 space-y-3">
              {benefits.map((item) => (
                <li key={item} className="flex gap-3 text-on-surface-variant">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-amber-500 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-white p-5 border border-amber-100">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Typical Progression</p>
              <p className="mt-2 font-headline text-lg font-bold text-on-surface">Application → Training → Certification → Advisory Launch</p>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-amber-50 to-white border border-amber-200 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">Mentor Support</p>
              <p className="font-headline text-sm font-bold text-on-surface">Led by Subhash Chand Panjla</p>
              <p className="text-xs text-on-surface-variant mt-1">28+ Years LIC Experience | Women Career Specialist</p>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            <Image src="/images/events/event-award-4.jpg" alt="Advisor recognition moment" width={700} height={520} className="h-48 w-full rounded-3xl object-cover md:h-56" sizes="(max-width: 768px) 100vw, 25vw" />
            <Image src="/images/events/event-award-5.jpg" alt="Mentor and advisor with achievement kit" width={700} height={520} className="h-48 w-full rounded-3xl object-cover md:h-56" sizes="(max-width: 768px) 100vw, 25vw" />
            <Image src="/images/events/event-audience.jpg" alt="Audience listening in seminar" width={700} height={520} className="h-48 w-full rounded-3xl object-cover md:col-span-2 md:h-64" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Detailed Information Sections */}
      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12">
          {/* Program Compensation Section */}
          <article className="rounded-[2rem] border border-amber-200/50 bg-gradient-to-br from-amber-50 to-white p-8 md:p-10">
            <h2 className="font-headline text-3xl font-bold text-on-surface">Program Compensation & Support</h2>
            <p className="mt-3 text-on-surface-variant max-w-2xl">
              Earn guaranteed monthly stipend for three years, plus commission, bonus, and premium benefits to support your career growth.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {compensationBreakdown.map((item) => (
                <div key={item.year} className="rounded-xl bg-white border border-amber-100 p-5">
                  <p className="text-sm font-bold uppercase tracking-widest text-amber-600">{item.year}</p>
                  <p className="mt-2 font-headline text-2xl font-bold text-on-surface">{item.amount}</p>
                  <p className="mt-2 text-xs text-on-surface-variant leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 p-5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
              <p className="text-sm font-bold uppercase tracking-widest text-amber-700 mb-2">Key Point</p>
              <p className="text-on-surface font-semibold">Extra Income Potential: Earn ₹48,000+ in commission annually while receiving guaranteed stipend.</p>
            </div>
          </article>

          {/* Eligibility Section */}
          <article className="rounded-[2rem] border border-blue-200/50 bg-gradient-to-br from-blue-50 to-white p-8 md:p-10">
            <h2 className="font-headline text-3xl font-bold text-on-surface">Who Can Apply?</h2>
            <p className="mt-3 text-on-surface-variant max-w-2xl">
              The Bima Sakhi program is specifically designed for women seeking financial independence and career growth with flexibility and support.
            </p>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {eligibilityDetails.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg bg-white border border-blue-100 p-4">
                  <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</div>
                  <span className="text-on-surface-variant text-sm">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-700 mb-2">Minimum Requirement</p>
              <p className="text-on-surface font-semibold">Education: 10th Pass or above. Personal motivation and willingness to learn are equally important!</p>
            </div>
          </article>

          {/* Program Conditions Section */}
          <article className="rounded-[2rem] border border-green-200/50 bg-gradient-to-br from-green-50 to-white p-8 md:p-10">
            <h2 className="font-headline text-3xl font-bold text-on-surface">Program Requirements & Timeline</h2>
            <p className="mt-3 text-on-surface-variant max-w-2xl">
              To succeed in the Bima Sakhi program and transition to a full career, meet these key milestones.
            </p>
            <div className="mt-7 space-y-4">
              <div className="rounded-xl bg-white border border-green-100 p-5">
                <p className="font-semibold text-on-surface flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">📋</span>
                  Policy Coverage Target
                </p>
                <p className="text-sm text-on-surface-variant mt-2">Complete and cover minimum 24+ lives (policies) during the 3-year program to ensure quality and client relationships.</p>
              </div>
              <div className="rounded-xl bg-white border border-green-100 p-5">
                <p className="font-semibold text-on-surface flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">💰</span>
                  Commission Milestone
                </p>
                <p className="text-sm text-on-surface-variant mt-2">Achieve minimum ₹48,000 in commission per calendar year to unlock full benefits and career advancement path.</p>
              </div>
              <div className="rounded-xl bg-white border border-green-100 p-5">
                <p className="font-semibold text-on-surface flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">🎓</span>
                  Training & Certification
                </p>
                <p className="text-sm text-on-surface-variant mt-2">Attend mandatory IRDAI-approved training modules and complete certification requirements for regulatory compliance and professional credibility.</p>
              </div>
              <div className="rounded-xl bg-white border border-green-100 p-5">
                <p className="font-semibold text-on-surface flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">📅</span>
                  Program Duration
                </p>
                <p className="text-sm text-on-surface-variant mt-2">3-year structured program with monthly stipend support. After completion, transition to full agent status with unlimited earning potential and club membership benefits.</p>
              </div>
            </div>
          </article>

          {/* Expanded Benefits Section */}
          <article className="rounded-[2rem] border border-purple-200/50 bg-gradient-to-br from-purple-50 to-white p-8 md:p-10">
            <h2 className="font-headline text-3xl font-bold text-on-surface">Complete Benefits Package</h2>
            <p className="mt-3 text-on-surface-variant max-w-2xl">
              Bima Sakhi offers comprehensive support and benefits to ensure your success and financial security.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {programBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-lg bg-white border border-purple-100 p-4">
                  <span className="text-lg text-purple-600 flex-shrink-0">✓</span>
                  <span className="text-on-surface-variant text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-amber-50 to-white border border-amber-200/30 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] md:p-12">
          <h3 className="font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Take the First Step with Confidence.</h3>
          <p className="mt-3 max-w-2xl text-on-surface-variant">
            Share your details and receive a clear onboarding discussion tailored to your schedule and goals.
          </p>
          <Link href="/apply" className="inline-block">
            <button className="mt-6 rounded-2xl bg-gradient-to-r from-primary to-[#1a6fff] px-8 py-4 font-headline font-bold text-white shadow-[0_4px_20px_rgba(2,83,205,0.3)] hover:shadow-[0_6px_30px_rgba(2,83,205,0.45)] transition-all duration-200 flex items-center gap-2">
              Apply as Bima Sakhi
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
