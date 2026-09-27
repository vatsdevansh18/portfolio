# Retro Visual System & Architecture Guide

## 1. Visual Philosophy
The portfolio embodies the feeling of discovering a real developer's personal computer workstation from another era, where the entire computer **IS** the portfolio:

> "DEVANSH VATS // COMPUTER WORKSTATION v3.8"  
> Concept: **TACTICAL DISCIPLINE × SPATIAL CODECRAFT**

This system rejects modern generic AI-portfolio tropes (no purple/cyan glow blobs, no random floating glass cards, no meaningless particle clouds, no SaaS landing templates). Instead, it adopts an authentic, art-directed late-80s/early-90s developer workstation aesthetic grounded in:
- High-contrast charcoal/near-black backgrounds (`#050505`, `#080808`).
- Restrained phosphor emerald green accents (`#10b981`) and muted amber indicators (`#f59e0b`).
- Hairline borders (`1px solid rgba(255, 255, 255, 0.08)` to `0.12`).
- Monospace and technical condensed typography with dot leaders.
- Beveled window panels (`.retro-box`, `.retro-box-header`) with corner registration crosses `+`.
- Non-intrusive, zero-overhead CRT scanlines and subtle edge vignette.
- Autonomous life behaviors: real-time uptime clock, fluctuating CPU load %, memory heap telemetry, network packet counters, rotating diagnostic status tickers, and folder hover diagnostics.

---

## 2. Reusable Retro Design Primitives (`src/components/retro/`)

| Component | File | Purpose & Behavior |
| :--- | :--- | :--- |
| **`RetroPanel`** | `RetroPanel.tsx` | Classic retro OS window panel with beveled titlebar, optional window controls `[_] [■] [X]`, corner registration crosses `+`, status readout badge, and content slot. |
| **`TerminalLabel`** | `TerminalLabel.tsx` | Monospace technical tags with bracket delimiters (`[ SYS_INFO ]`, `[ EXECUTABLE ]`), with green, amber, muted, or white phosphor variants. |
| **`StatusIndicator`** | `StatusIndicator.tsx` | Retro hardware LED with pulsing halo dot for `online`, `busy`, `standby`, or `active` states. |
| **`SystemReadout`** | `SystemReadout.tsx` | Key-value technical display with dotted leader lines (`MEMORY HEAP ............ 41.8 MB`). |
| **`HUDReadout`** | `HUDReadout.tsx` | Live autonomous hardware telemetry widget (CPU load % fluctuating between 3.8%–5.6%, memory heap 41.6 MB / 64 MB, network packets counter, uptime counter). |
| **`FileCard`** | `FileCard.tsx` | Retro filesystem representation for executable `.app`, `.sys`, `.sim`, `.cfg`, `.txt`, `.md`, `.log` files with file size, permissions (`-rwxr-xr-x`), and run triggers. |
| **`RetroProfilePhoto`** | `RetroProfilePhoto.tsx` | CRT workstation profile image viewer for Devansh's authentic portrait (`public/media/devansh-portrait.png`). Features authentic window controls `[_] [■] [X]`, corner registration markers `┌ ┐ └ ┘`, subtle CRT scanline texture, technical metadata overlays (`OPERATOR: DEVANSH VATS`, `ID: NCR-7731`, `24-BIT RGB // 640x800`), and telemetry readouts (`CALLSIGN`, `OFFICE`, `ACADEMICS`, `SYSTEM_STATUS`). Maintains 100% facial and photographic clarity without distortion or heavy glitch shaders. |
| **`CRTOverlay`** | `CRTOverlay.tsx` | High-performance CSS scanlines + subtle vignette (`pointer-events: none`), zero CPU/GPU overhead, automatically disabled under `prefers-reduced-motion`. |

---

## 3. Autonomous Micro-Behaviors & System Life
The interface feels alive through lightweight, deterministic micro-behaviors:
1. **Live Workstation Uptime**: Uptime counter incrementing in real time in the top bar.
2. **CPU & Memory Heap Jitter**: Mathematical sinusoidal variation simulating active process execution without erratic layout shifts.
3. **Rotating Diagnostic Ticker**: Footer ticker rotating every 4.5 seconds across system status, coordinates, scroller state, and varsity role.
4. **Folder Hover Diagnostics**: Hovering any folder in the left navigation displays real-time access telemetry in the sidebar footer (`> ACCESS /about // TYPE: DOSSIER // MOD: 2026.09.26`).
5. **Terminal Prompt Blink**: Blinking cursor `&gt;_` on top and bottom status lines.
6. **Mechanical Folder Interaction**: Folders shift +2px right on hover with ASCII state indicators `[+]` (idle) vs `[-]` (active) and depress by 1px on click.

---

## 4. Typography & Color Specifications
- **Typeface**: `Geist Variable` (sans-serif) for high-legibility UI text, and crisp monospace (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas`) for all code, filesystem paths, and readouts.
- **Palette**:
  - Root Canvas: `#050505`
  - Retro Panel Surface: `#080808`
  - Inset Well Surface: `#030303`
  - Primary Phosphor: `#10b981` (Phosphor Green)
  - Secondary Warning / Accent: `#f59e0b` (Phosphor Amber)
  - Hairline Borders: `rgba(255, 255, 255, 0.08)` to `0.15`
  - High-Contrast Text: `#ededed`
  - Muted Technical Text: `#8c8c8c` and `#71717a`

---

## 5. Strict Architectural Invariants Preserved
1. **Single Primary Scroll Ownership**:
   - `window.scrollY === 0` across all routes.
   - Home (`/`) is strictly viewport-locked (`overflow: hidden`, `containerCanScroll: false`).
   - Destination pages scroll via the one and only `#page-scroll-container` (`overflow-y: auto`, `.tactical-scrollbar`).
   - Exactly **0** nested inner scrollbars inside content panels.
2. **Sidebar Permanence & Zero Scrollbars**:
   - Left folder navigation is permanently accessible on desktop.
   - Sidebar scrollbar is hidden with `scrollbar-width: none !important; ::-webkit-scrollbar { display: none !important; }`.
   - Never overflows or shows visible scrollbars.
3. **Scroll-Driven 3D Experiences**:
   - Immersive destinations (`/projects/portfolio-v3`, `/projects/tactical-pitch`, `/projects/football-attendance`) retain their full camera coordinate interpolation, architectural layer explosion, and HUD stage scrubber bound to `#page-scroll-container`.
4. **Performance & Standards**:
   - `npm run build`: 0 TypeScript errors, 0 Vite errors.
   - Respects `prefers-reduced-motion` across all CSS animations, loaders, and WebGL scenes.
   - Clean mobile responsive drawer at 390px with zero horizontal overflow.
