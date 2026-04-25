'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  GraduationCap,
  HandCoins,
  Home,
  MessageCircle,
  Store,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export type Persona = {
  id: 'professional' | 'homemaker' | 'graduate' | 'sales' | 'self-employed';
  title: string;
  label: string;
  doubt: string;
  path: string;
  firstStep: string;
  ctaMessage: string;
};

type PersonaJourneyProps = {
  personas: Persona[];
  whatsappNumber: string;
};

const iconMap = {
  professional: BriefcaseBusiness,
  homemaker: Home,
  graduate: GraduationCap,
  sales: HandCoins,
  'self-employed': Store,
};

export default function PersonaJourney({ personas, whatsappNumber }: PersonaJourneyProps) {
  const [selectedId, setSelectedId] = useState<Persona['id']>(personas[0].id);

  const selectedPersona = useMemo(
    () => personas.find((persona) => persona.id === selectedId) || personas[0],
    [personas, selectedId]
  );

  const whatsappHref = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
    selectedPersona.ctaMessage
  )}`;

  return (
    <section id="journey" className="relative scroll-mt-[var(--site-header-offset)]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Start where you are</p>
          <h2 className="mt-4 font-headline text-2xl font-extrabold leading-[1.12] tracking-tight text-on-surface md:text-4xl lg:text-5xl">
            Which starting point feels closest to you?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            Not sure which role fits? Choose the closest option. The next scene changes to your path.
          </p>
        </div>

        <div className="hide-scrollbar mt-10 flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-6 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:pb-0">
          {personas.map((persona) => {
            const Icon = iconMap[persona.id];
            const active = persona.id === selectedId;

            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => {
                  setSelectedId(persona.id);
                  trackEvent('persona_select', {
                    persona: persona.id,
                  });
                }}
                className={`min-h-[160px] w-[80vw] max-w-[310px] flex-shrink-0 snap-center overflow-hidden rounded-3xl border p-5 text-left transition-colors duration-200 sm:w-[320px] md:min-h-[170px] md:w-auto md:max-w-none md:min-w-0 md:p-6 ${
                  active
                    ? 'border-primary/[0.45] bg-white shadow-[0_24px_54px_rgba(2,83,205,0.14)]'
                    : 'border-white/70 bg-white/60 shadow-[0_14px_34px_rgba(15,24,41,0.05)] hover:border-primary/[0.22] hover:bg-white'
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    active ? 'bg-primary text-white shadow-md' : 'bg-primary/[0.08] text-primary'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span className="mt-5 block font-headline text-lg font-bold tracking-tight text-on-surface md:text-base lg:text-lg">
                  {persona.title}
                </span>
                <span className="mt-2 block text-wrap text-sm leading-relaxed text-on-surface-variant md:text-xs lg:text-sm">
                  {persona.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-24">
        <div className="overflow-hidden rounded-[2rem] bg-[#071730] text-white shadow-[0_24px_56px_rgba(7,23,48,0.22)]">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative flex flex-col justify-between border-b border-white/10 p-6 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-sky-200 md:text-xs">
                  Possibility shift
                </p>
                <h3 className="mt-5 font-headline text-[1.35rem] font-extrabold leading-snug tracking-tight md:text-3xl lg:text-4xl">
                  From &ldquo;Can I do this?&rdquo; to &ldquo;I know my first step.&rdquo;
                </h3>
              </div>
              <div className="mt-8 rounded-[1.25rem] border border-white/[0.12] bg-white/[0.07] p-5 md:p-8">
                <p className="text-xs font-medium text-white/70 md:text-sm">The doubt usually sounds like</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedPersona.doubt}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.24 }}
                    className="mt-3 font-headline text-[1.1rem] font-bold leading-normal tracking-tight md:text-xl lg:text-2xl"
                  >
                    {selectedPersona.doubt}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative overflow-hidden p-6 md:p-10 lg:p-12">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,83,205,0.34),transparent_45%,rgba(255,255,255,0.08))]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-sky-100 md:text-xs">
                    Your path becomes practical
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedPersona.id}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -28 }}
                      transition={{ duration: 0.28 }}
                    >
                      <h4 className="mt-5 max-w-2xl font-headline text-[1.25rem] font-extrabold leading-snug tracking-tight md:text-2xl lg:text-3xl">
                        {selectedPersona.path}
                      </h4>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                        {selectedPersona.firstStep}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackEvent('cta_click', {
                        location: 'persona_shift',
                        cta_type: 'whatsapp',
                        persona: selectedPersona.id,
                      })
                    }
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#167C3A] px-5 py-3 font-headline text-sm font-bold text-white transition-colors hover:bg-[#126C32]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    See My Path
                  </a>
                  <a
                    href="#income-planner"
                    onClick={() =>
                      trackEvent('cta_click', {
                        location: 'persona_shift',
                        cta_type: 'calculator',
                        persona: selectedPersona.id,
                      })
                    }
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/[0.18] bg-white/10 px-5 py-3 font-headline text-sm font-bold text-white transition-all hover:bg-white/[0.16]"
                  >
                    Calculate My Plan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
