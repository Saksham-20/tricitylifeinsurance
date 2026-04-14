'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type Direction = 'up' | 'left' | 'right' | 'down';

interface FadeInOnScrollProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export default function FadeInOnScroll({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 40,
  threshold = 0.2,
  once = true,
  className = '',
}: FadeInOnScrollProps) {
  const { ref, isInView } = useScrollAnimation(threshold, once);

  const directionMap: Record<Direction, Record<string, number>> = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const { x = 0, y = 0 } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
