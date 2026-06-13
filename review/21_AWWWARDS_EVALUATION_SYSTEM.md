# 21_AWWWARDS_EVALUATION_SYSTEM — Complete Rewrite

## 1. Why This Exists & Why It Works
To compete at the highest level of global web design (Awwwards Site of the Day/Year), projects must pass a rigorous assessment process. Awwwards scores range between 0 and 10, with SOTD status requiring a score of 8.4–9.0, and Site of the Year (SOTY) or Studio of the Year (SOEY) requiring 9.2+. This system establishes the criteria and automatic deductions used to evaluate project quality before submission.

---

## 2. The Criteria — Scoring Intelligence

A project's final evaluation is determined by its **Base Score** (weighted across four standard criteria) multiplied by its **Concept Multiplier** (Criterion 0). 

### CRITERION 0: CONCEPT STRENGTH — Multiplier (0.8x - 1.0x)
Concept dominates execution. Many 9.0+ sites break standard compliance rules (accessibility, keyboard navigation, performance budgets) but win because the concept is overpowering. Without a strong concept, the project is capped at a maximum final score of **8.0**.

**The Description Rule:**
If the project can be accurately described as a *"modern, immersive, award-winning digital experience"*, the concept is not yet strong enough. That description fits thousands of generic sites and none of the memorable ones.

* **1.0x — Bespoke Concept**
  - The idea is highly memorable (e.g., Bruno Simon's drive-through portfolio, RXK's echo typography, Lempens' motorbike identity, Aufresne's radical restraint).
  - The interaction is inseparable from the subject.
  - Removing the interaction would destroy the project's purpose.
  - The inspiration source is non-web (e.g., physical installations, print editorial layout, vintage machinery).
* **0.8x — Generic Concept**
  - A beautiful, highly compliant agency site that lacks a signature concept.

---

### CRITERION 1: DESIGN — 4.0 points maximum
* **4.0 — SOTY / SOEY territory**
  - Visual language is unmistakable in a thumbnail. No other site looks like this.
  - Typography is art-directed with careful consideration of optical sizing.
  - Color palette is precise. You could not replace any HSL value by ±10° without it falling apart.
  - Asymmetry follows strict, visible grid systems.
  - Hover states and micro-interactions are bespoke and designed, not defaulted.
  - The design scales perfectly from 13" laptops to 4K displays.
* **3.0–3.5 — SOTD range**
  - Strong typography and color. Minor design inconsistencies are visible under close inspection.
  - Features at least one visual moment that makes jurors take a screenshot.
* **2.0–2.5 — Honorable Mention range**
  - Competent layout but easily confused with other designs. Includes generic trends like standard bento grids or glassmorphism.

**Automatic Deductions:**
- Glassmorphism overlays: -0.8
- Neon gradient borders: -0.6
- Default Framer Motion curves (spring bounce, no custom easing): -0.4
- Standard bento card grid layout: -0.5
- CSS mesh gradient hero background: -0.4
- Bypassing hover states on interactive controls: -0.5
- Stock photography: -0.6

---

### CRITERION 2: USABILITY — 2.0 points maximum
* **2.0 — Flawless**
  - WCAG AA contrast compliance across all text, including placeholders.
  - Logical tab focus order, skip-to-content links, and zero keyboard traps.
  - Visible, styled, on-brand focus indicators.
  - Interactive targets meet a minimum size of 44×44px.
  - Page loads with LCP < 1.5s on a throttled 4G network and CLS < 0.05.
* **1.5 — Good (SOTD Range)**
  - Minor keyboard navigation gaps or mobile hover issues. LCP ranges between 1.5s and 2.5s.
* **1.0 — Penalized**
  - Custom cursor with no native fallback, horizontal mobile scrollbars, or body text below 14px.

**The Benoist standard:**
Show a "JavaScript required" notice if JS is disabled instead of rendering a broken or blank page.

---

### CRITERION 3: CREATIVITY & COMMITMENT — 2.0 points maximum
Jurors ask: *"Have I seen this before? Did they commit to the idea?"*
* **2.0 — Novel Technique & Full Commitment**
  - Concept is entirely original or applies a known technique in an unexpected context.
  - High commitment: The signature technique is not just a one-off gimmick.
* **1.5 — Memorable execution**
  - Uses an interactive trend but implements it with studio-specific art direction and moderate consistency.
* **1.0 — On-trend**
  - Standard WebGL noise or scroll reveal that matches common templates.

**The Commitment Check:**
- Is the signature interaction/technique visible on 80% of pages?
- Does the preloader support and preview the signature technique?
- Does the navigation system integrate the signature?
- Do page/section transitions support and reflect the signature?
- Does the typography support and reflect the signature?
*Deduction:* If the project fails 2 or more of these checks, deduct **-1.0** from the Creativity score.

**The Signature Test:**
Complete this sentence: *"[Site name] is the one where [specific interaction/visual]."* If the answer is generic, the creative direction needs more work.

---

### CRITERION 4: CONTENT — 2.0 points maximum
* **2.0 — Content is Design**
  - Typography scale clarifies content hierarchy instantly.
  - Specific, outcome-focused case studies with concrete metrics.
  - Unique brand copywriting. All empty, error, and 404 pages are fully designed.
  - Designed OG images and custom favicons.
* **1.0 — Generic copy**
  - Headlines like "We craft digital experiences" or AI-generated copy that lacks brand tone.

---

## 3. Self-Scoring Worksheet

Before submitting, score the build:
```
BASE SCORE EVALUATION:
----------------------------------------
DESIGN    ___/4.0
- Visual language unique to this site?     ___/1.0
- Typography art-directed?                 ___/1.0
- Color precise and chemically correct?    ___/0.5
- Every element earned its place?          ___/0.5
- Micro-interactions on all interactives?  ___/0.5
- No anti-patterns?                        ___/0.5

USABILITY ___/2.0
- WCAG AA across all text?                 ___/0.5
- Keyboard navigation complete?            ___/0.5
- LCP < 1.5s throttled 4G?                ___/0.5
- Mobile: adapted not just degraded?       ___/0.5

CREATIVITY ___/2.0
- Passes the signature test?              ___/1.0
- Technique: novel or distinctly executed? ___/0.5
- Passes the Commitment Check?            ___/0.5 (Deduct -1.0 if failing >= 2 checks)

CONTENT   ___/2.0
- Copy irreplaceable to this brand?       ___/0.5
- All states designed (404, empty, error) ___/0.5
- OG + favicon designed?                  ___/0.5
- Images next-gen + described?            ___/0.5

BASE TOTAL: ___/10.0

CONCEPT MULTIPLIER:
----------------------------------------
CONCEPT MULTIPLIER: ___x (0.8x to 1.0x)
- Is the idea memorable? (Yes/No)
- Is the experience inseparable from the subject? (Yes/No)
- Would removing the interaction destroy the project? (Yes/No)
- Is there a non-web inspiration source? (Yes/No)
* If Yes to all, multiplier is 1.0x.
* If describing project as "modern, immersive, award-winning...", multiplier is 0.8x.

FINAL CALCULATED SCORE: (BASE TOTAL * CONCEPT MULTIPLIER) = ___/10.0
TARGET: 8.5+ for SOTD submission (Maximum score without concept = 8.0)
```

---

## Benchmark Traceability

### Active Theory
- [INFERRED] Active Theory → Spatial WebGL structures → Awwwards Evaluation System → Score interaction designs based on coordinate tracking.

### Resn
- [INFERRED] Resn → Creative audio-visual components → Awwwards Evaluation System → Rate creativity based on loader transitions.

### Basic Agency
- [DIRECT] Basic Agency → custom SVG noise styling → Awwwards Evaluation System → Evaluate design craft based on background textures.

### Fantasy Interactive
- [INFERRED] Fantasy Interactive → Clean platform usability → Awwwards Evaluation System → Assess usability based on form inputs.
