# Landing Page — Quantiphi Assessment

Pixel-perfect, fully responsive implementation of the provided Figma landing page, built with the Next.js Pages Router. All animations and micro-interactions are implemented in plain CSS/SCSS (plus small `requestAnimationFrame`/React logic for timing where CSS alone can't drive it) — **no animation libraries, GIFs, or videos are used anywhere in this project.**

## Getting Started

**Requirements:** Node.js **20.9.0 or later** (this repo pins `next@16.3.8`, which requires Node ≥ 20.9).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the page.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint (flat config, extends next/core-web-vitals)
```

## Project Structure

```
src/
  pages/
    _app.js            # global Navbar/Footer + font/favicon setup
    index.js            # composes the landing page from section components
  components/
    landing-page/       # Banner, Advantages, UseCases — the page sections
    navbar/              # Navbar.jsx + MobileNavbar.jsx + navMenu.js (nav data)
    footer/              # Footer.jsx
  styles/
    global.scss          # source of truth for styles (compiled to global.css)
```

## Implementation Summary

### Approach

The page was broken into three main sections matching the Figma design — **Banner** (hero + animated "formula" diagram), **Advantages** (feature grid with per-card micro-animations), and **Use Cases** (an auto-advancing arc/tracer carousel) — plus a shared **Navbar** (desktop dropdowns + mobile drawer) and **Footer**. Each section is a self-contained component, with layout/animation styling kept in `global.scss` as the single styling source of truth (compiled to the committed `global.css`).

### Key Technical Decisions

- **CSS-only animation philosophy.** Per the assessment requirements, no animation libraries (Framer Motion, GSAP, etc.) were introduced. All motion is done with CSS `@keyframes`/`transition`s driven by custom properties (`--t`, `--d`) set inline per element, so each node's animation delay/duration is computed once in JS/markup and the actual animation runs entirely on the CSS/compositor side.
- **Hero "formula" diagram (Banner).** The chip → data → agent → human → bank → "Compounded Edge" sequence is built from inline SVG icons and a scaled "stage" (via `ResizeObserver`) so the diagram's absolute-positioned geometry scales responsively without recalculating layout. Connecting curves use `pathLength="1"` with a CSS stroke-dash reveal technique, timed against the same `--t` scheme as the cubes/labels for a staged entrance.
- **Advantages cards.** Each card's "bottom graphic" is an independent CSS-animated scene (drag-and-drop, document comparison, agentic branching, learning loop, modular integration) built from small SVG/PNG assets positioned and animated with CSS only — no shared animation engine, so each card's motion can be tuned independently to match its Figma micro-interaction.
- **Use Cases tracer carousel.** An SVG arc path with a dot that eases along it using `requestAnimationFrame` and `getPointAtLength` (since smoothly sampling a point along an arbitrary SVG path isn't expressible in pure CSS). Autoplay, hover/focus-to-activate, and pause-on-interaction are handled in React state; the actual dot motion and card transitions are CSS/rAF-driven, not an animation library.
- **Navbar.** Scroll-direction-aware show/hide + "floating" state (via `react-use`'s `useWindowScroll`) with mobile dropdown/drawer built from scratch, mirroring the desktop mega-menu content in `navMenu.js`.
- **Accessibility/motion-reduction.** `prefers-reduced-motion: reduce` is respected in multiple animated areas (Banner formula, Use Cases autoplay, card micro-interactions) so users who disable motion still get a fully readable, static page.
- **Responsiveness.** 70+ `@media` breakpoints across `global.scss` cover desktop, tablet, and mobile layouts for every section, including dedicated narrow-viewport refinements (down to 360px) for the more visually dense cards.

### Notable Enhancements

- The hero formula diagram's entrance sequence (title → cubes → connecting curves → result) was staged with a shared timeline constant (`START`/`STEP`) rather than hard-coded delays per element, making the whole sequence easy to re-time without touching every animation.
- The Use Cases carousel supports both autoplay and manual control (hover/focus) without conflicting state, and pauses cleanly on user interaction.

### Known Environment Notes

- `npm run build`/`next dev` require Node ≥ 20.9 (this repo's pinned Next.js version enforces this at runtime).
- No GIFs, videos, or JS animation libraries are referenced anywhere in `src/` — all effects are CSS/SVG/Canvas-free, native browser APIs only.
