# 12_CREATIVE_QA — Three-Phase QA Protocol

## 1. Why This Exists & Why It Works
Many web projects ship with layout shifting, contrast failures, or performance lag on mobile screens. This document establishes guidelines for pre-launch quality assurance. It works by setting strict rules for visual testing, performance checks, and accessibility verification before code is released.

---

## 2. Phase 1: Visual QA (Solo Review)

Conduct this visual audit in sequence using Chrome DevTools. Spend a minimum of 90 minutes.

### Step 1.1 — Responsive Breakpoints Audit
Test layouts at these exact widths:
- **375px**: Small viewports (iPhone SE)
- **430px**: Standard smartphones (iPhone 15 Plus)
- **768px**: Tablets portrait (iPad)
- **1024px**: Tablets landscape / Netbooks
- **1280px**: Small laptops (MacBook Pro 13")
- **1440px**: Desktop screens
- **1920px**: HD Monitors
- **2560px**: 2K / Ultrawide viewports

At each breakpoint:
- [ ] Verify that padding and margins are intentional.
- [ ] Ensure typography remains readable (minimum 16px body on mobile screens).
- [ ] Check for horizontal scrollbars and element overflows.

### Step 1.2 — Motion Audit
Turn on **Rendering → Frame Rendering Stats** in DevTools:
- [ ] Scroll page: verify 60fps scrolling with zero dropped frames.
- [ ] Trigger GSAP timelines: ensure zero Cumulative Layout Shift (CLS).
- [ ] Test interactions at 4× CPU throttling.
- [ ] Check `prefers-reduced-motion` fallbacks.

### Step 1.3 — Typography & Color Contrast Audit
- [ ] Confirm all fonts align with tokens.css variables (no hardcoded pixels).
- [ ] Text contrast ratios: body copy and links on canvas must score ≥ 4.5:1.
- [ ] Tab order must be logical. Style visible `:focus-visible` indicators.

---

## 3. Phase 2: Performance & Bundle Size Audit

Create `lighthouserc.js` in the project root to automate audits against performance budgets.

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:5173'],
      numberOfRuns: 5,
      settings: {
        emulatedFormFactor: 'mobile',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 4,
        },
      },
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'first-contentful-paint':       ['error',  { maxNumericValue: 1200 }],
        'largest-contentful-paint':     ['error',  { maxNumericValue: 2000 }],
        'cumulative-layout-shift':      ['error',  { maxNumericValue: 0.05 }],
        'total-blocking-time':          ['warn',   { maxNumericValue: 200 }],
        'speed-index':                  ['warn',   { maxNumericValue: 2000 }],
        'categories:accessibility':     ['error',  { minScore: 0.92 }],
      },
    },
  },
}
```

### Bundle Size Budget Targets:
- Main bundle: < 80KB gzipped.
- GSAP: < 30KB gzipped (use tree-shaking).
- Three.js: < 120KB gzipped (import selectively).
- Total initial JS: < 200KB gzipped.

---

## 4. Phase 3: Cross-Browser Matrix

Test rendering and behavior in this exact sequence:

| Browser | OS | Key Elements to Verify |
| :--- | :--- | :--- |
| **Chrome** | macOS/Windows | Base baseline reference. Everything must function. |
| **Safari** | macOS | CSS grid gaps, clip-path reveals, and backdrop-filters. |
| **Firefox** | Windows/macOS | CSS properties, font antialiasing, and scrollbars. |
| **Safari iOS** | iOS (iPhone) | Touch start events, 100vh height adjustments, and overscroll. |
| **Chrome Android** | Android | Touch targets (min 44x44px) and rendering on mid-tier GPUs. |

---

## Benchmark Traceability

### Active Theory
- [INFERRED] Active Theory → WebGL memory audits → Creative QA → Validate memory usage limits on mobile viewports.

### Instrument
- [DIRECT] Instrument → Storyblok live editor parameters → Creative QA → Test layouts inside headless CMS staging environments.
