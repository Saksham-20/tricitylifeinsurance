import Link from 'next/link';
import { Clock, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { site, telLink, waLink } from '@/lib/site';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Career in LIC', href: '/career-in-lic' },
  { label: 'Bima Sakhi', href: '/bima-sakhi' },
  { label: 'MDRT', href: '/mdrt' },
  { label: 'About', href: '/about' },
  { label: 'Apply for Callback', href: '/apply' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white pb-[calc(var(--bottom-nav-offset)+env(safe-area-inset-bottom))] lg:pb-0">
      <div className="pointer-events-none absolute inset-0 ink-grid" aria-hidden />
      <div className="shell relative py-14 md:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_1fr]">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/10 text-white transition-colors group-hover:bg-white/20">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-headline text-lg font-semibold tracking-tight">{site.mentor}</span>
                <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary-300">
                  {site.tagline}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Practical LIC career guidance for candidates across Chandigarh, Mohali, and Panchkula.
            </p>
            <p className="mt-6 inline-flex rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
              Clear steps · Steady support
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/40">Quick links</h2>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 transition-colors duration-200 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/40">Get in touch</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-300" aria-hidden />
                <a href={telLink} className="text-white/75 transition-colors hover:text-white">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-300" aria-hidden />
                <span className="text-white/65">
                  {site.addresses.map((address) => (
                    <span key={address} className="block">
                      {address}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-300" aria-hidden />
                <span className="text-white/65">{site.hours}</span>
              </li>
            </ul>
            <a
              href={waLink('Hi, I want to know about LIC career opportunities.')}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors duration-200 hover:border-white/40 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Talk on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="max-w-4xl text-xs leading-relaxed text-white/35">
            Independent recruitment and mentoring resource operated by {site.mentor}. Eligibility, stipend, commission,
            and benefit conditions follow LIC and IRDAI rules and may change. Income is performance-linked; individual
            results vary.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} {site.mentor}. All rights reserved.</p>
            <p>LIC Recruitment Portal · Chandigarh Tricity</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
