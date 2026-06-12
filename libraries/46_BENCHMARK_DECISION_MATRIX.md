# 46_BENCHMARK_DECISION_MATRIX — Benchmark Selection Matrix

This document acts as the official governance registry to determine which digital agency benchmarks dominate based on project type. It prevents aesthetic drift and aligns design directions with business category design.

---

## 1. PROJECT CATEGORIES DECISION MATRIX

| Category | Primary | Secondary | Avoid | Conflict | Recommended Systems |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Startup SaaS** | **Stripe** [DIRECT] | **Linear** [DIRECT] | Active Theory, Resn | [INFERRED] Resn/Active Theory utilize immersive full-screen WebGL stage rendering grids that introduce rendering latency, directly conflicting with Startup SaaS speed objectives (<100ms transitions). | `11_FRONTEND`, `35_TOKENS` |
| **Enterprise Platform** | **Instrument** [DIRECT] | **MediaMonks** [DIRECT] | Bureau Borsche | [SECONDARY] Bureau Borsche rejects standard interactive layouts and transition curves entirely, which compromises usability for enterprise admin portals. | `19_CLIENT`, `30_ENTERPRISE_UX` |
| **AI Product** | **Fantasy Interactive** [DIRECT] | **Linear** [DIRECT] | Resn, Dogstudio | [DIRECT] Dogstudio/Resn require WASM character compile phases and ambient audio players, which increase load latency and distract from real-time query feedback cycles. | `32_AI_PRODUCT`, `37_CREATIVE_TECH` |
| **Luxury Brand** | **Apple** [DIRECT] | **Buttermax** [DIRECT] | MediaMonks | [DIRECT] MediaMonks structures layouts with Drupal standard components and reCAPTCHA forms, diluting luxury exclusivity and layout clean spaces. | `31_LUXURY_BRAND`, `18_PREMIUM` |
| **Fashion Brand** | **Bureau Borsche** [SECONDARY] | **Basic Agency** [DIRECT] | Instrument | [INFERRED] Instrument implements spacious outcome-focused case studies designed for B2B executives, conflicting with the visual restraint of fashion layouts. | `01_DESIGN_OS`, `04_TYPOGRAPHY` |
| **Creative Portfolio** | **Locomotive** [DIRECT] | **Dogstudio** [DIRECT] | Stripe, Instrument | [DIRECT] Stripe uses structured data grids and standard checkout forms, conflicting with creative portfolio goals of storytelling and custom scroll paths. | `33_PORTFOLIO`, `27_SCROLL_STORY` |
| **Agency Website** | **Basic Agency** [DIRECT] | **Locomotive** [DIRECT] | Stripe, Apple | [DIRECT] Stripe uses developer-first utility styling tables that fail to communicate visual craft, design authority, or brand differentiation. | `02_ART_DIRECTION`, `29_CASE_STUDY` |
| **Product Launch** | **Apple** [DIRECT] | **Active Theory** [DIRECT] | Bureau Borsche | [SECONDARY] Bureau Borsche uses flat list views and static print layouts that lack conversion hooks, interactive visuals, or dynamic scroll stories. | `17_CONVERSION`, `26_ANIMATION` |
| **Cultural Institution** | **Bureau Borsche** [SECONDARY] | **Locomotive** [DIRECT] | Stripe, MediaMonks | [DIRECT] MediaMonks relies on standard CMS configurations and templates, conflicting with cultural institutions which require bespoke editorial layouts. | `08_LAYOUT_ENGINE`, `34_VISUAL_LANGUAGE` |

---

## Benchmark Traceability

### Buttermax
- [DIRECT] Buttermax → Next.js layout structure → Design Tokens → Suisse Intl font loading variables.

### Bureau Borsche
- [SECONDARY] Bureau Borsche → Stark graphic layouts → Design Tokens → courier monospace tables.
