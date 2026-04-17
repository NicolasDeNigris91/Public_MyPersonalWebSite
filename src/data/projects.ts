import type { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    title: 'Portfolio Pessoal',
    subtitle: 'Site pessoal',
    description:
      'Website pessoal desenvolvido com Next.js 16, TypeScript e Tailwind CSS v4. Apresenta animações cinematográficas com Framer Motion, arquitetura data-driven com interfaces tipadas, e um design system personalizado com paleta de cores sofisticada e tipografia premium.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    year: 2026,
    repoHref: 'https://github.com/NicolasDeNigris91/MyPersonalWebSite',
    featured: true,
    imageAlt: 'Screenshot do portfolio pessoal com estética dark luxury',
  },
  {
    id: 'proj-2',
    title: 'Web Accessibility Auditor',
    subtitle: 'Auditor WCAG enterprise-grade',
    description:
      'Ferramenta de auditoria de acessibilidade para web. Submete uma URL, um worker assíncrono roda Puppeteer + axe-core em uma fila BullMQ, categoriza violações WCAG por severidade e persiste o resultado. Arquitetura limpa em monorepo com API Express, worker isolado, MongoDB, Redis, e dashboard em Next.js — cinco services containerizados rodando em produção.',
    tags: ['TypeScript', 'Next.js', 'Puppeteer', 'BullMQ', 'MongoDB', 'Docker'],
    year: 2026,
    href: 'https://accessibility.nicolaspilegidenigris.dev',
    repoHref: 'https://github.com/NicolasDeNigris91/AccessibilityProject',
    featured: true,
    imageAlt: 'Screenshot do dashboard do auditor de acessibilidade',
  },
];
