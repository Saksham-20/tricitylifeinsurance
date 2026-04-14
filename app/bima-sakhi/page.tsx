import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  'Flexible schedule with part-time and full-time options',
  'Structured training and practical business guidance',
  'Independent earnings with long-term growth potential',
  'Supportive ecosystem for women returning to workforce',
];

export default function BimaSakhiPage() {
  return (
    <main className="pt-20 md:pt-28 lg:pt-32 pb-28 lg:pb-0">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-[#0f234f] to-[#1b3674] p-8 text-white md:p-12 relative overflow-hidden">
          {/* Decorative */}
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

      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-outline-variant/30 bg-gradient-to-br from-amber-50/50 to-white p-7 md:p-9">
            <h2 className="font-headline text-3xl font-bold text-on-surface">Why Choose This Program</h2>
            <ul className="mt-5 space-y-4">
              {benefits.map((item) => (
                <li key={item} className="flex gap-3 text-on-surface-variant">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-amber-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-white p-5 border border-amber-100">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Typical Progression</p>
              <p className="mt-2 font-headline text-xl font-bold text-on-surface">Application → Training → Certification → Advisory Launch</p>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-r from-amber-50 to-white border border-amber-200 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">Mentor Support</p>
              <p className="font-headline text-sm font-bold text-on-surface">Led by Subhash Chand Panjla</p>
              <p className="text-xs text-on-surface-variant mt-1">Specialized Women Career Guidance</p>
            </div>
          </article>

          <div className="grid gap-4 md:grid-cols-2">
            <Image src="/images/events/event-award-4.jpg" alt="Advisor recognition moment" width={700} height={520} className="h-48 w-full rounded-3xl object-cover md:h-56" sizes="(max-width: 768px) 100vw, 25vw" />
            <Image src="/images/events/event-award-5.jpg" alt="Mentor and advisor with achievement kit" width={700} height={520} className="h-48 w-full rounded-3xl object-cover md:h-56" sizes="(max-width: 768px) 100vw, 25vw" />
            <Image src="/images/events/event-audience.jpg" alt="Audience listening in seminar" width={700} height={520} className="h-48 w-full rounded-3xl object-cover md:col-span-2 md:h-64" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </div>
      </section>

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
