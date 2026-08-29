import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — LIC Career Recruitment`,
    short_name: 'Tricity LIC',
    description: 'Mentor-led LIC agent and Bima Sakhi recruitment guidance across Chandigarh Tricity.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F8FC',
    theme_color: '#0B4CCB',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
