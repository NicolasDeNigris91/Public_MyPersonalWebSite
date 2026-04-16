# Nicolas De Nigris — Personal Portfolio

Personal portfolio site. Aston Martin aesthetic — British luxury, understated power, precision engineering made visible.

## Stack

- **Next.js 16** (App Router, Turbopack, React 19)
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme`-based design tokens in `src/app/globals.css`)
- **Framer Motion** (cinematic, measured motion)
- **Lucide React** (icons, `strokeWidth={1}`)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start dev server (Turbopack)     |
| `npm run build`     | Production build                 |
| `npm start`         | Serve the production build       |
| `npm run lint`      | ESLint (Next.js core-web-vitals) |
| `npm run typecheck` | TypeScript strict check          |

## Environment Variables

| Variable               | Purpose                                              |
| ---------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (used in metadata, sitemap, OG)   |
| `PORT`                 | Port for `next start` (Railway sets this for you)    |

See [`.env.example`](./.env.example).

## Deploying to Railway

1. Push to GitHub.
2. Create a new Railway project → **Deploy from GitHub repo**.
3. Railway auto-detects Next.js and runs `npm run build` + `npm start`.
4. Add a custom domain in Railway settings.
5. Set `NEXT_PUBLIC_SITE_URL` env var to the final URL (e.g. `https://nicolaspilegidenigris.dev`).

`next.config.ts` uses `output: 'standalone'` — Railway's Nixpacks builder handles that transparently and produces a smaller runtime image.

## Design System

Source of truth: [`CLAUDE.md`](./CLAUDE.md). All design decisions — color palette, typography, spacing, motion — flow from that document. Tokens are declared in `src/app/globals.css` via `@theme`.

## Structure

```
src/
├── app/            # App Router entrypoints + metadata + globals
├── components/     # Named-export React components
├── data/           # Typed content (projects, experience, courses, site)
└── types/          # Shared TypeScript interfaces
```
