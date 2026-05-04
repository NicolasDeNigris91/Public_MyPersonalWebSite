import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { ExternalLink, GitBranch, ArrowLeft } from 'lucide-react';
import { caseStudiesData, findCaseStudy } from '@/data/case-studies';
import { siteConfig } from '@/data/site';
import { ArchitectureDiagram } from '@/components/case-studies/ArchitectureDiagram';
import { JsonLd } from '@/components/seo/JsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nicolaspilegidenigris.dev';

export function generateStaticParams() {
  return caseStudiesData.map((cs) => ({ slug: cs.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = findCaseStudy(slug);
  if (!study) return { title: 'Case study' };

  return {
    title: study.title,
    description: study.intro,
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: {
      title: `${study.title} · ${siteConfig.name}`,
      description: study.intro,
      url: `/projects/${study.slug}`,
      type: 'article',
      publishedTime: `${study.year}-01-01`,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = findCaseStudy(slug);
  if (!study) notFound();

  const headerList = await headers();
  const nonce = headerList.get('x-nonce') ?? undefined;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.intro,
    datePublished: `${study.year}-01-01`,
    inLanguage: 'pt-BR',
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteUrl,
    },
    keywords: study.stack.join(', '),
    url: `${siteUrl}/projects/${study.slug}`,
  };

  return (
    <main
      id="main-content"
      className="bg-obsidian relative px-8 py-32 md:px-16 lg:px-24"
    >
      <JsonLd
        id={`ld-case-${study.slug}`}
        nonce={nonce}
        schema={articleSchema}
      />

      <div className="bg-mist/30 absolute inset-y-32 left-8 w-px md:left-16 lg:left-24" />

      <article className="mx-auto max-w-3xl pl-8">
        <Link
          href="/#projects"
          className="text-caption text-chrome hover:text-pearl tracking-luxury focus-visible:outline-platinum mb-12 inline-flex items-center gap-2 font-mono uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <ArrowLeft size={12} strokeWidth={1} aria-hidden="true" />
          Voltar aos projetos
        </Link>

        <header className="mb-16">
          <div className="mb-6 flex items-center gap-4">
            <p className="text-caption text-racing-green-lit tracking-luxury font-mono uppercase">
              Case study
            </p>
            <span className="bg-mist h-px w-8" />
            <time
              dateTime={String(study.year)}
              className="text-caption text-mist font-mono tracking-wide tabular-nums"
            >
              {study.year}
            </time>
          </div>

          <h1 className="font-display text-display-xl text-pearl leading-none tracking-tight">
            {study.title}
          </h1>
          <p className="text-body-lg text-chrome mt-4 font-sans leading-relaxed">
            {study.subtitle}
          </p>
          <div className="bg-gold-leaf mt-8 h-px w-32" />

          <p className="text-body-lg text-pearl dropcap mt-12 font-sans leading-relaxed">
            {study.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {study.href ? (
              <a
                href={study.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption tracking-luxury text-chrome hover:text-gold-leaf focus-visible:outline-platinum inline-flex items-center gap-2 font-mono uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <ExternalLink size={14} strokeWidth={1} aria-hidden="true" />
                Ver ao vivo
              </a>
            ) : null}
            {study.repoHref ? (
              <a
                href={study.repoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption tracking-luxury text-chrome hover:text-gold-leaf focus-visible:outline-platinum inline-flex items-center gap-2 font-mono uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <GitBranch size={14} strokeWidth={1} aria-hidden="true" />
                Repositório
              </a>
            ) : null}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="text-caption text-mist border-mist border px-3 py-1 font-mono tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-caption text-racing-green-lit tracking-luxury mb-4 font-mono uppercase">
            Problema
          </h2>
          <p className="text-body-lg text-chrome font-sans leading-relaxed">
            {study.problem}
          </p>
        </section>

        <ArchitectureDiagram kind={study.diagram} />

        <section className="mb-16">
          <h2 className="text-caption text-racing-green-lit tracking-luxury mb-6 font-mono uppercase">
            Decisões
          </h2>
          <div className="space-y-8">
            {study.decisions.map((d) => (
              <div key={d.label}>
                <h3 className="font-display text-display-md text-pearl leading-tight tracking-tight">
                  {d.label}
                </h3>
                <p className="text-body text-chrome mt-3 font-sans leading-relaxed">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <figure className="border-gold-leaf/40 my-16 border-y py-12 text-center">
          <blockquote className="font-display text-display-md text-pearl mx-auto max-w-2xl leading-snug italic">
            &ldquo;{study.pullQuote.body}&rdquo;
          </blockquote>
          {study.pullQuote.cite ? (
            <figcaption className="text-caption text-mist tracking-luxury mt-6 font-mono uppercase">
              {study.pullQuote.cite}
            </figcaption>
          ) : null}
        </figure>

        <section className="mb-16">
          <h2 className="text-caption text-racing-green-lit tracking-luxury mb-6 font-mono uppercase">
            Tradeoffs
          </h2>
          <div className="space-y-8">
            {study.tradeoffs.map((t) => (
              <div key={t.label}>
                <h3 className="font-display text-display-md text-pearl leading-tight tracking-tight">
                  {t.label}
                </h3>
                <p className="text-body text-chrome mt-3 font-sans leading-relaxed">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {study.beforeAfter && study.beforeAfter.length > 0 ? (
          <section className="mb-16">
            <h2 className="text-caption text-racing-green-lit tracking-luxury mb-6 font-mono uppercase">
              Antes / depois
            </h2>
            <dl className="border-mist/40 grid grid-cols-1 gap-y-6 border-y py-8 md:grid-cols-3">
              {study.beforeAfter.map((row) => (
                <div key={row.label} className="md:contents">
                  <dt className="text-caption text-mist font-mono tracking-wide uppercase">
                    {row.label}
                  </dt>
                  <dd className="text-body text-chrome font-sans tabular-nums">
                    <span className="text-mist">Antes:</span> {row.before}
                  </dd>
                  <dd className="text-body text-pearl font-sans tabular-nums">
                    <span className="text-mist">Depois:</span> {row.after}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className="mb-20">
          <h2 className="text-caption text-racing-green-lit tracking-luxury mb-4 font-mono uppercase">
            Estado atual
          </h2>
          <p className="text-body-lg text-chrome font-sans leading-relaxed">
            {study.closing}
          </p>
        </section>

        <footer className="border-mist/30 flex items-center gap-8 border-t pt-10">
          <Link
            href="/#projects"
            className="text-caption tracking-luxury border-platinum text-platinum hover:bg-platinum hover:text-obsidian focus-visible:outline-platinum border px-8 py-3 font-sans uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Voltar aos projetos
          </Link>
          <Link
            href="/"
            className="text-caption tracking-luxury text-chrome hover:text-pearl font-sans uppercase transition-colors duration-300"
          >
            Início ↗
          </Link>
        </footer>
      </article>
    </main>
  );
}
