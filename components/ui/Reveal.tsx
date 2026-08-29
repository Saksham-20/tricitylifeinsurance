'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger index — multiplied by 70ms. Cap at ~5 so late items don't lag. */
  index?: number;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
};

/**
 * Single scroll-reveal primitive. Opacity + small translate only (compositor-friendly),
 * fires once, and collapses to a plain fade when the user prefers reduced motion.
 */
export default function Reveal({ children, index = 0, delay = 0, y = 16, className = '', as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  const totalDelay = delay + Math.min(index, 5) * 0.07;

  return (
    <MotionTag
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      transition={{ duration: reduced ? 0.25 : 0.55, delay: totalDelay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
