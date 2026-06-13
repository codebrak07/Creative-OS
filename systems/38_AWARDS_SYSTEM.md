# 38_AWARDS_SYSTEM — Awards & Client Ribbon Specifications

## 1. Why This Exists & Why It Works
Showcasing industry accolades (e.g. SOTD, FWA, Awwwards) builds immediate professional credibility. Rather than hiding awards in a footer list, French agencies integrate interactive award ribbons, infinite logo marquees, and credentials lists directly into the main narrative. This system outlines the layout and performance standards for scrolling recognition strips.

---

## 2. Core Rules & Guidelines
1. **Ticker Performance**: Scrolling ribbons or infinite marquees must utilize GPU-accelerated CSS keyframe transforms rather than JS interval recalculations to maintain a solid 60fps.
2. **Interactive Pauses**: Ticker tracks must pause their movement when user cursors hover over list elements to allow for interaction.
3. **Contrast Balance**: Accolade icons and logos must use neutral, low-contrast grayscale colors, lighting up with the accent color only during active hover states.

---

## 3. Implementation Details
* **AwardsRail**: SOTD-tier awards panel highlighting award years, categories, and client accomplishments.
* **Marquee**: Seamless zero-JS horizontal ticker for logos, clients, and service ribbons.

---

## Benchmark Traceability

### Resn
- [DIRECT] Resn → Progress loaders → Awards System → Stagger award badge entrance reveals during site initializations.

### Bureau Borsche
- [SECONDARY] Bureau Borsche → Courier monospace grids → Awards System → Render text-based award columns with thin borders.
