import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

const principles = [
  'Ethical advisory with client-first recommendations',
  'Mentor-led professional development and field readiness',
  'Clear process orientation for long-term career stability',
  'Performance discipline supported by collaborative teamwork',
];

export default function AboutPage() {
  return (
    <main className="pt-20 md:pt-28 lg:pt-32 pb-28 lg:pb-0">
      <section className="px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">About The Leadership</p>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
              Built on Trust, Trained for Professional Excellence.
            </h1>
            <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
              This platform is led by Subhash Panjla, with over 28 years of practical advisory experience and a long-standing
              focus on disciplined, ethical career growth. As a Development Officer with LIC since 1997, he has personally trained 300+ insurance professionals and built a thriving team of 60+ active members across Chandigarh Tricity.
            </p>

            <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-sm p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <Image
                src="/images/mentor/mentor-portrait-1.jpg"
                alt="Subhash Chand Panjla — Founder & Lead Mentor with 25+ years LIC advisory experience"
                width={800}
                height={1000}
                priority
                className="h-[440px] w-full rounded-[1.5rem] object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="mt-4 text-center space-y-1">
                <p className="font-headline text-lg font-bold text-on-surface">Subhash Chand Panjla</p>
                <p className="text-sm text-primary font-semibold">Development Officer & Lead Mentor</p>
                <p className="text-xs text-on-surface-variant">28+ Years LIC Advisory Experience (Since 1997)</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <article className="rounded-[2rem] border border-primary/15 bg-gradient-to-br from-[#f7fbff] to-white p-7 md:p-9">
              <h2 className="font-headline text-3xl font-bold text-on-surface">Our Mission</h2>
              <p className="mt-4 leading-relaxed text-on-surface-variant">
                To build a high-quality network of insurance professionals who combine product expertise, clear communication,
                and trust-led client relationships.
              </p>
            </article>

            <article className="rounded-[2rem] border border-outline-variant/35 bg-white p-7 md:p-9">
              <h3 className="font-headline text-3xl font-bold text-on-surface">Professional Principles</h3>
              <ul className="mt-5 space-y-4">
                {principles.map((item) => (
                  <li key={item} className="flex gap-3 text-on-surface-variant">
                    <CheckCircle className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[2rem] bg-gradient-to-br from-[#0f1829] to-[#1a2744] p-7 text-white md:p-9">
              <h3 className="font-headline text-3xl font-bold">Mentor-Led Team Ecosystem</h3>
              <p className="mt-4 text-white/75">
                You gain access to practical reviews, objection handling guidance, and structured performance feedback.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <Image
                  src="/images/mentor/mentor-portrait-2.jpg"
                  alt="Mentor portrait alternate"
                  width={420}
                  height={420}
                  className="h-36 w-full rounded-xl object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <Image
                  src="/images/events/event-audience.jpg"
                  alt="Team group photo"
                  width={420}
                  height={420}
                  className="h-36 w-full rounded-xl object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            </article>

            <article className="rounded-[2rem] border border-primary/20 bg-gradient-to-br from-blue-50 to-indigo-50 p-7 md:p-9">
              <h3 className="font-headline text-3xl font-bold text-on-surface">LIC Club Membership Progression</h3>
              <p className="mt-3 text-on-surface-variant">
                As you grow with us, unlock exclusive tiers and premium benefits:
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-white p-3 border border-primary/10">
                  <div className="text-sm font-bold text-primary bg-primary/10 rounded-lg px-2 py-1 flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-on-surface">Distinguished Club</p>
                    <p className="text-xs text-on-surface-variant">Entry-level achievement milestone</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white p-3 border border-primary/10">
                  <div className="text-sm font-bold text-primary bg-primary/10 rounded-lg px-2 py-1 flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-on-surface">Branch Manager Club</p>
                    <p className="text-xs text-on-surface-variant">Housing loan @5.5%, office allowance, foreign tours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white p-3 border border-primary/10">
                  <div className="text-sm font-bold text-primary bg-primary/10 rounded-lg px-2 py-1 flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-on-surface">Divisional Manager Club</p>
                    <p className="text-xs text-on-surface-variant">Enhanced commission, recognition, leadership opportunities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white p-3 border border-primary/10">
                  <div className="text-sm font-bold text-primary bg-primary/10 rounded-lg px-2 py-1 flex-shrink-0">4</div>
                  <div>
                    <p className="font-semibold text-on-surface">Zonal Manager Club</p>
                    <p className="text-xs text-on-surface-variant">Premium benefits, hereditary commission, gratuity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-white p-3 border border-primary/10">
                  <div className="text-sm font-bold text-primary bg-primary/10 rounded-lg px-2 py-1 flex-shrink-0">5</div>
                  <div>
                    <p className="font-semibold text-on-surface">Chairman's Club</p>
                    <p className="text-xs text-on-surface-variant">Highest tier with maximum benefits and recognition</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-white border-l-4 border-primary">
                <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Our Motto</p>
                <p className="font-headline text-xl font-bold text-on-surface">"Performance Today… Prestige Tomorrow"</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 p-8 md:p-12">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">Ready to Join This Professional Network?</h2>
          <p className="mt-3 max-w-2xl text-on-surface-variant">
            Start your application and receive role-fit guidance from our recruitment support team.
          </p>
          <Link href="/apply" className="inline-block">
            <button className="mt-6 rounded-2xl bg-gradient-to-r from-primary to-[#1a6fff] px-8 py-4 font-headline font-bold text-white shadow-[0_4px_20px_rgba(2,83,205,0.3)] hover:shadow-[0_6px_30px_rgba(2,83,205,0.45)] transition-all duration-200 flex items-center gap-2">
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
