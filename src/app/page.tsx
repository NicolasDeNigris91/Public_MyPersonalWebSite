import { headers } from 'next/headers';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Courses } from '@/components/Courses';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { JsonLd, creativeWorkListSchema } from '@/components/seo/JsonLd';
import { siteConfig } from '@/data/site';
import { projectsData } from '@/data/projects';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nicolaspilegidenigris.dev';

const featuredProjects = projectsData.filter(
  (project) => project.featured && (project.href || project.repoHref),
);

export default async function Home() {
  const headerList = await headers();
  const nonce = headerList.get('x-nonce') ?? undefined;

  return (
    <>
      <JsonLd
        id="ld-projects"
        nonce={nonce}
        schema={creativeWorkListSchema(featuredProjects, siteConfig, siteUrl)}
      />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Courses />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
