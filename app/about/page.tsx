import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Stat from '@/components/ui/Stat';
import Pill from '@/components/ui/Pill';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';
import { site, waLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Subhash Panjla — LIC Development Officer & Mentor',
  description:
    'Meet Subhash Panjla, LIC Development Officer and lead mentor for agent and Bima Sakhi recruitment across Chandigarh, Mohali, and Panchkula. 28+ years of experience, 300+ advisors guided.',
  alternates: { canonical: '/about' },
  openGraph: { url: '/about', title: 'About Subhash Panjla — LIC Development Officer & Mentor' },
};

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

const gallery = [
  { src: '/images/about/about-mentor-led-support-audience.jpg', alt: 'Team collaboration and mentoring session' },
  { src: '/images/about/about-leadership-team-celebration.jpg', alt: 'Team members in professional achievement celebration' },
  { src: '/images/about/about-lic-trophy-with-mentor.png', alt: 'LIC recognition trophy with mentors in office' },
  { src: '/images/about/about-team-outdoors-five.png', alt: 'Mentor team outdoors' },
];

const whatsappHref = waLink('Hi, I want to discuss LIC mentorship and recruitment support.');

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <JsonLd data={breadcrumbSchema([{ name: 'About', path: '/about' }])} />

      {/* ---------- Intro ---------- */}
      <Section tone="canvas">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow">About leadership</p>
            <h1 className="mt-4 text-h1 font-semibold text-content">
              Trust-led mentorship for sustainable LIC careers.
            </h1>
            <p className="mt-5 max-w-prose text-lead text-content-muted">
              This recruitment platform is led by {site.mentor}, LIC Development Officer, supporting candidates across
              Chandigarh Tricity with practical onboarding and career guidance.
            </p>
            <dl className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              {credibilityStats.map((item) => (
                <Stat key={item.label} value={item.value} label={item.label} />
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="overflow-hidden rounded-3xl border border-line bg-surface p-4 shadow-lg">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/images/home/hero-mentor-portrait.jpg"
                  alt="Subhash Panjla, LIC Development Officer and mentor"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              </div>
              <figcaption className="px-2 pb-1 pt-5 text-center">
                <p className="font-headline text-lg font-semibold text-content">{site.mentor}</p>
                <p className="mt-1 text-sm font-semibold text-primary">{site.mentorRole}</p>
                <p className="mt-2 text-sm text-content-muted">
                  Mentoring advisors across Chandigarh, Mohali, and Panchkula
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Mission + principles ---------- */}
      <Section tone="surface">
        <div className="shell grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="card h-full p-7 md:p-9">
              <Pill>Our mission</Pill>
              <h2 className="mt-5 text-h3 font-semibold text-content">
                Build a disciplined network of insurance professionals.
              </h2>
              <p className="mt-4 leading-relaxed text-content-muted">
                Build a disciplined network of insurance professionals who combine product clarity, responsible advice,
                and long-term client trust.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="card h-full p-7 md:p-9">
              <Pill>Professional principles</Pill>
              <ul className="mt-6 space-y-4">
                {principles.map((item) => (
                  <li key={item} className="flex gap-3 text-content-muted">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Support system + gallery ---------- */}
      <Section tone="ink" texture>
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow-invert">Support system</p>
            <h2 className="mt-4 text-h2 font-semibold text-white">Mentor-led support system</h2>
            <p className="mt-5 max-w-prose text-lead text-white/70">
              Applicants receive practical review support, objection-handling guidance, and structured activity
              follow-up after onboarding.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/images/about/about-team-recognition-medals-celebration.png"
                alt="Team recognition with medals and celebration"
                width={900}
                height={420}
                className="h-56 w-full object-cover md:h-64"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="grid grid-cols-2 gap-4">
              {gallery.map((photo, index) => (
                <li key={photo.src} className="overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={520}
                    height={520}
                    loading={index < 2 ? undefined : 'lazy'}
                    className="h-44 w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03] motion-reduce:transform-none md:h-56"
                    sizes="(max-width: 768px) 45vw, 25vw"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ---------- CTA ---------- */}
      <Section tone="canvas">
        <div className="shell">
          <div className="rounded-3xl border border-primary-100 bg-primary-50 p-8 md:p-12">
            <SectionHeader
              title="Ready to speak with the mentor team?"
              description="Start with WhatsApp for a quick profile discussion or submit your application for a callback."
            />
            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={whatsappHref}
                  variant="whatsapp"
                  icon={<MessageCircle className="h-4 w-4" aria-hidden />}
                  track={{ location: 'about_cta', ctaType: 'whatsapp' }}
                >
                  Talk on WhatsApp
                </Button>
                <Button
                  href="/apply"
                  variant="secondary"
                  icon={<ArrowRight className="h-4 w-4" aria-hidden />}
                  track={{ location: 'about_cta', ctaType: 'apply' }}
                >
                  Apply for callback
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </div>
  );
}
