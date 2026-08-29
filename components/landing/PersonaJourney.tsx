'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BriefcaseBusiness, GraduationCap, HandCoins, Home, MessageCircle, Store } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import { waLink } from '@/lib/site';

export type Persona = {
  id: 'professional' | 'homemaker' | 'graduate' | 'sales' | 'self-employed';
  title: string;
  label: string;
  doubt: string;
  path: string;
  firstStep: string;
  ctaMessage: string;
};

const iconMap = {
  professional: BriefcaseBusiness,
  homemaker: Home,
  graduate: GraduationCap,
  sales: HandCoins,
  'self-employed': Store,
};

/**
 * Self-qualification step: the visitor picks the situation closest to them and the
 * panel below swaps to that path. Implemented as an ARIA tablist.
 */
export default function PersonaJourney({ personas, whatsappNumber }: { personas: Persona[]; whatsappNumber: string }) {
  const [selectedId, setSelectedId] = useState<Persona['id']>(personas[0].id);
  const reduced = useReducedMotion();

  const persona = useMemo(
    () => personas.find((item) => item.id === selectedId) || personas[0],
    [personas, selectedId]
  );

  const whatsappHref = waLink(persona.ctaMessage, whatsappNumber);
  const transition = { duration: reduced ? 0.15 : 0.3, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <Section id="journey" tone="surface">
      <div className="shell">
        <SectionHeader
          eyebrow="Start where you are"
          title="Which starting point feels closest to you?"
          description="Not sure which role fits? Choose the closest option — the panel below changes to your path."
        />

        <div
          role="tablist"
          aria-label="Choose your starting point"
          className="snap-rail -mx-5 mt-10 px-5 pb-2 md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0"
        >
          {personas.map((item, index) => {
            const Icon = iconMap[item.id];
            const active = item.id === selectedId;

            return (
              <Reveal key={item.id} index={index} className="w-[72vw] max-w-[18rem] flex-shrink-0 md:w-auto md:max-w-none">
                <button
                  type="button"
                  role="tab"
                  id={`persona-tab-${item.id}`}
                  aria-selected={active}
                  aria-controls="persona-panel"
                  onClick={() => {
                    setSelectedId(item.id);
                    trackEvent('persona_select', { persona: item.id });
                  }}
                  className={`h-full w-full cursor-pointer rounded-2xl border p-5 text-left transition-[border-color,background-color,box-shadow] duration-200 ease-out ${
                    active
                      ? 'border-primary bg-primary-50 shadow-md'
                      : 'border-line bg-surface hover:border-primary-200 hover:bg-primary-50/50'
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200 ${
                      active ? 'bg-primary text-white' : 'bg-primary-50 text-primary'
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="mt-4 block font-headline text-base font-semibold text-content">{item.title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-content-muted">{item.label}</span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.05}>
          <div
            id="persona-panel"
            role="tabpanel"
            aria-labelledby={`persona-tab-${persona.id}`}
            className="relative mt-8 overflow-hidden rounded-3xl bg-ink text-white shadow-xl"
          >
            <div className="pointer-events-none absolute inset-0 ink-grid" aria-hidden />
            <div className="relative grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="border-b border-white/10 p-7 md:p-10 lg:border-b-0 lg:border-r">
                <p className="eyebrow-invert">The doubt usually sounds like</p>
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={persona.doubt}
                    initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -10 }}
                    transition={transition}
                    className="mt-5 font-headline text-h3 font-semibold leading-snug text-white"
                  >
                    “{persona.doubt}”
                  </motion.blockquote>
                </AnimatePresence>
                <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/55">
                  From “Can I do this?” to “I know my first step.”
                </p>
              </div>

              <div className="p-7 md:p-10">
                <p className="eyebrow-invert">Your path becomes practical</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={persona.id}
                    initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -12 }}
                    transition={transition}
                  >
                    <h3 className="mt-5 max-w-xl font-headline text-h3 font-semibold text-white">{persona.path}</h3>
                    <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/70">{persona.firstStep}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href={whatsappHref}
                    variant="whatsapp"
                    icon={<MessageCircle className="h-4 w-4" />}
                    track={{ location: 'persona_shift', ctaType: 'whatsapp', persona: persona.id }}
                  >
                    See my path
                  </Button>
                  <Button
                    href="#income-planner"
                    variant="onInk"
                    track={{ location: 'persona_shift', ctaType: 'calculator', persona: persona.id }}
                  >
                    Calculate my plan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
