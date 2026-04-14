'use client';

import { useEffect, useState } from 'react';

type MotionIntensity = 'full' | 'reduced' | 'minimal';

const getMotionIntensity = (): MotionIntensity => {
  if (typeof window === 'undefined') {
    return 'full';
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return 'minimal';
  }

  return window.innerWidth < 768 ? 'reduced' : 'full';
};

export const useResponsiveMotion = (): MotionIntensity => {
  const [intensity, setIntensity] = useState<MotionIntensity>(getMotionIntensity);

  useEffect(() => {
    const handleResize = () => {
      setIntensity(getMotionIntensity());
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      setIntensity(getMotionIntensity());
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return intensity;
};

// Animation timings based on device
export const getAnimationConfig = (intensity: MotionIntensity) => {
  const configs = {
    full: {
      duration: 0.6,
      staggerDelay: 0.1,
      maxStaggerItems: 5,
    },
    reduced: {
      duration: 0.4,
      staggerDelay: 0.15,
      maxStaggerItems: 3,
    },
    minimal: {
      duration: 0,
      staggerDelay: 0,
      maxStaggerItems: 0,
    },
  };

  return configs[intensity];
};
