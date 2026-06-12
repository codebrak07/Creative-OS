# 32_AI_PRODUCT_SYSTEM — AI Product Interface Design

## 1. Why This Exists & Why It Works
Many AI applications use standard chat interfaces that are hard to navigate. This document establishes guidelines for AI product interfaces. It works by setting clear rules for dynamic status displays, text input styling, and structured response layouts.

---

## 2. Interface Rules
1. **Clear Loading States**: Provide responsive loading indicators during query execution (e.g. monospaced progress text or subtle layout fades rather than standard spinning circles).
2. **Flexible Input Areas**: Design input containers that scale fluidly as user prompts grow in length.
3. **Structured Response Layouts**: Format AI responses using clear, monospaced typography, clean code blocks, and structured summaries.

---

## 3. Designing AI Status Indicators
* **Processing States**: Use small monospaced labels (e.g. `[STATUS_ANALYZING]`, `[COMPILING_REPLY]`) to show real-time processing status.
* **Accuracy Cues**: Include confidence metrics or source links to build trust.

---

## 4. When to Use & Avoid
* **When to Use**: LLM chat systems, AI editor screens, search tools, and complex automation workflows.
* **When to Avoid**: Standard informational homepages, simple marketing views, or contact forms.

## Benchmark Traceability

### Fantasy Interactive
- [DIRECT] Fantasy Interactive → Tailwind CSS input classes → AI Product System → Style input fields dynamically for long prompt queries.

### MediaMonks
- [INFERRED] MediaMonks → Drupal component status states → AI Product System → Display small monospaced progress indicators (e.g. `[STATUS_ANALYZING]`).
