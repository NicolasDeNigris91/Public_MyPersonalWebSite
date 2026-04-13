# Design System of Excellence
> Source of truth for the personal .dev website. Every design decision flows from here.

---

## Brand Vision
**Aston Martin aesthetic**: British luxury. Understated power. Precision engineering made visible.
Never generic "tech". Never startup-pastel. Never neon-on-black gamer. Always: depth, restraint, craft.

---

## Color Palette

| Token              | Hex       | Usage                                      |
|--------------------|-----------|--------------------------------------------|
| `obsidian`         | `#0A0A0A` | Page background — near-black, not pure     |
| `graphite`         | `#111111` | Card / section backgrounds                 |
| `carbon`           | `#1A1A1A` | Elevated surfaces, hover states            |
| `chrome`           | `#C0C0C0` | Secondary text, dividers                   |
| `platinum`         | `#E8E8E8` | Primary body text                          |
| `pearl`            | `#F5F5F0` | Headings, high-contrast text               |
| `racing-green`     | `#0B3D2E` | Brand accent (Aston Martin signature)      |
| `racing-green-lit` | `#1A6B50` | Hover / active accent states               |
| `gold-leaf`        | `#B8963E` | Subtle highlight, borders on premium cards |
| `mist`             | `#3A3A3A` | Borders, subtle dividers                   |

**Rule:** Never use pure white (`#FFFFFF`) or pure black (`#000000`). Use the tokens above.

---

## Typography

### Font Pairing
- **Display / H1–H2:** `Cormorant Garamond` — elegant serif, weight 300–400. Evokes heritage and craft.
- **UI / Body / H3–H6:** `Inter` — modern geometric sans, weight 300–500. Precision and clarity.
- **Mono / Code:** `JetBrains Mono` — technical credential, weight 400.

### Scale
| Name         | Size    | Weight | Line Height | Usage                        |
|--------------|---------|--------|-------------|------------------------------|
| `display-xl` | 5rem    | 300    | 1.05        | Hero name                    |
| `display-lg` | 3.5rem  | 300    | 1.1         | Section titles               |
| `display-md` | 2rem    | 400    | 1.2         | Card headings                |
| `body-lg`    | 1.125rem| 300    | 1.75        | Lead paragraphs              |
| `body`       | 1rem    | 300    | 1.7         | Standard body                |
| `caption`    | 0.75rem | 400    | 1.5         | Labels, tags, metadata       |

**Rule:** Never use font weight above 500 for body. Bold is for machines; refinement is for humans.

---

## Spacing System

All spacing follows an **8px base grid**. Tailwind's default scale already aligns (1 unit = 4px), so use even multiples:

| Token  | px   | Tailwind | Usage                        |
|--------|------|----------|------------------------------|
| `xs`   | 8px  | `p-2`    | Icon gaps, inline spacing    |
| `sm`   | 16px | `p-4`    | Component internal padding   |
| `md`   | 32px | `p-8`    | Card padding                 |
| `lg`   | 64px | `p-16`   | Section internal padding     |
| `xl`   | 96px | `p-24`   | Between major sections       |
| `2xl`  | 128px| `p-32`   | Hero vertical breathing room |

**Rule:** Sections breathe. Minimum `py-24` between any two major sections. Luxury is space.

---

## Motion Principles

Library: Framer Motion.

| Interaction        | Duration | Easing              | Notes                          |
|--------------------|----------|---------------------|--------------------------------|
| Page reveal        | 1.2s     | `easeOut`           | Stagger children by 0.15s      |
| Hover lift         | 0.3s     | `easeInOut`         | `y: -4px`, subtle shadow grow  |
| Card entrance      | 0.8s     | `easeOut`           | Fade + translateY(24px → 0)    |
| Underline draw     | 0.4s     | `easeInOut`         | SVG stroke or pseudo-element   |

**Rule:** Nothing snaps. Nothing bounces. Every motion is deliberate and measured.

---

## Component Rules

1. **No drop shadows** from the Tailwind default palette. Use `shadow-[0_8px_32px_rgba(0,0,0,0.4)]` or custom.
2. **Borders** use `border-mist` (`#3A3A3A`) or `border-gold-leaf` for premium cards. Never `border-gray-*`.
3. **Buttons**: thin border, no fill by default. Fill only on primary CTA. Padding `px-8 py-3`, `tracking-widest`, `uppercase`, `text-caption`.
4. **Cards**: `bg-graphite`, `border border-mist`, `rounded-none` (sharp corners = precision engineering). Hover → `bg-carbon`.
5. **Icons**: Lucide React, `strokeWidth={1}` always. Size 20px standard, 16px in dense contexts.

---

## TypeScript Interfaces

```typescript
// src/types/index.ts

export interface Project {
  id: string;
  title: string;
  subtitle: string;           // one-line descriptor
  description: string;        // 2–3 sentence paragraph
  tags: string[];             // tech stack / domain tags
  year: number;
  href?: string;              // live URL
  repoHref?: string;          // GitHub URL
  featured: boolean;          // shown in hero grid
  imageAlt?: string;          // for future image integration
}

export interface ExperienceEntry {
  id: string;
  organisation: string;
  role: string;
  period: string;             // e.g. "Sep 2022 — Present"
  location: string;
  type: 'work' | 'education';
  highlights: string[];       // 3–5 bullet achievements
  tags?: string[];            // skills used
}

export interface Skill {
  category: string;           // e.g. "Languages", "Infrastructure"
  items: string[];
}

export interface SiteConfig {
  name: string;
  tagline: string;            // e.g. "Software Engineer · Designer · Builder"
  email: string;
  github: string;
  linkedin: string;
  location: string;
}
```

---

## File Conventions

- All components: **named exports** (no default exports on components).
- Data files in `src/data/`: **const arrays** exported as named exports.
- All animation variants defined **outside** the component function (stable references).
- Tailwind class ordering: layout → spacing → typography → color → border → shadow → motion.
- No inline styles except Framer Motion's `style` prop where necessary.

---

## Tailwind v4 Note

This project uses **Tailwind v4**. Design tokens are defined in `src/app/globals.css` via the `@theme {}` directive — there is no `tailwind.config.ts`. Custom tokens (colors, font families, font sizes, shadows) are declared in `globals.css` and referenced in components using standard Tailwind utility class names.
