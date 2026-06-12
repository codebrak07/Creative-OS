# 26_ANIMATION_LIBRARY — Animation Preset Snippets

## 1. Why This Exists & Why It Works
Maintaining motion consistency across large digital projects is difficult. Developers often implement random transition speeds. This document acts as a repository of approved Framer Motion presets, CSS transitions, and GSAP timelines. It works by restricting the animation catalog to five high-discipline presets.

---

## 2. Animation Presets Catalog

### Preset 1: The Monolith Reveal (Display Headers)
* **Description**: Text rises from a hidden container while fading in.
* **Physics**: Duration `1.4s`, Easing `[0.16, 1, 0.3, 1]`.

### Preset 2: Asymmetric Slide (Media / Container Blocks)
* **Description**: Image slides from offset angles.
* **Physics**: Duration `1.2s`, Easing `[0.16, 1, 0.3, 1]`.

### Preset 3: The Tactile Expand (Buttons / Interactive Links)
* **Description**: Hover scales font weight or border length instantly.
* **Physics**: Duration `0.3s`, Easing `[0.25, 1, 0.5, 1]`.

---

## 3. Engineering & Code Implementations

### Framer Motion Presets (React)
```jsx
// Ready-to-use animation presets for React components
import React from 'react';
import { motion } from 'framer-motion';

export const RevealText = ({ text }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const childVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.h2 
      variants={containerVariants} 
      initial="hidden" 
      whileInView="visible"
      viewport={{ once: true }}
      className="overflow-hidden flex flex-wrap gap-x-2 text-4xl md:text-6xl font-light"
    >
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden relative py-1">
          <motion.span variants={childVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
};
```

### CSS Transition Styles
```css
/* Custom luxury entrance animation */
.reveal-container {
  overflow: hidden;
  position: relative;
}

.reveal-element {
  animation: revealUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes revealUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## Benchmark Traceability

### Active Theory
- [DIRECT] Active Theory → custom SVG transitions → Animation Library → Stagger header copy lines sequentially using ease formulas.

### Resn
- [DIRECT] Resn → Progress loaders → Animation Library → Load custom percent timers during assets rendering gates.

### Locomotive
- [DIRECT] Locomotive → scroll-choreographed curves → Animation Library → Configure transitions matching Locomotive Scroll settings.

### Dogstudio
- [DIRECT] Dogstudio → .fx-letter sequential letters → Animation Library → Wrap typography words in sequence classes.
