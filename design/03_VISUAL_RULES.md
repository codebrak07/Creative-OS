# 03_VISUAL_RULES — Grid and Negative Space Rules

## 1. Why This Exists & Why It Works
Most design templates place elements uniformly, leading to visual monotony. This document establishes guidelines for layout structures that enforce spatial discipline, rhythm, and optical weights. It works by setting specific constraints for negative space, asymmetrical columns, and grid proportions.

---

## 2. Spatial Rules & Ratios
1. **The 40% Empty Canvas Rule**: At least 40% of the viewport must remain free of primary blocks. Space creates prestige.
2. **Golden Ratio Spacing**: Define section heights and container padding using multiples of `1.618`.
3. **Asymmetric Grid Shifts**: Shift elements by a col-width or grid row to disrupt predictable structural alignments.

---

## 3. Negative Space & Proportions
* **Margin Anchors**: Anchor margins at `8vw` on desktop and `5vw` on mobile screens.
* **Aspect Ratios**: Restrict media objects to:
  * Vertical: `4:5` or `2:3` (Editorial / High fashion feel)
  * Panoramic: `21:9` or `16:7` (Cinematic feel)
  * Avoid `16:9` unless displaying raw video content.

---

## 4. Engineering & CSS Grid Implementations

### Custom Asymmetric Layout Grid (Tailwind & CSS)
```html
<!-- Grid layout showcasing asymmetric shift and visual tension -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start px-6 md:px-16 py-24 bg-neutral-950 text-neutral-100">
  
  <!-- Content Panel shifted out of standard layout margins -->
  <div class="md:col-span-4 flex flex-col space-y-6 md:sticky md:top-24">
    <span class="text-xs font-mono uppercase tracking-widest text-neutral-500">01 / Concept</span>
    <h2 class="text-3xl md:text-5xl font-light tracking-tight leading-tight">
      Asymmetry is balance.
    </h2>
  </div>

  <!-- Vast Negative Space Col -->
  <div class="hidden md:block md:col-span-2"></div>

  <!-- Primary Media Panel shifted downward -->
  <div class="md:col-span-6 mt-12 md:mt-24">
    <div class="aspect-[4/5] bg-neutral-900 overflow-hidden relative group">
      <div class="absolute inset-0 bg-neutral-800 opacity-20 group-hover:opacity-0 transition-opacity duration-700"></div>
      <div class="w-full h-full bg-neutral-800"></div>
    </div>
    <p class="mt-6 text-sm text-neutral-400 max-w-sm font-light">
      Notice the visual tension created by shifting the media container offset from the sticky text panel.
    </p>
  </div>

</div>
```

---

## 5. When to Use & Avoid
* **When to Use**: Landing pages, editorial case studies, product launches, and narrative presentation steps.
* **When to Avoid**: Dynamic analytical dashboards, billing tables, or standard settings panels where space optimization is critical.

---

## Benchmark Traceability

### Basic Agency
- [DIRECT] Basic Agency → Background noise overlays → Visual Rules → Bind visual texture to CSS styling parameters.

### Bureau Borsche
- [SECONDARY] Bureau Borsche → Stark graphical borders → Visual Rules → Set editorial panels with thin 1px margins.
