# 41_DESIGN_GOVERNANCE_SYSTEM — Style Drift & Token Enforcement

## 1. Why This Exists & Why It Works
Over time, as multiple developers add features to a codebase, layout styling can drift from the original design tokens, introducing styling debt. This document establishes guidelines for style drift and token enforcement. It works by setting clear rules for CSS variables, visual consistency audits, and automated linting checks.

---

## 2. Why Quality Declines Over Time
Quality declines when development teams introduce custom utility overrides, manual page padding, or unique animation speeds to speed up feature delivery. This breaks design token constants and dilutes brand quality.

---

## 3. Style Drift Auditing & Token Enforcement
1. **Design Token Linter**: Enforce a rule that rejects styling classes using hardcoded pixel values. All margins, padding, typography sizes, and colors must reference token variables.
2. **Monthly Audits**: Visual designers and frontend developers must review the live platform monthly to identify and fix styling drift.
3. **Tracking Design Debt**: Log styling debt, accessibility warnings, and slow transitions in a shared tracking sheet to plan clean-up cycles.

---

## 4. Engineering & Webpack/Vite CSS Auditing Rules
* **Code Style Rules**: Set ESLint and stylelint rules to warn developers when they use hardcoded spacing values or colors.
* **Component Inspections**: Audit custom components during code reviews to ensure they do not feature custom utility overrides.

## Benchmark Traceability

### Buttermax
- [DIRECT] Buttermax → Sanity schema constraints → Design Governance System → Reject class names using hardcoded spacing values.

### Instrument
- [DIRECT] Instrument → Abacus token constraints → Design Governance System → Enforce linter rules during CSS compilation.

### MediaMonks
- [DIRECT] MediaMonks → reCAPTCHA enterprise fields → Design Governance System → Audit form components during monthly drift cycles.
