'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type LandingCtaProps = {
  href: string;
  children: ReactNode;
  location: string;
  ctaType: string;
  variant?: 'primary' | 'secondary' | 'dark' | 'whatsapp' | 'quiet';
  className?: string;
  showArrow?: boolean;
};

const variantClasses = {
  primary:
    'bg-primary text-white shadow-[0_18px_44px_rgba(2,83,205,0.28)] hover:translate-y-[-1px] hover:shadow-[0_22px_54px_rgba(2,83,205,0.34)]',
  secondary:
    'border border-primary/[0.18] bg-white/[0.88] text-on-surface shadow-[0_14px_34px_rgba(15,24,41,0.08)] hover:border-primary/[0.35] hover:bg-white',
  dark:
    'border border-white/[0.24] bg-white/[0.08] text-white backdrop-blur-md hover:border-white/[0.36] hover:bg-white/[0.16]',
  whatsapp:
    'bg-[#167C3A] text-white shadow-[0_14px_30px_rgba(22,124,58,0.28)] hover:bg-[#126C32]',
  quiet:
    'text-primary hover:bg-primary/[0.06]',
};

export default function LandingCta({
  href,
  children,
  location,
  ctaType,
  variant = 'primary',
  className = '',
  showArrow = true,
}: LandingCtaProps) {
  const classes = [
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-center font-headline text-sm font-bold transition-all duration-300 md:min-h-12 md:px-6 md:py-3 md:text-base',
    variantClasses[variant],
    className,
  ].join(' ');

  const handleClick = () => {
    trackEvent('cta_click', {
      location,
      cta_type: ctaType,
    });
  };

  const icon = variant === 'whatsapp' ? <MessageCircle className="h-4 w-4" /> : null;
  const arrow = showArrow ? <ArrowRight className="h-4 w-4" /> : null;

  if (href.startsWith('/')) {
    return (
      <Link href={href} onClick={handleClick} className={classes}>
        {icon}
        <span className="inline-flex items-center gap-2">{children}</span>
        {arrow}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={classes}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
    >
      {icon}
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow}
    </a>
  );
}
