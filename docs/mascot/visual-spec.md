# Visual Specification

## Views and Poses
The mascot will primarily be viewed from an isometric or 3/4 perspective, or a direct 2D front-facing perspective. Given the retro desktop theme, a flat 2D sprite aesthetic (front-facing with slight depth) works best.

### Base Poses
- **Front View**: Facing the user, hands resting at sides.
- **Side View**: Profile view, used when walking left or right.

### Action Poses
- **Idle**: Gentle floating, screen displays blinking neutral eyes.
- **Walking**: Body leans forward 15 degrees, hands swing in opposition, trail effect on thruster.
- **Running**: Body leans forward 30 degrees, faster hand swinging, larger trail.
- **Jumping**: Squash on anticipation, stretch during ascent, limbs pull inward.
- **Waving**: Facing front, one hand raised and rotating rapidly back and forth.
- **Kicking**: Leans back, one foot (or lower body chassis) swings forward powerfully.
- **Celebrating**: Both hands raised, bouncing, face displays `^ ^` or `\o/`.
- **Sleeping**: Rests on the ground, face displays `zZz`, chassis light dims.
- **Surprised**: Body stretches vertically, hands fly up, face shows `O_O`.
- **Confused**: Head tilts 15 degrees, face shows `?_?`.
- **Thinking**: Hand strokes "chin" area, face shows `[...]` or a loading hourglass.

## Proportions
- **Overall**: 1 unit wide x 1.5 units high.
- **Head (CRT)**: 1x1 unit. Large, taking up 2/3 of the overall body mass.
- **Body**: 0.5x0.5 unit. Small, minimal chassis connecting the head to the thruster.
- **Limbs**: Floating hands (no arms). Floating feet/thruster (no legs). Hand size: 0.2x0.2 units.

## Facial Details (Screen)
- Screen has a subtle inner shadow to simulate CRT depth.
- Expressions are rendered in a pixelated font or block graphics.
- Phosphor glow effect around facial elements.

## Styling & Texture
- **Outline**: 2px solid dark outline to separate from the background.
- **Texture**: Subtle horizontal scanline pattern overlaid on the character body and screen.
- **Shadow**: A distinct, semi-transparent oval shadow on the "ground" below the floating mascot. The shadow scales based on the mascot's height (jump).
- **Lighting**: Flat, cel-shaded lighting. No complex gradients, strictly retro limited color palette.

## Asset Generation Workflow
Since we need programmatic control over colors (to match the dynamic retro theme, e.g., amber vs green), the mascot is best implemented as an SVG.
- Assets will be hand-coded or generated as SVG strings.
- Separate layers/groups in the SVG for:
  - Head/Screen
  - Face (Expressions)
  - Chassis (Body)
  - Left Hand
  - Right Hand
  - Shadow
