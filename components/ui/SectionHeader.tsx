import type { ReactNode } from 'react';
import Reveal from '@/components/ui/Reveal';

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  invert?: boolean;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  aside?: ReactNode;
};

/** Eyebrow + heading + description, used by every band so headings stay consistent. */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  invert = false,
  as: Heading = 'h2',
  className = '',
  aside,
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'mx-auto max-w-3xl text-center items-center' : 'max-w-3xl';
  // Explicit map — Tailwind cannot see classes built by string interpolation.
  const sizeClass = Heading === 'h1' ? 'text-h1' : Heading === 'h3' ? 'text-h3' : 'text-h2';

  return (
    <div className={`flex flex-col gap-6 ${aside ? 'lg:flex-row lg:items-end lg:justify-between lg:gap-12' : ''} ${className}`}>
      <Reveal className={`flex flex-col ${alignment}`}>
        {eyebrow ? <p className={invert ? 'eyebrow-invert' : 'eyebrow'}>{eyebrow}</p> : null}
        <Heading
          className={`mt-4 ${sizeClass} font-semibold ${invert ? 'text-white' : 'text-content'}`}
        >
          {title}
        </Heading>
        {description ? (
          <p className={`mt-4 text-lead ${invert ? 'text-white/70' : 'text-content-muted'} ${align === 'center' ? 'mx-auto' : ''} max-w-prose`}>
            {description}
          </p>
        ) : null}
      </Reveal>
      {aside ? <Reveal delay={0.08} className="lg:max-w-sm lg:shrink-0">{aside}</Reveal> : null}
    </div>
  );
}
