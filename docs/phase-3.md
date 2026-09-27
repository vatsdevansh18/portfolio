# Phase 3 — Intentional 3D Spatial Experience

## 1. Objective
Introduce a dedicated, intentional 3D spatial experience for the portfolio of **Devansh Vats** (BCA Developer & University Football Vice Captain). In strict alignment with the **"Tactical Discipline × Spatial Codecraft"** design philosophy, the 3D scene visualizes a physical/digital tactical environment combining:
- Football pitch geometry (touchlines, penalty boxes, center circle, halfway line, tactical channels, and 3D goalposts).
- Spatial coordinates and tactical positioning.
- Dedicated tactical player marker for Devansh Vats (Central Midfielder / Anchor & Vice Captain).
- Cinematic camera system with pointer parallax and scroll-linked perspective transformation.
- Restrained carbon lighting and understated materials.
- High-performance, device-aware rendering and an SVG/CSS fallback for reduced motion and non-WebGL environments.

---

## 2. 3D Component Architecture

```
src/components/three/
├── TacticalScene.tsx       # Master R3F Canvas wrapper with WebGL detection & fallback
├── TacticalPitch.tsx       # Procedural 3D pitch plinth, touchlines, tactical channels
├── TacticalGoal.tsx        # Architectural 3D goal frames and net outlines
├── TacticalMarker.tsx      # Devansh's tactical player beacon with native billboard sprite
├── SpatialCoordinates.tsx  # Native 3D coordinate crosshair anchors
├── TacticalCamera.tsx      # Controlled camera with pointer parallax & scroll transition
├── SceneLighting.tsx       # Understated tactical key, fill, and point lighting
└── SceneFallback.tsx       # Crisp 2D/SVG isometric tactical diagram fallback
```

---

## 3. Component Details & Design Specifications

### Tactical Pitch Geometry (`TacticalPitch.tsx` & `TacticalGoal.tsx`)
- **Dimensions**: Scaled for architectural perspective (width: 26 units, length: 44 units, half-width: 13, half-length: 22).
- **Physical Plinth**: Dark carbon box plinth (`#090909`, roughness: 0.9, metalness: 0.1) with hairline beveled edge geometry.
- **Pitch Markings**:
  - Touchlines, halfway line, center circle ($r = 4.2$), center spot ($r = 0.2$, `#10B981`).
  - North & South penalty boxes (width 14, depth 6.8) and goal areas (width 7, depth 2.4).
  - 5-Channel tactical longitudinal division lines (Left Flank, Left Half-Space, Central Channel, Right Half-Space, Right Flank) rendered in subtle emerald green at 14% opacity.
- **3D Goal Structures**:
  - Posts and crossbars modeled using cylindrical geometry ($r = 0.04$) with gunmetal metallic finish (`#52525B`).
  - Minimal net box stanchions and wireframe net segments at both pitch ends.

### Tactical Player Marker (`TacticalMarker.tsx`)
- **Position**: Central Midfielder / Defensive Anchor coordinate `(1.2, 0, 5)`.
- **Physical Reticle**: Concentric rotating beacon ring (`#10B981`) and center target on the pitch surface.
- **Vertical Stem**: Thin vertical coordinate beam (height 2.4 units).
- **Node Beacon**: Elevated emerald sphere with an orbiting wireframe octahedron cage.
- **Spatial Billboard**: High-resolution ($1024 \times 360$) native WebGL canvas texture sprite:
  - Displays: `NODE // DEVANSH VATS`, `VICE CAPTAIN • TACTICAL ANCHOR`, `COORD: X: +01.20 | Z: +05.00`.
  - Immune to React 19 root unmount issues, eliminates DOM synchronization lag, and renders with zero reflow.

### Spatial Coordinates (`SpatialCoordinates.tsx`)
- Native 3D green coordinate crosshairs (`+`) anchored at pitch corners, penalty spots, and midfield intersections.

### Cinematic Camera System (`TacticalCamera.tsx`)
- **Restrained Pointer Parallax**: Subtly swivels the camera based on pointer movement (max $\pm 1.8^\circ$ X, $\pm 1.2^\circ$ Y) via `useFrame` with delta-scaled damping.
- **Scroll Transformation**:
  - Hero peak (scroll = 0): Angled architectural overview at `[0, 18, 28]`, looking at `[0, 0, 2]`.
  - Scroll descent (scroll $\to$ 850px): Camera descends smoothly towards `[-3.5, 7.5, 14.5]`, focusing directly onto the tactical player node at `[1.2, 1.6, 5.0]`.
  - Seamlessly bridges football tactics into software architecture as the user explores the page.

### Lighting & Materials (`SceneLighting.tsx`)
- Soft ambient fill (`#D4D4D8`, intensity 0.45).
- Directional key light (`#FFFFFF`, intensity 1.2, position `[14, 25, 18]`).
- Tactical accent light (`#34D399`, intensity 0.4, position `[-18, 12, -14]`).
- Central point light focused above the tactical node (`#10B981`, intensity 1.5).
- Integrated Three.js depth fog (`#070707`, range 22–58) that smoothly merges pitch edges into deep carbon black without postprocessing overhead.

---

## 4. Performance & Responsive Strategy

1. **Device-Aware DPR**: Clamped to `dpr={[1, 1.5]}` to prevent GPU overdraw on 4K/Retina displays.
2. **Postprocessing Overhead Avoided**: Three.js native linear fog handles depth blending with zero fragment shader passes or render target overhead.
3. **Responsive Composition**:
   - Desktop: 2-column layout (Left: editorial hero typography, role badges, action buttons; Right: 3D tactical canvas).
   - Mobile: 3D canvas positioned in a structured 380px container below CTA buttons; zero horizontal overflow.
4. **React 19 Compatibility**: Replaced Drei `<Html>` components with native 3D canvas texture sprites, preventing React 19 root unmount race conditions and ensuring 0 console errors.

---

## 5. Accessibility & Fallback (`SceneFallback.tsx`)

- **Automatic WebGL Detection**: Safe browser probe checks for `WebGLRenderingContext`.
- **Reduced Motion Support**: If `prefers-reduced-motion: reduce` is detected:
  - 3D WebGL Canvas is unmounted.
  - Replaced with the static SVG/CSS isometric tactical pitch diagram (`SceneFallback`).
  - Text, navigation, and semantic landmarks remain 100% accessible.

---

## 6. Files Created & Modified

- `src/components/three/TacticalScene.tsx` (created)
- `src/components/three/TacticalPitch.tsx` (created)
- `src/components/three/TacticalGoal.tsx` (created)
- `src/components/three/TacticalMarker.tsx` (created)
- `src/components/three/SpatialCoordinates.tsx` (created)
- `src/components/three/TacticalCamera.tsx` (created)
- `src/components/three/SceneLighting.tsx` (created)
- `src/components/three/SceneFallback.tsx` (created)
- `src/App.tsx` (updated Hero section to embed `TacticalScene` with responsive composition)
- `docs/phase-3.md` (created)
- `handoff.md` (updated)

---

## 7. Verification Results

| Gate Requirement | Status | Verification Details |
| :--- | :--- | :--- |
| `npm run build` | **PASS** | 0 TypeScript errors, 0 Vite build errors. Built in 619ms. |
| Browser Execution | **PASS** | Running at `http://localhost:5173/`, HTTP 200. |
| Console Logs | **PASS** | 0 console errors. |
| 3D Scene Rendering | **PASS** | Pitch, touchlines, goals, center circle, tactical channels, and player node render cleanly. |
| Desktop Viewport | **PASS** | Verified 2-column layout; interactive 3D pitch responds to pointer parallax. |
| Mobile Viewport (390px) | **PASS** | `hasHorizontalOverflow: false`; 3D viewport cleanly nested in card. |
| Scroll Transformation | **PASS** | Camera smoothly descends from `[0, 18, 28]` towards player node on scroll. |
| Reduced Motion Fallback | **PASS** | Emulated `reduce`; confirmed `<SceneFallback />` renders SVG architectural diagram. |
