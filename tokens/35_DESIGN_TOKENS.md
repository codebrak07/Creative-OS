# 35_DESIGN_TOKENS — Human-Readable Token Reference

## 1. Why This Exists & Why It Works
Large projects often feature inconsistent paddings, hardcoded color values, and mismatched typography sizes. This document lists the core design tokens of the COS. It works by setting clear visual constants that developers can reference during the layout building process.

---

## 2. Core Token Constants

### 1. Typography Scales
* **Display Heading**: Sizing: `clamp(2.5rem, 5vw + 1rem, 6rem)`, leading `1.05`, tracking `-0.03em`.
* **Body Text**: Sizing: `clamp(1rem, 1vw + 0.75rem, 1.25rem)`, leading `1.6`, tracking `-0.01em`.
* **Monospace Label**: Sizing: `0.75rem`, leading `1.5`, tracking `0.08em`.

### 2. Spacing Ratios
* **Outer Margins**: `8vw` on desktop, `5vw` on mobile viewports.
* **Vertical split margins**: `1.618` multiples of standard padding.

### 3. HSL Grayscale Colors
* **Warm Obsidian (Dark BG)**: `hsl(0, 0%, 7%)`
* **Warm Ivory (Light BG)**: `hsl(30, 15%, 96%)`
* **Text Off-White**: `hsl(30, 8%, 92%)`
* **Text Off-Black**: `hsl(0, 0%, 12%)`
* **Burnt Ochre (Accent)**: `hsl(24, 85%, 50%)`

### 4. Motion Curves
* **Sovereign Ease**: `cubic-bezier(0.16, 1, 0.3, 1)`
* **Hover Ease**: `cubic-bezier(0.25, 1, 0.5, 1)`
* **Micro-interaction speed**: `200ms`
* **Slide transition speed**: `1000ms`

## Benchmark Traceability

### Buttermax
- [DIRECT] Buttermax → Suisse Intl typography variables → Design Tokens → Load Suisse fonts for all display headers.

### Basic Agency
- [DIRECT] Basic Agency → Grayscale and beige theme parameters → Design Tokens → Map HSL obsidian background targets to local CSS.

### Bureau Borsche
- [SECONDARY] Bureau Borsche → Courier monospaced scales → Design Tokens → Style secondary tags with Courier monospace parameters.
