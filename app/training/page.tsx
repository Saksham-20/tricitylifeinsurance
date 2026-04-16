import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const modules = [
  {
    step: '01',
    title: 'Screening and Role Fit',
    copy: 'An initial mentor-led discussion to align your goals and role pathway.',
    color: 'from-blue-500',
  },
  {
    step: '02',
    title: 'IRDAI Learning Track',
    copy: 'Structured digital sessions to cover policy fundamentals and advisory approach.',
    color: 'from-violet-500',
  },
  {
    step: '03',
    title: 'Exam Readiness Support',
    copy: 'Practice modules and review support to improve confidence before certification.',
    color: 'from-emerald-500',
  },
  {
    step: '04',
    title: 'Field Mentoring',
    copy: 'Practical client-facing guidance to help you build a stable early pipeline.',
    color: 'from-amber-500',
  },
];

export default function TrainingPage() {
  return (
    <main className="pt-20 md:pt-28 lg:pt-32 pb-28 lg:pb-0">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/60 bg-white/70 backdrop-blur-xl p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Training Program</p>
              <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
                A Practical Learning System Designed for Performance.
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-on-surface-variant md:text-lg">
                Training combines certification prep, communication skills, and mentor-guided field execution so you can start with clarity.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-3 border border-primary/20">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">SC</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Led by Subhash  Panjla</p>
                  <p className="text-xs text-on-surface-variant">25+ Years Industry Expert</p>
                </div>
              </div>
            </div>
            <Image
              src="/images/training/event-audience.jpg"
              alt="Audience at professional training session"
              width={800}
              height={520}
              priority
              className="h-64 md:h-80 w-full rounded-[1.75rem] object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {modules.map((module) => (
            <article key={module.step} className="rounded-3xl border border-outline-variant/35 bg-white p-6 hover:shadow-elevation-2 transition-all duration-300 group">
              <p className={`font-headline text-5xl font-black bg-gradient-to-br ${module.color} to-transparent bg-clip-text text-transparent opacity-30`}>
                {module.step}
              </p>
              <div className={`h-1 w-10 rounded-full bg-gradient-to-r ${module.color} to-transparent mt-3 mb-4`} />
              <h2 className="font-headline text-xl font-bold text-on-surface">{module.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{module.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-4 grid-cols-1 md:grid-cols-3">
          <Image src="/images/training/event-award-2.jpg" alt="Professional recognition ceremony" width={700} height={480} className="h-56 md:h-72 w-full rounded-3xl object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          <Image src="/images/training/event-award-3.jpg" alt="Professional certification recognition" width={700} height={480} className="h-56 md:h-72 w-full rounded-3xl object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          <Image src="/images/training/event-award-5.jpg" alt="Mentor with advisor during recognition" width={700} height={480} className="h-56 md:h-72 w-full rounded-3xl object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      </section>

      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-primary to-[#1a6fff] p-8 text-white md:p-12 relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <h3 className="font-headline text-3xl font-extrabold tracking-tight md:text-4xl">Ready to Enter the Next Training Batch?</h3>
            <p className="mt-3 max-w-2xl text-white/80">Submit your profile to receive a guided onboarding call and batch schedule details.</p>
            <Link href="/apply" className="inline-block">
              <button className="mt-6 rounded-2xl bg-white px-8 py-4 font-headline font-bold text-primary shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 flex items-center gap-2">
                Apply for Training
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
