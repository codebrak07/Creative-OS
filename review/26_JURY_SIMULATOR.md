# 26_JURY_SIMULATOR — The Creative OS Jury Simulator

## 1. Why This Exists & Why It Works
Creative OS must not evaluate itself in a vacuum. A high score on compliance metrics does not guarantee that a project will win an Awwwards Site of the Day (SOTD) or an FWA. High-scoring sites often break standard guidelines because their concept dominates execution. 

The **Jury Simulator** is a simulated testing harness. Before submitting any project to Awwwards, FWA, or CSSDA, you must feed the project's source code, visuals, and interactive flow into an LLM or a review panel running this exact jury framework.

---

## 2. The Five Reviewer Personas

To simulate a real, unforgiving jury review, you must evaluate the project through five distinct lenses.

### PERSONA 1: THE AWWWARDS JUROR (Art, Grids & Typography)
* **LENS:** Visual polish, editorial composition, and typographic scale.
* **CRITICAL CHECKS:**
  - HSL Color Precision: Are the colors custom-curated and chemically correct, or are they standard Tailwind colors / mesh gradients?
  - Typographic Hierarchy: Are headings custom-tracked? Is there optical sizing?
  - Spacing Asymmetry: Does the page follow a strict but asymmetric grid system (e.g., wide 15vw margins above the fold)?
  - Automatic Deductions: Deduct points for standard bento grids, glassmorphism overlays, and neon gradient borders.
* **EVALUATION FORMAT:**
  - **Score:** 0.0 to 10.0 (Base Design & Creativity)
  - **Praise:** Where visual harmony and typographic execution are exceptional.
  - **Criticism:** Specific instances of lazy alignment, template feel, or color muddying.
  - **Improvement:** Micro-design tweaks to elevate the visual craft.

### PERSONA 2: THE FWA JUROR (Wow-Factor, Innovation & Magic)
* **LENS:** Interactive novelty, smooth animation curves, and memorable signatures.
* **CRITICAL CHECKS:**
  - The Signature Test: What is the single sentence that describes the interactive hook? ("This is the site where...")
  - Motion Curves: Are all transitions utilizing custom Bezier curves (e.g., `[0.16, 1, 0.3, 1]`) instead of default spring rates?
  - Sound Design: Is sound used to reinforce interaction velocity?
  - Performance: Does the page drop frames during heavy section transitions or WebGL rendering?
* **EVALUATION FORMAT:**
  - **Score:** 0.0 to 10.0 (Creativity & Execution)
  - **Praise:** Interactive moments that feel magical or highly responsive.
  - **Criticism:** Frame drops, boring transitions, or a lack of interactive commitment.
  - **Improvement:** Ideas for making the interaction more immersive or unique.

### PERSONA 3: THE CREATIVE DIRECTOR (Concept & Storytelling)
* **LENS:** Concept strength, subject alignment, and brand copywriting.
* **CRITICAL CHECKS:**
  - Criterion 0 Multiplier: Is there a non-web inspiration source? Is the interaction inseparable from the subject?
  - Copywriting Integrity: Does the copywriting read like a "modern, immersive, digital experience," or does it have a distinct brand voice?
  - Commitment: Is the signature interaction system integrated into 80% of pages, including preloader and navigation?
* **EVALUATION FORMAT:**
  - **Score multiplier:** 0.8x to 1.0x (Concept Strength Multiplier)
  - **Praise:** Originality of the concept and emotional alignment with the subject.
  - **Criticism:** Cliché copy, lack of conceptual commitment, or generic visual ideas.
  - **Improvement:** Conceptual refinements to make the project unforgettable.

### PERSONA 4: THE FRONTEND ENGINEER (Performance & Code Quality)
* **LENS:** Bundle size, image loading, script deferral, and layout stability.
* **CRITICAL CHECKS:**
  - Bundle budgets: Initial JS payload < 200KB gzipped.
  - Assets: Next-gen formats (WebP/AVIF), lazy loading on all non-above-the-fold images.
  - Core Web Vitals: LCP < 1.5s, CLS < 0.05, INP < 200ms.
  - Resource Preloading: Fonts and hero assets preloaded correctly.
* **EVALUATION FORMAT:**
  - **Score:** 0.0 to 10.0 (Usability & Performance)
  - **Praise:** Highly optimized runtime performance and clean DOM architecture.
  - **Criticism:** Large bundle sizes, unoptimized images, layout shifts (CLS), or un-deferred scripts.
  - **Improvement:** Specific code refactors, asset pipelines, or preload configurations.

### PERSONA 5: THE ACCESSIBILITY REVIEWER (WCAG, Keyboard & Motion Controls)
* **LENS:** Keyboard focus states, VoiceOver semantic reading, and motion safety.
* **CRITICAL CHECKS:**
  - Contrast: WCAG AA contrast ratios on all text and overlay elements.
  - Focus Ring: Strict styling for `:focus-visible` to match the brand identity.
  - Skip Link: An active `<a href="#main">` skip-to-content link present in the DOM.
  - Motion Safety: Global integration of `prefers-reduced-motion` for GSAP and CSS animations.
* **EVALUATION FORMAT:**
  - **Score:** 0.0 to 10.0 (Usability & Inclusion)
  - **Praise:** Elegant combination of high creativity with flawless accessible patterns.
  - **Criticism:** Missing alt tags, inaccessible navigation menus, missing focus states, or aggressive non-safe motion.
  - **Improvement:** Implementation steps to achieve keyboard and screen-reader parity.

---

## 3. Run a Simulation (Interactive Worksheet)

When prompting an AI agent or a team review session with this simulator, use the following template:

```
ACT AS: The Creative OS Jury (5 Personas)

INPUT DETAILS:
- Live/Staging URL: [URL]
- Code Repository/Files: [Path to files]
- Conceptual Goal: [Explain the concept in 1 sentence]

EVALUATE:
Provide 5 separate reviews corresponding to the Awwwards Juror, FWA Juror, Creative Director, Frontend Engineer, and Accessibility Reviewer.

Each reviewer must provide:
1. SCORE (0-10 or Multiplier)
2. PRAISE (Max 2 sentences)
3. CRITICISM (Max 2 sentences)
4. IMPROVEMENT ACTION (Max 2 sentences)

Finally, output a calculated score using the formula:
Final Score = (Average Base Score of Design, Usability, Creativity, Content) * Concept Multiplier
```

---

## Benchmark Traceability

### active_theory
- [INFERRED] active_theory → Interactive WebGL audits → Jury Simulator → Evaluate code and assets via simulated runtime metrics.

### resn
- [DIRECT] resn → Sound design feedback → Jury Simulator → Audit sensory integrations during evaluation cycles.

### bureau_borsche
- [SECONDARY] bureau_borsche → Radical typography restraint → Jury Simulator → Evaluate visual tension and alignment.
