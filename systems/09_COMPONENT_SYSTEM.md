# 09_COMPONENT_SYSTEM — Core Creative OS Components

## 1. Why This Exists & Why It Works
Traditional component libraries often bundle extraneous stylesheets, leading to bloated, non-semantic DOM trees and slow performance. This component system, built to SOTD standards, enforces strict isolation of logic and styling. It utilizes CSS custom properties (tokens) to align layouts with the design system, ensuring a high-end, bespoke aesthetic that mimics award-winning French agencies.

---

## 2. Core Component Rules
1. **Zero Hardcoded Design Tokens**: All color, sizing, spacing, and transition constants must refer to standard CSS variables defined in the token system (e.g. `var(--color-canvas)`).
2. **Keyboard Accessible by Default**: Interactive elements must feature clear `:focus-visible` styling (minimum `1.5px` offset outline) and support standard keyboard accessibility patterns.
3. **Sound Triggers Integrated**: Buttons and menu overlays should integrate sound triggers (e.g. calling `window.__cos?.sound?.play('click')` if available) to provide tangible spatial feedback.
4. **Touch & Motion Fallbacks**: Micro-interactions (like magnetic mouse offset) must automatically check for touch support (`'ontouchstart' in window`) and reduce animation overhead on lower-end hardware.

---

## 3. Core Component Specifications

### 1. COS Button
A magnetic, token-integrated call to action. 
- Magnetic cursor pull calculated via GSAP on mouse moves.
- Multi-variant styling: Primary (filled), Ghost (bordered), and Text (underlined).
- Integrates sound triggers for spatial feel.

### 2. Navigation Overlay (Lempens/Benoist Pattern)
A full-screen, motion-rich menu layer.
- Triggered by a custom hamburger icon morph.
- Clip-path transition sweep on open/close using GSAP `power4.inOut`.
- Escape key listener locks scroll and closes navigation overlays gracefully.

### 3. Loader (Lempens-Tier)
A designed wait sequence that sets the site's initial atmosphere.
- Features awards display row.
- tabular-nums monospaced progress counter counting from `000` to `100`.
- Experience hints instructing users to enable sound.

### 4. Hero Layout (Asymmetric)
A bold editorial landing viewport.
- Split screen visual weighting.
- Left content: display headline with staggered vertical reveal.
- Right content: landscape/portrait asset with clip-path sweep animation on mount.

---

## 4. Benchmark Traceability

### Fantasy Interactive
- [DIRECT] Fantasy Interactive → Tailwind CSS grids → Component System → Define component templates using responsive CSS variables.

### MediaMonks
- [DIRECT] MediaMonks → Drupal data-component attributes → Component System → Bind component declarations to declarative loading rules.
