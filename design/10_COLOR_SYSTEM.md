# 10_COLOR_SYSTEM: Harmonious Color Spaces

## 1. Why This Exists and Why It Works
Standard design palettes often rely on saturated primary colors (pure red, green, blue) or raw hex color codes, which feel cheap and cause visual fatigue. This document establishes guidelines for color design using HSL harmonies and subtle tones. It works by creating high contrast without color saturation, mimicking premium print layouts.

---

## 2. Core Color Principles
1. **HSL-First Definitions**: Define colors using Hue, Saturation, and Lightness (HSL) variables. This allows mathematically precise contrast adjustments.
2. **Minimal Palette Footprint**: Restrict palettes to one primary background shade, one primary text shade, and one accent brand color.
3. **High Contrast Accessibility**: Enforce WCAG AA contrast ratios (minimum 4.5:1) while using warm or cool off-whites and soft blacks to prevent eye strain.

---

## 3. The Harmonious Grayscale and Accents
* **Light Canvas**: Background `hsl(30, 20%, 97%)` (Warm Cream), Text `hsl(0, 0%, 10%)` (Off-black)
* **Dark Canvas**: Background `hsl(0, 0%, 6%)` (Obsidian), Text `hsl(30, 10%, 94%)` (Warm White)
* **Accent Rules**: Accent hues must occupy less than 5% of the total viewport area.

---

## 4. The Obsidian-First Protocol
The elite creative development community (such as Bruno Simon, Aristide Benoist, and Thomas Aufresne) defaults to obsidian-first styling for immersive work.

* **Rule 1: Start Dark**: Build the dark theme first. Light mode should exist as a secondary viewport override. Dark backgrounds reduce layout visual noise, emphasize spatial depth, and frame imagery cleanly.
* **Rule 2: Single Accent**: Enforce a strict single-accent limitation per layout. Accents must represent interactive triggers rather than decorative borders.
* **Rule 3: Accent Isolation**: The accent color should function as an independent artistic signature. If all decorative layouts are hidden, the accent highlights interactive elements.

---

## 5. Palette Derivations for Project Archetypes

### Archetype A: Creative Developer Portfolio (Benoist/Aufresne Mode)
* **Philosophy**: Near-monochrome canvas. Color is driven exclusively by showcase media assets.
* **Colors**:
  * Canvas: `hsl(220, 8%, 7%)` (Obsidian, slight blue-grey cool)
  * Ink: `hsl(40, 15%, 95%)` (Warm white, natural ivory tone)
  * Accent: `NONE` (No decorative colors)
  * Surface: `hsl(220, 8%, 11%)` (Subtle raised dark surface)
  * Border: `hsl(220, 8%, 16%)` (Hairline dark boundaries)

### Archetype B: Luxury Brand (Lempens-Adjacent Mode)
* **Philosophy**: Warm paper-like tones. Accent bone/gold highlights denote value.
* **Colors**:
  * Canvas: `hsl(35, 12%, 94%)` (Warm ivory cream)
  * Ink: `hsl(25, 8%, 12%)` (Warm obsidian, soft off-black)
  * Accent: `hsl(38, 45%, 62%)` (Aged bone/gold)
  * Surface: `hsl(35, 10%, 98%)` (High-exposure light ivory)
  * Border: `hsl(35, 8%, 85%)` (Warm grey layout lines)

### Archetype C: AI Infrastructure Tool (Technical Authority Mode)
* **Philosophy**: Deep space coordinates paired with high-frequency electric highlights.
* **Colors**:
  * Canvas: `hsl(228, 15%, 6%)` (Deep blue-obsidian slate)
  * Ink: `hsl(210, 20%, 94%)` (Cool white with blue bias)
  * Accent: `hsl(195, 90%, 58%)` (Electric blue-green)
  * Surface: `hsl(228, 12%, 10%)` (Raised Slate surface)
  * Border: `hsl(228, 10%, 18%)` (Subtle terminal border)

---

## 6. Engineering and CSS/Tailwind Implementations

### HSL Root Variable Definitions (CSS)
```css
/* Color system variables mapped to HSL scales for micro-adjustments */
:root {
  /* Warm Premium Slate Palette */
  --color-bg-hsl: 30, 15%, 96%;
  --color-text-hsl: 0, 0%, 12%;
  --color-accent-hsl: 24, 85%, 50%; /* Tailored Burnt Ochre */
  
  /* Converted CSS helper values */
  --color-bg: hsl(var(--color-bg-hsl));
  --color-text: hsl(var(--color-text-hsl));
  --color-accent: hsl(var(--color-accent-hsl));
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-hsl: 0, 0%, 7%;
    --color-text-hsl: 30, 8%, 92%;
    --color-accent-hsl: 24, 75%, 55%;
  }
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: background-color 0.8s ease, color 0.8s ease;
}

.text-accent {
  color: var(--color-accent);
}

.bg-accent {
  background-color: var(--color-accent);
}
```

---

## 7. When to Use and Avoid
* **When to Use**: Dynamic page states, micro-interactive hovers, notification tags, and highlight keywords.
* **When to Avoid**: Full layouts, container backgrounds, or header blocks where large color splashes violate visual minimalism.

---

## Benchmark Traceability

### Buttermax
- [DIRECT] Buttermax: Yellow/Obsidian theme colors: Color System: Store default themes inside programmatic HSL token values.

### Basic Agency
- [DIRECT] Basic Agency: Beige background values: Color System: Define background color targets using warm off-white parameters.
