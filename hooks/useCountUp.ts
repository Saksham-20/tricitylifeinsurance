'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useCountUp = (
  targetValue: number | string,
  duration = 1.2,
  enabled = true
) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const numValue = typeof targetValue === 'string'
      ? parseInt(targetValue.replace(/\D/g, ''), 10)
      : targetValue;

    gsap.to(elementRef.current, {
      textContent: numValue,
      duration,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, [targetValue, duration, enabled]);

  return elementRef;
};
