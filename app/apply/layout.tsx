import type { Metadata } from 'next';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Apply — LIC Agent & Bima Sakhi Callback Request',
  description:
    'Submit your details for an LIC agent or Bima Sakhi callback in Chandigarh, Mohali, or Panchkula. Two-minute form; most applicants hear back within one business day.',
  alternates: { canonical: '/apply' },
  openGraph: { url: '/apply', title: 'Apply — LIC Agent & Bima Sakhi Callback Request' },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Apply', path: '/apply' }])} />
      {children}
    </>
  );
}
