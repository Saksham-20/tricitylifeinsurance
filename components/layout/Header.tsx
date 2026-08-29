'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, MessageCircle, Phone, ShieldCheck, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';
import { site, telLink, waLink } from '@/lib/site';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Career in LIC', href: '/career-in-lic' },
  { label: 'Bima Sakhi', href: '/bima-sakhi' },
  { label: 'MDRT', href: '/mdrt' },
  { label: 'About', href: '/about' },
];

const whatsappHref = waLink('Hi, I would like to know more about LIC career opportunities.');

export default function Header() {
  const pathname = usePathname();
  // The sheet is "open for" a specific route, so navigating closes it without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the open sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-nav transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
        scrolled ? 'border-b border-line bg-surface/90 shadow-sm backdrop-blur-xl' : 'border-b border-transparent bg-canvas/70 backdrop-blur-md'
      }`}
    >
      <div className="shell flex h-[var(--site-header-offset)] items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.mentor} — home`}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-primary-md transition-colors duration-200 group-hover:bg-primary-700 md:h-11 md:w-11">
            <ShieldCheck className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-headline text-[0.98rem] font-semibold leading-tight tracking-tight text-content md:text-lg">
              {site.mentor}
            </span>
            <span className="block truncate text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary md:text-[0.72rem]">
              {site.tagline} · Tricity
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  active ? 'text-primary' : 'text-content-muted hover:bg-primary-50 hover:text-content'
                }`}
              >
                {item.label}
                {active ? (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-primary" aria-hidden />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            href={whatsappHref}
            variant="secondary"
            size="sm"
            icon={<MessageCircle className="h-4 w-4" />}
            track={{ location: 'header', ctaType: 'whatsapp' }}
          >
            WhatsApp
          </Button>
          <Button href="/apply" size="sm" showArrow track={{ location: 'header', ctaType: 'apply' }}>
            Apply
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telLink}
            onClick={() => trackEvent('cta_click', { location: 'header_mobile', cta_type: 'call' })}
            aria-label={`Call ${site.phoneDisplay}`}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-primary transition-colors hover:bg-primary-50"
          >
            <Phone className="h-5 w-5" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpenFor((prev) => (prev === pathname ? null : pathname))}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-content transition-colors hover:bg-primary-50"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="max-h-[calc(100svh-var(--site-header-offset))] overflow-y-auto border-t border-line bg-surface px-5 pb-8 pt-4 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-xl px-4 py-3.5 text-[0.95rem] font-medium transition-colors ${
                    active ? 'bg-primary-50 text-primary' : 'text-content hover:bg-surface-sunken'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <Button href="/apply" fullWidth showArrow track={{ location: 'mobile_menu', ctaType: 'apply' }}>
              Apply for a callback
            </Button>
            <Button
              href={whatsappHref}
              variant="secondary"
              fullWidth
              icon={<MessageCircle className="h-4 w-4" />}
              track={{ location: 'mobile_menu', ctaType: 'whatsapp' }}
            >
              Talk on WhatsApp
            </Button>
          </div>
          <p className="mt-5 text-center text-sm text-content-muted">
            {site.hours} · <a href={telLink} className="font-semibold text-primary">{site.phoneDisplay}</a>
          </p>
        </div>
      ) : null}
    </header>
  );
}
