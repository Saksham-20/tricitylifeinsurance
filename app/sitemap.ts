import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/apply', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/bima-sakhi', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/career-in-lic', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/mdrt', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
