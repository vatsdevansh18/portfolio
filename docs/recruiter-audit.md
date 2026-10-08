# PHASE 1: UX & RECRUITER AUDIT
Date: 2026-10-08

## 1. Current State Evaluation
- **Theme**: Retro terminal/workstation motif with file/folder navigation, 3D WebGL experiences, and a pixelated mascot.
- **Clarity vs Effects Imbalance**: The portfolio leans heavily into the terminal metaphor (e.g., "SYSTEM_SPECIFICATION.sys", "football_attendance.sys", "04_FOOTBALL"). While highly creative, this forces the recruiter to "decode" the interface.
- **Visual Hierarchy**: Everything has a similar level of visual importance. The navigation uses `01_ABOUT`, which is okay, but sub-labels like `USER_PROFILE.sys` add noise. The homepage reads like a diagnostic screen rather than a clear introduction.
- **Contact Info**: Not immediately prominent on the landing screen without explicitly looking for the contact file.
- **Project Scannability**: Represented as raw executable files on the homepage (`tactical_pitch_3d.sim`), missing human-readable context at a glance.

## 2. Core Hierarchy Restructuring (The Fix)
The goal is to maintain the retro aesthetic but enforce strict typography, whitespace, and clear labels.

- **Hero (Home)**: Must clearly state "DEVANSH VATS", "BCA Student & Frontend Developer". Needs explicit CTAs: "VIEW PROJECTS" and "CONTACT". The terminal aesthetic should frame this information, not obscure it.
- **Navigation**: Clean up `FolderNavigation`. Keep the folder icon metaphor but ensure the primary text is just "ABOUT", "PROJECTS", "EXPERIENCE", "SKILLS", "CONTACT".
- **Projects**: Replace the cryptic "executable" cards with clean, scannable project cards (Name, Problem, Stack, Role, Links) styled as premium UI panels.
- **Visual Noise**: Reduce the glowing ASCII elements and diagnostic readouts where they compete with the actual identity and experience.
- **Mascot**: The pixel-art mascot is a nice touch of personality, but it shouldn't distract from the main CTAs.

## 3. Action Plan (Phases 2-7)
1. **HomePage Overhaul**: Refactor `HomePage.tsx` to center on Devansh's identity with prominent CTAs.
2. **Navigation Cleanup**: Simplify `FolderNavigation.tsx` and `FolderItem.tsx` labels.
3. **Projects Page Refinement**: Ensure `ProjectsPage.tsx` uses structured, easy-to-read project cards.
4. **Spacing & Contrast**: Add whitespace, standardize typography scales.
5. **Mobile Verification**: Ensure the layout remains pristine on small screens.
