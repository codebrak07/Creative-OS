# 11_FRONTEND_ARCHITECTURE — Performance & Build Budgets

## 1. Why This Exists & Why It Works
Highly animated or WebGL-driven web interfaces often struggle with page-load performance and bundle sizes, resulting in high bounce rates. This document establishes guidelines for frontend architecture and performance metrics. It works by setting strict performance budgets, asset compilation limits, and loading strategies.

---

## 2. Technical Performance Budgets
To deliver an Awwwards-tier user experience, codebases must adhere to the following performance targets on mid-tier mobile hardware:
1. **First Contentful Paint (FCP)**: `< 0.8s`
2. **Speed Index (SI)**: `< 1.5s`
3. **Time to Interactive (TTI)**: `< 2.0s`
4. **Core Bundle Size**: `< 150kb` (gzipped, excluding WebGL or Three.js assets which are lazy-loaded).

---

## 3. Dynamic Asset Loading & Building
* **Dynamic Import Rules**: Splitting codebases is mandatory. Large libraries (e.g. Three.js, GSAP, or canvas frameworks) must be dynamically loaded only when their target viewports enter the screen.
* **Asset Formats**: Lossless WebP or AVIF for imagery. SVG for iconography. Ensure all video assets are highly compressed and loaded dynamically in the background.

---

## 4. Engineering & Webpack/Vite Code Splitting

### Vite Split Chunk Configuration (Vite config)
```javascript
// Vite config chunk splitting to optimize file deliveries and preloads
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Isolate large creative libraries to lazy-load chunks
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'webgl-chunk';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/framer-motion')) {
            return 'motion-chunk';
          }
        }
      }
    }
  }
});
```

---

## 5. When to Use & Avoid
* **When to Use**: Project building phase, configuring build pipelines, bundle auditing, and setting release criteria.
* **When to Avoid**: Early exploratory design mockups or asset mood boarding.

## Benchmark Traceability

### Locomotive
- [DIRECT] Locomotive → Team page GLB canvas containers → Frontend Architecture → Load dynamic 3D assets inside responsive iframe templates.

### Instrument
- [DIRECT] Instrument → Storyblok CMS data integrations → Frontend Architecture → Fetch structured client entries via API variables.

### MediaMonks
- [DIRECT] MediaMonks → Drupal component tags → Frontend Architecture → Structure pages using data-component wrappers.
