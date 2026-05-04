# Nicolas De Nigris · Portfolio

[![CI](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/ci.yml)
[![Lighthouse CI](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/lighthouse.yml/badge.svg?branch=main)](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/lighthouse.yml)
[![E2E](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/e2e.yml/badge.svg?branch=main)](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/e2e.yml)
[![CodeQL](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Site pessoal: home com hero, cursos, projetos, experiência, skills e contato; case studies por projeto em `/projects/[slug]`; páginas /uses, /now e /contact; CV em PDF gerado on-demand.

A identidade é editorial impressa: paleta obsidian + gold-leaf, tipografia Cormorant Garamond italic + Inter + JetBrains Mono, hairlines de 1px e whitespace generoso. Cada decisão de design está amarrada a uma decisão de engenharia.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript estrito
- Tailwind CSS v4 com `@theme` em [`src/app/globals.css`](./src/app/globals.css)
- Framer Motion para microinterações editoriais
- Lucide React (ícones com `strokeWidth={1}` em todo o site)
- next/og (OG image dinâmica), @react-pdf/renderer (CV)
- Vitest + React Testing Library, Playwright + axe-core
- Lighthouse CI, CodeQL, Dependabot
- Resend (form de contato), Plausible (analytics opt-in)

## Local

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando                | Função                                            |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Dev server (Turbopack)                            |
| `npm run build`        | Build de produção                                 |
| `npm start`            | Serve o build de produção                         |
| `npm run lint`         | ESLint (Next.js core-web-vitals)                  |
| `npm run typecheck`    | TypeScript strict                                 |
| `npm run format`       | Prettier write (com plugin Tailwind)              |
| `npm run format:check` | Prettier check                                    |
| `npm test`             | Vitest (unit, jsdom)                              |
| `npm run test:coverage`| Vitest com cobertura V8 + thresholds              |
| `npm run test:e2e`     | Playwright (chromium)                             |
| `npm run lhci`         | Lighthouse CI local                               |
| `npm run regen:blur`   | Regenera o blurDataURL de `public/me.webp`        |

`ANALYZE=true npm run build` abre o relatório do `@next/bundle-analyzer`.

## Environment

Veja [`.env.example`](./.env.example).

| Variable                          | Função                                               |
| --------------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | URL canônica (metadata, sitemap, OG)                 |
| `RESEND_API_KEY` + `RESEND_FROM`  | Envio do form de contato. Sem ambos, a rota loga e devolve `ok`. |
| `RESEND_TO`                       | Destinatário do form (default: email do `siteConfig`)|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`    | Liga o tracker Plausible                              |
| `NEXT_PUBLIC_PLAUSIBLE_HOST`      | Override para self-hosted (default plausible.io)     |
| `PORT`                            | Porta do `next start` (Railway define)               |

## Estrutura

```
src/
├── app/                   # App Router entrypoints + metadata + globals
│   ├── api/               # /api/contact, /api/csp-report, /api/vitals
│   ├── projects/[slug]/   # Case studies (estático para slugs conhecidos)
│   ├── contact/           # Form com fallback CopyEmailLink
│   ├── uses/  now/        # Páginas-companhia
│   ├── cv.pdf/            # Route handler que gera o PDF on-demand
│   └── opengraph-image    # OG dinâmico 1200×630
├── components/
│   ├── seo/JsonLd.tsx     # Person, WebSite, ItemList<CreativeWork>, Article
│   ├── case-studies/      # Diagrama de arquitetura compartilhado
│   └── cv/CVDocument.tsx  # Layout do PDF
├── data/                  # Conteúdo tipado (projects, experience, courses, site, uses, case-studies)
├── lib/                   # blur, motion, analytics
├── middleware.ts          # CSP nonce por request + report-uri
└── types/                 # Interfaces compartilhadas
```

## Architecture Decisions

Decisões que justificam o stack escolhido. Cada bullet é uma escolha consciente, não um padrão herdado.

### Tailwind v4 com `@theme`

A paleta inteira (obsidian, racing-green, gold-leaf, mist, etc.) e os tamanhos tipográficos vivem como CSS custom properties no `@theme` em [`globals.css`](./src/app/globals.css). Resultados:

- Tokens auditáveis pelo browser sem ferramenta extra: `:root` mostra a paleta como variáveis nomeadas.
- Mudança de uma cor recompila um arquivo, não cinquenta.
- Sem CSS-in-JS no client. Zero overhead de runtime, JS first-load fica reservado pra Framer Motion e Lucide.
- Versão 4 substitui o `tailwind.config.js`: tudo é CSS-driven, mais simples de versionar e mais rápido pra build.

**Alternativa considerada**: vanilla-extract para tipagem forte. Recusada porque adiciona um runtime pequeno e amarra o estilo a TypeScript, encarecendo iterações de design.

### Framer Motion

Cada animação carrega peso. A regra é: nada se mexe sem propósito editorial.

- `MotionConfig reducedMotion="user"` no provider colapsa todas as variants para usuários com `prefers-reduced-motion: reduce`. Nenhuma animação precisa ser reescrita.
- `AnimatePresence` é usado só onde aparição/desaparição é semântica (toast de email, dialog mobile, back-to-top).
- Magnetic effect (raio 80px, força 0.35) só no CTA primário do hero.
- Bundle: framer-motion entra inteiro hoje. Lazy import por seção abaixo da dobra está como follow-up se o first-load passar de 90 KB gzip.

**Alternativa considerada**: CSS-only animations (`@keyframes`, transitions). Insuficiente para o hover magnetic e para o focus trap suave do dialog. Para microinterações simples (underline SVG, fade do scroll indicator) realmente é CSS.

### Railway

Deploy push-to-master sem esforço, suporte nativo para Next.js standalone, healthcheck automático, log em tempo real e domínio custom limpos.

- `output: 'standalone'` no [`next.config.ts`](./next.config.ts) produz uma imagem mínima.
- Variáveis de ambiente gerenciadas pelo painel; rotação trivial.
- Custo previsível e baixo.

**Alternativas consideradas**:

- **Vercel**: ótimo, mas ecossistema empurra para integrações pagas (Edge Config, KV) que não preciso. Para um portfolio, Railway é mais barato e mais previsível.
- **Self-hosted (Caddy + Docker num VPS)**: deliberadamente evitei. Operar TLS, renovação de certs, CI rollout e zero-downtime deploy num portfolio é capricho que rouba tempo do produto. Caddy sigo usando para sub-projetos que precisam de cross-origin isolation (o roguelike WASM, por exemplo).
- **GitHub Pages + GitHub Actions**: incompatível com middleware, route handlers, OG dinâmico e `/cv.pdf` on-demand. Tornaria metade da arquitetura impossível.

### Ausência de CMS

Conteúdo é tipado em TypeScript em [`src/data/`](./src/data/) (`site.ts`, `projects.ts`, `experience.ts`, `courses.ts`, `uses.ts`, `case-studies.ts`). Cada update é um commit, revisão entra por PR.

**Justificativa**:

- Zero infra de CMS, zero painel de admin para invadir, zero custo recorrente.
- Tipagem forte: o compilador me avisa se eu remover um campo que algum componente usa.
- Histórico do conteúdo vive no `git log`, não num banco opaco.
- Search é grep.

**Alternativas consideradas**:

- **Sanity / Contentful**: úteis quando há editores não-técnicos. Aqui sou o único editor e edito em VS Code.
- **MDX em arquivos**: válido para blog/case-studies longos. Os case studies atuais cabem como dados estruturados em `case-studies.ts` e isso me dá schema (campos `decisions`, `tradeoffs`, `pullQuote`) que MDX livre não tem. Posso migrar para MDX quando o conteúdo crescer e a escrita virar prosa contínua.

### Performance e a11y como gates de CI

- Lighthouse CI ([`lighthouserc.json`](./lighthouserc.json)) exige performance ≥ 0.95, a11y/best-practices/SEO = 1, LCP < 1800ms, CLS < 0.05.
- Playwright + axe-core falha o build em qualquer violação serious ou critical. Color-contrast é auditado fora desse gate (a paleta tem accents intencionalmente discretos em mist e chrome).
- Vitest com cobertura V8 e thresholds (70% lines/statements/functions, 50% branches) sobre os componentes interativos.

A lógica é simples: se uma regressão chega em produção, é porque o gate não existia. Os gates existem antes do código.

### Segurança

CSP por request via [`middleware.ts`](./src/middleware.ts):

- Nonce de 16 bytes em base64, gerado por requisição.
- `script-src 'self' 'nonce-...' 'strict-dynamic'`. Inline scripts (JSON-LD) carregam o nonce; nada que não foi explicitamente admitido roda.
- `frame-ancestors 'none'`, `base-uri 'self'`, `object-src 'none'`, `report-uri /api/csp-report`.
- HSTS com preload (2 anos), Permissions-Policy negando câmera, microfone, geolocalização e pagamento.

Trade-off conhecido: ler `headers()` no `layout.tsx` para propagar o nonce torna a home dinâmica. Custo: ~50ms de cold start. Aceito pelo ganho de A+ em [securityheaders.com](https://securityheaders.com).

## Deploy (Railway)

1. Push para GitHub.
2. New project no Railway, "Deploy from GitHub repo".
3. Railway auto-detecta Next.js, roda `npm run build` + `npm start`.
4. Setar `NEXT_PUBLIC_SITE_URL` para a URL final.
5. Opcionais: `RESEND_*` para ativar o form, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` para analytics.
