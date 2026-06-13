# 36_MEDIA_COMPONENT_SYSTEM — Media Layout & Background Specifications

## 1. Why This Exists & Why It Works
High-resolution images and videos are crucial for creative portfolios, but they cause severe performance bottlenecks if loaded raw. By standardizing lazy loading, clipping reveals, and interactive grain overlays, this system preserves 60fps scrolling while displaying asset files.

---

## 2. Core Rules & Guidelines
1. **Lazy Loading Required**: All images and videos below the fold must include the `loading="lazy"` attribute or load conditionally.
2. **Interactive Background Opacity**: Procedural canvas grain overlays must use low opacity levels (e.g. `0.04`) to prevent heavy graphics-card utilization and mobile device slowdowns.
3. **Parallax Media Bounding**: Parallax offsets must be securely bound within overflow-hidden containers, limiting the translation bounds to absolute limits (e.g. 10%–20%).

---

## 3. Implementation Details
* **MediaBlock**: Performance-safe image and video handler with lazy loading, auto-parallax offsets, and clipping reveals.
* **NoiseBackground**: Procedural dynamic canvas-grain background overlay with standard CSS fallbacks.

---

## Benchmark Traceability

### Active Theory
- [DIRECT] Active Theory → Custom canvas overlays → Media Component System → Render high-performance noise shaders with strict opacity bounds.

### Resn
- [DIRECT] Resn → Interactive loaders → Media Component System → Synchronize image loading transitions with progress loader counters.
