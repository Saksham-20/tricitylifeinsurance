'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin reading-progress bar under the header. The storytelling layout is long;
 * this gives visitors a sense of how much is left.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-nav h-0.5 origin-left bg-gradient-to-r from-primary via-primary-400 to-gold-400"
    />
  );
}
