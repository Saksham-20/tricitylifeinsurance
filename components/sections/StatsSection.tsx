'use client';

import FadeInOnScroll from '@/components/ui/FadeInOnScroll';

const stats = [
  { number: '25+', label: 'Years of Mentorship' },
  { number: '300+', label: 'Advisors Trained' },
  { number: '60+', label: 'Active Team Strength' },
  { number: '6', label: 'Days of Weekly Support' },
];

export default function StatsSection() {
  return (
    <section className="py-4 md:py-6 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeInOnScroll>
          <div className="rounded-2xl border border-outline-variant/20 bg-white/80 backdrop-blur-sm px-6 py-8 md:py-10 shadow-elevation-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center text-center gap-1.5 ${
                    index < stats.length - 1 ? 'lg:border-r lg:border-outline-variant/20' : ''
                  }`}
                >
                  <span className="text-3xl md:text-4xl font-extrabold text-primary">
                    {stat.number}
                  </span>
                  <span className="text-xs md:text-sm font-medium text-on-surface-variant">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
