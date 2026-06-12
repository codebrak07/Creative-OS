# 12_CREATIVE_QA — Quality Assurance Protocols

## 1. Why This Exists & Why It Works
Many web projects ship with layout shifting, contrast failures, or performance lag on mobile screens. This document establishes guidelines for pre-launch quality assurance. It works by setting strict rules for visual testing, performance checks, and accessibility verification before code is released.

---

## 2. Interactive QA Checklists

### Visual Integrity Checks
* **Grid Checks**: Verify that element margins align with the design system tokens.
* **Layout Shifts**: Test page loading to ensure zero visual layout shifts occur as assets load.

### Performance Checks
* **Speed Budget**: Run audits to verify SpeedIndex is under `1.5s` on mid-tier mobile hardware.
* **Bundle Check**: Audit chunk sizes to ensure WebGL and animation libraries are split and lazy-loaded.

---

## 3. Review Approval Gates
1. **Developer Sign-off**: Verify that accessibility and performance targets are met.
2. **Art Director Sign-off**: Audit typography sizes, line heights, color usage, and asset compression.

---

## 4. When to Use & Avoid
* **When to Use**: Project final weeks, release candidate audits, and build deployment.
* **When to Avoid**: Early exploratory design mockups or brainstorm meetings.

## Benchmark Traceability

### Active Theory
- [INFERRED] Active Theory → WebGL memory audits → Creative QA → Validate memory usage limits on mobile viewports.

### Instrument
- [DIRECT] Instrument → Storyblok live editor parameters → Creative QA → Test layouts inside headless CMS staging environments.
