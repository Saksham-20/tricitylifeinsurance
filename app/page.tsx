import Image from 'next/image';
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
  ShieldCheck,
  Users,
} from 'lucide-react';
import LandingCta from '@/components/landing/LandingCta';
import PersonaJourney, { Persona } from '@/components/landing/PersonaJourney';
import BimaSakhiHeroSection from '@/components/landing/BimaSakhiHeroSection';
import IncomeCalculator from '@/components/landing/IncomeCalculator';
import TransformationJourney from '@/components/landing/TransformationJourney';
import FAQAccordion from '@/components/landing/FAQAccordion';
import ConversationalLeadForm from '@/components/landing/ConversationalLeadForm';

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
    detail:
      'Started with limited hours and used weekly reviews to build confidence in client conversations.',
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

export default function Home() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
  const whatsappHref = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
    'Hi, I want to discuss LIC career opportunities in Chandigarh Tricity with Subhash Panjla.'
  )}`;

  return (
    <main className="relative overflow-hidden bg-[#f6f8fc] pb-24 lg:pb-0">
      <div className="lg:hidden">
        <BimaSakhiHeroSection />
      </div>

      <section className="relative isolate bg-[#071730] px-6 text-white md:px-10 lg:min-h-[calc(100svh_-_var(--site-header-offset)_-_1rem)]">
        <div className="landing-gradient-drift absolute inset-0 bg-[linear-gradient(125deg,#071730_0%,#0d2a55_42%,#f8fbff_120%)] opacity-95" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_28%,rgba(0,0,0,0.18))]" />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 py-12 md:gap-12 md:py-16 lg:min-h-[calc(100svh_-_var(--site-header-offset)_-_1rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="order-2 max-w-4xl lg:order-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-sky-100 backdrop-blur-md md:px-4 md:py-2 md:text-xs">
              <BadgeCheck className="h-4 w-4" />
              LIC Career Mentor - Chandigarh Tricity
            </p>
            <h1 className="mt-5 font-headline text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl lg:mt-6 lg:text-[3.85rem] lg:leading-[1.08]">
              <span className="block lg:hidden">Not sure where your LIC path starts?</span>
              <span className="hidden lg:block">A career feels easier when someone walks the first steps with you.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              <span className="block lg:hidden">Pick the situation closest to you, then see the first step without pressure.</span>
              <span className="hidden lg:block">Become an LIC advisor or Bima Sakhi in Chandigarh Tricity with clear guidance from Subhash Panjla.</span>
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row md:gap-4 lg:hidden">
              <LandingCta href="#journey" location="home_hero" ctaType="journey" variant="primary" className="w-full">
                Find My Starting Point
              </LandingCta>
              <LandingCta href={whatsappHref} location="home_hero" ctaType="whatsapp" variant="dark" className="w-full">
                WhatsApp the Mentor
              </LandingCta>
            </div>
            <div className="mt-8 hidden flex-col gap-3 sm:flex-row md:gap-4 lg:flex">
              <LandingCta href={whatsappHref} location="home_hero" ctaType="whatsapp" variant="whatsapp">
                Start with WhatsApp
              </LandingCta>
              <LandingCta href="#journey" location="home_hero" ctaType="journey" variant="dark">
                See the Journey
              </LandingCta>
            </div>
            <a
              href="#journey"
              className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-white/[0.14] bg-white/[0.08] p-4 text-left backdrop-blur-md transition-colors hover:bg-white/[0.12] lg:hidden"
            >
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-sky-200">Start where you are</span>
                <span className="mt-1 block text-sm font-semibold text-white">Job · home · college · business</span>
              </span>
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#071730]">
                <ArrowDown className="h-4 w-4" />
              </span>
            </a>
          </div>

          <div className="relative order-1 mx-auto w-full max-w-[420px] lg:order-2 lg:ml-auto lg:max-w-[500px]">
            <div className="relative aspect-square max-h-[380px] overflow-hidden rounded-3xl border border-white/[0.16] bg-white/[0.08] shadow-[0_28px_72px_rgba(0,0,0,0.28)] md:aspect-[4/5] md:max-h-none">
              <Image
                src="/images/home/hero-mentor-portrait.jpg"
                alt="Subhash Panjla, LIC career mentor"
                fill
                priority
                className="object-cover object-center md:object-top"
                sizes="(max-width: 1024px) 90vw, 42vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(7,23,48,0.86))]" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <p className="text-sm font-bold uppercase text-sky-100">Subhash Panjla</p>
                <p className="mt-2 font-headline text-lg font-bold tracking-[0] text-white md:text-2xl">
                  Mentor-led LIC career guidance
                </p>
              </div>
            </div>

            <div className="mt-5 hidden gap-3 sm:grid sm:grid-cols-3 lg:block">
              {[
                { value: 'Since 1997', label: 'LIC journey', className: 'lg:absolute lg:-left-16 lg:top-12' },
                { value: '300+', label: 'Advisors guided', className: 'lg:absolute lg:-right-10 lg:top-1/2' },
                { value: 'Tricity', label: 'Local support', className: 'lg:absolute lg:-left-10 lg:bottom-16' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-2xl border border-white/[0.18] bg-white/[0.12] px-4 py-3 text-white shadow-[0_14px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl md:px-5 md:py-4 ${stat.className}`}
                >
                  <p className="font-headline text-xl font-extrabold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/[0.7]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">The quiet truth</p>
          <h2 className="mt-6 font-headline text-3xl font-extrabold leading-[1.15] tracking-tight text-on-surface md:text-5xl">
            You are not confused because you are weak.
          </h2>
          <p className="mt-6 font-headline text-xl font-bold leading-[1.2] tracking-tight text-on-surface/80 md:text-3xl">
            You are confused because no one has explained the path simply.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            Income, exams, documents, clients, confidence - most people simply need the path explained in the right order.
          </p>
        </div>
      </section>

      <PersonaJourney personas={personas} whatsappNumber={whatsappNumber} />

      <section className="bg-white px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[5/3.7] overflow-hidden rounded-3xl lg:aspect-[5/4]">
              <Image
                src="/images/about/about-leadership-team-celebration.jpg"
                alt="Subhash Panjla with LIC career team members"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(7,23,48,0.72))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/[0.18] bg-white/[0.12] p-5 text-white backdrop-blur-md md:bottom-6 md:left-6 md:right-6 md:p-6">
                <p className="text-sm font-bold uppercase tracking-widest text-sky-100">Mentor note</p>
                <p className="mt-3 font-headline text-xl font-bold leading-snug tracking-tight md:text-2xl">
                  The first win is not a sale. The first win is knowing what to do next.
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Mentor authority</p>
            <h2 className="mt-5 font-headline text-3xl font-extrabold leading-[1.12] tracking-tight text-on-surface md:text-4xl lg:text-5xl">
              Meet the mentor behind the system.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-on-surface-variant md:text-lg">
              Subhash Panjla has guided advisors across Chandigarh, Mohali, and Panchkula with practical onboarding, field confidence, and steady review.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { value: '28+', label: 'Years of mentoring experience' },
                { value: '300+', label: 'Advisors guided' },
                { value: '60+', label: 'Active team network' },
              ].map((stat) => (
                <div key={stat.label} className="border-l-[3px] border-primary/20 pl-5">
                  <p className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">{stat.value}</p>
                  <p className="mt-2 text-sm font-medium text-on-surface-variant">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4ff] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">How it works</p>
            <h2 className="mt-5 font-headline text-3xl font-extrabold leading-[1.12] tracking-tight text-on-surface md:text-4xl lg:text-5xl">
              A clear path, not a vague promise.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-on-surface-variant md:text-lg">
              Each step is meant to remove uncertainty before asking you to move forward.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="absolute left-8 top-8 hidden h-px w-[calc(100%-4rem)] bg-primary/20 lg:block" />
            <ol className="grid gap-6 lg:grid-cols-5 lg:gap-8">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <li key={step.title} className="relative rounded-3xl border border-primary/[0.08] bg-white p-6 shadow-[0_16px_40px_rgba(15,24,41,0.04)] md:p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-8 text-xs font-bold uppercase tracking-widest text-primary">Step {index + 1}</p>
                    <h3 className="mt-3 font-headline text-xl font-bold leading-tight tracking-tight text-on-surface">{step.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">{step.copy}</p>
                  </li>
                );
              })}
            </ol>
          </div>

          <p className="mt-12 max-w-4xl rounded-2xl border border-primary/[0.12] bg-white/60 p-5 text-sm leading-relaxed text-on-surface-variant backdrop-blur-sm">
            <strong>Official context:</strong> LIC agent appointment includes eligibility checks and pre-recruitment training. Bima Sakhi stipend and eligibility are subject to LIC rules and performance norms.
          </p>
        </div>
      </section>

      <div className="hidden lg:block">
        <BimaSakhiHeroSection />
      </div>

      <IncomeCalculator />

      <TransformationJourney />



      <section className="bg-white px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary">Stories</p>
              <h2 className="mt-5 font-headline text-3xl font-extrabold leading-[1.12] tracking-tight text-on-surface md:text-4xl lg:text-5xl">
                What changes when guidance is present?
              </h2>
            </div>
            <p className="text-base leading-relaxed text-on-surface-variant md:text-lg">
              Names are partially anonymized for privacy. Individual results vary by activity, consistency, compliance, and suitability.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
            <article className="rounded-3xl bg-[#071730] p-8 text-white md:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md">
                <Users className="h-8 w-8" />
              </div>
              <p className="mt-12 max-w-3xl font-headline text-2xl font-bold leading-[1.25] tracking-tight md:text-3xl lg:text-4xl">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <div className="mt-12 border-t border-white/[0.14] pt-8">
                <p className="font-headline text-xl font-bold tracking-tight">{testimonials[0].name}</p>
                <p className="mt-1 text-sm font-medium text-white/70">{testimonials[0].role}</p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">{testimonials[0].detail}</p>
              </div>
            </article>

            <div className="grid gap-6">
              {testimonials.slice(1).map((item) => (
                <article key={item.quote} className="rounded-3xl border border-outline-variant/30 bg-[#f7f9fd] p-6 md:p-8">
                  <p className="font-headline text-xl font-bold leading-snug tracking-tight text-on-surface md:text-2xl">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="mt-8 text-base font-bold text-on-surface">{item.name}</p>
                  <p className="mt-1 text-sm font-medium text-on-surface-variant">{item.role}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f8fc] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary">Trust</p>
              <h2 className="mt-5 font-headline text-3xl font-extrabold leading-[1.12] tracking-tight text-on-surface md:text-4xl lg:text-5xl">
                Simple reasons people feel comfortable starting here.
              </h2>
            </div>

            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {trustPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div key={point.title} className="flex gap-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/[0.08] text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-headline text-lg font-bold tracking-tight text-on-surface">{point.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{point.copy}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion items={faqs} />

      <section className="bg-[#071730] px-6 py-16 text-white md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-sky-200">Next step</p>
          <h2 className="mt-6 font-headline text-3xl font-extrabold leading-[1.12] tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.08]">
            You do not have to decide everything today.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            Just start the conversation.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <LandingCta href={whatsappHref} location="final_cta" ctaType="whatsapp" variant="whatsapp">
                WhatsApp Subhash Panjla
              </LandingCta>
              <LandingCta href="#application-form" location="final_cta" ctaType="apply" variant="dark">
                Apply for a Callback
              </LandingCta>
            </div>
            <LandingCta href="tel:+918872364673" location="final_cta" ctaType="call" variant="dark" showArrow={false} className="text-sm opacity-70">
              <PhoneCall className="h-4 w-4" />
              Call Now
            </LandingCta>
          </div>
        </div>
      </section>

      <ConversationalLeadForm whatsappNumber={whatsappNumber} />
    </main>
  );
}
