# Retro Folder Portfolio Architecture — Interaction Model & Scroll Ownership

## 1. Executive Summary & Design Model
The portfolio implements a disciplined **three-level depth model** powered by a **strict scroll ownership architecture**:

```
LEVEL 1: DESKTOP WORKSTATION (/)
  - Strict Viewport-Contained (`overflow: hidden`)
  - No global scroll, no container scroll, no scrollbars

LEVEL 2: DIRECTORY PAGES (/about, /projects, /skills, /football, /experience, /contact)
  - Single primary vertical scroll context for the page workspace
  - Zero nested inner scroll containers (no "website inside a website")
  - Persistent left folder navigation (clean, scrollbar-free)

LEVEL 3: IMMERSIVE 3D DESTINATIONS (/projects/portfolio-v3, /projects/football-attendance, /projects/tactical-pitch)
  - Deep scroll-driven storytelling
  - React Three Fiber pinned scenes
  - Camera coordinate interpolation, layer explosions, pinned milestones
  - Lenis + GSAP ScrollTrigger synchronized to the primary scroll container
```

---

## 2. Scroll Ownership Architecture

### A. The "Website Inside a Website" Problem Solved
Previously, common retro desktop layouts resulted in multiple competing scroll contexts: the browser window, the desktop shell, the navigation panel, and nested sub-panels.

**Our Architecture Solution**:
1. **Window / HTML / Body**: Globally locked with `overflow: hidden`. The browser window itself never scrolls.
2. **Left Folder Navigation (`<aside>`)**: Fixed height, natural spacing, and `.no-scrollbar` (`scrollbar-width: none !important; ::-webkit-scrollbar { display: none !important; }`). **Zero visible scrollbar**, permanently accessible.
3. **Primary Scroll Workspace (`#page-scroll-container`)**:
   - On `/` (Home): Viewport-locked (`overflow: hidden`).
   - On Destination Pages: Serves as **THE ONE AND ONLY PRIMARY SCROLL CONTEXT** (`overflow-y: auto`, `.tactical-scrollbar`).
   - All internal panels inside `/about`, `/projects`, `/skills`, `/football`, `/experience`, `/contact` flow naturally within this single primary scroll container without internal nested scrollbars.

### B. Lenis + GSAP ScrollTrigger Integration (`PrimaryScrollProvider`)
- Centralized in `src/lib/scroll-context.tsx`.
- Connects Lenis smooth-scroll inertia directly to the primary scroll container when on destination routes.
- Updates GSAP `ScrollTrigger.update()` on every Lenis scroll event.
- Coordinates the RAF loop using GSAP's single ticker (`gsap.ticker.add(...)`, `lagSmoothing(0)`).
- Sets `ScrollTrigger.defaults({ scroller: container })` so all future pinned sections, parallax, camera transitions, and reveals track this single primary scroll context seamlessly.
- Resets scroll position to `scrollTop = 0` on route change.
- Automatically bypasses Lenis inertia when `prefers-reduced-motion: reduce` is enabled.

---

## 3. Files Created & Modified

### Created:
- `src/lib/scroll-context.tsx` (primary scroll context provider unifying Lenis, GSAP ScrollTrigger, and single-container scrolling)
- `src/lib/routes.ts` (route type system)
- `src/components/immersive/PortfolioWorkstationScene.tsx` (scroll-driven 3D R3F workstation scene)
- `src/components/immersive/PortfolioV3Experience.tsx` (scroll-driven 3D case study for portfolio-v3)
- `src/components/immersive/TacticalPitchExperience.tsx` (scroll-driven 3D tactical pitch world)
- `src/components/immersive/FootballAttendanceExperience.tsx` (varsity attendance case study)

### Modified:
- `src/App.tsx` (wrapped in `PrimaryScrollProvider`, registered immersive routes, locked body overflow)
- `src/components/desktop/AppShell.tsx` (implemented single primary scroll workspace, eliminated sidebar scrollbar)
- `src/components/desktop/FolderItem.tsx` (compact spacing, micro-interactions)
- `src/components/desktop/FolderNavigation.tsx` (compact vertical layout, `.no-scrollbar`)
- `src/pages/AboutPage.tsx` (removed nested inner overflow; flows in primary scroll container)
- `src/pages/ProjectsPage.tsx` (removed nested inner overflow; added OPEN FILE execution buttons)
- `src/pages/SkillsPage.tsx` (removed nested inner overflow; flows in primary scroll container)
- `src/pages/FootballPage.tsx` (removed nested inner overflow; flows in primary scroll container)
- `src/pages/ExperiencePage.tsx` (removed nested inner overflow; flows in primary scroll container)
- `src/pages/ContactPage.tsx` (removed nested inner overflow; flows in primary scroll container)
- `src/index.css` (configured `.no-scrollbar` and `.tactical-scrollbar` utilities)
- `handoff.md` (updated)

---

## 4. Verification Results

| Verification Check | Result | Measurement / Detail |
| :--- | :--- | :--- |
| **`npm run build`** | **PASS** | 0 TypeScript errors, 0 Vite build errors (built in 615ms). |
| **Nested Scroll Containers** | **PASS** | Exactly **0** nested inner scroll containers across all 10 routes. |
| **Sidebar Scrollbar** | **PASS** | `scrollbarWidth: "none"`, `scrollHeight === clientHeight` (832px). Zero scrollbar rendered. |
| **Browser Window Scroll** | **PASS** | `window.scrollY === 0` across all routes. |
| **Home Page Viewport Lock** | **PASS** | `/` verified `overflow: hidden`, `containerCanScroll: false`. |
| **Destination Scrollability** | **PASS** | Destination pages verified scrollable via single primary context (`containerCanScroll: true`). |
| **Lenis + GSAP ScrollTrigger** | **PASS** | Scroller defaults wired to `#page-scroll-container`, ticker synchronized, 0 memory leaks. |
| **Scroll-Driven 3D Control** | **PASS** | Verified on `/projects/portfolio-v3`: camera position, layer explosion, and HUD scrubber respond to scroll. |
| **Persistent Folder Nav Escape** | **PASS** | Clicking any folder on the left while at deep scroll depth in an immersive page immediately navigates and resets scroll. |
| **Mobile Responsiveness** | **PASS** | Tested at 390x844: zero horizontal overflow, drawer navigation functions cleanly. |
| **Console Errors** | **PASS** | 0 runtime console errors. |
