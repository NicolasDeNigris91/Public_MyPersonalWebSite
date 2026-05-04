import type { MetadataRoute } from 'next';
import { caseStudiesData } from '@/data/case-studies';

const SECTIONS = [
  'courses',
  'projects',
  'experience',
  'skills',
  'contact',
] as const;

const PAGES: {
  path: string;
  priority: number;
  changeFrequency: 'monthly' | 'weekly';
}[] = [
  { path: '/uses', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/now', priority: 0.6, changeFrequency: 'weekly' },
];

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

  const pages: MetadataRoute.Sitemap = PAGES.map((page) => ({
    url: `${base}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const caseStudies: MetadataRoute.Sitemap = caseStudiesData.map((cs) => ({
    url: `${base}/projects/${cs.slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [home, ...sections, ...pages, ...caseStudies];
}
