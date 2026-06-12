# 45_BENCHMARK_TRACEABILITY_SYSTEM — Benchmark Traceability Log

This document serves as the official registry of direct website audits (Primary Research) and secondary research findings for the 10 benchmark websites defined in the Creative Operating System (COS). It separates empirical code/system observations from conceptual design inferences to maintain the highest level of benchmark authority.

---

## 1. BENCHMARK COVERAGE REPORT

| Metric | Status / Value |
| :--- | :--- |
| **Total Benchmarks** | 10 |
| **Directly Visited (Primary Research)** | 9 |
| **Partially Visited** | 0 |
| **Secondary Research Only** | 1 |
| **Coverage %** | 90.0% |

> [!WARNING]
> **Audit Status: Incomplete Coverage (< 100%)**
> Due to remote server conditions, 1 benchmark could not be directly inspected.
> * **Missing Benchmark**: [Bureau Borsche](https://www.bureauborsche.com) (Returned `503 Service Unavailable` on multiple verification passes on 2026-05-31).

---

## 2. DETAILED TRACEABILITY LOGS

### 1. Active Theory
* **Source URL**: [https://activetheory.net](https://activetheory.net)
* **Visited?**: YES
* **Research Type**: Primary (Direct Website Inspection)
* **Date Analyzed**: 2026-05-31
* **Direct Observations (Code & Architecture)**:
  * Mounts entire experience on a single full-screen WebGL canvas element with the selector ID `#Stage`.
  * Implements modular loading behavior via a lightweight `app.js` loader file.
  * Typography is structured strictly using the monospace font family `NB Architekt` programmatically.
  * Incorporates customized layout canvas overlay elements mapping viewport screen tracking and pointer coordinates dynamically.
* **Inferred Observations (Design & Brand Strategy)**:
  * Leverages spatial 3D interactive environments to position the agency at the absolute top tier of creative technology capability.
  * Uses gamified exploration to lengthen user attention span and increase session duration metrics.
* **Systems Influenced**:
  * [02_ART_DIRECTION.md](file:///Users/brak/Desktop/help ide/creative-os/design/02_ART_DIRECTION.md)
  * [05_MOTION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/motion/05_MOTION_SYSTEM.md)
  * [37_CREATIVE_TECH_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/37_CREATIVE_TECH_SYSTEM.md)
* **Confidence Score**: 10/10 (High)

---

### 2. Buttermax
* **Source URL**: [https://buttermax.net](https://buttermax.net)
* **Visited?**: YES
* **Research Type**: Primary (Direct Website Inspection)
* **Date Analyzed**: 2026-05-31
* **Direct Observations (Code & Architecture)**:
  * Frontend built on Next.js framework configuration (verified via `__NEXT_DATA__` script tag payload in page source).
  * Backend routing handles structured content via Sanity CMS API variables.
  * Font loading system handles the typeface asset `Suisse Intl` (Sans-Grotesque & Condensed variants).
  * Color styles are bound to programmatic theme variables: `obsidian`, `yellow`, and `gray`.
* **Inferred Observations (Design & Brand Strategy)**:
  * Uses organic typographic pacing and raw grid systems to justify expensive agency rates without resorting to flashy templates.
  * Employs structured minimalist imagery to showcase case study outcomes with high confidence.
* **Systems Influenced**:
  * [04_TYPOGRAPHY_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/design/04_TYPOGRAPHY_SYSTEM.md)
  * [10_COLOR_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/design/10_COLOR_SYSTEM.md)
  * [36_CONTENT_DESIGN_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/36_CONTENT_DESIGN_SYSTEM.md)
* **Confidence Score**: 10/10 (High)

---

### 3. Resn
* **Source URL**: [https://resn.co.nz](https://resn.co.nz)
* **Visited?**: YES
* **Research Type**: Primary (Direct Website Inspection)
* **Date Analyzed**: 2026-05-31
* **Direct Observations (Code & Architecture)**:
  * Script loader ecosystem is handled via a customized RequireJS module management system.
  * Stylesheet rules define a solid background-black `#000000` canvas viewport layout.
  * Implements dynamic load-bar parameters bound to custom percentage overlay variables.
  * Checks browser agents and loads legacy canvas overlay structures for unsupported devices.
* **Inferred Observations (Design & Brand Strategy)**:
  * Emphasizes audio-visual immersion to trigger strong emotional responses in users.
  * Focuses on memorable digital craft concepts to validate flagship status and pricing power.
* **Systems Influenced**:
  * [05_MOTION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/motion/05_MOTION_SYSTEM.md)
  * [06_INTERACTION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/interaction/06_INTERACTION_SYSTEM.md)
  * [27_SCROLL_STORY_LIBRARY.md](file:///Users/brak/Desktop/help ide/creative-os/motion/27_SCROLL_STORY_LIBRARY.md)
* **Confidence Score**: 10/10 (High)

---

### 4. Locomotive
* **Source URL**: [https://locomotive.ca](https://locomotive.ca)
* **Visited?**: YES
* **Research Type**: Primary (Direct Website Inspection)
* **Date Analyzed**: 2026-05-31
* **Direct Observations (Code & Architecture)**:
  * Site performance relies on their custom open-source JS scroll framework `Locomotive Scroll`.
  * Layout includes preloaded structures leveraging Twig templates (`c-preloader` containers).
  * Houses dynamic GLB 3D assets mapped inside a canvas container for high-end team page interactions.
  * Integrates Matomo analytics scripts for performance and tracking behaviors.
* **Inferred Observations (Design & Brand Strategy)**:
  * Establishes layout tension using asymmetric typographic columns that contrast with fluid scrolling motion.
  * Highlights agency prestige through illustrative styling and playful interactive micro-moments.
* **Systems Influenced**:
  * [08_LAYOUT_ENGINE.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/08_LAYOUT_ENGINE.md)
  * [11_FRONTEND_ARCHITECTURE.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/11_FRONTEND_ARCHITECTURE.md)
  * [33_PORTFOLIO_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/33_PORTFOLIO_SYSTEM.md)
* **Confidence Score**: 10/10 (High)

---

### 5. Instrument
* **Source URL**: [https://www.instrument.com](https://www.instrument.com)
* **Visited?**: YES
* **Research Type**: Primary (Direct Website Inspection)
* **Date Analyzed**: 2026-05-31
* **Direct Observations (Code & Architecture)**:
  * Framework built on Nuxt.js (Vue) configuration modules.
  * Headless backend handles client data schemas via Storyblok CMS integrations.
  * Utilizes `Swiper Vue` script modules for image slider presentation elements.
  * Employs Tailwind CSS and custom Abacus token compilation libraries for theme styling.
* **Inferred Observations (Design & Brand Strategy)**:
  * Editorial narrative spacing designed to showcase case study results to enterprise executives.
  * Visual design focuses on human-centered collaboration and data-driven solutions to command premium consultation fees.
* **Systems Influenced**:
  * [16_INFORMATION_ARCHITECTURE.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/16_INFORMATION_ARCHITECTURE.md)
  * [19_ENTERPRISE_CLIENT_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/19_ENTERPRISE_CLIENT_SYSTEM.md)
  * [30_ENTERPRISE_UX_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/30_ENTERPRISE_UX_SYSTEM.md)
* **Confidence Score**: 10/10 (High)

---

### 6. Basic Agency
* **Source URL**: [https://basicagency.com](https://basicagency.com)
* **Visited?**: YES
* **Research Type**: Primary (Direct Website Inspection)
* **Date Analyzed**: 2026-05-31
* **Direct Observations (Code & Architecture)**:
  * Built using Next.js framework configuration.
  * Employs Sanity CMS image and content hosting endpoints for asset delivery.
  * Layout uses a custom SVG noise background overlay container with the class `.noise_noise__N0mbn`.
  * Employs a strict grayscale and beige color styling architecture (`#E8E6E3` / `#000000`).
* **Inferred Observations (Design & Brand Strategy)**:
  * Relies on brutalist high-legibility typographic scales to project a cultural authority.
  * Positions the company as a premium digital transformation partner by rejecting traditional SaaS design templates.
* **Systems Influenced**:
  * [01_DESIGN_OS.md](file:///Users/brak/Desktop/help ide/creative-os/design/01_DESIGN_OS.md)
  * [03_VISUAL_RULES.md](file:///Users/brak/Desktop/help ide/creative-os/design/03_VISUAL_RULES.md)
  * [18_PREMIUM_PERCEPTION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/18_PREMIUM_PERCEPTION_SYSTEM.md)
* **Confidence Score**: 10/10 (High)

---

### 7. Fantasy Interactive (Fantasy)
* **Source URL**: [https://www.fi.com](https://www.fi.com) (Redirects to [https://fantasy.co](https://fantasy.co))
* **Visited?**: YES
* **Research Type**: Primary (Direct Website Inspection)
* **Date Analyzed**: 2026-05-31
* **Direct Observations (Code & Architecture)**:
  * Implements Tailwind CSS v3.4.17 inside page style sheets.
  * Loads local copy assets of the `Suisse Intl` Grotesque font family.
  * Features native HTML5 video player components with custom controls for case study showcases.
  * Uses responsive full-bleed container grid architectures with customizable padding hooks.
* **Inferred Observations (Design & Brand Strategy)**:
  * Focuses on clean visual architecture and high product utility to attract tech giants (Netflix, Ford, etc.).
  * High-density video storytelling that validates design authority through direct product visual walkthroughs.
* **Systems Influenced**:
  * [09_COMPONENT_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/09_COMPONENT_SYSTEM.md)
  * [17_CONVERSION_ARCHITECTURE.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/17_CONVERSION_ARCHITECTURE.md)
  * [32_AI_PRODUCT_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/32_AI_PRODUCT_SYSTEM.md)
* **Confidence Score**: 10/10 (High)

---

### 8. Dogstudio
* **Source URL**: [https://dogstudio.co](https://dogstudio.co)
* **Visited?**: YES
* **Research Type**: Primary (Direct Website Inspection)
* **Date Analyzed**: 2026-05-31
* **Direct Observations (Code & Architecture)**:
  * Backend built on WordPress CMS (validated by `wp-includes` paths and Yoast SEO metadata).
  * WebAssembly (WASM) compatibility check scripts run on load; if WASM is supported and screen size is desktop, `dog.js` is loaded to render the interactive 3D dog mesh scene.
  * Integrates `detectizr.js` and `modernizr.js` to dynamically add classes (`.disable-dog`, `.disable-motion`) and sets globals (`window.disable_dog = true`, `window.disable_motion = true`) on tablet and mobile viewports.
  * Animates display typography letters sequentially using custom wrapper classes `.fx-word` and `.fx-letter` (e.g., `.fx-letter--1`, `.fx-letter--2`).
  * Employs interactive audio assets toggled via an absolute-positioned volume control button class `.site-volume` containing child element `.pulsing-ui`.
* **Inferred Observations (Design & Brand Strategy)**:
  * Melds whimsical art direction with WebGL/WASM capabilities to present the studio as a high-concept digital experience creator.
  * Implements dynamic letter pacing and ambient audio loops to maximize engagement and time-on-site statistics.
* **Systems Influenced**:
  * [05_MOTION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/motion/05_MOTION_SYSTEM.md)
  * [06_INTERACTION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/interaction/06_INTERACTION_SYSTEM.md)
  * [33_PORTFOLIO_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/33_PORTFOLIO_SYSTEM.md)
* **Confidence Score**: 10/10 (High)

---

### 9. MediaMonks (Monks)
* **Source URL**: [https://www.mediamonks.com](https://www.mediamonks.com) (Redirects to [https://www.monks.com/](https://www.monks.com/))
* **Visited?**: YES
* **Research Type**: Primary (Direct Website Inspection)
* **Date Analyzed**: 2026-05-31
* **Direct Observations (Code & Architecture)**:
  * Backend routing powered by Drupal CMS (validated by `/themes/contrib/stable` and `/modules/contrib/` paths).
  * Structures front-end modules using custom declarative element attributes: `data-component="app"`, `data-component="layout-monks"`, `data-component="n3-multi-language"`.
  * Loads interactive navigation assets via Lottie JSON runtime: `/themes/custom/monks/static/lottie/navigation.lottie`.
  * Integrates Google ReCAPTCHA Enterprise on form entry wrappers (`recaptcha/enterprise.js?render=6Lf56QAs...`).
* **Inferred Observations (Design & Brand Strategy)**:
  * Showcases global scale and technological capability, positioning the agency as an AI-powered data and content production engine.
  * Enforces highly structured design patterns to accommodate multilingual platforms.
* **Systems Influenced**:
  * [09_COMPONENT_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/09_COMPONENT_SYSTEM.md)
  * [23_FUTURE_PROOFING_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/23_FUTURE_PROOFING_SYSTEM.md)
  * [30_ENTERPRISE_UX_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/30_ENTERPRISE_UX_SYSTEM.md)
* **Confidence Score**: 10/10 (High)

---

### 10. Bureau Borsche
* **Source URL**: [https://www.bureauborsche.com](https://www.bureauborsche.com)
* **Visited?**: NO (Attempted; server returned `503 Service Unavailable` on 2026-05-31)
* **Research Type**: Secondary (Secondary Sources, Design Archives, and Case Study Portals)
* **Date Analyzed**: 2026-05-31
* **Direct Observations (Code & Architecture)**:
  * None. System audit blocked by persistent server-side `503` status.
* **Inferred Observations (Design & Brand Strategy)**:
  * Employs stark brutalist editorial layouts where large display serif type contrast with monospaced metadata grids.
  * Rejects transitional animations and UI flourishes to establish an aesthetic of visual restraint, appealing to luxury fashion and artistic institutions.
* **Systems Influenced**:
  * [01_DESIGN_OS.md](file:///Users/brak/Desktop/help ide/creative-os/design/01_DESIGN_OS.md)
  * [04_TYPOGRAPHY_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/design/04_TYPOGRAPHY_SYSTEM.md)
  * [08_LAYOUT_ENGINE.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/08_LAYOUT_ENGINE.md)
  * [33_PORTFOLIO_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/33_PORTFOLIO_SYSTEM.md)
* **Confidence Score**: 3/10 (Low - Secondary sources only due to 503 error)

---

## 3. MASTER TRACEABILITY RULES

1. **Direct Inspection Mandate**: No benchmark site may be used to justify downstream layout engines, design tokens, or component choices unless it maintains a `High` confidence score based on direct website inspection.
2. **Observations Separation**: Implementation details in strategy/design files must reference *Direct Observations* (HTML structure, API tags, scripts) to validate technical limits, and *Inferred Observations* to validate brand/strategy decisions.
3. **Stale Audits Protection**: Any benchmark returning a `503` or showing major structural shifts must be marked as `Secondary` research and have its confidence score reduced until a direct inspection pass succeeds.

## Benchmark Traceability

### Buttermax
- [DIRECT] Buttermax → next-data payload audits → Benchmark Traceability System → Audit site configurations dynamically using source checks.

### Bureau Borsche
- [SECONDARY] Bureau Borsche → Secondary sources database → Benchmark Traceability System → Restrict Bureau Borsche traceability mappings strictly to secondary research.
