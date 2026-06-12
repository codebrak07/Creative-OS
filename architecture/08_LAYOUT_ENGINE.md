# 08_LAYOUT_ENGINE — Asymmetric Composition Systems

## 1. Why This Exists & Why It Works
Standard card layouts and bento grids have made modern websites feel repetitive and predictable. This document establishes guidelines for layout structures that enforce visual tension, asymmetry, and editorial rhythm. It works by placing elements along asymmetrical grid lines, creating a premium feel.

---

## 2. Layout Paradigms
1. **Asymmetric Grid Shifts**: Shift elements by a column width or row offset. This breaks standard alignments and draws the user's eye.
2. **Visual Tension**: Balance large, bold typography against wide negative space or offset images rather than using centered cards.
3. **Layered Composition**: Overlap text elements and images across grid layers. This adds depth to layouts.

---

## 3. Asymmetric Layout Blueprint
* **Marginal Offsets**: Shift secondary descriptions or monospaced metadata columns by `1-2` grid tracks from primary headings.
* **Aspect Ratio Variations**: Combine vertical (`4:5`) image containers with panoramic (`21:9`) background images to create visual variety.

---

## 4. Engineering & CSS Grid Implementations

### Asymmetric Editorial Column Grid (CSS)
```css
/* Custom CSS grid establishing asymmetric spacing and offsets */
.editorial-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 2rem;
  row-gap: 8rem;
  align-items: start;
}

/* Offset left-aligned header columns */
.editorial-header {
  grid-column: 1 / span 5;
  position: sticky;
  top: 6rem;
}

/* Shifting primary image columns further right and offset downwards */
.editorial-media-shifted {
  grid-column: 7 / span 6;
  margin-top: 4rem;
  aspect-ratio: 2 / 3; /* Elegant vertical proportion */
}

/* Metadata tag positioned on the extreme left of the layout block */
.editorial-metadata {
  grid-column: 1 / span 2;
  font-family: monospace;
  font-size: 0.75rem;
  color: #666;
}
```

---

## 5. When to Use & Avoid
* **When to Use**: Main landing sections, brand story collections, project presentation galleries, and marketing case studies.
* **When to Avoid**: Analytical dashboards, profile settings screens, or data grids where symmetry is required for utility.

---

## Benchmark Traceability

### Locomotive
- [DIRECT] Locomotive → Viewport scroll adjustments → Layout Engine → Binds section shifts to native scroll events.

### Basic Agency
- [DIRECT] Basic Agency → Custom noise overlays → Visual Rules → Inject SVG background layer .noise_noise__N0mbn.

### Bureau Borsche
- [SECONDARY] Bureau Borsche → 1px grid borders → Layout Engine → Divide editorial segments with thin solid grid lines.
