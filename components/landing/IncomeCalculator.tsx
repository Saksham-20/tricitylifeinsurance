'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Clock3, TrendingUp, ShieldCheck } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type Path = 'agent' | 'bima-sakhi';

const MIN_WEEKLY_HOURS = 4;
const MAX_WEEKLY_HOURS = 30;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(value);

export default function IncomeCalculator() {
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [path, setPath] = useState<Path>('agent');

  const snapshot = useMemo(() => {
    // Dynamic calculations based on weekly hours
    const conversations = Math.max(16, weeklyHours * 5);
    const reviews = Math.max(2, Math.round(weeklyHours / 3));
    
    // Realistic earnings calculation with LOW and HIGH ranges
    // LOW scenario: 60% effort/completion rate
    // HIGH scenario: 100% effort/completion rate
    
    let monthlyLow, monthlyHigh;
    
    if (path === 'agent') {
      // LIC Agent: ₹1,200/hour (conservative, includes prep/travel/admin)
      const agentHourlyRate = 1200;
      const monthlyBase = weeklyHours * 4.33 * agentHourlyRate;
      monthlyLow = Math.round(monthlyBase * 0.6); // 60% effort
      monthlyHigh = Math.round(monthlyBase); // 100% effort
    } else {
      // Bima Sakhi: ₹7,000 stipend (year 1) + ₹1,000/hour commission
      const bimaStipend = 7000;
      const bimaHourlyRate = 1000;
      const monthlyCommission = weeklyHours * 4.33 * bimaHourlyRate;
      monthlyLow = Math.round(bimaStipend + monthlyCommission * 0.6); // 60% effort
      monthlyHigh = Math.round(bimaStipend + monthlyCommission); // 100% effort
    }
    
    const progress = Math.round(
      ((weeklyHours - MIN_WEEKLY_HOURS) / (MAX_WEEKLY_HOURS - MIN_WEEKLY_HOURS)) * 100
    );

    return {
      conversations,
      reviews,
      progress,
      monthlyLow,
      monthlyHigh,
    };
  }, [weeklyHours, path]);

  const choosePath = (nextPath: Path) => {
    setPath(nextPath);
    trackEvent('income_tool_path_select', {
      path: nextPath,
    });
  };

  const handleHoursChange = (hours: number) => {
    setWeeklyHours(hours);
    trackEvent('income_tool_hours_adjust', {
      hours,
      path,
    });
  };

  return (
    <section
      id="income-planner"
      className="scroll-mt-[var(--site-header-offset)] bg-[#08192f] px-6 py-10 text-white md:px-10 md:py-14"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase text-sky-200">
              <Calculator className="h-4 w-4" />
              Income planning tool
            </p>
            <h2 className="mt-2 font-headline text-2xl font-extrabold leading-[1.1] tracking-tight md:text-3xl">
              Explore a realistic earning path.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
              This is a planning tool, not a guarantee. Income is performance-linked, and actual results depend on activity, suitability, persistence, and LIC rules.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-[0_20px_54px_rgba(0,0,0,0.22)] backdrop-blur-md md:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_0.72fr]">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-white">Choose pathway</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      { id: 'agent' as Path, label: 'LIC Agent' },
                      { id: 'bima-sakhi' as Path, label: 'Bima Sakhi' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => choosePath(item.id)}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-bold transition-all ${
                          path === item.id
                            ? 'border-sky-300 bg-sky-300 text-[#061326]'
                            : 'border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="flex items-center justify-between gap-3 text-sm font-bold text-white">
                    Weekly time available
                    <span className="text-sky-300 text-lg">{weeklyHours}h</span>
                  </span>
                  <input
                    type="range"
                    min={MIN_WEEKLY_HOURS}
                    max={MAX_WEEKLY_HOURS}
                    step="1"
                    value={weeklyHours}
                    onChange={(event) => handleHoursChange(Number(event.target.value))}
                    className="mt-4 w-full accent-sky-300 cursor-pointer"
                  />
                  <p className="mt-2 text-xs text-white/50">Slide to see how your earnings grow →</p>
                </label>

                {path === 'bima-sakhi' ? (
                  <div className="rounded-xl border border-amber-200/25 bg-amber-200/10 p-3 text-sm leading-relaxed text-amber-50">
                    <p className="font-bold text-amber-100">Bima Sakhi Advantage:</p>
                    <p className="mt-2">₹7,000/month stipend (year 1) + commission + bonus, subject to LIC norms and performance conditions.</p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-sm leading-relaxed text-white/70">
                    <p className="font-bold text-white">LIC Agent Model:</p>
                    <p className="mt-2">Commission-based. Earnings depend on your activity, client relationships, policy quality, and LIC rules.</p>
                  </div>
                )}
              </div>

              <motion.div
                key={`${weeklyHours}-${path}`}
                initial={{ opacity: 0.7, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.22 }}
                className="rounded-3xl border border-white/10 bg-[#061326] p-4"
              >
                <div className="mx-auto flex aspect-square max-w-[176px] items-center justify-center rounded-full p-3"
                  style={{
                    background: `conic-gradient(#7dd3fc ${snapshot.progress * 3.6}deg, rgba(255,255,255,0.1) 0deg)`,
                  }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#061326] text-center">
                    <p className="text-xs font-bold uppercase text-white/50">Est. monthly</p>
                    <motion.div
                      key={`${snapshot.monthlyLow}-${snapshot.monthlyHigh}`}
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-center"
                    >
                      <p className="font-headline text-sm font-extrabold tracking-[0] text-sky-300">
                        ₹{formatCurrency(snapshot.monthlyLow)}
                      </p>
                      <p className="text-xs text-white/50 my-1">to</p>
                      <p className="font-headline text-sm font-extrabold tracking-[0] text-sky-300">
                        ₹{formatCurrency(snapshot.monthlyHigh)}
                      </p>
                    </motion.div>
                    <p className="mt-2 text-xs text-white/50">{snapshot.progress}% time selected</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-5 w-5 text-sky-200" />
                    <p className="text-sm text-white/70">
                      Plan for around <span className="font-bold text-sky-300">{snapshot.conversations}</span> meaningful conversations per month.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="mt-0.5 h-5 w-5 text-sky-200" />
                    <p className="text-sm text-white/70">
                      Keep <span className="font-bold text-sky-300">{snapshot.reviews}</span> mentor review sessions on the calendar.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-sky-200" />
                    <p className="text-sm text-white/70">
                      Use this as a discussion starter, not an income promise.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Legal Disclaimer */}
            <div className="mt-4 rounded-xl border border-orange-200/30 bg-orange-50/10 p-3 text-xs leading-relaxed text-orange-100/90">
              <div className="flex gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-100" />
                <div>
                  <p className="font-bold text-orange-100 mb-1">Earnings Disclaimer</p>
                  <p>Ranges shown are <strong>illustrative only</strong> based on activity scenarios. Actual income depends on consistency, client suitability, market conditions, policy completion rates, and LIC performance rules. Discuss realistic targets with your mentor before committing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
