# AGENTS.md

This document orients AI agents and developers working on this codebase.

## Project Overview

A single-page faction site for the **XIII Imperial Legion**, a player faction on the *Keizaal Online* Skyrim roleplay server. The page is themed as an archive ledger kept inside Castle Dour: dark stone, leather, brass, and crimson, with dossier-style cards for the faction's High Command (General, Legate, Tribunes).

Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (custom theme tokens in `src/styles.css`) |
| Language | TypeScript 5.9 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public
│   ├── favicon.ico
│   └── img/
│       ├── legion-crest.png   # AI-generated legion emblem (brass/crimson eagle, "XIII")
│       └── archive-hero.png   # AI-generated hero background (Castle Dour archive interior)
├── scripts
│   └── gen-images.mjs         # One-off script used to generate the two images above via Netlify AI Gateway (Gemini image model). Re-run only if art needs regenerating.
├── src
│   ├── components
│   │   ├── SiteNav.tsx        # Fixed nav bar with scroll-aware background and mobile menu
│   │   ├── OfficerCard.tsx    # Dossier card used for each High Command officer
│   │   └── Reveal.tsx         # IntersectionObserver-based scroll-reveal wrapper
│   ├── data
│   │   ├── officers.ts        # High Command roster (General, Legate, Tribunes) — content lives here
│   │   └── codex.ts           # The Legion's four standing tenets
│   ├── routes
│   │   ├── __root.tsx         # Root layout: HTML shell, meta/SEO tags, global styles import
│   │   └── index.tsx          # The entire landing page (hero, archive intro, command, codex, enlist, footer)
│   ├── router.tsx             # TanStack Router setup
│   └── styles.css             # Tailwind import + custom theme tokens (colors, fonts) + global effects
├── netlify.toml                # Build command (vite build), publish dir (dist/client)
├── package.json
└── tsconfig.json               # `@/*` path alias for `src/*`
```

## Key Concepts

### Content lives in `src/data/`

To change the roster or the Codex tenets, edit `src/data/officers.ts` or `src/data/codex.ts` — the page components just map over these arrays. No JSX changes needed for a copy-only edit.

### Theme tokens

All colors and fonts are defined once in `src/styles.css` under `@theme`, then used as normal Tailwind utilities (e.g. `text-brass`, `bg-crimson`, `text-parchment`). Keep new UI consistent with this token set rather than introducing new hex values inline.

### Images via Netlify Image CDN

Both generated images are served through `/.netlify/images?url=/img/...&w=...&fm=webp` rather than referenced directly, so the browser never downloads the full-resolution source.

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
```

## Conventions

- Components: PascalCase, one component per file in `src/components/`
- Routes: TanStack Router file-based routing in `src/routes/`
- TypeScript strict mode; `@/` import alias for `src/`
- Styling via Tailwind utility classes driven by the custom theme tokens above
