import type { MetadataRoute } from 'next';

const SECTIONS = [
  'courses',
  'projects',
  'experience',
  'skills',
  'contact',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nicolaspilegidenigris.dev';
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: base,
    lastModified,
    changeFrequency: 'monthly',
    priority: 1,
  };

  const sections: MetadataRoute.Sitemap = SECTIONS.map((section) => ({
    url: `${base}/#${section}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [home, ...sections];
}
