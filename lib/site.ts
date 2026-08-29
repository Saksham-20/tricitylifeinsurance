/**
 * Single source of truth for brand, contact, and SEO constants.
 * Used by page metadata, JSON-LD, and every WhatsApp / phone link.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tricitylifeinsurance.com').replace(/\/$/, '');

export const site = {
  url: siteUrl,
  name: 'Tricity Life Insurance',
  mentor: 'Subhash Panjla',
  mentorRole: 'LIC Development Officer & Lead Mentor',
  tagline: 'LIC Career Mentor',
  phone: '+918872364673',
  phoneDisplay: '+91 88723 64673',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918872364673',
  email: '',
  hours: 'Mon–Sat, 10:00 AM – 6:00 PM',
  areas: ['Chandigarh', 'Mohali', 'Panchkula', 'Zirakpur', 'Kharar', 'Derabassi'],
  addresses: ['Chandigarh, Sector 7', 'Mohali, Sector 68'],
  ogImage: '/images/home/hero-mentor-portrait.jpg',
} as const;

/** Build a wa.me deep link with a pre-filled message. */
export const waLink = (message: string, number: string = site.whatsapp) =>
  `https://wa.me/${number.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:${site.phone}`;
