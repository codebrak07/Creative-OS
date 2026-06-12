# 05_MOTION_SYSTEM — Animation Physics & Pacing

## 1. Why This Exists & Why It Works
Standard web animations use default CSS transitions (like `ease` or `ease-in-out`), which feel generic. This document establishes guidelines for custom, physics-based motion. It works by copying the weight, drag, and friction of high-end mechanical objects, making interaction feel tactile and responsive.

---

## 2. Core Motion Principles
1. **Never Fight Browser Behavior**: Avoid scrolljacking. All animations must map directly to native device scrolling.
2. ** tactile Feedback**: Interactive objects must react instantly to user focus (hover, click, touch) using custom easing curves.
3. **Staggered Orchestration**: Animate text blocks and content containers sequentially to guide the user's eye from top to bottom.

---

## 3. Custom Physics & Speed Constants
* **Core Luxury Easing (The Sovereign Easing)**:
  * Cubic Bezier: `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra-custom slow exit, fast entry)
* **Standard Interactive Hover Easing**:
  * Cubic Bezier: `cubic-bezier(0.25, 1, 0.5, 1)`
* **Speed Thresholds**:
  * Micro-interactions (hovers, cursor changes): `150ms` - `250ms`
  * Section slide-ins / fades: `600ms` - `1200ms`
  * Complete screen transitions: `800ms` - `1500ms`

---

## 4. Engineering & CSS/Tailwind/Framer Motion Implementations

### Framer Motion Easing Constant (React)
```javascript
// Exported custom luxury easing constants for Framer Motion configs
export const SOVEREIGN_EASE = [0.16, 1, 0.3, 1];
export const HOVER_EASE = [0.25, 1, 0.5, 1];

export const heroTransition = {
  duration: 1.4,
  ease: SOVEREIGN_EASE
};

export const hoverTransition = {
  duration: 0.3,
  ease: HOVER_EASE
};
```

### CSS Utility Classes
```css
/* Custom premium animation curves */
.ease-sovereign {
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

.transition-premium {
  transition-property: transform, opacity, filter;
  transition-duration: 1.2s;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 5. When to Use & Avoid
* **When to Use**: Navigation menus, hero headings, focal images, and state updates.
* **When to Avoid**: Massive data tables, continuous loaders, and accessibility focus outlines where latency should be minimized.

---

## Benchmark Traceability

### Active Theory
- [DIRECT] Active Theory → WebGL coordinate interpolation → Motion System → Smooth custom pointer moves using linear interpolation (lerp 0.1).

### Buttermax
- [DIRECT] Buttermax → Entrance transition timers → Motion System → Animate elements using custom curves with speed limits under 250ms.

### Resn
- [DIRECT] Resn → WebGL liquid timeline systems → Motion System → Map scroll progress ratios to custom cubic curves.
