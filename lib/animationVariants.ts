'use client';

import { Variants } from 'framer-motion';

// Container variants for staggered animations
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

export const containerVariantsMobile: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0,
    },
  },
};

// Item variants for fade-in + slide-up
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Hover scale for cards
export const hoverScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

// Active/press state for buttons
export const tapVariants: Variants = {
  rest: { scale: 1 },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.15,
    },
  },
};

// Pulse for CTAs
export const pulseVariants: Variants = {
  pulse: {
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: 1,
    },
  },
};

// Slide in from right (desktop float button)
export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.2,
    },
  },
};

// Slide up from bottom (mobile sticky bar)
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

// Shake for errors
export const shakeVariants: Variants = {
  shake: {
    x: [-2, 2, -2, 2, 0],
    transition: {
      duration: 0.3,
    },
  },
};

// Glow for input focus
export const glowVariants: Variants = {
  rest: { boxShadow: '0 0 0 0 rgba(2, 83, 205, 0)' },
  focus: {
    boxShadow: '0 0 0 3px rgba(2, 83, 205, 0.1)',
    transition: {
      duration: 0.15,
    },
  },
};
