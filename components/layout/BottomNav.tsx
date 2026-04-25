'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, PhoneCall, Rocket } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const navItems = [
  { icon: MessageCircle, label: 'WhatsApp', href: 'whatsapp' },
  { icon: Rocket, label: 'Apply', href: '/apply', isPrimary: true },
  { icon: PhoneCall, label: 'Call', href: 'call' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673';
  const whatsappHref = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent('Hi, I want to discuss LIC opportunities.')}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-surface-variant/30 bg-white/95 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden" aria-label="Primary mobile actions">
      <div className="flex items-center justify-around px-2 pb-safe pt-2">
        {navItems.map((item) => {
          const isActive = item.href.startsWith('/') && pathname === item.href;
          const IconComponent = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="-mt-5 flex flex-col items-center justify-center rounded-2xl focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary/35"
                aria-label="Apply for a callback"
              >
                <div className={`flex items-center justify-center w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(2,83,205,0.4)] transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-br from-primary to-[#1a6fff] scale-110'
                    : 'bg-gradient-to-br from-primary to-[#1a6fff]'
                }`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-bold tracking-tight text-primary mt-1">{item.label}</span>
              </Link>
            );
          }

          if (item.href === 'whatsapp') {
            return (
              <a
                key={item.label}
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('cta_click', { location: 'mobile_sticky_bar', cta_type: 'whatsapp' })}
                className="flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-2 text-on-surface-variant transition-colors active:bg-surface-container-low"
                aria-label="Talk on WhatsApp"
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
              </a>
            );
          }

          if (item.href === 'call') {
            return (
              <a
                key={item.label}
                href="tel:+918872364673"
                onClick={() => trackEvent('cta_click', { location: 'mobile_sticky_bar', cta_type: 'call' })}
                className="flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-2 text-on-surface-variant transition-colors active:bg-surface-container-low"
                aria-label="Call the mentor"
              >
                <IconComponent className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-primary'
                  : 'text-on-surface-variant active:bg-surface-container-low'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
