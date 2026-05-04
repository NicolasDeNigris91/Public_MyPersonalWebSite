import type { Project, SiteConfig } from '@/types';

type Schema = Record<string, unknown>;

export function personSchema(site: SiteConfig, siteUrl: string): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.tagline,
    email: `mailto:${site.email}`,
    url: siteUrl,
    image: `${siteUrl}/me.webp`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
      addressCountry: 'BR',
    },
    sameAs: [site.github, site.linkedin],
  };
}

export function websiteSchema(site: SiteConfig, siteUrl: string): Schema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: siteUrl,
    inLanguage: 'pt-BR',
    author: {
      '@type': 'Person',
      name: site.name,
      url: siteUrl,
    },
  };
}

export function creativeWorkListSchema(
  projects: Project[],
  site: SiteConfig,
  siteUrl: string,
): Schema {
  const author = {
    '@type': 'Person',
    name: site.name,
    url: siteUrl,
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        headline: project.subtitle,
        description: project.description,
        url: project.href ?? project.repoHref,
        codeRepository: project.repoHref,
        keywords: project.tags.join(', '),
        datePublished: String(project.year),
        author,
        creator: author,
      },
    })),
  };
}

export function JsonLd({
  schema,
  id,
  nonce,
}: {
  schema: Schema;
  id: string;
  nonce?: string;
}) {
  return (
    <script
      type="application/ld+json"
      id={id}
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  );
}
