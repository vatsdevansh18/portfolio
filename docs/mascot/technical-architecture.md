# Technical Architecture

## Selected Technology: Layered SVG + GSAP
**Why selected:**
1. **Resolution Independence:** SVG scales perfectly across desktop and mobile without pixelation (unless intentionally pixelated via CSS `image-rendering`).
2. **Performance:** Animating SVG transforms (translate, rotate, scale) via GSAP is highly performant and hardware-accelerated.
3. **Dynamic Styling:** SVG allows CSS variables (`currentColor` or CSS vars) to instantly theme the mascot (e.g., matching the portfolio's retro monochrome green or amber colors).
4. **Integration:** GSAP is already heavily used in this project. Reusing it avoids adding new dependencies (like Rive or Three.js). React Three Fiber is present, but a 2D DOM-based mascot is easier to integrate into the existing HTML desktop UI and avoids canvas-overlay z-index complexities.
5. **Simplicity:** A hybrid approach using GSAP timelines on a component-based SVG avoids the overhead of a full game loop, while providing rich, sequenced animations.

## Asset Pipeline
- Mascot is a single React component (`MascotSprite.tsx`) containing a layered SVG.
- SVG `<g>` (groups) act as bones: `#mascot-head`, `#mascot-face`, `#mascot-body`, `#mascot-hand-l`, `#mascot-hand-r`, `#mascot-shadow`.
- Facial expressions are conditionally rendered React components inside the SVG `#mascot-face` group.

## Animation Pipeline
- **GSAP Timelines:** Defined in a separate controller. Each animation state (Idle, Walk, Jump) returns a GSAP timeline.
- **Context:** Using `@gsap/react`'s `useGSAP` hook for cleanup and state management.

## Interaction System & State Machine
- **State Machine:** A custom React hook (`useMascotState`) utilizing a simple finite state machine to prevent animation conflicts.
- **Mouse Tracking:** A global `mousemove` listener updates a shared state (or Spring/GSAP tracker) to influence the mascot's head rotation or eye position subtly.
- **Scroll Tracking:** Integrates with the existing Lenis instance or ScrollTrigger to trigger specific state changes when reaching specific portfolio sections.

## Rendering Strategy
- Mascot rendered at the root level of the DOM (e.g., inside `AppShell` but outside the main scroll container if it floats globally, or inside if it sticks to content). Given it moves around the screen, it will be `position: fixed` or `position: absolute` on the desktop view.
- CSS `will-change: transform` on animated SVG groups.

## Mobile Strategy
- **Positioning:** Fixed to the bottom-right corner to avoid obscuring text.
- **Scale:** Reduced via CSS transform.
- **Interactions:** Hover/mouse effects disabled. Relies on scroll triggers and tap events.

## Fallback / Reduced Motion Strategy
- Check `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- If true, the mascot disables hovering, bouncing, and smooth path movement. It immediately jumps to the target location and only updates facial expressions.
