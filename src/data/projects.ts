import type { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'proj-1',
    title: 'Portfolio Pessoal',
    subtitle: 'Site pessoal',
    description:
      'Meu site pessoal, feito em Next.js 16 com TypeScript, Tailwind v4 e Framer Motion. Desenhei a paleta e a tipografia do zero porque queria algo que parecesse meu, não mais um template. Deploy roda no Railway.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    year: 2026,
    repoHref: 'https://github.com/NicolasDeNigris91/MyPersonalWebSite',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Web Accessibility Auditor',
    subtitle: 'Auditor de acessibilidade WCAG',
    description:
      'Você cola uma URL e a ferramenta roda Puppeteer com axe-core num worker em background, agrupa as violações por severidade e devolve um relatório. É um monorepo com API em Express, worker, dashboard em Next.js, MongoDB e Redis, tudo em containers.',
    tags: ['TypeScript', 'Next.js', 'Puppeteer', 'BullMQ', 'MongoDB', 'Docker'],
    year: 2026,
    href: 'https://accessibility.nicolaspilegidenigris.dev',
    repoHref: 'https://github.com/NicolasDeNigris91/AccessibilityProject',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'MTG Accessible Combat',
    subtitle: 'TCG jogável por teclado e leitor de tela',
    description:
      'Demo de Magic: The Gathering pensada para ser jogada por teclado ou leitor de tela com a mesma fluidez de um mouse. A descrição acessível de cada carta é dado de primeira classe e alimenta aria-labels, log de combate e live regions. Engine de regras separada da UI, estado em Zustand, animações respeitam prefers-reduced-motion. Cartas vêm da API do Scryfall com fallback offline.',
    tags: ['Next.js', 'TypeScript', 'Zustand', 'Framer Motion', 'Scryfall API', 'WCAG'],
    year: 2026,
    href: 'https://magic.nicolaspilegidenigris.dev',
    repoHref: 'https://github.com/NicolasDeNigris91/MagicProject',
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'Unholy Bastion',
    subtitle: 'Roguelike turn-based em Godot, exportado para WebAssembly',
    description:
      'Roguelike por turnos que fiz em Godot 4 e GDScript, exportado para o navegador via WebAssembly. Cinco atos, trinta andares, dois finais possíveis dependendo do que você decide carregar até o boss. Servido em produção atrás de Caddy com os headers de cross-origin isolation que o WASM exige.',
    tags: ['Godot', 'GDScript', 'WebAssembly', 'Caddy', 'Roguelike', 'Game Design'],
    year: 2026,
    href: 'https://unholybastion.nicolaspilegidenigris.dev',
    repoHref: 'https://github.com/NicolasDeNigris91/Roguelike',
    featured: true,
  },
  {
    id: 'proj-6',
    title: 'Fathom',
    subtitle: 'Framework de maestria full-stack (Novice → Staff)',
    description:
      'Trilha estruturada de iniciante real até Staff/Principal Engineer, com 66 módulos densos, 5 capstones encadeados sobre o mesmo produto (Logística), portões de avaliação e protocolo de mentor. Conteúdo em Markdown sob CC BY-NC 4.0; site em Next.js 16 lê o framework do filesystem em runtime, com command palette, glossário, sitemap e validador de conteúdo no prebuild. Cada link cruzado entre estágios é checado por um script Node antes do build.',
    tags: ['Next.js', 'TypeScript', 'Tailwind v4', 'Markdown', 'Vitest', 'Docker', 'Railway'],
    year: 2026,
    href: 'https://fathom.nicolaspilegidenigris.dev',
    repoHref: 'https://github.com/NicolasDeNigris91/FATHOM',
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'Postgres → MongoDB CDC',
    subtitle: 'Pipeline de migração com chaos testing',
    description:
      'Pipeline idempotente de Change Data Capture para migrar de Postgres para Mongo sem precisar parar de escrever no banco de origem. Debezium lê o WAL, um transformer em Go aplica os mapeamentos e o sink faz upsert no Mongo controlado por LSN. Rodei uma bateria de testes de chaos matando o sink no meio da carga e ele se recupera sem perder nem duplicar evento.',
    tags: ['Go', 'Postgres', 'MongoDB', 'Kafka', 'Debezium', 'Helm'],
    year: 2026,
    repoHref: 'https://github.com/NicolasDeNigris91/Pg2MongoCdC',
    featured: true,
  },
];
