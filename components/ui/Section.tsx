import type { ElementType, ReactNode } from 'react';

type Tone = 'canvas' | 'surface' | 'tint' | 'ink' | 'gold';

const tones: Record<Tone, string> = {
  canvas: 'bg-canvas text-content',
  surface: 'bg-surface text-content',
  tint: 'bg-surface-tint text-content',
  ink: 'bg-ink text-white',
  gold: 'bg-gold-50 text-content',
};

type SectionProps = {
  children: ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  /** Adds a faint grid texture appropriate to the tone. */
  texture?: boolean;
  tight?: boolean;
  as?: ElementType;
};

/** Full-bleed band with consistent vertical rhythm and a fixed set of tones. */
export default function Section({
  children,
  tone = 'canvas',
  id,
  className = '',
  texture = false,
  tight = false,
  as: Tag = 'section',
}: SectionProps) {
  const textureClass = texture ? (tone === 'ink' ? 'ink-grid' : 'tint-grid') : '';

  return (
    <Tag
      id={id}
      className={`relative isolate ${tones[tone]} ${tight ? 'section-tight' : 'section'} ${id ? 'scroll-anchor' : ''} ${className}`}
    >
      {texture ? <div className={`pointer-events-none absolute inset-0 -z-10 ${textureClass}`} aria-hidden /> : null}
      {children}
    </Tag>
  );
}
