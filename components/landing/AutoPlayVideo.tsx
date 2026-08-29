'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface AutoPlayVideoProps {
  videoId: string;
  title: string;
  description?: string;
  showIntro?: boolean;
}

/** Lazily mounts the YouTube embed once in view (always on mobile) to protect LCP. */
export default function AutoPlayVideo({ videoId, title, description, showIntro = true }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isInView = useInView(videoRef, { once: true, amount: 0.45 });
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileView, setIsMobileView] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(max-width: 767px)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobileView(mediaQuery.matches);
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  const shouldLoadVideo = isMobileView || isInView;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&modestbranding=1&rel=0&controls=1&fs=1&enablejsapi=1`;

  const toggleMute = () => {
    const frameWindow = iframeRef.current?.contentWindow;
    if (!frameWindow) return;
    frameWindow.postMessage(
      JSON.stringify({ event: 'command', func: isMuted ? 'unMute' : 'mute', args: [] }),
      '*'
    );
    setIsMuted((prev) => !prev);
  };

  return (
    <figure className="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
      {showIntro ? (
        <figcaption className="border-b border-line px-5 py-4 md:px-6 md:py-5">
          <p className="text-eyebrow font-semibold uppercase text-gold-700">Real stories</p>
          <p className="mt-2 font-headline text-lg font-semibold text-content">{title}</p>
          {description ? <p className="mt-2 text-sm leading-relaxed text-content-muted">{description}</p> : null}
        </figcaption>
      ) : null}

      <div ref={videoRef} className="relative w-full bg-ink">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {shouldLoadVideo ? (
            <>
              <iframe
                ref={iframeRef}
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading={isMobileView ? 'eager' : 'lazy'}
                className="absolute inset-0 h-full w-full border-0"
              />
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                className="absolute right-3 top-3 z-10 flex cursor-pointer items-center gap-2 rounded-full bg-ink/70 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-ink/90 md:hidden"
              >
                {isMuted ? <VolumeX className="h-4 w-4" aria-hidden /> : <Volume2 className="h-4 w-4" aria-hidden />}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
            </>
          ) : (
            <div className="absolute inset-0 animate-pulse bg-ink-soft" aria-hidden />
          )}
        </div>
      </div>
    </figure>
  );
}
