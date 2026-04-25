'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play } from 'lucide-react';

interface AutoPlayVideoProps {
  videoId: string;
  title: string;
  description?: string;
}

export default function AutoPlayVideo({ videoId, title, description }: AutoPlayVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&modestbranding=1&rel=0&controls=1&fs=1`;

  const toggleMute = () => {
    setIsMuted((current) => !current);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '100px' }}
      className="overflow-hidden rounded-3xl border border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-white p-4 md:p-5"
    >
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Real Stories</p>
        <h2 className="mt-2 font-headline text-xl font-bold leading-tight text-on-surface md:text-2xl">{title}</h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-on-surface-variant">{description}</p>
        ) : null}
      </div>

          {/* Video Container */}
      <div className="relative w-full overflow-hidden rounded-xl bg-black/5">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {!isLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoaded(true)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
                aria-label="Play video"
              >
                <Play className="h-7 w-7 fill-white text-white" />
              </motion.button>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0">
                <div className="text-center">
                  <p className="text-sm font-bold text-white">Click to play</p>
                </div>
              </div>
            </div>
          ) : null}

          {isLoaded ? (
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs leading-relaxed text-on-surface-variant">
          <span className="font-semibold text-on-surface">Audio:</span> You can turn sound on after the video starts.
        </p>
        
        {isLoaded ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={toggleMute}
            className="flex flex-shrink-0 items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:bg-primary/20"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <>
                <VolumeX className="h-4 w-4" />
                <span className="text-sm font-semibold">Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                <span className="text-sm font-semibold">Mute</span>
              </>
            )}
          </motion.button>
        ) : null}
      </div>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="text-xs font-semibold text-amber-700">
          Real story from the mentor network. Individual results vary.
        </p>
      </div>
    </motion.div>
  );
}
