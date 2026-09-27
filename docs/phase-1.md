# Phase 1 — Foundation, Typography & Smooth Scrolling Engine

## 1. Overview & Objective
Phase 1 establishes the structural, typographical, spatial, and motion foundation for the portfolio of **Devansh Vats** (Full-Stack Developer & University Football Team Vice Captain). The overarching design philosophy is:
> **"TACTICAL DISCIPLINE × SPATIAL CODECRAFT"**

This aesthetic steers clear of generic AI templates (e.g., neon purple glows, floating frosted cards, aimless particle swarms) in favor of high-contrast architectural typography, pitch-coordinate metadata, hairline borders, and an inertia-driven smooth scrolling engine.

---

## 2. Files Changed & Added

- **`src/index.css`**: Configured Tailwind CSS v4 `@theme` with custom carbon palette, typography variables, hairline utilities, spatial background grid, and strict `prefers-reduced-motion` overrides.
- **`src/lib/utils.ts`**: Re-exports `cn` utility; normalized under `src/lib/` for `@/lib/utils` aliasing.
- **`src/lib/gsap.ts`**: Centralized GSAP 3 + ScrollTrigger registration with `useGSAPContext` custom hook for automatic scoped animation cleanup, memory leak prevention, and reduced-motion safety.
- **`src/components/ui/button.tsx`**: Base UI button primitive configured with class-variance-authority variants and aligned to `@/lib/utils`.
- **`src/components/providers/smooth-scroll-provider.tsx`**: Clean Lenis smooth-scroll provider leveraging GSAP's ticker to drive the RAF loop, eliminating duplicate animation loops, with dynamic detection and compliance for `prefers-reduced-motion`.
- **`src/App.tsx`**: Foundation layout featuring tactical status bar, Geist typography hierarchy, pitch coordinate corner tags, smooth scroll trigger, and diagnostic pillars.
- **`index.html`**: Cleaned metadata, customized page title (`Devansh Vats — Developer & Football Vice Captain`), OpenGraph descriptors, mobile viewport safeguards, and `#070707` theme color.
- **Directory Normalization**: Removed obsolete root `@/` artifact; verified `@/*` alias cleanly resolves to `src/*`.

---

## 3. Typography System

- **Display**: `@fontsource-variable/geist` (`Geist Variable`), weights 700–900, tight tracking (`tracking-tight` / `-0.04em`), disciplined line-height.
- **Body**: `Geist Variable`, weights 400–500, line-height 1.6–1.7, optimized for readability and technical narrative.
- **Monospace / Technical**: System technical monospace stack (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`) dedicated to:
  - Spatial coordinates (e.g., `[LAT 28.5833° N / LNG 77.3167° E]`)
  - Status markers (e.g., `PHASE 1 ACTIVE`)
  - Corner pitch anchors (e.g., `+ 00.01 / TOP-LEFT`)
  - Timestamps and tags

---

## 4. Design Tokens & Tactical Spatial Grid

- **Carbon Background**: `#070707` (primary base)
- **Secondary Surfaces**: `#0D0D0D`, `#111111`, `#161616`
- **Hairline Borders**: `rgba(255, 255, 255, 0.08)`
- **Primary Text**: Near-white (`#EDEDED`)
- **Secondary Text**: Muted technical slate (`#8C8C8C`, `#525252`)
- **Restrained Tactical Accent**: Emerald `#10B981` (applied strictly to status pulses, coordinate anchors, and disciplined markers)
- **Tactical Spatial Grid**: Subtle 64px hairline CSS grid (`rgba(255, 255, 255, 0.03)`), lightweight with zero GPU/JS overhead.

---

## 5. Lenis Smooth Scroll Architecture

- **Engine**: `lenis` v1.3.26
- **Loop Strategy**: Unified through `gsap.ticker.add(...)` with `lagSmoothing(0)`, ensuring a single RAF loop for both smooth scrolling and future GSAP ScrollTrigger timelines.
- **Context API**: `useSmoothScroll()` exposing `{ lenis, scrollTo, isReducedMotion }`.
- **Cleanup**: Unregisters ticker, detaches event listeners, and invokes `lenis.destroy()` on unmount.

---

## 6. GSAP Foundation

- Registered `ScrollTrigger` safely on client mount.
- Created `useGSAPContext(callback, scopeRef, deps)`: creates an isolated `gsap.context()` that calls `ctx.revert()` when component unmounts, preventing memory leaks and orphaned scroll triggers.
- Integrated accessibility: GSAP animations automatically stand down when `prefers-reduced-motion: reduce` is enabled.

---

## 7. Responsive Decisions

- Viewports verified: Desktop (1440px), Laptop, Mobile (390px / 375px).
- Zero horizontal overflow (`document.documentElement.scrollWidth === document.documentElement.offsetWidth`).
- Font scales gracefully from mobile display to desktop hero scales without text clipping.

---

## 8. Accessibility Decisions

- **Skip Link**: Accessible `<a href="#main-content" className="skip-link">Skip to main content</a>` positioned off-screen, shifting to `top: 16px` on keyboard focus with visible outline.
- **Focus Rings**: `:focus-visible` with high-contrast `2px solid rgba(255, 255, 255, 0.5)` and offset.
- **Reduced Motion**: Full compliance with `prefers-reduced-motion: reduce`:
  - CSS animations and transitions dialed to 0.01ms.
  - Lenis smooth inertia scroll bypassed in favor of native instant scrolling.
  - UI status dynamically reflects reduced-motion state.
- **Semantic HTML**: Proper `<header>`, `<main id="main-content">`, `<section>`, `<footer>` landmarks.

---

## 9. Performance Decisions

- Self-hosted Geist Variable font (`.woff2`) bundled directly by Vite.
- Lightweight pure CSS spatial grid replacing heavy image textures or JS canvas operations.
- Zero duplicate RAF loops.
- Production build footprint: CSS ~25 kB (~6 kB gzip), JS ~403 kB (~137 kB gzip including Three.js/GSAP/Lenis/React runtime).

---

## 10. Verification Results

| Check | Result | Details |
| :--- | :--- | :--- |
| `npm run build` | **PASS** | 0 TypeScript errors, 0 build warnings. Built in 370ms. |
| Dev Server Running | **PASS** | `http://localhost:5173` returns HTTP 200. |
| Console Errors | **PASS** | 0 errors, 0 warnings. |
| Horizontal Overflow | **PASS** | Tested on 1521px, 1440px, and 390px (mobile); `hasHorizontalOverflow: false`. |
| Font Loading | **PASS** | `Geist Variable` checked and confirmed loaded via `document.fonts.check`. |
| Lenis Inertia Scroll | **PASS** | Verified programmatic and wheel scroll to target `#system-check`. |
| Reduced Motion Emulation | **PASS** | Emulated `reduce`; dynamically disabled inertia and updated UI status. |
| Keyboard Navigation | **PASS** | Verified Tab focus state and skip link rendering at `top: 16px`. |

---

## 11. Known Issues
- None. All Phase 1 specifications pass cleanly.
