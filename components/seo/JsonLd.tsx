import { site, siteUrl } from '@/lib/site';

/** Serialises a schema.org node into a JSON-LD script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is author-controlled, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'InsuranceAgency',
  '@id': `${siteUrl}/#organization`,
  name: site.name,
  alternateName: 'LIC Recruitment Portal — Chandigarh Tricity',
  url: siteUrl,
  image: `${siteUrl}${site.ogImage}`,
  logo: `${siteUrl}${site.ogImage}`,
  telephone: site.phone,
  priceRange: 'Free',
  description:
    'Mentor-led LIC agent and Bima Sakhi recruitment guidance across Chandigarh, Mohali, and Panchkula — eligibility, documents, IRDAI training, and IC38 support.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sector 7',
    addressLocality: 'Chandigarh',
    addressRegion: 'Chandigarh',
    postalCode: '160007',
    addressCountry: 'IN',
  },
  areaServed: site.areas.map((name) => ({ '@type': 'City', name })),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '18:00',
    },
  ],
  founder: { '@id': `${siteUrl}/#mentor` },
  sameAs: [] as string[],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#mentor`,
  name: site.mentor,
  jobTitle: site.mentorRole,
  image: `${siteUrl}${site.ogImage}`,
  telephone: site.phone,
  worksFor: { '@id': `${siteUrl}/#organization` },
  areaServed: 'Chandigarh Tricity',
  knowsAbout: ['LIC agent recruitment', 'Bima Sakhi programme', 'IRDAI IC38 certification', 'Insurance advisory mentoring'],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: site.name,
  publisher: { '@id': `${siteUrl}/#organization` },
  inLanguage: 'en-IN',
};

/** Breadcrumbs for interior pages. */
export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${item.path === '/' ? '' : item.path}`,
  })),
});

export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
});

/** JobPosting-style summary of the two recruitment tracks. */
export const jobPostingSchema = (opts: {
  title: string;
  description: string;
  path: string;
  employmentType: string;
  educationRequirement: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: opts.title,
  description: opts.description,
  url: `${siteUrl}${opts.path}`,
  employmentType: opts.employmentType,
  hiringOrganization: { '@id': `${siteUrl}/#organization` },
  jobLocation: site.areas.map((name) => ({
    '@type': 'Place',
    address: { '@type': 'PostalAddress', addressLocality: name, addressRegion: 'Chandigarh Tricity', addressCountry: 'IN' },
  })),
  educationRequirements: opts.educationRequirement,
  directApply: true,
});
