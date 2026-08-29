import { CalendarCheck, ClipboardList, MessageSquareText, Sparkles } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';

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

/** 180-day timeline. Horizontal snap rail on mobile, connected 5-up row on desktop. */
export default function TransformationJourney() {
  return (
    <Section tone="canvas">
      <div className="shell">
        <SectionHeader
          eyebrow="Transformation journey"
          title="Your first 180 days can have a rhythm."
          description="The journey should not feel like a jump into the unknown. It should feel like one supported step after another."
        />

        <div className="relative mt-12">
          {/* Connector line sits behind the cards on desktop only. */}
          <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-line lg:block" aria-hidden />
          <ol className="snap-rail -mx-5 px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <Reveal
                  as="li"
                  key={milestone.title}
                  index={index}
                  className="w-[74vw] max-w-[19rem] flex-shrink-0 lg:w-auto lg:max-w-none"
                >
                  <div className="card card-hover h-full p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-content-faint">
                        Step {index + 1}
                      </span>
                    </div>
                    <p className="mt-6 text-sm font-semibold text-primary">{milestone.day}</p>
                    <h3 className="mt-1.5 font-headline text-lg font-semibold text-content">{milestone.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-content-muted">{milestone.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
