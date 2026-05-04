import type { CaseStudy } from '@/types/case-study';

export const caseStudiesData: CaseStudy[] = [
  {
    slug: 'portfolio',
    projectId: 'proj-1',
    title: 'Portfolio Pessoal',
    subtitle: 'Site pessoal com identidade editorial e gates de qualidade',
    year: 2026,
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript estrito',
      'Tailwind v4',
      'Framer Motion',
      'Vitest',
      'Playwright',
      'Railway',
    ],
    repoHref: 'https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite',
    intro:
      'Reescrever do zero o portfolio para parecer com a peça que o conteúdo descreve: editorial impresso, sóbrio, com craft à mostra em cada hairline gold-leaf e cada métrica de Lighthouse.',
    problem:
      'O portfolio tradicional de engenharia tende a parecer template: sans-serif neutra, hero com gradiente, cards de projetos sem hierarquia. Eu queria um site que falasse sobre dez anos em joalharia tanto quanto sobre Postgres, e que sustentasse esse tom até nas microinterações.',
    decisions: [
      {
        label: 'Tipografia como design system',
        body: 'Cormorant Garamond italic para display, Inter para corpo, JetBrains Mono para captions. Tokens declarados no @theme do Tailwind v4 com line-heights e weights amarrados ao tamanho. Font-feature-settings opt-in: ligaduras e old-style figures no display, tabular-nums em anos e métricas.',
      },
      {
        label: 'Conteúdo tipado em TypeScript, sem CMS',
        body: 'src/data/site.ts, projects.ts, experience.ts, courses.ts, uses.ts. Cada update é um commit, revisão entra por PR. Zero infra de CMS, zero painel de admin para invadir, zero custo recorrente.',
      },
      {
        label: 'Performance e a11y como gates de CI, não checklists',
        body: 'Lighthouse CI com budget assertivo (LCP < 1.8s, CLS < 0.05, performance >= 0.95, a11y/best-practices/SEO 100). Playwright + axe-core falhando o build em qualquer violação serious ou critical. Vitest cobrindo as quatro peças interativas com mínimo de 70% nas linhas.',
      },
      {
        label: 'Segurança que renderiza A+',
        body: 'CSP por requisição via middleware: nonce de 16 bytes em base64, strict-dynamic, frame-ancestors none, report-uri /api/csp-report. HSTS com preload, Permissions-Policy negando câmera, microfone, geolocalização e pagamento. X-Frame-Options DENY como defesa em profundidade sobre o frame-ancestors.',
      },
    ],
    tradeoffs: [
      {
        label: 'CSP nonce torna a home dinâmica',
        body: 'O nonce muda por request, então layout.tsx lê headers() e a home deixa de ser estática. Custo: ~50ms de cold start no Railway. Aceitável para um portfolio com o tráfego que tem; o ganho de score em securityheaders.com vale a perda do prerender total.',
      },
      {
        label: 'Framer Motion no client',
        body: 'Cada animação custa peso no bundle. A regra é: nada se mexe sem propósito editorial, e MotionConfig reducedMotion="user" no provider colapsa tudo para usuários com prefers-reduced-motion: reduce. Magnetic effect só no CTA primário, raio de 80px.',
      },
      {
        label: 'OG dinâmico com fontes via fetch',
        body: 'A imagem 1200×630 carrega Cormorant via fontsource CDN no build. Falha graciosamente para serif do sistema se o fetch falhar. Custo: a primeira geração é mais lenta; depois é estática.',
      },
    ],
    pullQuote: {
      body: 'Cada hairline gold-leaf é a versão tipográfica de um aro de prova: discreta, mas sem ela a peça não existe.',
    },
    beforeAfter: [
      {
        label: 'Bundle JS first-load (home, gzip)',
        before: 'TBD após análise',
        after: 'TBD após análise',
      },
      {
        label: 'Lighthouse Performance (mobile)',
        before: 'TBD inicial',
        after: '>= 95 (gate de CI)',
      },
    ],
    diagram: 'portfolio',
    closing:
      'O portfolio é o primeiro caso de estudo de si mesmo. Cada PR (1 a 8) corresponde a uma fase deste processo, com commits pequenos, gates verdes antes de cada merge e o tom mantendo-se editorial em todas as superfícies.',
  },
  {
    slug: 'pg-mongo-cdc',
    projectId: 'proj-4',
    title: 'Postgres → MongoDB CDC',
    subtitle: 'Pipeline idempotente de change data capture',
    year: 2026,
    stack: ['Go', 'Postgres', 'MongoDB', 'Kafka', 'Debezium', 'Helm'],
    repoHref: 'https://github.com/NicolasDeNigris91/Public_Pg2MongoCdC',
    intro:
      'Migrar de Postgres para MongoDB sem janela de manutenção, sem perder evento, sem duplicar evento, mesmo com o sink caindo no meio da carga.',
    problem:
      'A abordagem ingênua é parar o Postgres, dumpar, importar no Mongo, religar a aplicação. Isso pede uma janela de horas e zero tolerância a erro humano. A abordagem correta é CDC: Debezium lê o WAL, transforma e propaga em tempo real, com a aplicação escrevendo só no Postgres durante a transição e migrando o ponto de leitura por feature flag depois que o lag for zero.',
    decisions: [
      {
        label: 'Debezium como leitor do WAL',
        body: 'Leitor logical-replication oficialmente suportado, com snapshot inicial controlado e streaming subsequente via plugin pgoutput. Posição do leitor é o LSN, garantia de ordem por partição da tabela.',
      },
      {
        label: 'Transformer em Go entre Kafka e o sink',
        body: 'Aplica o mapeamento de schema relacional para documento Mongo. Go pelo perfil de latência: GC previsível, goroutines leves para fan-out por collection, sem JIT warmup.',
      },
      {
        label: 'Idempotência por chave + LSN',
        body: 'O sink escreve com upsert controlado por (chave_natural, lsn). Se o evento já chegou (LSN <= último visto), no-op. Reprocessar a partir de qualquer ponto do WAL é seguro por construção.',
      },
      {
        label: 'Chaos testing como rotina',
        body: 'Bateria que mata o sink no meio da carga, parte o link Kafka, atrasa o ack. O critério de aceite é: zero perda, zero duplicação, lag converge para zero quando o pipeline volta.',
      },
    ],
    tradeoffs: [
      {
        label: 'Latência vs durabilidade no Kafka',
        body: 'acks=all e replicação 3 dão durabilidade ao custo de latência. Para CDC operacional o trade vale; para eventos best-effort não valeria.',
      },
      {
        label: 'Schema do Mongo derivado, não desenhado',
        body: 'O documento Mongo é função do schema Postgres mais regras de denormalização. É mais barato de migrar, mais difícil de evoluir o modelo Mongo independentemente. Decisão consciente: privilegiar reversibilidade sobre elegância do modelo destino.',
      },
    ],
    pullQuote: {
      body: 'Idempotência não é uma propriedade que se demonstra: é uma postura defensiva que se incorpora no design desde o primeiro upsert.',
    },
    diagram: 'cdc',
    closing:
      'O pipeline ainda evolui. O próximo passo é instrumentar o lag por collection num Grafana exclusivo e definir SLO de janela de convergência por classe de tabela.',
  },
  {
    slug: 'magic-accessible',
    projectId: 'proj-3',
    title: 'MTG Accessible Combat',
    subtitle: 'Magic: The Gathering jogável por teclado e leitor de tela',
    year: 2026,
    stack: [
      'Next.js',
      'TypeScript',
      'Zustand',
      'Framer Motion',
      'Scryfall API',
      'WCAG',
    ],
    href: 'https://magic.nicolaspilegidenigris.dev',
    repoHref: 'https://github.com/NicolasDeNigris91/Public_MagicProject',
    intro:
      'Reproduzir o sentimento de jogar Magic com a mesma fluidez por teclado e leitor de tela que se tem com mouse, tratando a descrição acessível de cada carta como dado de primeira classe.',
    problem:
      'A maioria das implementações digitais de TCG presume mouse e visão. Cartas viram imagens com tooltip; combate vira drag-and-drop. Para um jogador cego ou para alguém que não pode usar mouse, a interface deixa de ser um jogo e vira um obstáculo.',
    decisions: [
      {
        label: 'Engine de regras desacoplada da UI',
        body: 'A engine recebe ações tipadas (TapLand, CastSpell, Attack, Block) e devolve um próximo estado mais um log estruturado. A UI é uma projeção desse estado; trocar de teclado para mouse para leitor de tela é só mudar a forma de input.',
      },
      {
        label: 'Descrição acessível como dado, não como afterthought',
        body: 'Cada carta carrega um campo accessibleText escrito a mão (não derivado de OCR ou alt-text genérico). Esse campo alimenta aria-label nos slots, o log de combate e as live regions que anunciam mudanças de estado. Mudar a descrição é uma tarefa de conteúdo, não de implementação.',
      },
      {
        label:
          'Estado em Zustand, animações em Framer Motion respeitando reduced-motion',
        body: 'Zustand para previsibilidade do snapshot e devtools. Animações que comunicam mudança de fase (untap, upkeep, attack) viram instantâneas para usuários com prefers-reduced-motion: reduce, sem perder o anúncio na live region.',
      },
      {
        label: 'Fallback offline da Scryfall',
        body: 'A primeira execução popula um cache local; a segunda funciona offline. Imutabilidade da carta facilita: um print run não muda depois de impresso.',
      },
    ],
    tradeoffs: [
      {
        label: 'Cobertura de regras vs prazo',
        body: 'Magic tem milhares de interações. Para a demo, o foco é no subset que prova o ponto: combate básico, mana, encantamentos passivos. Replacement effects e layered abilities ficam como roadmap, com testes de aceitação por interação.',
      },
      {
        label: 'Texto acessível não-traduzido',
        body: 'O accessibleText foi escrito em pt-BR primeiro. Traduzir para EN exige cuidado com a terminologia oficial do jogo, e foi adiado para evitar uma camada de tradução automática que estragaria as nuances.',
      },
    ],
    pullQuote: {
      body: 'Acessibilidade não é uma camada que se aplica depois: é uma decisão de modelagem do estado.',
    },
    diagram: 'magic',
    closing:
      'O projeto é um benchmark pessoal: se uma demo de Magic com leitor de tela é viável com este nível de craft, então sites comerciais não têm desculpa.',
  },
  {
    slug: 'fathom',
    projectId: 'proj-6',
    title: 'Fathom',
    subtitle: 'Framework de maestria de iniciante real a Staff Engineer',
    year: 2026,
    stack: [
      'Next.js 16',
      'TypeScript',
      'Tailwind v4',
      'Markdown',
      'Vitest',
      'Docker',
      'Railway',
    ],
    href: 'https://fathom.nicolaspilegidenigris.dev',
    repoHref: 'https://github.com/NicolasDeNigris91/Public_FATHOM',
    intro:
      'Trilha estruturada de iniciante real até Staff/Principal Engineer com 66 módulos densos, cinco capstones encadeados sobre o mesmo produto e portões de avaliação reais entre estágios.',
    problem:
      'A maior parte do material para juniores ensina syntax; a maior parte para seniores presume contexto que ninguém ensinou. O caminho do meio é caótico: tutoriais isolados que não compõem uma prática.',
    decisions: [
      {
        label: 'Conteúdo em Markdown sob CC BY-NC 4.0',
        body: 'Cada módulo é um arquivo Markdown legível fora do site, com frontmatter tipado. Licença permite reuso educacional. O site é uma camada de leitura sobre o repositório, não um silo.',
      },
      {
        label: 'Cinco capstones sobre o mesmo produto',
        body: 'Logística como domínio recorrente. O aluno volta ao mesmo problema com ferramentas mais sofisticadas, e o esforço cognitivo de mudar de domínio some. Quem completa o stage 5 viu o mesmo sistema de seis ângulos diferentes.',
      },
      {
        label: 'Validador de conteúdo no prebuild',
        body: 'Script Node que lê o filesystem e valida links cruzados, frontmatter, ordem dos módulos e referências de capstones. Se um link aponta pra módulo inexistente, o build falha. A integridade do framework é uma propriedade verificável, não uma promessa.',
      },
      {
        label: 'Command palette + glossário + sitemap navegáveis por teclado',
        body: 'Pull a estrutura de uma documentação séria (Stripe, Linear). Cmd+K abre tudo. Glossário é primeira classe porque vocabulary é metade da maestria.',
      },
    ],
    tradeoffs: [
      {
        label: 'Markdown vs MDX',
        body: 'MDX dá React inline mas amarra o conteúdo a runtime. Markdown puro é portátil e legível em qualquer editor. Para um framework que pode ser auditado fora do site, escolhi portabilidade.',
      },
      {
        label: 'Sem progress tracking interno',
        body: 'O site não persiste por onde o aluno está. Pareceu mais correto deixar o tracking ao mentor humano: o protocolo de mentor é parte do framework e não um gimmick de UX.',
      },
    ],
    pullQuote: {
      body: 'Maestria não é coleção de syntax: é a capacidade de prever onde o sistema vai ceder antes de ele ceder.',
    },
    diagram: 'fathom',
    closing:
      'O framework continua vivo. Cada módulo que recebe feedback de um mentor real vira uma issue de revisão; o conteúdo é versionado no git e tem PRs.',
  },
  {
    slug: 'unholy-bastion',
    projectId: 'proj-5',
    title: 'Unholy Bastion',
    subtitle: 'Roguelike turn-based em Godot, exportado para WebAssembly',
    year: 2026,
    stack: [
      'Godot 4',
      'GDScript',
      'WebAssembly',
      'Caddy',
      'Roguelike',
      'Game Design',
    ],
    href: 'https://unholybastion.nicolaspilegidenigris.dev',
    repoHref: 'https://github.com/NicolasDeNigris91/Public_Roguelike',
    intro:
      'Roguelike por turnos com cinco atos, trinta andares e dois finais possíveis dependendo do que o jogador decide carregar até o boss. Servido no navegador via WebAssembly, atrás de Caddy com cross-origin isolation.',
    problem:
      'Godot exporta para Web, mas o suporte a SharedArrayBuffer (que a thread principal precisa para multithread) exige cross-origin isolation. Sem os headers COEP e COOP corretos no servidor, o jogo não inicializa, ou inicializa numa versão degradada.',
    decisions: [
      {
        label: 'Caddy como reverse proxy com headers de isolation',
        body: 'Cross-Origin-Embedder-Policy: require-corp e Cross-Origin-Opener-Policy: same-origin servidos como condição de carregamento. Decisão operacional: isolar o subdomínio em vez de poluir o headers do site principal.',
      },
      {
        label: 'GDScript em vez de C# no Godot',
        body: 'Para um roguelike por turnos a vantagem do C# em performance é marginal. GDScript tem turnaround maior dentro do editor, melhor docs first-party, e menos atrito no export para Web.',
      },
      {
        label: 'Dois finais como teste do replay',
        body: 'Decisões de carregamento até o boss alteram a final. Métrica de design: jogador que completa uma run quer ver o outro final, não chega lá por sorte.',
      },
    ],
    tradeoffs: [
      {
        label: 'Bundle WASM grande',
        body: 'Godot Web exporta um bundle considerável. Compressão Brotli no Caddy mitiga. Aceitável para um jogo dedicado; inviável para um widget genérico.',
      },
      {
        label: 'Save state no localStorage',
        body: 'Sem auth nem backend o save é local. Limita progressão entre dispositivos. Para um roguelike onde a permamorte importa, é uma característica, não bug.',
      },
    ],
    pullQuote: {
      body: 'Game design é o exercício mais honesto de constraint design: cada regra que você adiciona é uma decisão sobre onde a fricção deve viver.',
    },
    diagram: 'roguelike',
    closing:
      'O export para WebAssembly é um exercício de operação tanto quanto de game dev. Os headers certos num Caddyfile valem mais que a próxima feature mecânica.',
  },
  {
    slug: 'accessibility-auditor',
    projectId: 'proj-2',
    title: 'Web Accessibility Auditor',
    subtitle: 'Auditor automatizado de WCAG por URL',
    year: 2026,
    stack: [
      'TypeScript',
      'Next.js',
      'Puppeteer',
      'BullMQ',
      'MongoDB',
      'Docker',
    ],
    href: 'https://accessibility.nicolaspilegidenigris.dev',
    repoHref:
      'https://github.com/NicolasDeNigris91/Public_AccessibilityProject',
    intro:
      'O usuário cola uma URL e a ferramenta roda Puppeteer com axe-core num worker em background, agrupa as violações por severidade e devolve um relatório navegável. Monorepo com API em Express, worker, dashboard em Next.js, MongoDB e Redis em containers.',
    problem:
      'Auditar a11y por linha de comando funciona para quem já sabe ler o relatório. Para times de produto a barreira de entrada precisa ser uma URL e um botão. E precisa rodar fora da máquina do desenvolvedor para que o resultado seja arquivável e comparável entre runs.',
    decisions: [
      {
        label: 'Worker desacoplado da API via fila',
        body: 'BullMQ sobre Redis. A API publica um job; o worker processa em background. Throttling natural: para parar o sistema, basta parar o worker. Para escalar, sobe replicas.',
      },
      {
        label: 'Puppeteer com axe-core injetado',
        body: 'Headless Chromium navega, espera networkidle, injeta axe e roda contra wcag2a, wcag2aa, wcag21aa e best-practice. Resultado é tipado, agrupado por impact, persistido com URL e timestamp.',
      },
      {
        label: 'MongoDB como armazenamento dos relatórios',
        body: 'Documento por run. Schema flexível porque o output do axe evolui entre versões. Índice por (url, createdAt) para paginar histórico.',
      },
      {
        label: 'Monorepo com Docker Compose',
        body: 'API, worker, dashboard, Mongo e Redis em um docker-compose para reprodutibilidade local. CI roda os mesmos containers; produção é a mesma topologia atrás de Caddy.',
      },
    ],
    tradeoffs: [
      {
        label: 'Resultado por URL, não por SPA flow',
        body: 'A ferramenta audita uma página de cada vez. Fluxos com etapas (login, checkout) precisam ser auditados manualmente. Aceitável para um MVP focado em landing pages e marketing sites.',
      },
      {
        label: 'Sem deduplicação inteligente entre runs',
        body: 'Relatórios consecutivos do mesmo site reaparecem por inteiro. Diff entre runs é o próximo passo: mostrar o que regrediu desde a última auditoria.',
      },
    ],
    pullQuote: {
      body: 'Acessibilidade automática só pega as violações triviais. Mas se as triviais já não são checadas, as não-triviais nunca serão.',
    },
    diagram: 'accessibility',
    closing:
      'O auditor é deliberadamente um MVP focado. A ambição não é substituir a auditoria humana; é remover a desculpa de que "ninguém testou o axe".',
  },
];

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudiesData.find((cs) => cs.slug === slug);
}
