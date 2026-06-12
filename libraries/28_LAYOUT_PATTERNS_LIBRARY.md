# 28_LAYOUT_PATTERNS_LIBRARY — Layout Grid Patterns

## 1. Why This Exists & Why It Works
Standard web templates align all sections center-stage, resulting in boring, predictable designs. This document acts as a repository of approved CSS layouts, asymmetric grids, and offset column designs. It works by setting clear layout templates that break standard alignment patterns.

---

## 2. Approved Layout Blueprints

### Pattern 1: The Asymmetrical Column Split
* **Setup**: 12-column grid. Left description takes columns 1-4. Right primary image offsets from column 6 to 11.
* **Why it Works**: The empty space in column 5 creates visual tension and draws attention.

### Pattern 2: The Monolithic Header Split
* **Setup**: Vertical split. Top display title aligned left. Lower metadata tags aligned right.
* **Why it Works**: It avoids the standard centered header layout, creating an editorial feel.

---

## 3. Engineering & CSS Grid Templates

### Asymmetrical Column Split (CSS Layout)
```css
/* Asymmetrical split columns layout */
.asymmetric-split-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 2rem;
  align-items: start;
}

.asymmetric-left-text {
  grid-column: 1 / span 4;
  position: sticky;
  top: 8rem;
}

.asymmetric-right-image {
  grid-column: 6 / span 7;
  aspect-ratio: 3 / 4;
  background-color: #1a1a1a;
}
```

## Benchmark Traceability

### Locomotive
- [DIRECT] Locomotive → Asymmetrical split columns → Layout Patterns Library → Shift description elements to columns 1-4 and media elements to columns 6-11.

### Basic Agency
- [INFERRED] Basic Agency → Flat editorial grids → Layout Patterns Library → Align cards in asymmetric multi-column split layout rows.

### Bureau Borsche
- [SECONDARY] Bureau Borsche → Text-only lists → Layout Patterns Library → List work portfolios in clean vertical tables.
