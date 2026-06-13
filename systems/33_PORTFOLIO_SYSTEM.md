# 33_PORTFOLIO_SYSTEM — Portfolio Layouts & Galleries

## 1. Why This Exists & Why It Works
Standard visual grids often reduce all projects to identical squares, ignoring the custom art direction of each client case study. This system establishes guidelines for asymmetric visual portfolios and numbered index tables. It shifts focus from templated grids to structured typography lists and varied layout hierarchies, signaling confidence and editorial sophistication.

---

## 2. Layout Specifications
1. **The Numbered Work List (Aufresne Signature)**: Rather than immediate thumbnail galleries, portfolios may utilize a structured vertical list. The list items contain indexes, client names, team collaborators, publication years, and small award badges. A floating media preview reveals itself dynamically at the cursor position on hover.
2. **Asymmetric Grid Pacing**: Grid elements must alternate aspect ratios and column alignments (e.g. 8-column wide panels, followed by offset 4-column side vertical elements, and full-width landscape bands) to create a custom, magazine-like pacing.

---

## 3. Interaction Standards
* **Scroll-Triggered Reveals**: Visual items must fade up and slide forward using ScrollTrigger bindings set to the sovereign ease curve.
* **Seamless Page Transitions**: Route transitions must incorporate full-screen layout wipes to mask asset loading phases.

---

## 4. Benchmark Traceability

### Locomotive
- [DIRECT] Locomotive → Team page GLB canvas rigs → Portfolio System → Render dynamic 3D meshes next to staff profiles.

### Resn
- [DIRECT] Resn → RequireJS loader percentages → Portfolio System → Stagger visual gallery loading animations.

### Dogstudio
- [DIRECT] Dogstudio → dog.js WASM character components → Portfolio System → Load custom audio toggles in secondary buttons.

### Bureau Borsche
- [SECONDARY] Bureau Borsche → Courier monospace grids → Portfolio System → Style client listing indexes in vertical tables.
