'use client';

import FadeInOnScroll from '@/components/ui/FadeInOnScroll';
import { Award, BriefcaseBusiness, CalendarClock, GraduationCap } from 'lucide-react';

const stats = [
  {
    number: '28+',
    label: 'Years of Mentorship',
    detail: 'Structured coaching rooted in real LIC field experience.',
    icon: BriefcaseBusiness,
  },
  {
    number: '300+',
    label: 'Advisors Trained',
    detail: 'A strong network built through personal guidance and trust.',
    icon: GraduationCap,
  },
  {
    number: '60+',
    label: 'Active Team Strength',
    detail: 'A growing team across Chandigarh, Mohali, and Panchkula.',
    icon: Award,
  },
  {
    number: '6',
    label: 'Days of Weekly Support',
    detail: 'Consistent availability for reviews, queries, and planning.',
    icon: CalendarClock,
  },
];

export default function StatsSection() {
  return (
    <section className="px-6 py-3 md:px-8 md:py-4">
      <div className="mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="surface-panel rounded-[2rem] px-5 py-6 md:px-6 md:py-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-[1.5rem] border border-white/75 bg-white/90 p-5 shadow-[0_10px_24px_rgba(15,24,41,0.05)]"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="font-headline text-3xl font-extrabold text-on-surface md:text-4xl">{stat.number}</p>
                    <p className="mt-2 text-sm font-semibold text-on-surface">{stat.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{stat.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
