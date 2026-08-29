import type { ReactNode } from 'react';

type Tone = 'primary' | 'gold' | 'ink' | 'invert' | 'neutral';

const tones: Record<Tone, string> = {
  primary: 'border-primary-200 bg-primary-50 text-primary-700',
  gold: 'border-gold-200 bg-gold-50 text-gold-700',
  ink: 'border-ink/10 bg-ink/[0.04] text-content',
  invert: 'border-white/20 bg-white/10 text-white backdrop-blur-sm',
  neutral: 'border-line bg-surface text-content-muted',
};

/** Small labelled chip: eligibility markers, tags, and inline trust cues. */
export default function Pill({
  children,
  tone = 'primary',
  icon,
  className = '',
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
