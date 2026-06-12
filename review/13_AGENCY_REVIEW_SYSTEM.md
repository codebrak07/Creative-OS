# 13_AGENCY_REVIEW_SYSTEM — Multidisciplinary Review Gates

## 1. Why This Exists & Why It Works
Web design projects often suffer when visual design, copywriting, and code development are evaluated separately. This document establishes guidelines for multidisciplinary review gates. It works by setting clear audit criteria for each agency role, ensuring consistent visual and technical quality.

---

## 2. Review Roles & Audit Criteria

### Creative Director
* **Goal**: Validate storytelling, brand differentiation, and value positioning.
* **Question**: *"Does this layout separate the brand from its competitors?"*

### Art Director
* **Goal**: Audit typography scales, letter spacing, color palettes, and layout rhythm.
* **Question**: *"Does the typography establish a clear baseline hierarchy?"*

### UX & Tech Director
* **Goal**: Audit accessibility (WCAG AA), performance metrics, and build sizes.
* **Question**: *"Does the canvas render smoothly under 60fps on mobile devices?"*

---

## 3. Feedback Loop Protocols
* **Direct Auditing**: Reviewers must log feedback in shared issue trackers, linking directly to the code files or styling variables that need correction.
* **Build Rejection**: If a build fails to meet any of the role criteria, it must be rejected and returned to the layout phase.

## Benchmark Traceability

### Instrument
- [INFERRED] Instrument → Case study outcome verification → Agency Review System → Audit copywriting grids to check for plain facts.

### MediaMonks
- [DIRECT] MediaMonks → Drupal contributed template audits → Agency Review System → Verify custom page layouts use data-component tokens.
