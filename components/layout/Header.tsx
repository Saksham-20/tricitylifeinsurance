'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Shield, MessageCircle, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Training', href: '/training' },
  { label: 'Bima Sakhi', href: '/bima-sakhi' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
        ? 'border-b border-primary/10 bg-white/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.06)]'
        : 'border-b border-transparent bg-white/80 backdrop-blur-md'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dim text-white transition-transform group-hover:scale-105">
            <Shield className="w-5 h-5" fill="currentColor" />
          </div>
          <div>
            <p className="font-headline text-xl font-extrabold tracking-tight text-on-surface">Subhash Panjla</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">LIC Career Mentor</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  active ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleWhatsAppClick}
            className="ml-3 rounded-xl border border-primary/20 px-5 py-2.5 font-headline text-sm font-bold text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
          <Link href="/apply">
            <button
              onClick={() =>
                trackEvent('cta_click', {
                  location: 'header',
                  cta_type: 'apply',
                  page: pathname,
                })
              }
              className="ml-2 rounded-xl bg-gradient-to-r from-primary to-[#1a6fff] px-6 py-2.5 font-headline text-sm font-bold text-white shadow-[0_4px_20px_rgba(2,83,205,0.3)] hover:shadow-[0_6px_30px_rgba(2,83,205,0.45)] transition-all duration-200"
            >
              Apply Now
            </button>
          </Link>
        </nav>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden rounded-xl p-2.5 text-on-surface hover:bg-surface-container-low transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-primary/10 bg-white/95 backdrop-blur-xl px-6 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-xl flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
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
              className="mt-3 rounded-xl border border-primary/20 px-5 py-3 font-headline text-sm font-bold text-primary hover:border-primary/40 transition-colors w-full text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Inquiry
            </button>
            <Link href="/apply" onClick={() => setOpen(false)}>
              <button
                onClick={() => {
                  trackEvent('cta_click', {
                    location: 'mobile_menu',
                    cta_type: 'apply',
                    page: pathname,
                  });
                  setOpen(false);
                }}
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-primary to-[#1a6fff] px-5 py-3 font-headline text-sm font-bold text-white transition-all"
              >
                Apply Now
              </button>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
