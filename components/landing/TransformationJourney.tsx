import { CalendarCheck, ClipboardList, MessageSquareText, Sparkles } from 'lucide-react';

const milestones = [
  {
    day: 'Day 1',
    title: 'Clarity call',
    copy: 'Understand role fit, eligibility, time comfort, and which path makes sense.',
    icon: MessageSquareText,
  },
  {
    day: 'Week 1',
    title: 'Paperwork rhythm',
    copy: 'Prepare documents without confusion and know what happens at each step.',
    icon: ClipboardList,
  },
  {
    day: 'Weeks 2-4',
    title: 'Training focus',
    copy: 'Move through training and IC38 preparation with a clear study plan.',
    icon: CalendarCheck,
  },
  {
    day: 'Days 30-90',
    title: 'First conversations',
    copy: 'Learn how to speak with people respectfully, simply, and confidently.',
    icon: MessageSquareText,
  },
  {
    day: 'Days 90-180',
    title: 'Review habit',
    copy: 'Build weekly activity, mentor reviews, and a repeatable confidence loop.',
    icon: Sparkles,
  },
];

export default function TransformationJourney() {
  return (
    <section className="overflow-hidden bg-[#f6f8fc] px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Transformation journey</p>
          <h2 className="mt-4 font-headline text-2xl font-extrabold leading-[1.08] tracking-[0] text-on-surface md:text-4xl">
            Your first 180 days can have a rhythm.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-on-surface-variant md:text-base">
            The journey should not feel like a jump into the unknown. It should feel like one supported step after another.
          </p>
        </div>

        <div className="hide-scrollbar mt-8 overflow-x-auto pb-4">
          <div className="flex min-w-max snap-x snap-mandatory gap-3 lg:grid lg:min-w-0 lg:grid-cols-5 lg:gap-4">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;

              return (
                <article
                  key={milestone.title}
                  className="relative min-h-[250px] w-[78vw] max-w-[320px] snap-center rounded-3xl border border-primary/10 bg-white p-5 shadow-[0_12px_30px_rgba(15,24,41,0.055)] sm:w-[320px] lg:w-auto lg:max-w-none"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-primary/[0.08] px-4 py-2 text-sm font-bold text-primary">
                      {milestone.day}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#071730] text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="mt-8 text-sm font-bold uppercase text-on-surface-variant">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 font-headline text-lg font-bold leading-tight tracking-[0] text-on-surface">
                    {milestone.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
                    {milestone.copy}
                  </p>
                  {index < milestones.length - 1 ? (
                    <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-primary/20 lg:block" />
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
