# Creative Operating System (COS) — Master Index & Registry

This document serves as the master gateway, retrieval index, and optimization registry for the Creative Operating System (COS). Future development subagents and systems must load this index first to determine which sub-systems are required, preventing excessive token load.

---

## 1. System Priority Matrix

All components of the COS are registered with designated priority, criticality, retrieval mode, and caching weights to optimize processing order.

| System Reference | Location Path | Priority | Importance | Retrieval Mode | Criticality |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **01_DESIGN_OS** | [design/01_DESIGN_OS.md](file:///Users/brak/Desktop/help ide/creative-os/design/01_DESIGN_OS.md) | 100 | 100 | Eager | Core |
| **02_ART_DIRECTION** | [design/02_ART_DIRECTION.md](file:///Users/brak/Desktop/help ide/creative-os/design/02_ART_DIRECTION.md) | 95 | 98 | Eager | Core |
| **04_TYPOGRAPHY_SYSTEM** | [design/04_TYPOGRAPHY_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/design/04_TYPOGRAPHY_SYSTEM.md) | 95 | 98 | Eager | Core |
| **39_BUSINESS_STRATEGY_SYSTEM** | [strategy/39_BUSINESS_STRATEGY_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/39_BUSINESS_STRATEGY_SYSTEM.md) | 95 | 97 | Eager | Core |
| **42_CREATIVE_INTELLIGENCE_SYSTEM** | [strategy/42_CREATIVE_INTELLIGENCE_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/42_CREATIVE_INTELLIGENCE_SYSTEM.md) | 92 | 95 | Eager | Core |
| **38_DESIGN_RESEARCH_SYSTEM** | [strategy/38_DESIGN_RESEARCH_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/38_DESIGN_RESEARCH_SYSTEM.md) | 90 | 92 | Eager | Core |
| **43_PROJECT_KICKOFF_SYSTEM** | [strategy/43_PROJECT_KICKOFF_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/43_PROJECT_KICKOFF_SYSTEM.md) | 90 | 90 | Eager | High |
| **15_BRAND_STRATEGY_OS** | [strategy/15_BRAND_STRATEGY_OS.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/15_BRAND_STRATEGY_OS.md) | 90 | 92 | Eager | Core |
| **07_STORYTELLING_SYSTEM** | [strategy/07_STORYTELLING_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/07_STORYTELLING_SYSTEM.md) | 90 | 90 | Eager | Core |
| **40_EXPERIENCE_ARCHITECTURE_SYSTEM** | [strategy/40_EXPERIENCE_ARCHITECTURE_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/40_EXPERIENCE_ARCHITECTURE_SYSTEM.md) | 90 | 92 | Eager | Core |
| **36_CONTENT_DESIGN_SYSTEM** | [strategy/36_CONTENT_DESIGN_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/36_CONTENT_DESIGN_SYSTEM.md) | 88 | 90 | Eager | Core |
| **03_VISUAL_RULES** | [design/03_VISUAL_RULES.md](file:///Users/brak/Desktop/help ide/creative-os/design/03_VISUAL_RULES.md) | 85 | 88 | Eager | Core |
| **05_MOTION_SYSTEM** | [motion/05_MOTION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/motion/05_MOTION_SYSTEM.md) | 85 | 88 | Lazy | Core |
| **06_INTERACTION_SYSTEM** | [interaction/06_INTERACTION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/interaction/06_INTERACTION_SYSTEM.md) | 85 | 88 | Lazy | Core |
| **08_LAYOUT_ENGINE** | [architecture/08_LAYOUT_ENGINE.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/08_LAYOUT_ENGINE.md) | 80 | 85 | Eager | Core |
| **10_COLOR_SYSTEM** | [design/10_COLOR_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/design/10_COLOR_SYSTEM.md) | 80 | 82 | Eager | Core |
| **35_DESIGN_TOKENS (JSON)** | [tokens/35_DESIGN_TOKENS.json](file:///Users/brak/Desktop/help ide/creative-os/tokens/35_DESIGN_TOKENS.json) | 80 | 95 | Eager | Core |
| **35_DESIGN_TOKENS (MD)** | [tokens/35_DESIGN_TOKENS.md](file:///Users/brak/Desktop/help ide/creative-os/tokens/35_DESIGN_TOKENS.md) | 80 | 85 | Eager | Core |
| **16_INFORMATION_ARCHITECTURE** | [strategy/16_INFORMATION_ARCHITECTURE.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/16_INFORMATION_ARCHITECTURE.md) | 78 | 80 | Lazy | High |
| **17_CONVERSION_ARCHITECTURE** | [strategy/17_CONVERSION_ARCHITECTURE.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/17_CONVERSION_ARCHITECTURE.md) | 78 | 82 | Lazy | High |
| **18_PREMIUM_PERCEPTION_SYSTEM** | [strategy/18_PREMIUM_PERCEPTION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/18_PREMIUM_PERCEPTION_SYSTEM.md) | 75 | 85 | Lazy | High |
| **11_FRONTEND_ARCHITECTURE** | [architecture/11_FRONTEND_ARCHITECTURE.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/11_FRONTEND_ARCHITECTURE.md) | 75 | 80 | Eager | High |
| **37_CREATIVE_TECH_SYSTEM** | [architecture/37_CREATIVE_TECH_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/37_CREATIVE_TECH_SYSTEM.md) | 75 | 80 | Eager | High |
| **09_COMPONENT_SYSTEM** | [systems/09_COMPONENT_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/09_COMPONENT_SYSTEM.md) | 70 | 85 | Lazy | Core |
| **26_ANIMATION_LIBRARY** | [motion/26_ANIMATION_LIBRARY.md](file:///Users/brak/Desktop/help ide/creative-os/motion/26_ANIMATION_LIBRARY.md) | 70 | 82 | Lazy | High |
| **27_SCROLL_STORY_LIBRARY** | [motion/27_SCROLL_STORY_LIBRARY.md](file:///Users/brak/Desktop/help ide/creative-os/motion/27_SCROLL_STORY_LIBRARY.md) | 70 | 80 | Lazy | High |
| **31_LUXURY_BRAND_SYSTEM** | [systems/31_LUXURY_BRAND_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/31_LUXURY_BRAND_SYSTEM.md) | 70 | 75 | Lazy | Medium |
| **32_AI_PRODUCT_SYSTEM** | [systems/32_AI_PRODUCT_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/32_AI_PRODUCT_SYSTEM.md) | 70 | 75 | Lazy | Medium |
| **30_ENTERPRISE_UX_SYSTEM** | [systems/30_ENTERPRISE_UX_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/30_ENTERPRISE_UX_SYSTEM.md) | 68 | 70 | Lazy | Medium |
| **33_PORTFOLIO_SYSTEM** | [systems/33_PORTFOLIO_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/33_PORTFOLIO_SYSTEM.md) | 68 | 70 | Lazy | Medium |
| **19_ENTERPRISE_CLIENT_SYSTEM** | [systems/19_ENTERPRISE_CLIENT_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/19_ENTERPRISE_CLIENT_SYSTEM.md) | 65 | 70 | Lazy | Medium |
| **23_FUTURE_PROOFING_SYSTEM** | [systems/23_FUTURE_PROOFING_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/23_FUTURE_PROOFING_SYSTEM.md) | 65 | 68 | Lazy | Optional |
| **14_DESIGN_ANTI_PATTERNS** | [design/14_DESIGN_ANTI_PATTERNS.md](file:///Users/brak/Desktop/help ide/creative-os/design/14_DESIGN_ANTI_PATTERNS.md) | 65 | 80 | Eager | High |
| **20_DESIGN_DECISION_ENGINE** | [review/20_DESIGN_DECISION_ENGINE.md](file:///Users/brak/Desktop/help ide/creative-os/review/20_DESIGN_DECISION_ENGINE.md) | 65 | 85 | Eager | Core |
| **21_AWWWARDS_EVALUATION_SYSTEM** | [review/21_AWWWARDS_EVALUATION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/review/21_AWWWARDS_EVALUATION_SYSTEM.md) | 65 | 80 | Eager | High |
| **12_CREATIVE_QA** | [review/12_CREATIVE_QA.md](file:///Users/brak/Desktop/help ide/creative-os/review/12_CREATIVE_QA.md) | 60 | 80 | Lazy | High |
| **13_AGENCY_REVIEW_SYSTEM** | [review/13_AGENCY_REVIEW_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/review/13_AGENCY_REVIEW_SYSTEM.md) | 60 | 75 | Lazy | High |
| **41_DESIGN_GOVERNANCE_SYSTEM** | [review/41_DESIGN_GOVERNANCE_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/review/41_DESIGN_GOVERNANCE_SYSTEM.md) | 60 | 82 | Lazy | High |
| **22_CREATIVE_DIRECTION_GENERATOR** | [review/22_CREATIVE_DIRECTION_GENERATOR.md](file:///Users/brak/Desktop/help ide/creative-os/review/22_CREATIVE_DIRECTION_GENERATOR.md) | 60 | 70 | Lazy | Medium |
| **25_FINAL_CREATIVE_REVIEW** | [review/25_FINAL_CREATIVE_REVIEW.md](file:///Users/brak/Desktop/help ide/creative-os/review/25_FINAL_CREATIVE_REVIEW.md) | 55 | 85 | Lazy | Core |
| **24_WORLD_CLASS_BENCHMARKS** | [libraries/24_WORLD_CLASS_BENCHMARKS.md](file:///Users/brak/Desktop/help ide/creative-os/libraries/24_WORLD_CLASS_BENCHMARKS.md) | 50 | 80 | Lazy | High |
| **28_LAYOUT_PATTERNS_LIBRARY** | [libraries/28_LAYOUT_PATTERNS_LIBRARY.md](file:///Users/brak/Desktop/help ide/creative-os/libraries/28_LAYOUT_PATTERNS_LIBRARY.md) | 50 | 75 | Lazy | Medium |
| **29_CASE_STUDY_LIBRARY** | [libraries/29_CASE_STUDY_LIBRARY.md](file:///Users/brak/Desktop/help ide/creative-os/libraries/29_CASE_STUDY_LIBRARY.md) | 50 | 70 | Lazy | Medium |
| **34_VISUAL_LANGUAGE_LIBRARY** | [libraries/34_VISUAL_LANGUAGE_LIBRARY.md](file:///Users/brak/Desktop/help ide/creative-os/libraries/34_VISUAL_LANGUAGE_LIBRARY.md) | 50 | 70 | Lazy | Medium |
| **44_SYSTEM_PROMPTS_LIBRARY** | [libraries/44_SYSTEM_PROMPTS_LIBRARY.md](file:///Users/brak/Desktop/help ide/creative-os/libraries/44_SYSTEM_PROMPTS_LIBRARY.md) | 50 | 85 | Lazy | High |
| **45_BENCHMARK_TRACEABILITY_SYSTEM** | [libraries/45_BENCHMARK_TRACEABILITY_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/libraries/45_BENCHMARK_TRACEABILITY_SYSTEM.md) | 50 | 85 | Lazy | High |
| **46_BENCHMARK_DECISION_MATRIX** | [libraries/46_BENCHMARK_DECISION_MATRIX.md](file:///Users/brak/Desktop/help ide/creative-os/libraries/46_BENCHMARK_DECISION_MATRIX.md) | 50 | 85 | Lazy | High |


---

## 2. System Activation Modes

Use the activation modes defined below to load the absolute minimum set of systems required, avoiding context limits.

### Mode A: Website Generation
* **Minimum Core Files**:
  * [01_DESIGN_OS.md](file:///Users/brak/Desktop/help ide/creative-os/design/01_DESIGN_OS.md)
  * [02_ART_DIRECTION.md](file:///Users/brak/Desktop/help ide/creative-os/design/02_ART_DIRECTION.md)
  * [04_TYPOGRAPHY_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/design/04_TYPOGRAPHY_SYSTEM.md)
  * [08_LAYOUT_ENGINE.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/08_LAYOUT_ENGINE.md)
  * [10_COLOR_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/design/10_COLOR_SYSTEM.md)
  * [35_DESIGN_TOKENS.json](file:///Users/brak/Desktop/help ide/creative-os/tokens/35_DESIGN_TOKENS.json)
  * [36_CONTENT_DESIGN_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/36_CONTENT_DESIGN_SYSTEM.md)
* **Preloading Rules**: Eagerly load core systems. Resolve components and motion dynamically when layout engine execution completes.

### Mode B: Website Audit
* **Minimum Core Files**:
  * [12_CREATIVE_QA.md](file:///Users/brak/Desktop/help ide/creative-os/review/12_CREATIVE_QA.md)
  * [13_AGENCY_REVIEW_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/review/13_AGENCY_REVIEW_SYSTEM.md)
  * [14_DESIGN_ANTI_PATTERNS.md](file:///Users/brak/Desktop/help ide/creative-os/design/14_DESIGN_ANTI_PATTERNS.md)
  * [20_DESIGN_DECISION_ENGINE.md](file:///Users/brak/Desktop/help ide/creative-os/review/20_DESIGN_DECISION_ENGINE.md)
  * [21_AWWWARDS_EVALUATION_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/review/21_AWWWARDS_EVALUATION_SYSTEM.md)
* **Preloading Rules**: Eagerly load all evaluation metrics. Lazily query perception libraries only when target elements score below 8.0/10.0.

### Mode C: Website Redesign
* **Minimum Core Files**:
  * [14_DESIGN_ANTI_PATTERNS.md](file:///Users/brak/Desktop/help ide/creative-os/design/14_DESIGN_ANTI_PATTERNS.md)
  * [20_DESIGN_DECISION_ENGINE.md](file:///Users/brak/Desktop/help ide/creative-os/review/20_DESIGN_DECISION_ENGINE.md)
  * [38_DESIGN_RESEARCH_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/38_DESIGN_RESEARCH_SYSTEM.md)
  * [39_BUSINESS_STRATEGY_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/39_BUSINESS_STRATEGY_SYSTEM.md)
  * [42_CREATIVE_INTELLIGENCE_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/42_CREATIVE_INTELLIGENCE_SYSTEM.md)
* **Preloading Rules**: Eagerly load research mapping. Load design files only after redesign opportunity is locked.

### Mode D: Brand Creation
* **Minimum Core Files**:
  * [02_ART_DIRECTION.md](file:///Users/brak/Desktop/help ide/creative-os/design/02_ART_DIRECTION.md)
  * [07_STORYTELLING_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/07_STORYTELLING_SYSTEM.md)
  * [15_BRAND_STRATEGY_OS.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/15_BRAND_STRATEGY_OS.md)
  * [36_CONTENT_DESIGN_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/36_CONTENT_DESIGN_SYSTEM.md)
  * [38_DESIGN_RESEARCH_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/strategy/38_DESIGN_RESEARCH_SYSTEM.md)
* **Preloading Rules**: Focus on identity mapping. Colors and style specs remain lazy.

### Mode E: Enterprise Product
* **Minimum Core Files**:
  * [04_TYPOGRAPHY_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/design/04_TYPOGRAPHY_SYSTEM.md)
  * [11_FRONTEND_ARCHITECTURE.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/11_FRONTEND_ARCHITECTURE.md)
  * [19_ENTERPRISE_CLIENT_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/19_ENTERPRISE_CLIENT_SYSTEM.md)
  * [30_ENTERPRISE_UX_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/30_ENTERPRISE_UX_SYSTEM.md)
  * [35_DESIGN_TOKENS.json](file:///Users/brak/Desktop/help ide/creative-os/tokens/35_DESIGN_TOKENS.json)
* **Preloading Rules**: Prioritize performance and structural systems. Layout and motion guides remain lazy.

### Mode F: AI Product
* **Minimum Core Files**:
  * [11_FRONTEND_ARCHITECTURE.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/11_FRONTEND_ARCHITECTURE.md)
  * [32_AI_PRODUCT_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/32_AI_PRODUCT_SYSTEM.md)
  * [35_DESIGN_TOKENS.json](file:///Users/brak/Desktop/help ide/creative-os/tokens/35_DESIGN_TOKENS.json)
  * [37_CREATIVE_TECH_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/37_CREATIVE_TECH_SYSTEM.md)
* **Preloading Rules**: Eagerly check frontend limits and AI interface configurations. Micro-interactions and cursors remain lazy.

### Mode G: Portfolio
* **Minimum Core Files**:
  * [02_ART_DIRECTION.md](file:///Users/brak/Desktop/help ide/creative-os/design/02_ART_DIRECTION.md)
  * [04_TYPOGRAPHY_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/design/04_TYPOGRAPHY_SYSTEM.md)
  * [29_CASE_STUDY_LIBRARY.md](file:///Users/brak/Desktop/help ide/creative-os/libraries/29_CASE_STUDY_LIBRARY.md)
  * [33_PORTFOLIO_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/systems/33_PORTFOLIO_SYSTEM.md)
  * [35_DESIGN_TOKENS.json](file:///Users/brak/Desktop/help ide/creative-os/tokens/35_DESIGN_TOKENS.json)
* **Preloading Rules**: Load art direction first. Scroll animation elements are lazy-loaded when screen transitions render.

---

## 3. Dependency Hierarchy & Execution Rules

1. **Hierarchy Anchoring**: All downstream systems must query [04_TYPOGRAPHY_SYSTEM.md](file:///Users/brak/Desktop/help ide/creative-os/design/04_TYPOGRAPHY_SYSTEM.md) to confirm font scales, letter spacing alignments, and line heights *before* initializing [08_LAYOUT_ENGINE.md](file:///Users/brak/Desktop/help ide/creative-os/architecture/08_LAYOUT_ENGINE.md).
2. **Dynamic Tokens Query**: Always use [35_DESIGN_TOKENS.json](file:///Users/brak/Desktop/help ide/creative-os/tokens/35_DESIGN_TOKENS.json) as the program source of truth. The markdown file serves as documentation only.
3. **Precedence System**: If a color selection conflicts with typography clarity, typographic legibility always overrides color styling choices.

## Benchmark Traceability

No direct benchmark dependencies.
