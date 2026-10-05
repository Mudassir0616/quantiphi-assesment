# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Important: this is not the Next.js you know

This project pins `next@16.3.8` / `react@19.2.8` — versions ahead of training data, with breaking API/convention changes. Before writing or editing any Next.js code, read the relevant guide under `node_modules/next/dist/docs/` (`01-app/`, `02-pages/`, `03-architecture/`, `04-community/`). This repo uses the **Pages Router** (`src/pages/`), so consult `02-pages/` primarily. Heed any deprecation notices found there.

## Commands

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint (flat config via `eslint.config.mjs`, extends `next/core-web-vitals`)

There is no test runner configured in this project.

## Architecture

- Pages Router app under `src/pages/`: `_app.js` wraps every page with global `Navbar`/`Footer` and injects font/favicon `<Head>` tags; `index.js` composes the landing page out of section components.
- UI components live under `src/components/`, grouped by area: `landing-page/` (Banner, Advantages, UseCases — the page sections), `navbar/` (`Navbar.jsx` + `MobileNavbar.jsx` + `navMenu.js` for nav link data), and `footer/`.
- Styling: `src/styles/global.scss` is the source of truth (Sass), compiled to `global.css` (committed, imported in `_app.js`). When changing styles, edit the `.scss` and regenerate the `.css`/`.css.map` — don't hand-edit the compiled CSS.
- `@mui/material` + `@emotion/*` are available for UI primitives; `react-use` is available for hooks.
- Path alias `@/*` maps to `src/*` (see `jsconfig.json`).
