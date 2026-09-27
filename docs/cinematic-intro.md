# Cinematic Retro Opening & Workstation Experience

## 1. Overview
The cinematic retro opening introduces Devansh Vats' portfolio by transporting the user from an atmospheric retro room into a pixel-perfect developer desktop workstation (`DesktopShell`). From this retro terminal environment, users can directly explore the portfolio sections via a vertical folder filesystem or smooth scroll.

---

## 2. Sequence Architecture
The sequence is coordinated by `DesktopTransition.tsx` across three distinct phases:

1. **State 1: Atmospheric Room (`IntroScreen.tsx`)**
   - Fullscreen presentation of `landing-room.jpg` (`object-fit: cover`).
   - Monospace prompt: `[ PRESS ANY KEY OR CLICK TO ENTER ]` with a subtle blinking cursor.
   - Listens to global click, touch, or keydown events (`Enter`, `Space`, any alphanumeric).
   - Instant response without duplicate triggering.

2. **State 2: Cinematic Zoom (`CinematicIntro.tsx`)**
   - Plays `public/media/portfolio-intro.mp4` (Google Flow zoom sequence).
   - Audio handling: attempts unmuted playback; falls back silently to muted if blocked by browser autoplay policies.
   - Skip option: Persistent `[ ESC TO SKIP ]` badge in the corner. Pressing `Escape` or clicking skips directly to the workstation desktop.
   - Handoff timing: Seamlessly transitions to the real React workstation at $t = 8.5\text{s}$ before video compression artifacts become visible.

3. **State 3: Retro Developer Workstation (`DesktopShell.tsx`)**
   - Pure black background (`#050505`) with retro monospace typography.
   - **Terminal Top Bar**:
     - Left: `>_ devansh@portfolio:~` with a pulsing emerald status cursor (`#10b981`).
     - Right: Live real-time system clock (12-hour format with AM/PM and optional date), battery icon, and status badge.
   - **Folder Navigation (`FolderNavigation.tsx` / `FolderItem.tsx`)**:
     - 6 tactical folders matching the portfolio taxonomy:
       1. `01 // HOME` -> `#hero`
       2. `02 // ABOUT` -> `#about`
       3. `03 // PROJECTS` -> `#work`
       4. `04 // SKILLS` -> `#stack`
       5. `05 // FOOTBALL` -> `#football`
       6. `06 // CONTACT` -> `#contact`
     - Outline SVG folder icon with mechanical press animation, hover arrow indicator (`→`), active status dot, and keyboard accessibility.
     - Smooth scrolling powered by Lenis.
   - **Footer Action**:
     - `[ ↺ REPLAY INTRO ]` button allowing users to experience the opening sequence again at any time.

---

## 3. Navbar Coordination
To prevent visual interference between the sticky global navbar and the workstation's terminal top bar:
- `Navbar.tsx` tracks `scrollY`. When the user is at the workstation (`scrollY <= 140px`), the navbar remains shifted off-screen (`-translate-y-full opacity-0 pointer-events-none`).
- When the user scrolls past the desktop workstation or clicks a folder to navigate down, the floating navbar slides into view.
- When returning to the top, the navbar smoothly hides again.

---

## 4. Accessibility & Motion Settings
- Respects `prefers-reduced-motion: reduce`: Users with reduced motion preferences bypass the video sequence entirely and land directly on the functional workstation.
- Fully keyboard-navigable: Enter / Space triggers folders; Escape skips video.
- ARIA landmarks and roles: `role="region"`, `role="list"`, `aria-label="Desktop filesystem navigation"`.

---

## 5. Verification Checklist
- [x] Initial room frame matches video start frame identically (no flash or jump).
- [x] Autoplay with audio fallback verified across Chrome / Edge / WebKit.
- [x] `Escape` key skips video immediately.
- [x] Folder clicking triggers Lenis smooth scroll to target sections.
- [x] Responsive layout verified from 390px mobile screens to 1440px+ desktop.
- [x] Zero TypeScript errors (`npm run build` passes cleanly).
