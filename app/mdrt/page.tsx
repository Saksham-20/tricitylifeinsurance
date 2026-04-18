'use client';

import Link from 'next/link';
import { ArrowRight, Award, Globe2, GraduationCap, ShieldCheck, TrendingUp, Users, Crown } from 'lucide-react';
import PulseDot from '@/components/ui/PulseDot';

export default function MdrtPage() {
  const handleWhatsAppClick = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
    const message = encodeURIComponent('Hi, I want to start my journey toward MDRT. Please share the next steps.');
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <main className="pb-28 lg:pb-0">
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-primary/15 bg-gradient-to-br from-[#f7fbff] to-white p-8 shadow-[0_24px_65px_rgba(15,24,41,0.08)] md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Contact</p>
          <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tight text-on-surface md:text-6xl">MDRT</h1>
          <h2 className="mt-4 font-headline text-2xl font-bold text-on-surface md:text-3xl">Become an MDRT Achiever with Us</h2>
          <p className="mt-2 text-lg font-semibold text-primary">Build a Career, Not Just Income</p>
          <p className="mt-3 max-w-3xl leading-relaxed text-on-surface-variant">
            Join a system designed to help you grow from Agent to MDRT Professional
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 font-headline text-sm font-bold text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all duration-200 hover:shadow-[0_6px_30px_rgba(37,211,102,0.45)]"
            >
              Contact on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="/apply" className="inline-flex items-center gap-2 rounded-2xl border border-primary/25 px-6 py-3 font-headline text-sm font-bold text-primary">
              Apply as Advisor
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <article className="rounded-3xl border border-outline-variant/35 bg-white p-6">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-headline text-xl font-bold text-on-surface">Unlimited Income Potential</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">No salary limits - your effort defines your earnings</p>
          </article>
          <article className="rounded-3xl border border-outline-variant/35 bg-white p-6">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-headline text-xl font-bold text-on-surface">Work on Your Own Terms</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">Flexible timing, full independence</p>
          </article>
          <article className="rounded-3xl border border-outline-variant/35 bg-white p-6">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-headline text-xl font-bold text-on-surface">Secure People&apos;s Future</h3>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">Help families achieve financial protection & stability</p>
          </article>
        </div>
      </section>

      <section className="mt-10 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-outline-variant/35 bg-white p-7">
            <div className="mb-3 flex items-center gap-2">
              <PulseDot />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">High Achievement Track</p>
            </div>
            <h2 className="font-headline text-2xl font-bold text-on-surface">Start Your Journey in Life Insurance</h2>
            <p className="mt-3 text-on-surface-variant">Are you looking for:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-on-surface-variant">
              <li>Unlimited income potential</li>
              <li>Flexible working hours</li>
              <li>Respect & recognition in society</li>
            </ul>
            <p className="mt-3 leading-relaxed text-on-surface-variant">Then this opportunity is for you.</p>
            <p className="mt-1 leading-relaxed text-on-surface-variant">We don&apos;t just make agents...</p>
            <p className="font-semibold text-primary">We create MDRT achievers</p>
          </article>

          <article className="rounded-3xl border border-outline-variant/35 bg-white p-7">
            <h2 className="font-headline text-2xl font-bold text-on-surface">What is MDRT?</h2>
            <p className="mt-3 leading-relaxed text-on-surface-variant">
              Million Dollar Round Table (MDRT) is the global benchmark of success in life insurance.
            </p>
            <ul className="mt-3 space-y-2 leading-relaxed text-on-surface-variant">
              <li className="flex items-start gap-2"><Award className="mt-0.5 h-4 w-4 text-primary" />Top 1% financial professionals worldwide</li>
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />Recognized for ethics, performance & client trust</li>
              <li className="flex items-start gap-2"><Crown className="mt-0.5 h-4 w-4 text-primary" />A symbol of excellence in the industry</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="mt-10 px-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-outline-variant/35 bg-white p-7">
            <h2 className="font-headline text-2xl font-bold text-on-surface">MDRT Benefits You Can Achieve</h2>
            <ul className="mt-4 space-y-2 leading-relaxed text-on-surface-variant">
              <li className="flex items-start gap-2"><Globe2 className="mt-0.5 h-4 w-4 text-primary" />Global Recognition: Stand among the top performers worldwide</li>
              <li className="flex items-start gap-2"><TrendingUp className="mt-0.5 h-4 w-4 text-primary" />High Income Growth: MDRT agents earn significantly more with structured systems</li>
              <li className="flex items-start gap-2"><Users className="mt-0.5 h-4 w-4 text-primary" />International Networking: Connect with top advisors across the globe</li>
              <li className="flex items-start gap-2"><Award className="mt-0.5 h-4 w-4 text-primary" />Proven Sales System: Learn tested strategies that actually work</li>
              <li className="flex items-start gap-2"><GraduationCap className="mt-0.5 h-4 w-4 text-primary" />Continuous Learning: Training, mentorship & global exposure</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-outline-variant/35 bg-white p-7">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Why Join Our Team?</h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 leading-relaxed text-on-surface-variant">
              <li>Strong Leadership: Led by an experienced mentor with decades of success</li>
              <li>Proven MDRT Roadmap: Step-by-step guidance from beginner to MDRT</li>
              <li>Personal Mentorship: We work closely with every agent</li>
              <li>Growth-Oriented Environment: Supportive team culture focused on success</li>
            </ul>
            <h3 className="mt-5 font-headline text-xl font-bold text-on-surface">Who Can Join?</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-on-surface-variant">
              <li>Students (18+)</li>
              <li>Working professionals</li>
              <li>Business owners</li>
              <li>Housewives</li>
              <li>Anyone with big dreams</li>
            </ul>
            <p className="mt-3 leading-relaxed text-on-surface-variant">No prior experience required - we train you</p>
          </article>
        </div>
      </section>

      <section className="mt-10 px-6 pb-16 md:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-10">
          <h2 className="font-headline text-3xl font-bold text-on-surface">Take the First Step Today</h2>
          <p className="mt-2 text-on-surface-variant">Start your journey toward financial freedom & recognition</p>
          <p className="mt-3 font-semibold text-on-surface">Call / WhatsApp: 8872364673</p>
          <p className="font-semibold text-on-surface">Join Now: TricityLifeInsurance</p>

          <div className="mt-6 rounded-2xl border border-primary/20 bg-white/80 p-5">
            <h3 className="font-headline text-xl font-bold text-on-surface">Final Call to Action</h3>
            <p className="mt-2 leading-relaxed text-on-surface-variant">Don&apos;t just join LIC... Join a Mentor</p>
            <p className="leading-relaxed text-on-surface-variant">Don&apos;t just earn... Build a Legacy</p>
            <p className="leading-relaxed text-on-surface-variant">Don&apos;t just work... Become MDRT</p>

            <button
              onClick={handleWhatsAppClick}
              className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-6 py-3 font-headline text-lg font-bold text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all duration-200 hover:shadow-[0_6px_30px_rgba(37,211,102,0.45)]"
            >
              Contact on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
