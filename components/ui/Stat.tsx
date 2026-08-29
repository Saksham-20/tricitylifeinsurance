'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type StatProps = {
  value: string;
  label: string;
  invert?: boolean;
  className?: string;
};

/**
 * Counts up the numeric part of a value (e.g. "300+" -> 0…300, keeping the "+"),
 * once, when scrolled into view. Non-numeric values render as-is.
 */
export default function Stat({ value, label, invert = false, className = '' }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  // Only count values that START with a number ("300+", "3 Years"). Anything with a
  // prefix ("Since 1997", "₹7,000/mo") is a label, not a quantity — render it verbatim.
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, '')) : null;
  const [counted, setCounted] = useState(0);
  // Only the animated case needs state; everything else is derived at render.
  const animating = target !== null && !reduced;
  const display = animating ? (inView ? counted : 0) : target;

  useEffect(() => {
    if (!animating || !inView) return;

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounted(Math.round((target as number) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animating, inView, target]);

  const rendered =
    target === null ? value : `${(display ?? target).toLocaleString('en-IN')}${match?.[2] ?? ''}`;

  return (
    <div ref={ref} className={className}>
      <p
        className={`font-headline text-[1.75rem] font-semibold tracking-tight tabular-nums md:text-[2.15rem] ${
          invert ? 'text-white' : 'text-content'
        }`}
      >
        {rendered}
      </p>
      <p className={`mt-1.5 text-sm ${invert ? 'text-white/60' : 'text-content-muted'}`}>{label}</p>
    </div>
  );
}
