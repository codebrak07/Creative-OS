# 27_SCROLL_STORY_LIBRARY — Scroll Choreography & Pacing

## 1. Why This Exists & Why It Works
Most parallax animations feel laggy or break natural browser scrolling, frustrating users. This document establishes guidelines for scroll choreography and pacing. It works by linking visual transitions directly to native page scroll events, creating a unified narrative.

---

## 2. Scroll Choreography Guidelines
1. **Never Interfere with Scroll Speed**: Do not override the browser's scroll speed. Guide the user's attention instead of controlling their scroll speed.
2. **Focal Offsets**: Offset background layers by small percentages (`5%` - `15%`) to add depth to layouts.
3. **Smooth Scroll Fallback**: Ensure scroll animations degrade gracefully on mobile screens or devices with reduced motion enabled.

---

## 3. Engineering & React/Framer Motion Implementations

### Scroll-Linked Progress Overlay (React & Framer Motion)
```jsx
// React Component for scroll-linked visual pacing and overlays
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollChoreographySection({ children, backgroundAsset }) {
  const { scrollYProgress } = useScroll();
  
  // Transform scale and opacity as user scrolls past the container
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0.6, 1, 0.4]);

  return (
    <div className="relative w-full h-[150vh] bg-neutral-950 flex flex-col justify-center overflow-hidden">
      {/* Background container following the scroll transform */}
      <motion.div 
        style={{ scale, opacity }} 
        className="absolute inset-0 w-full h-full bg-neutral-900 z-0"
      >
        {backgroundAsset}
      </motion.div>
      
      {/* Scroll-aligned overlay text container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-16 flex flex-col justify-end h-full pb-32">
        {children}
      </div>
    </div>
  );
}
```

---

## 4. When to Use & Avoid
* **When to Use**: Landing pages, editorial case studies, product launches, and narrative presentation steps.
* **When to Avoid**: Dynamic analytical dashboards, billing tables, or standard settings panels where space optimization is critical.

## Benchmark Traceability

### Resn
- [DIRECT] Resn → Fallback scroll canvas rules → Scroll Story Library → Disable 3D scrolling on older tablet layouts.

### Locomotive
- [DIRECT] Locomotive → preloader container logic → Scroll Story Library → Hide page content until assets preloading completes.

### Dogstudio
- [DIRECT] Dogstudio → modernizr mobile scroll checks → Scroll Story Library → Set window.disable_motion on tablet device frames.

### Active Theory
- [DIRECT] Active Theory → WebGL coordinate lerp calculations → Scroll Story Library → Interpolate viewport scrolling variables dynamically.
