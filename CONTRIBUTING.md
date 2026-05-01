# Contributing

This is a personal portfolio site, but the project is open to suggestions and
fixes from the community: typos, broken links, accessibility regressions,
performance issues, or layout bugs across breakpoints.

If you are reporting a security issue, do **not** open a public PR or issue;
follow [SECURITY.md](./SECURITY.md).

## Local environment

Prerequisites:

- Node.js 20+
- npm

```bash
npm install
npm run dev          # http://localhost:3000
```

## Test bar

| Change touches | Required                                                  |
| -------------- | --------------------------------------------------------- |
| Any code       | `npm run lint` + `npm run typecheck` + `npm run build`    |
| UI / styling   | The above + manual check on desktop and mobile breakpoints |

CI runs lint, typecheck, and build on every PR.

## Style

- TypeScript: strict mode. No `any`. No suppressed lint rules without an
  inline comment explaining why.
- Components: named exports, one per file.
- Design tokens live in `src/app/globals.css` via Tailwind v4 `@theme`.
  Do not hard-code colors / spacing in components.
- Icons: Lucide with `strokeWidth={1}` to match the existing visual rhythm.
- Commits: conventional commits (`type(scope): summary`), lower-case,
  imperative mood. Match the existing log style. No AI-attribution
  trailers.

## License

By submitting a PR, you agree that your contribution is licensed under the
[MIT License](./LICENSE).
