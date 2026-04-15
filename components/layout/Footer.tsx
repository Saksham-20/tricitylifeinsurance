import Link from 'next/link';
import { Shield } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Training', href: '/training' },
  { label: 'Bima Sakhi', href: '/bima-sakhi' },
  { label: 'Apply Now', href: '/apply' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f1829] text-white pb-24 lg:pb-0">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors group-hover:bg-white/20">
                <Shield className="w-5 h-5" fill="currentColor" />
              </div>
              <div>
                <p className="font-headline text-xl font-extrabold tracking-tight">Subhash Panjla</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">LIC Career Mentor</p>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/40 max-w-sm">
              Building a network of insurance professionals through structured mentorship since 2001.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Quick Links</p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Get in Touch</p>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-white/80">Phone</p>
                <p className="text-sm text-white/50">+91 88723 64673</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white/80">Locations</p>
                <p className="text-sm text-white/50">Chandigarh, Sector 7</p>
                <p className="text-sm text-white/50">Mohali, Sector 68</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white/80">Office Hours</p>
                <p className="text-sm text-white/50">Mon–Sat, 10:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Subhash Panjla. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            LIC Recruitment Portal · Chandigarh
          </p>
        </div>
      </div>
    </footer>
  );
}
