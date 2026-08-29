import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import LenisProvider from '@/components/providers/LenisProvider';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
import { JsonLd, organizationSchema, personSchema, websiteSchema } from '@/components/seo/JsonLd';
import { site, siteUrl } from '@/lib/site';

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'LIC Agent & Bima Sakhi Recruitment in Chandigarh Tricity | Subhash Panjla',
    template: '%s | Tricity Life Insurance',
  },
  description:
    'Become an LIC agent or Bima Sakhi in Chandigarh, Mohali, and Panchkula. Mentor-led guidance on eligibility, documents, IRDAI training, and IC38 — from LIC Development Officer Subhash Panjla.',
  applicationName: site.name,
  authors: [{ name: site.mentor }],
  creator: site.mentor,
  publisher: site.name,
  keywords: [
    'LIC agent Chandigarh',
    'LIC agent recruitment Mohali',
    'Bima Sakhi Yojana',
    'Bima Sakhi registration Chandigarh',
    'become LIC agent Panchkula',
    'LIC career Tricity',
    'IC38 exam guidance',
    'insurance advisor jobs Chandigarh',
    'work from home for women Chandigarh',
    'LIC Development Officer Subhash Panjla',
  ],
  alternates: { canonical: '/' },
  category: 'Insurance careers',
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: site.name,
    title: 'LIC Agent & Bima Sakhi Recruitment in Chandigarh Tricity',
    description:
      'Mentor-led LIC career guidance for Chandigarh, Mohali, and Panchkula — eligibility, documents, training, and a clear first step.',
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.mentor}, ${site.mentorRole}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LIC Agent & Bima Sakhi Recruitment in Chandigarh Tricity',
    description: 'Mentor-led LIC career guidance across Chandigarh, Mohali, and Panchkula.',
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F8FC' },
    { media: '(prefers-color-scheme: dark)', color: '#0A1628' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${plex.variable} ${inter.variable}`}>
      <body className="flex min-h-svh flex-col overflow-x-hidden bg-canvas font-body">
        <JsonLd data={[organizationSchema, personSchema, websiteSchema]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <LenisProvider>
          <GoogleAnalytics />
          <ScrollProgress />
          <Header />
          <main id="main" className="flex min-h-0 flex-1 flex-col pt-[var(--site-header-offset)]">
            {children}
          </main>
          <Footer />
          <BottomNav />
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
