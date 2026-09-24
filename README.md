# The XIII Legion — Keizaal Online

A landing page for the XIII Imperial Legion, a player faction on the *Keizaal Online* Skyrim roleplay server. The site is styled as a page pulled from the Legion's own archive inside Castle Dour — dark stone, leather, brass, and crimson wax — and introduces the faction's High Command: the General, the Legate, and the Tribunes.

## What's here

- A full landing page: hero, an in-universe archive entry about the Legion, dossier cards for High Command, the Legion's four standing tenets ("The Codex"), and an enlistment call-to-action.
- Two custom-generated illustrations (a legion crest and a Castle Dour archive interior) used as the emblem and hero background.
- A dark, book-and-leather visual theme with a display serif (Cinzel) paired with a body serif (Spectral), scroll-triggered reveals, and a subtle film-grain overlay for atmosphere.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router)
- Vite 7
- Tailwind CSS 4, themed with custom CSS tokens in `src/styles.css`
- Deployed on Netlify, images served through Netlify Image CDN

## Running locally

```bash
npm install
npm run dev
```

The dev server runs on port 3000 by default (or use `netlify dev` for the full Netlify emulation).

## Editing content

The roster and tenets are data-driven:

- `src/data/officers.ts` — High Command roster (rank, name, posting, quote, record)
- `src/data/codex.ts` — the four Codex tenets

Edit these files to change copy without touching page markup. See `AGENTS.md` for the full project layout.
