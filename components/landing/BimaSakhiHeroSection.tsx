import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import Stat from '@/components/ui/Stat';
import AutoPlayVideo from '@/components/landing/AutoPlayVideo';
import { waLink } from '@/lib/site';

const benefits = [
  { title: 'Stipend support', description: 'Year-wise stipend support, subject to LIC conditions' },
  { title: 'Schedule flexibility', description: 'Part-time or full-time — you decide how many hours to commit' },
  { title: 'Mentor support', description: 'Structured training, IC38 prep, and weekly guidance sessions' },
];

const stats = [
  { value: '₹7,000/mo', label: 'Stipend, year 1' },
  { value: '3 Years', label: 'Structured support' },
  { value: '18-70', label: 'Women eligible' },
];

const whatsappHref = waLink('Hi, I want details about the Bima Sakhi opportunity.');

/** Women-first track: video proof on the left, benefits and eligibility on the right. */
export default function BimaSakhiHeroSection() {
  return (
    <Section tone="surface">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-eyebrow font-semibold uppercase text-gold-700">
            <Sparkles className="h-4 w-4" aria-hidden />
            Women-first opportunity
          </p>
          <h2 className="mt-4 text-h2 font-semibold text-content">Bima Sakhi: earn with flexibility.</h2>
          <p className="mt-4 max-w-prose text-lead text-content-muted">
            Stipend support starts at ₹7,000/month in year 1, with commission opportunities subject to LIC rules. Built
            for women who want flexibility and mentor support.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
          <Reveal>
            <AutoPlayVideo
              videoId="bsGkAey-gpI"
              title="How Women Earn Through LIC - Bima Sakhi Stories"
              description="Discover how women across India are building sustainable income with LIC's Bima Sakhi opportunity while maintaining flexibility and independence."
            />
            <p className="mt-5 flex gap-3 rounded-2xl border border-line bg-surface-sunken p-4 text-sm leading-relaxed text-content-muted">
              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden />
              <span>
                <span className="font-semibold text-content">Mentor-led by Subhash Panjla. </span>
                Clear guidance, practical onboarding, and a calm first step for women who want to start with confidence.
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h3 className="font-headline text-h3 font-semibold text-content">Why Bima Sakhi?</h3>
            <ul className="mt-5 rule-list">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="flex gap-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-600" aria-hidden />
                  <div>
                    <p className="font-headline font-semibold text-content">{benefit.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-content-muted">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-gold-200 bg-gold-50 p-5">
              {stats.map((stat) => (
                <Stat key={stat.label} value={stat.value} label={stat.label} className="text-center" />
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/apply" showArrow fullWidth track={{ location: 'bima_sakhi_block', ctaType: 'apply' }}>
                Apply as Bima Sakhi
              </Button>
              <Button
                href={whatsappHref}
                variant="secondary"
                fullWidth
                icon={<MessageCircle className="h-4 w-4" />}
                track={{ location: 'bima_sakhi_block', ctaType: 'whatsapp' }}
              >
                Ask on WhatsApp
              </Button>
            </div>

            <p className="mt-6 rounded-2xl border border-primary-100 bg-primary-50 p-4 text-sm leading-relaxed text-primary-900">
              <span className="font-semibold">Eligibility: </span>
              10th pass or above, women aged 18-70, Chandigarh Tricity. Application → Training → Certification →
              Advisory launch.
            </p>
            <Link
              href="/bima-sakhi"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-700"
            >
              See the full Bima Sakhi programme
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
