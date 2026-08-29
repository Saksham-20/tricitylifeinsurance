'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, PhoneCall, Send } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { telLink, waLink } from '@/lib/site';

const whatsappHref = waLink('Hi, I want to discuss LIC opportunities.');

const itemClass =
  'flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-content-muted transition-colors duration-200 active:bg-surface-sunken';

/** Mobile action bar: the three things a visitor actually does here. */
export default function BottomNav() {
  const pathname = usePathname();
  const applyActive = pathname === '/apply';

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-overlay border-t border-line bg-surface/95 backdrop-blur-xl lg:hidden"
    >
      <div className="flex items-stretch gap-1 px-3 pb-safe pt-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => trackEvent('cta_click', { location: 'mobile_action_bar', cta_type: 'whatsapp' })}
          className={itemClass}
          aria-label="Talk on WhatsApp"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          <span className="text-[0.68rem] font-semibold">WhatsApp</span>
        </a>

        <Link
          href="/apply"
          onClick={() => trackEvent('cta_click', { location: 'mobile_action_bar', cta_type: 'apply' })}
          aria-current={applyActive ? 'page' : undefined}
          className="flex flex-[1.4] cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-headline text-sm font-semibold text-white shadow-primary-md transition-colors duration-200 hover:bg-primary-700"
        >
          <Send className="h-4 w-4" aria-hidden />
          Apply now
        </Link>

        <a
          href={telLink}
          onClick={() => trackEvent('cta_click', { location: 'mobile_action_bar', cta_type: 'call' })}
          className={itemClass}
          aria-label="Call the mentor"
        >
          <PhoneCall className="h-5 w-5" aria-hidden />
          <span className="text-[0.68rem] font-semibold">Call</span>
        </a>
      </div>
    </nav>
  );
}
