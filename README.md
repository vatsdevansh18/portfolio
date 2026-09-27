# Devansh Vats — Developer Portfolio

> **Tactical Discipline × Spatial Codecraft**  
> Built and maintained by **Devansh Vats** (BCA 2nd Year, Christ University Delhi NCR).

I wanted my portfolio to feel more like exploring an authentic computer workstation than scrolling through another standard developer landing page. 

Instead of a generic template with gradient cards and floating glass effects, the entire portfolio is structured as a retro desktop environment and file system (`DEVANSH_WS_v3.8`). The home screen behaves like a personal computer terminal where you navigate directories, inspect system specs, and launch executable modules. When you open a destination—such as my projects or varsity football tracking—the experience expands into interactive, scroll-driven 3D case studies.

---

## Design & Architecture Concept

The architecture is built around two distinct interaction layers:

1. **Level 1: Desktop Shell & Filesystem Navigation**
   - Viewport-contained terminal shell with persistent directory navigation (`00_HOME` to `06_CONTACT`).
   - Authentic retro computing aesthetics: hairline borders, CRT scanlines, hardware LEDs, dotted specification leaders, and live uptime/telemetry readouts.
   - Desktop screens remain strictly viewport-contained with zero browser scrollbars.

2. **Level 2: Deep Content & Scroll-Driven Destinations**
   - Independent destination pages (`/projects`, `/football`, `/skills`, `/about`, `/experience`, `/contact`) that scroll naturally through a unified scroller context.
   - Deep 3D case studies with camera choreography, exploded layer inspections, and interactive pitch boards.

---

## Key Features

- **Retro Desktop Environment**: ASCII boot sequence, live hardware clock, battery indicator, memory heap monitor, and quick-launch `.app` and `.sys` files.
- **Folder Navigation**: Persistent directory tree on desktop (`w-60`), with a slide-over mobile drawer on smaller viewports.
- **Scroll-Driven 3D Experiences**:
  - `portfolio_v3.app`: Scroll-synchronized 3D workstation model with camera interpolation.
  - `tactical_pitch_3d.sim`: 3D tactical pitch vector visualizer highlighting spatial movement and pressing lanes.
  - `football_attendance.sys`: Architectural layer inspection demonstrating fullstack roster tracking.
- **Varsity Football Tactics Board (`/football`)**: Interactive 2D tactical board representing my role as University Vice Captain & Central Midfielder (`#8`), featuring formation switching (`4-3-3` vs `4-2-3-1`) and pitch lane analysis.
- **Interactive Terminal Console (`/contact`)**: Simulated command-line interface supporting commands like `help`, `whoami`, `ping`, `email`, and `clear`.
- **Responsive & Mobile Hardened**: Tested across phone viewports (320px to 430px), tablet (768px), and desktop (1440px, 1920px) with zero horizontal overflow.
- **Reduced Motion & Accessibility**: Respects `prefers-reduced-motion` by cleanly disabling CRT scanlines, skipping boot loaders, and defaulting to native scroll mechanics.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 6 + Oxlint
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **3D & WebGL**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Motion & Scrolling**: GSAP 3 (ScrollTrigger), Lenis smooth scroll
- **Icons**: Lucide React
- **Typography**: Geist Variable

---

## Project Structure

```text
├── public/
│   ├── media/             # Authentic photo, audio, and visual assets
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── desktop/       # AppShell, folder nav, initial loader
│   │   ├── immersive/     # 3D WebGL experiences and tactical canvas
│   │   ├── retro/         # Retro panels, HUD readouts, CRT overlay
│   │   └── ui/            # Precision custom cursor and UI atoms
│   ├── lib/
│   │   ├── gsap.ts        # GSAP + ScrollTrigger registration
│   │   ├── routes.ts      # Route metadata & hierarchy definitions
│   │   └── scroll-context.tsx # Unified Lenis + primary scroll ownership
│   ├── pages/             # Route views (Home, About, Projects, Skills, Football, Experience, Contact)
│   ├── App.tsx            # Root application router and shell binding
│   ├── main.tsx           # Application entrypoint
│   └── index.css          # Tailwind CSS v4 config, retro scanlines, scrollbar styles
├── docs/                  # Technical phase documentation and architecture guides
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/vatsdevansh18/portfolio.git
cd portfolio
npm install
```

### Development Server
Run the local dev server with hot module replacement:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
To create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Contact & Links

- **Developer**: Devansh Vats
- **GitHub**: [github.com/vatsdevansh18](https://github.com/vatsdevansh18)
- **LinkedIn**: [linkedin.com/in/devansh-vattsss](https://www.linkedin.com/in/devansh-vattsss/)
- **Academic Track**: BCA 2nd Year (2024–2027), Christ University Delhi NCR
