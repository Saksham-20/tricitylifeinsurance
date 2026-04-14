'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (
  threshold = 0.2,
  onceOnly = true
) => {
  const ref = useRef(null);
  
  const isInView = useInView(ref, {
    once: onceOnly,
  });

  return { ref, isInView };
};
