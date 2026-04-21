import type { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    title: 'Portfolio Pessoal',
    subtitle: 'Site pessoal',
    description:
      'Website pessoal pensado como peça de design tanto quanto de engenharia. Cada secção vive num modelo de dados tipado, cada transição carrega intenção estética. Stack em Next.js 16, TypeScript e Tailwind CSS v4, com animações em Framer Motion e um design system próprio da paleta aos tokens tipográficos. Deploy contínuo no Railway.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    year: 2026,
    repoHref: 'https://github.com/NicolasDeNigris91/MyPersonalWebSite',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Web Accessibility Auditor',
    subtitle: 'Auditor WCAG enterprise-grade',
    description:
      'Ferramenta de auditoria de acessibilidade para web. Submete uma URL, um worker assíncrono roda Puppeteer + axe-core em uma fila BullMQ, categoriza violações WCAG por severidade e persiste o resultado. Arquitetura limpa em monorepo com API Express, worker isolado, MongoDB, Redis, e dashboard em Next.js. Cinco services containerizados rodando em produção.',
    tags: ['TypeScript', 'Next.js', 'Puppeteer', 'BullMQ', 'MongoDB', 'Docker'],
    year: 2026,
    href: 'https://accessibility.nicolaspilegidenigris.dev',
    repoHref: 'https://github.com/NicolasDeNigris91/AccessibilityProject',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'MTG Accessible Combat',
    subtitle: 'TCG keyboard-first e screen-reader-first',
    description:
      'Demo jogável de Magic: The Gathering construída com a premissa de que jogadores cegos e videntes devem receber informação equivalente. Cada carta carrega uma descrição acessível como dado de primeira classe, servindo simultaneamente aria-label, log de combate e anúncios em live regions. Engine de regras pura e framework-agnóstica, orquestração via Zustand, animações com Framer Motion que colapsam sob prefers-reduced-motion. Deck real via Scryfall API com fallback offline.',
    tags: ['Next.js', 'TypeScript', 'Zustand', 'Framer Motion', 'Scryfall API', 'WCAG'],
    year: 2026,
    href: 'https://magic.nicolaspilegidenigris.dev',
    repoHref: 'https://github.com/NicolasDeNigris91/MagicProject',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'Postgres → MongoDB CDC',
    subtitle: 'Pipeline de migração zero-downtime com chaos testing',
    description:
      'Pipeline idempotente de Change Data Capture para migrar Postgres para MongoDB sem parar escritas. Debezium captura o WAL via replication slot, transformer em Go aplica mapeamentos YAML, sink em Go faz upserts LSN-gated no MongoDB. Sobrevive a quatro SIGKILLs consecutivos do sink com zero perda e zero duplicação, validado por suíte de cinco cenários de chaos e ~7,3k escritas/seg sustentadas. Helm chart e docker-compose de produção empacotados para deployment Kubernetes.',
    tags: ['Go', 'Postgres', 'MongoDB', 'Kafka', 'Debezium', 'Helm'],
    year: 2026,
    repoHref: 'https://github.com/NicolasDeNigris91/Pg2MongoCdC',
    featured: true,
  },
];
