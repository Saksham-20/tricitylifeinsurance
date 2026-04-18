import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, MessageCircle, PhoneCall } from 'lucide-react';
import PulseDot from '@/components/ui/PulseDot';
import PremiumButton from '@/components/ui/PremiumButton';

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

const photosRecognitionGallery: { src: string; alt: string }[] = [
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-01.jpg', alt: 'Professional recognition moment' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-02.jpg', alt: 'Individual achievement recognition' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-03.jpg', alt: 'Community recognition celebration' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-04.jpg', alt: 'Success celebration event' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-05.jpg', alt: 'LIC celebration event with team members' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-06.jpg', alt: 'Individual achievement award presentation' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-07.jpg', alt: 'Recognition moment with team' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-08.jpg', alt: 'Achievement award ceremony' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-09.jpg', alt: 'Success milestone celebration' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-10.jpg', alt: 'Women achiever recognition moment' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-11.jpg', alt: 'Team member success celebration' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-12.jpg', alt: 'Achievement recognition event' },
  { src: '/images/bima-sakhi/bima-sakhi-photos-recognition-13.jpg', alt: 'Bima Sakhi success milestone' },
];

export default function BimaSakhiPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
  const whatsappHref = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hi, I want details about the Bima Sakhi opportunity.')}`;

  return (
    <main className="pb-28 lg:pb-0">
      {/* Hero Section */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0f234f] to-[#1b3674] p-8 text-white md:p-12 relative">
          <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Bima Sakhi – Tricity</p>
              <h1 className="mt-4 font-headline text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Build a respectful, flexible income path with Bima Sakhi.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                Designed for women in Chandigarh Tricity who want support, clarity, and a safe onboarding journey into LIC advisory work.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex">
                  <PremiumButton variant="primary" showArrow attentionOnce attentionKey="bima-hero" icon={<MessageCircle className="h-4 w-4" />}>
                    Talk on WhatsApp
                  </PremiumButton>
                </a>
                <Link href="/apply" className="inline-flex">
                  <PremiumButton variant="secondary" showArrow>
                    Apply for Bima Sakhi
                  </PremiumButton>
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full min-h-[200px] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              <Image
                src="/images/bima-sakhi/bima-sakhi-photos-recognition-14.png"
                alt="Women-focused training and seminar session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <article className="rounded-[2rem] border border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-white p-7 md:p-9">
            <div className="flex items-center gap-2">
              <PulseDot />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Women-Focused Opportunity</p>
            </div>
            <h2 className="mt-3 font-headline text-3xl font-bold text-on-surface">Why choose the Bima Sakhi program</h2>
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
              <p className="font-headline text-sm font-bold text-on-surface">Led by Subhash Panjla</p>
              <p className="text-xs text-on-surface-variant mt-1">28+ Years LIC Experience | Women Career Specialist</p>
            </div>
          </article>
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
              <p className="text-on-surface font-semibold">Income potential can grow with consistent activity and policy quality. Actual earnings vary by performance.</p>
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
                  <span className="text-lg font-bold text-green-600">1</span>
                  Policy Coverage Target
                </p>
                <p className="text-sm text-on-surface-variant mt-2">Complete and cover minimum 24+ lives (policies) during the 3-year program to ensure quality and client relationships.</p>
              </div>
              <div className="rounded-xl bg-white border border-green-100 p-5">
                <p className="font-semibold text-on-surface flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">2</span>
                  Commission Milestone
                </p>
                <p className="text-sm text-on-surface-variant mt-2">Achieve minimum ₹48,000 in commission per calendar year to unlock full benefits and career advancement path.</p>
              </div>
              <div className="rounded-xl bg-white border border-green-100 p-5">
                <p className="font-semibold text-on-surface flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">3</span>
                  Training & Certification
                </p>
                <p className="text-sm text-on-surface-variant mt-2">Attend mandatory IRDAI-approved training modules and complete certification requirements for regulatory compliance and professional credibility.</p>
              </div>
              <div className="rounded-xl bg-white border border-green-100 p-5">
                <p className="font-semibold text-on-surface flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">4</span>
                  Program Duration
                </p>
                <p className="text-sm text-on-surface-variant mt-2">3-year structured program with monthly stipend support. After completion, transition to full agent status with unlimited earning potential and club membership benefits.</p>
              </div>
            </div>
          </article>

        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-amber-50 to-white border border-amber-200/30 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.04)] md:p-12">
          <h3 className="font-headline text-3xl font-extrabold text-on-surface md:text-4xl">Take the first step with confidence.</h3>
          <p className="mt-3 max-w-2xl text-on-surface-variant">
            Share your details and receive a clear onboarding discussion tailored to your schedule and goals. No-pressure guidance, clear next steps.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/apply" className="inline-flex">
              <PremiumButton variant="primary" showArrow>
                Apply as Bima Sakhi
              </PremiumButton>
            </Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/20 px-6 py-3 font-headline font-bold text-primary transition-all duration-200 hover:scale-[1.01]">
              <MessageCircle className="h-4 w-4" />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Photos & Recognition */}
      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] border border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-white p-8 md:p-10">
            <h2 className="font-headline text-3xl font-bold text-on-surface">Photos & Recognition</h2>
            <p className="mt-3 text-on-surface-variant max-w-2xl">
              Meet our community members as they reach milestones and celebrate their achievements in the Bima Sakhi program.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {photosRecognitionGallery.map((photo) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  width={700}
                  height={520}
                  className="h-48 w-full rounded-2xl object-cover md:h-56"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-5 text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-amber-700 mb-2">Real Success Stories</p>
              <p className="text-on-surface font-semibold">These are real event moments from our network. Individual outcomes vary based on activity, consistency, and policy quality.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#0f1829] p-8 text-white">
          <h3 className="font-headline text-3xl font-bold">Need direct guidance before applying?</h3>
          <p className="mt-3 text-white/75">Talk to our team and understand eligibility, timing, and how to begin comfortably.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 font-headline font-bold text-white transition-all duration-200 hover:scale-[1.01]">
              <MessageCircle className="h-4 w-4" />
              WhatsApp Discussion
            </a>
            <a href="tel:+918872364673" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 px-6 py-3 font-headline font-bold text-white transition-all duration-200 hover:scale-[1.01]">
              <PhoneCall className="h-4 w-4" />
              Call Support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
