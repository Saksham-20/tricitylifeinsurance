'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'onInk' | 'onInkSolid' | 'gold';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-white shadow-primary-md hover:bg-primary-700 hover:shadow-primary-lg active:bg-primary-800',
  secondary:
    'border border-line-strong bg-surface text-content hover:border-primary-300 hover:bg-primary-50 active:bg-primary-100',
  ghost: 'text-primary hover:bg-primary-50 active:bg-primary-100',
  whatsapp: 'bg-whatsapp text-white shadow-md hover:bg-whatsapp-dark',
  onInk: 'border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-white/45 hover:bg-white/[0.18]',
  onInkSolid: 'bg-white text-ink hover:bg-primary-50',
  gold: 'bg-gold-500 text-ink shadow-md hover:bg-gold-400',
};

const sizes: Record<Size, string> = {
  sm: 'min-h-[2.75rem] gap-1.5 px-4 text-sm',
  md: 'min-h-[3rem] gap-2 px-5 text-[0.95rem] md:px-6',
  lg: 'min-h-[3.5rem] gap-2.5 px-6 text-base md:px-8 md:text-lg',
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
  showArrow?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  /** Fires a `cta_click` analytics event with this location. */
  track?: { location: string; ctaType: string; [key: string]: string };
};

type AnchorProps = BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps | 'href'>;
type ButtonProps = BaseProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<'button'>, keyof BaseProps>;

const classesFor = (variant: Variant, size: Size, fullWidth: boolean, className: string) =>
  [
    'group inline-flex cursor-pointer items-center justify-center rounded-xl font-headline font-semibold',
    'transition-[background-color,border-color,box-shadow,color] duration-200 ease-out',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3',
    'disabled:cursor-not-allowed disabled:opacity-55',
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

/**
 * The one button in the system. Renders <button>, <Link>, or <a> depending on `href`.
 * Arrow nudges on hover — never scales, so hovering can't shift layout.
 */
export default function Button(props: AnchorProps | ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    icon,
    showArrow = false,
    loading = false,
    fullWidth = false,
    className = '',
    track,
    ...rest
  } = props as BaseProps & Record<string, unknown>;

  const classes = classesFor(variant, size, fullWidth, className);

  const body = loading ? (
    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
  ) : (
    <>
      {icon ? <span className="flex-shrink-0">{icon}</span> : null}
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          className="h-4 w-4 flex-shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none"
          aria-hidden
        />
      ) : null}
    </>
  );

  const onActivate = () => {
    if (track) {
      const { location, ctaType, ...extra } = track;
      trackEvent('cta_click', { location, cta_type: ctaType, ...extra });
    }
  };

  const href = (rest as { href?: string }).href;

  if (typeof href === 'string') {
    // `href` is pulled out of the rest props so it isn't spread twice.
    const { onClick, href: _, ...anchorRest } = rest as ComponentPropsWithoutRef<'a'> & { href: string };
    void _;
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onActivate();
      onClick?.(event);
    };

    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <Link href={href} className={classes} onClick={handleClick} {...anchorRest}>
          {body}
        </Link>
      );
    }

    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        onClick={handleClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        {...anchorRest}
      >
        {body}
      </a>
    );
  }

  const { onClick, disabled, type = 'button', ...buttonRest } = rest as ComponentPropsWithoutRef<'button'>;
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={(event) => {
        onActivate();
        onClick?.(event);
      }}
      {...buttonRest}
    >
      {body}
    </button>
  );
}
