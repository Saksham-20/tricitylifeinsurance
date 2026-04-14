'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { useResponsiveMotion } from '@/hooks/useResponsiveMotion';
import FadeInOnScroll from './FadeInOnScroll';

interface AnimatedStatProps {
  number: string | number;
  label: string;
  icon?: string;
  delay?: number;
  dark?: boolean;
}

export default function AnimatedStat({
  number,
  label,
  delay = 0,
  dark = false,
}: AnimatedStatProps) {
  const intensity = useResponsiveMotion();
  const countUpRef = useCountUp(number, 1.2, intensity === 'full');

  // Format the number display
  const displayNumber = typeof number === 'string' ? number : `${number}+`;

  return (
    <FadeInOnScroll delay={delay} duration={0.6} direction="up" threshold={0.2}>
      <div className="flex flex-col items-center text-center gap-3">
        {/* Thin accent line */}
        <div className={`h-0.5 w-10 rounded-full ${dark ? 'bg-white/20' : 'bg-primary/20'} mb-1`} />
        <div
          ref={intensity === 'full' ? countUpRef : undefined}
          className={`text-4xl md:text-5xl lg:text-6xl font-extrabold ${
            dark ? 'text-white' : 'text-on-surface'
          }`}
        >
          {intensity === 'full' ? '0' : displayNumber}
        </div>
        <p className={`text-sm font-medium ${dark ? 'text-white/50' : 'text-on-surface-variant'}`}>
          {label}
        </p>
      </div>
    </FadeInOnScroll>
  );
}
