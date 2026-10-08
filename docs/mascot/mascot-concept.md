# Mascot Concept: "C0R3-Y" (Corey)

## Purpose
To provide an interactive, responsive companion within the retro computer/developer workstation environment. Corey acts as a helpful, slightly mischievous digital assistant living within the file system, reacting to user interactions, transitions, and the environment without obstructing usability.

## Personality
- **Playful but Professional**: Curious about the user's actions, but knows when to stay out of the way.
- **Digital Native**: Belongs in the CRT environment. Is a piece of living software.
- **Slightly Glitchy/Analog**: Exhibits subtle CRT imperfections, scanline jitter, or phosphor persistence during quick movements.

## Visual Identity & Shape Language
- **Shape Language**: Geometric, pixel-art inspired, utilizing blocky shapes but with fluid interpolation. A "high-res pixel" or "vector-pixel" aesthetic to maintain crispness on modern displays while evoking retro feelings.
- **Color Palette**: 
  - Primary: Amber or classic CRT Green (matching the portfolio's monochrome/retro theme).
  - Highlights: Bright white/phosphor burn for energetic actions.
  - Shadows/Outlines: Deep terminal black/dark green or amber.
- **Form**: A small, floating, CRT-monitor-headed robot or digital sprite. 
  - **Head**: A stylized mini-CRT screen displaying expressions (eyes/mouth as ASCII or simple geometric pixels).
  - **Body**: Minimalist chassis, floating hands (Rayman-style) for expressive gestures without complex IK rigging, and a small thruster or floating shadow underneath.

## Clothing/Accessories
- A subtle "developer" touch: maybe wearing a small digital lanyard or cap.
- A football accessory: A pixelated football that it can spawn, kick, or balance.

## Facial Characteristics & Expressions
The face is a digital screen on the CRT head.
- **Neutral**: Simple horizontal lines or geometric blocks for eyes.
- **Happy**: ^ ^ eyes.
- **Surprised**: O O eyes.
- **Thinking**: Loading spinner or ellipsis [...] on the screen.
- **Confused**: ? on the screen or asymmetric eyes.

## Movement Personality
- **Hovering**: Constantly bobbing up and down gently (sine wave).
- **Locomotion**: Leans into the direction of movement, leaves a subtle phosphor trail.
- **Easing**: Spring physics. Quick acceleration with a slightly bouncy, overshoot deceleration.

## Relationships
- **Portfolio**: Acts as a guide. Looks at folders when hovered. Points at projects.
- **Football Theme**: Can occasionally juggle a football or kick it off-screen when entering the FOOTBALL section.
- **Retro Desktop**: Looks like a desktop pet from the 90s (e.g., Neko, BonziBuddy, but cool).

## Animation Principles
- **Squash and Stretch**: Applied vertically when jumping or landing.
- **Anticipation**: Pulls back slightly before darting to a new location.
- **Follow-through**: Hands and floating chassis settle a moment after the main body stops.

## Accessibility & Mobile Behavior
- **Mobile**: Scaled down by 30-40%. Stays anchored to a safe zone (e.g., bottom right) to avoid blocking touch targets. Interactions are tap-based rather than hover-based.
- **Reduced Motion**: Disables hovering, bouncing, and darting. Mascot fades between static poses (idle, looking) without complex interpolations or paths.

## Performance Requirements
- Minimal DOM nodes or lightweight Canvas rendering.
- No heavy physics engines.
- Pauses animations when off-screen or tab is inactive.
