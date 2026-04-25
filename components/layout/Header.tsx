'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Shield, MessageCircle, Menu, X, MapPin, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Career in LIC', href: '/career-in-lic' },
  { label: 'Bima Sakhi', href: '/bima-sakhi' },
  { label: 'MDRT', href: '/mdrt' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    trackEvent('cta_click', {
      location: 'header',
      cta_type: 'whatsapp',
      page: pathname,
    });
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
    const message = encodeURIComponent('Hi, I would like to know more about LIC career opportunities.');
    window.open(`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`, '_blank');
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'border-b border-primary/10 bg-white/92 backdrop-blur-xl shadow-[0_8px_40px_rgba(15,24,41,0.08)]'
        : 'border-b border-transparent bg-white/72 backdrop-blur-lg'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 md:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-gradient-to-br from-primary to-primary-dim text-white shadow-[0_14px_24px_rgba(2,83,205,0.22)] transition-transform group-hover:scale-105">
            <Shield className="h-5 w-5" fill="currentColor" />
          </div>
          <div>
            <p className="font-headline text-lg font-extrabold tracking-tight text-on-surface md:text-xl">Subhash Panjla</p>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
              <span>LIC Career Mentor</span>
              <span className="hidden h-1 w-1 rounded-full bg-primary/40 md:block" />
              <span className="hidden items-center gap-1 text-on-surface-variant md:inline-flex">
                <MapPin className="h-3 w-3" />
                Chandigarh Tricity
              </span>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/80 bg-white/72 px-2 py-2 shadow-[0_12px_32px_rgba(15,24,41,0.06)] lg:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  active ? 'bg-primary text-white shadow-[0_10px_18px_rgba(2,83,205,0.2)]' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleWhatsAppClick}
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2.5 font-headline text-sm font-bold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/10"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
          <Link
            href="/apply"
            onClick={() =>
              trackEvent('cta_click', {
                location: 'header',
                cta_type: 'apply',
                page: pathname,
              })
            }
            className="ml-1 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#1a6fff] px-5 py-2.5 font-headline text-sm font-bold text-white shadow-[0_10px_24px_rgba(2,83,205,0.28)] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-[0_14px_30px_rgba(2,83,205,0.38)]"
          >
            <Sparkles className="h-4 w-4" />
            Apply
          </Link>
        </nav>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-2xl border border-white/70 bg-white/65 p-2.5 text-on-surface shadow-[0_10px_24px_rgba(15,24,41,0.06)] transition-colors hover:bg-surface-container-low lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-primary/10 bg-white/94 px-6 py-4 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-xl flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                handleWhatsAppClick();
                setOpen(false);
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3 text-center font-headline text-sm font-bold text-primary transition-colors hover:border-primary/40"
            >
              <MessageCircle className="w-4 h-4" />
              Talk on WhatsApp
            </button>
            <Link
              href="/apply"
              onClick={() => {
                trackEvent('cta_click', {
                  location: 'mobile_menu',
                  cta_type: 'apply',
                  page: pathname,
                });
                setOpen(false);
              }}
              className="mt-2 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-[#1a6fff] px-5 py-3 font-headline text-sm font-bold text-white transition-all"
            >
              Apply for Callback
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
