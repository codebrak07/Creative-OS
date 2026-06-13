# 34_MOTION_COMPONENT_SYSTEM — Motion Component Specifications

## 1. Why This Exists & Why It Works
Motion is the primary tool used by SOTD-tier web designs to direct attention and create narrative momentum. A poorly implemented motion system leads to layout thrashing and choppy framerates. This document defines the specs for letter, word, and line splitting animations, along with spring-based hover divergences, ensuring zero main-thread layout recalculations.

---

## 2. Core Rules & Guidelines
1. **Always Check Motion Preference**: Every animation must listen to `prefers-reduced-motion` and fall back to static or instant states.
2. **Character & Word Reveals**: Text reveals must wrap chunks in `overflow: hidden` containers, translating elements along the Y-axis using the sovereign ease curve.
3. **Ghost Offset Divergences**: High-contrast hovers (such as RXK-style trailing text) must create offset clone layers styled with accent colors.

---

## 3. Code Specifications
* **WordReveal**: Splitting mechanics for words, lines, and characters, triggered in-viewport using GSAP ScrollTrigger.
* **EchoText**: Hover offset divergence layer creating a duplicate layer translating dynamically on hover.

---

## Benchmark Traceability

### Locomotive
- [DIRECT] Locomotive → Custom scrolling components → Motion Component System → Apply the sovereign ease curve to all scroll-triggered reveal animations.

### Resn
- [DIRECT] Resn → Interactive component loaders → Motion Component System → Trigger staggered entrance sequences based on preloaded asset states.
