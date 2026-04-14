'use client';

import { useEffect, useState } from 'react';

type MotionIntensity = 'full' | 'reduced' | 'minimal';

export const useResponsiveMotion = (): MotionIntensity => {
  const [intensity, setIntensity] = useState<MotionIntensity>('full');

  useEffect(() => {
    // Check if prefers-reduced-motion is set
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIntensity('minimal');
      return;
    }

    // Check device type via viewport width
    const width = window.innerWidth;
    if (width < 768) {
      // Mobile: reduced animations
      setIntensity('reduced');
    } else {
      // Desktop: full animations
      setIntensity('full');
    }

    // Listen for resize and reduced-motion changes
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setIntensity('reduced');
      } else {
        setIntensity('full');
      }
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIntensity(e.matches ? 'minimal' : intensity);
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [intensity]);

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
