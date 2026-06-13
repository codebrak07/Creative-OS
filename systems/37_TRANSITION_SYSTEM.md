# 37_TRANSITION_SYSTEM — Page & Section Transition Specifications

## 1. Why This Exists & Why It Works
Transitions bridge the gap between static pages, making the entire website experience feel like a single interactive app. Award-winning portfolios rely heavily on section wipes, curtain slides, and noise-dissolve transitions to hide layout shifts and create organic flow. This system defines standard route and block-wipe transition mechanics.

---

## 2. Core Rules & Guidelines
1. **Mask/Wipe Synchronization**: Wipe animations must block user click actions during transition states (using temporary pointer-events CSS controls) to prevent simultaneous route requests.
2. **Scroll Position Control**: Easing curves and speed parameters must align with the sovereign ease curve. Scroll positions must restore seamlessly once a page transition ends.
3. **Loader Gates**: Main entry transitions must lock scroll states and wait for asset loader complete signals before releasing the mask container.

---

## 3. Implementation Details
* **SectionTransition**: Section-level wipes, curtain slides, clipping reveals, and slides using GSAP timelines.
* **PageTransition**: Router-ready page transitions that control viewport overlay sheets.

---

## Benchmark Traceability

### Resn
- [DIRECT] Resn → Progress loaders → Transition System → Synchronize transition curtain wipes with asset preloading gates.

### Locomotive
- [DIRECT] Locomotive → scroll-choreographed curves → Transition System → Configure entrance transition curves to match page scroll initialization.
