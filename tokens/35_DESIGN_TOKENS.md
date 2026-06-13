# 35_DESIGN_TOKENS: Human-Readable Token Reference

## 1. Why This Exists and Why It Works
Large projects often feature inconsistent paddings, hardcoded color values, and mismatched typography sizes. This document lists the core design tokens of the Creative OS (v3.0.0). It works by setting clear visual constants that developers can reference during the layout building process.

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

---

## 3. Version 3.0.0 Upgrade Specifications

The token system is upgraded to support Obsidian-first dark themes, single-accent constraints, fluid clamp typography, and named grid areas.

### Color Tokens (HSL Palette)

| Token Name | HSL Value | Description |
| :--- | :--- | :--- |
| `color.canvas.obsidian` | `hsl(220, 8%, 7%)` | Standard dark canvas background |
| `color.canvas.obsidian-warm` | `hsl(30, 5%, 8%)` | Warm dark canvas background |
| `color.canvas.obsidian-cool` | `hsl(230, 12%, 6%)` | Cool dark canvas background |
| `color.canvas.ivory` | `hsl(40, 20%, 97%)` | Classic cream light background |
| `color.canvas.ivory-warm` | `hsl(35, 25%, 95%)` | Warm cream light background |
| `color.canvas.ivory-cool` | `hsl(220, 15%, 96%)` | Cool grey-cream light background |
| `color.ink.on-dark.primary` | `hsl(40, 20%, 96%)` | Warm white display type on dark backgrounds |
| `color.ink.on-dark.secondary` | `hsl(220, 5%, 65%)` | Medium grey body text on dark backgrounds |
| `color.ink.on-dark.muted` | `hsl(220, 5%, 40%)` | Dark grey details/borders on dark backgrounds |
| `color.ink.on-dark.ghost` | `hsl(220, 5%, 20%)` | Detached echo typography elements |

### Premium Design Philosophy and Choices
* **Obsidian-First Defaults**: Start layouts with dark themes. Dark backgrounds reduce visual noise, prioritize page structure, and frame imagery cleanly.
* **Single Accent Constraint**: Pick exactly one accent color per project. This ensures the accent acts as an explicit signal for interactivity rather than a decorative pattern.
* **Typographic Space**: Negative space and font weight contrast are used instead of heavy drop shadows or colored cards to delineate layouts.

---

## Benchmark Traceability

### Buttermax
- [DIRECT] Buttermax: Suisse Intl typography variables: Design Tokens: Load Suisse fonts for all display headers.

### Basic Agency
- [DIRECT] Basic Agency: Grayscale and beige theme parameters: Design Tokens: Map HSL obsidian background targets to local CSS.

### Bureau Borsche
- [SECONDARY] Bureau Borsche: Courier monospaced scales: Design Tokens: Style secondary tags with Courier monospace parameters.
