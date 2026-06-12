# 06_INTERACTION_SYSTEM — Custom Cursors & Hover States

## 1. Why This Exists & Why It Works
Standard mouse pointers are generic. Custom cursor tracking and interactive hovers can make interfaces feel tactile and responsive. This document establishes guidelines for cursor behavior and hover states. It works by linking custom cursor states to interactive page elements, rewarding user exploration.

---

## 2. Cursor Mechanics
1. **Focus Scaling**: The cursor should grow, morph, or display text labels when hovering over active page sections or links.
2. **Smooth Cursor Lag**: Apply a slight lag (interpolated via lerp values of `0.1` to `0.2`) to the custom cursor's movement. This creates a fluid, organic motion feel.
3. **No Scroll Overrides**: Do not override browser-native scrolling speeds. Keep scrolling predictable while orchestrating visual changes dynamically.

---

## 3. Hover Grid Paradigms
* **Magnetic Hovers**: Active button elements should pull the custom cursor toward their center within a `30px` radius.
* **Text Reveals**: Hovering over display text should fade in context-specific metadata in monospaced fonts nearby.

---

## 4. Engineering & React/CSS Implementations

### Custom Pointer Tracker (React & Framer Motion)
```jsx
// React Custom Cursor tracker component with smooth lerping movement
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Custom spring configurations for smooth pointer lag
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      className="hidden md:block fixed w-8 h-8 rounded-full border border-neutral-100 pointer-events-none z-50 mix-blend-difference"
    />
  );
}
```

---

## 5. When to Use & Avoid
* **When to Use**: Creative portfolios, luxury presentation sites, WebGL overlays, and key marketing landing pages.
* **When to Avoid**: Native analytical panels, setting sidebars, form checkouts, or mobile views (where touch screens override cursors).

---

## Benchmark Traceability

### Active Theory
- [DIRECT] Active Theory → Cursor tracking overlays → Interaction System → Bind pointer coordinate values to cursor styles.

### Resn
- [DIRECT] Resn → Loader progress variables → Interaction System → Display ambient percent indicators during assets loading.

### Locomotive
- [DIRECT] Locomotive → Scroll position hooks → Interaction System → Bind cursor magnetic states to hover elements.
