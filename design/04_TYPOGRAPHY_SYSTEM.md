# 04_TYPOGRAPHY_SYSTEM: Foundational Typography Rules

## 1. Why This Exists and Why It Works
Typography is the primary framework of any editorial interface. If font sizing, leading, and tracking are configured dynamically by content size, the interface feels cohesive and high-fidelity. This document exists to establish dynamic, fluid type scales and font pairing parameters that maintain readability, balance, and proportions across all devices.

---

## 2. Core Typographic Principles
1. **Referenced Before Layout**: Grids and element containers are sized relative to the font baseline (`rem` and `em` units), never arbitrary pixel layouts.
2. **Dynamic Leading-to-Size Scaling**: As font size increases, the line-height (leading) ratio *must* compress.
3. **Tracking Compensation**: Larger headings require tight letter spacing (tracking), whereas small body text requires open letter spacing.

---

## 3. Typographic Scale and Algorithms
* **Fluid Size Equation**:
  $$\text{Font Size} = \text{clamp}(\text{Min Size}, \text{Min Size} + (\text{Max Size} - \text{Min Size}) \times \frac{\text{Viewport Width} - 320\text{px}}{1920\text{px} - 320\text{px}}, \text{Max Size})$$
* **Leading Ratio Rules**:
  * Display Headings (> 64px): `0.88` to `1.05`
  * Subheadings (24px - 48px): `1.08` to `1.25`
  * Body Text (16px - 20px): `1.5` to `1.6`
* **Tracking Algorithms**:
  * Headings: `-0.02em` to `-0.05em` (compressed to avoid gaps at large scales)
  * Body: `0` to `0.01em`
  * Monospace Metadata: `0.05em` to `0.12em` (open tracking to ensure monospace character clarity)

---

## 4. Engineering and CSS/React Implementations

### Fluid Typography Engine (CSS Variables and Tailwind)
```css
/* Core Typographic Style Classes utilizing clamp for clean fluid scales */
:root {
  --font-display-min: 2.5rem;
  --font-display-max: 6rem;
  
  --font-body-min: 1rem;
  --font-body-max: 1.25rem;
  
  /* Fluid Typographic Engine */
  --font-display: clamp(var(--font-display-min), 5vw + 1rem, var(--font-display-max));
  --font-body: clamp(var(--font-body-min), 1vw + 0.75rem, var(--font-body-max));
}

.typography-display {
  font-size: var(--font-display);
  line-height: 1.05;
  letter-spacing: -0.03em;
  font-weight: 300;
}

.typography-body {
  font-size: var(--font-body);
  line-height: 1.6;
  letter-spacing: -0.01em;
  font-weight: 400;
}

.typography-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  line-height: 1.5;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

### React Styling Component
```jsx
import React from 'react'

export function DisplayHeading({ children, className = '' }) {
  return (
    <h1 className={`typography-display font-light text-neutral-900 tracking-tighter ${className}`}>
      {children}
    </h1>
  )
}
```

---

## 5. Approved Font Pairings
1. **Luxury Editorial**:
   * *Display*: Custom Serif (e.g., Garamond, Editorial New, Playfair Display)
   * *Body*: Clean Sans-Serif (e.g., Inter, Helvetica, Neue Haas Grotesk)
2. **Hyper-Engineered / Developer Prestige**:
   * *Display*: Neo-Grotesque Sans-Serif (e.g., Inter, Space Grotesk)
   * *Body/Metadata*: High-Discipline Monospace Pairing (e.g., SF Mono, JetBrains Mono)

---

## Benchmark Traceability

### Active Theory
- [DIRECT] Active Theory: NB Architekt monospace pairings: Typography System: Load monospace styles for all secondary tags.

### Locomotive
- [DIRECT] Locomotive: Dynamic offset sizes: Typography System: Offset title scales dynamically using viewport clamp rules.

### Bureau Borsche
- [SECONDARY] Bureau Borsche: Serif heading pairings: Typography System: Select high-contrast display serif typography for editorial titles.
