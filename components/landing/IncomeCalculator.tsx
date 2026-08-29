'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calculator, Clock3, Info, TrendingUp } from 'lucide-react';
import Section from '@/components/ui/Section';
import Reveal from '@/components/ui/Reveal';
import { trackEvent } from '@/lib/analytics';

type Path = 'agent' | 'bima-sakhi';

const MIN_WEEKLY_HOURS = 4;
const MAX_WEEKLY_HOURS = 30;

const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);

/**
 * Permissionless lead capture: visitors self-qualify on time and path before
 * ever contacting the mentor. Illustrative only — the disclaimer is part of the UI.
 */
export default function IncomeCalculator() {
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [path, setPath] = useState<Path>('agent');
  const reduced = useReducedMotion();

  const snapshot = useMemo(() => {
    const conversations = Math.max(16, weeklyHours * 5);
    const reviews = Math.max(2, Math.round(weeklyHours / 3));

    // LOW = 60% effort/completion, HIGH = 100%.
    let monthlyLow: number;
    let monthlyHigh: number;

    if (path === 'agent') {
      // LIC Agent: ₹1,200/hour (conservative, includes prep/travel/admin)
      const monthlyBase = weeklyHours * 4.33 * 1200;
      monthlyLow = Math.round(monthlyBase * 0.6);
      monthlyHigh = Math.round(monthlyBase);
    } else {
      // Bima Sakhi: ₹7,000 stipend (year 1) + ₹1,000/hour commission
      const monthlyCommission = weeklyHours * 4.33 * 1000;
      monthlyLow = Math.round(7000 + monthlyCommission * 0.6);
      monthlyHigh = Math.round(7000 + monthlyCommission);
    }

    const progress = Math.round(((weeklyHours - MIN_WEEKLY_HOURS) / (MAX_WEEKLY_HOURS - MIN_WEEKLY_HOURS)) * 100);

    return { conversations, reviews, progress, monthlyLow, monthlyHigh };
  }, [weeklyHours, path]);

  return (
    <Section id="income-planner" tone="ink" texture>
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow-invert">
            <Calculator className="h-4 w-4" aria-hidden />
            Income planning tool
          </p>
          <h2 className="mt-4 text-h2 font-semibold text-white">Explore a realistic earning path.</h2>
          <p className="mt-5 max-w-md text-lead text-white/70">
            This is a planning tool, not a guarantee. Income is performance-linked, and actual results depend on
            activity, suitability, persistence, and LIC rules.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-8">
            <div>
              <dt className="text-sm text-white/50">Conversations / month</dt>
              <dd className="mt-1 flex items-center gap-2 font-headline text-xl font-semibold text-white tabular-nums">
                <Clock3 className="h-4 w-4 text-primary-300" aria-hidden />~{snapshot.conversations}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-white/50">Mentor reviews</dt>
              <dd className="mt-1 flex items-center gap-2 font-headline text-xl font-semibold text-white tabular-nums">
                <TrendingUp className="h-4 w-4 text-primary-300" aria-hidden />
                {snapshot.reviews}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card-ink p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-center">
              <div className="space-y-7">
                <fieldset>
                  <legend className="text-sm font-semibold text-white">Choose pathway</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-1">
                    {(
                      [
                        { id: 'agent', label: 'LIC Agent' },
                        { id: 'bima-sakhi', label: 'Bima Sakhi' },
                      ] as { id: Path; label: string }[]
                    ).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={path === item.id}
                        onClick={() => {
                          setPath(item.id);
                          trackEvent('income_tool_path_select', { path: item.id });
                        }}
                        className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                          path === item.id ? 'bg-white text-ink' : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="weekly-hours" className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-white">Weekly time available</span>
                    <span className="font-headline text-xl font-semibold text-primary-300 tabular-nums">
                      {weeklyHours}h
                    </span>
                  </label>
                  <input
                    id="weekly-hours"
                    type="range"
                    min={MIN_WEEKLY_HOURS}
                    max={MAX_WEEKLY_HOURS}
                    step={1}
                    value={weeklyHours}
                    onChange={(event) => {
                      const hours = Number(event.target.value);
                      setWeeklyHours(hours);
                      trackEvent('income_tool_hours_adjust', { hours, path });
                    }}
                    className="mt-4 w-full cursor-pointer"
                    aria-describedby="weekly-hours-hint"
                  />
                  <p id="weekly-hours-hint" className="mt-2 text-xs text-white/45">
                    Slide to see how the estimate changes.
                  </p>
                </div>

                <p className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-[0.82rem] leading-relaxed text-white/65">
                  {path === 'bima-sakhi' ? (
                    <>
                      <span className="font-semibold text-gold-300">Bima Sakhi advantage: </span>
                      ₹7,000/month stipend (year 1) + commission + bonus, subject to LIC norms.
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-white">LIC Agent model: </span>
                      Commission-based. Earnings depend on your activity, client relationships, and LIC rules.
                    </>
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-ink p-6 text-center">
                <div
                  className="mx-auto flex aspect-square w-full max-w-[13rem] items-center justify-center rounded-full p-2.5 transition-[background] duration-300"
                  style={{
                    background: `conic-gradient(#5C89FA ${snapshot.progress * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
                  }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-ink">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                      Est. monthly
                    </p>
                    <motion.div
                      key={`${snapshot.monthlyLow}-${snapshot.monthlyHigh}`}
                      initial={reduced ? false : { opacity: 0.55 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2"
                    >
                      <p className="font-headline text-lg font-semibold text-white tabular-nums">
                        ₹{formatCurrency(snapshot.monthlyLow)}
                      </p>
                      <p className="my-0.5 text-[0.65rem] text-white/40">to</p>
                      <p className="font-headline text-lg font-semibold text-primary-300 tabular-nums">
                        ₹{formatCurrency(snapshot.monthlyHigh)}
                      </p>
                    </motion.div>
                    <p className="mt-2 text-[0.65rem] text-white/40 tabular-nums">{snapshot.progress}% of max time</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 flex gap-3 rounded-xl border border-gold-500/25 bg-gold-500/[0.08] p-4 text-xs leading-relaxed text-gold-100">
              <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-300" aria-hidden />
              <span>
                <span className="font-semibold text-gold-200">Illustrative only. </span>
                Not an income promise. Actual earnings depend on activity, suitability, conditions, and LIC rules.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
