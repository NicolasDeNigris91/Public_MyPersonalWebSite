# Nicolas De Nigris - Personal Portfolio

[![CI](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/ci.yml)
[![CodeQL](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/NicolasDeNigris91/Public_MyPersonalWebSite/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Meu portfólio pessoal. Projetos, experiência e estudos.

## Stack

- Next.js 16 (App Router, Turbopack, React 19)
- TypeScript (strict)
- Tailwind CSS v4 (`@theme`-based design tokens em `src/app/globals.css`)
- Framer Motion
- Lucide React (icons, `strokeWidth={1}`)

## Local

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Dev server (Turbopack)           |
| `npm run build`     | Production build                 |
| `npm start`         | Serve the production build       |
| `npm run lint`      | ESLint (Next.js core-web-vitals) |
| `npm run typecheck` | TypeScript strict check          |

## Environment

| Variable               | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (metadata, sitemap, OG)           |
| `PORT`                 | Port for `next start` (Railway define automaticamente) |

Exemplo em [`.env.example`](./.env.example).

## Deploy (Railway)

1. Push para GitHub.
2. New project no Railway, "Deploy from GitHub repo".
3. Railway auto-detecta Next.js e roda `npm run build` + `npm start`.
4. Domínio custom em Railway settings.
5. Setar `NEXT_PUBLIC_SITE_URL` para a URL final (ex: `https://nicolaspilegidenigris.dev`).

`next.config.ts` usa `output: 'standalone'` para produzir uma imagem menor em runtime.

## Design

Tokens de design declarados em `src/app/globals.css` via `@theme`.

## Estrutura

```
src/
├── app/            # App Router entrypoints + metadata + globals
├── components/     # Named-export React components
├── data/           # Conteúdo tipado (projects, experience, courses, site)
└── types/          # Shared TypeScript interfaces
```
