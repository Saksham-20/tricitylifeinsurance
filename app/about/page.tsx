import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import PremiumButton from '@/components/ui/PremiumButton';

const principles = [
  'Client-first, ethics-led advisory conversations',
  'Weekly mentoring and practical field review',
  'Structured onboarding for beginners',
  'Long-term consistency over short-term hype',
];

const credibilityStats = [
  { value: '28+ Years', label: 'LIC domain experience' },
  { value: '300+', label: 'Advisors guided' },
  { value: '60+', label: 'Active team members' },
  { value: 'Tricity Focus', label: 'Chandigarh, Mohali, Panchkula' },
];

export default function AboutPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
  const whatsappHref = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hi, I want to discuss LIC mentorship and recruitment support.')}`;

  return (
    <main className="pb-28 lg:pb-0">
      <section className="px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <FadeInOnScroll className="space-y-5">
            <p className="section-tag">About Leadership</p>
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">
              Trust-led mentorship for sustainable LIC careers.
            </h1>
            <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
              This recruitment platform is led by Subhash Panjla, LIC Development Officer, supporting candidates across Chandigarh Tricity with practical onboarding and career guidance.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {credibilityStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-outline-variant/30 bg-white p-4">
                  <p className="font-headline text-xl font-bold text-on-surface">{item.value}</p>
                  <p className="text-sm text-on-surface-variant">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/60 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <Image
                src="/images/home/hero-mentor-portrait.jpg"
                alt="Subhash Panjla, LIC Development Officer and mentor"
                width={800}
                height={1000}
                priority
                className="h-80 w-full rounded-[1.5rem] object-cover object-top md:h-96 lg:h-[540px]"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="mt-4 text-center space-y-1">
                <p className="font-headline text-lg font-bold text-on-surface">Subhash Panjla</p>
                <p className="text-sm font-semibold text-primary">Development Officer & Lead Mentor</p>
                <p className="text-xs text-on-surface-variant">Mentoring advisors across Chandigarh, Mohali, and Panchkula</p>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll className="space-y-6" direction="left">
            <article className="rounded-[2rem] border border-primary/15 bg-gradient-to-br from-[#f7fbff] to-white p-7 md:p-9">
              <h2 className="font-headline text-3xl font-bold text-on-surface">Our mission</h2>
              <p className="mt-4 leading-relaxed text-on-surface-variant">
                Build a disciplined network of insurance professionals who combine product clarity, responsible advice, and long-term client trust.
              </p>
            </article>

            <article className="rounded-[2rem] border border-outline-variant/35 bg-white p-7 md:p-9">
              <h3 className="font-headline text-3xl font-bold text-on-surface">Professional principles</h3>
              <ul className="mt-5 space-y-4">
                {principles.map((item) => (
                  <li key={item} className="flex gap-3 text-on-surface-variant">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[2rem] bg-gradient-to-br from-[#0f1829] to-[#1a2744] p-7 text-white md:p-9">
              <h3 className="font-headline text-3xl font-bold">Mentor-led support system</h3>
              <p className="mt-4 text-white/75">
                Applicants receive practical review support, objection-handling guidance, and structured activity follow-up after onboarding.
              </p>
              <div className="mt-7">
                <Image
                  src="/images/about/about-team-recognition-medals-celebration.png"
                  alt="Team recognition with medals and celebration"
                  width={900}
                  height={420}
                  className="h-auto w-full max-h-64 rounded-xl object-cover object-center md:max-h-72"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Image
                  src="/images/about/about-mentor-led-support-audience.jpg"
                  alt="Team collaboration and mentoring session"
                  width={420}
                  height={420}
                  className="h-48 w-full rounded-xl object-cover md:h-56"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <Image
                  src="/images/about/about-leadership-team-celebration.jpg"
                  alt="Team members in professional achievement celebration"
                  width={420}
                  height={420}
                  className="h-48 w-full rounded-xl object-cover md:h-56"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <Image
                  src="/images/about/about-lic-trophy-with-mentor.png"
                  alt="LIC recognition trophy with mentors in office"
                  width={420}
                  height={420}
                  className="h-48 w-full rounded-xl object-cover md:h-56"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <Image
                  src="/images/about/about-team-outdoors-five.png"
                  alt="Mentor team outdoors"
                  width={420}
                  height={420}
                  className="h-48 w-full rounded-xl object-cover md:h-56"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            </article>
          </FadeInOnScroll>
        </div>
      </section>

      <section className="mt-14 px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-primary/10 bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">Ready to speak with the mentor team?</h2>
          <p className="mt-3 max-w-2xl text-on-surface-variant">
            Start with WhatsApp for a quick profile discussion or submit your application for a callback.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-flex">
              <PremiumButton variant="primary" showArrow icon={<MessageCircle className="h-4 w-4" />}>
                WhatsApp Discussion
              </PremiumButton>
            </a>
            <Link href="/apply" className="inline-flex">
              <PremiumButton variant="secondary" showArrow icon={<ArrowRight className="h-4 w-4" />}>
                Apply Now
              </PremiumButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
