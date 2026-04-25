'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

interface AutoPlayVideoProps {
  videoId: string;
  title: string;
  description?: string;
  showIntro?: boolean;
}

export default function AutoPlayVideo({ videoId, title, description, showIntro = true }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(videoRef, { once: true, amount: 0.45 });
  const [isMobileView, setIsMobileView] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const syncViewport = () => {
      setIsMobileView(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', syncViewport);

    return () => {
      mediaQuery.removeEventListener('change', syncViewport);
    };
  }, []);

  const shouldLoadVideo = isMobileView || isInView;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&modestbranding=1&rel=0&controls=1&fs=1`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '100px' }}
      className="overflow-hidden rounded-3xl border border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-white p-4 md:p-5"
    >
      {showIntro ? (
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Real Stories</p>
          <h2 className="mt-2 font-headline text-xl font-bold leading-tight text-on-surface md:text-2xl">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant">{description}</p>
          ) : null}
        </div>
      ) : null}

          {/* Video Container */}
      <div ref={videoRef} className="relative w-full overflow-hidden rounded-xl bg-black/5">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {shouldLoadVideo ? (
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading={isMobileView ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
