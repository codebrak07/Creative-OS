# 40_EXPERIENCE_ARCHITECTURE_SYSTEM — Experience Mapping

## 1. Why This Exists & Why It Works
Most web agencies design individual pages. This ignores the user's journey between states, resulting in a disjointed, forgettable experience. This document establishes guidelines for experience design that prioritize continuous user journeys, attention pacing, and interactive details. It works by building curiosity and keeping users engaged with the interface.

---

## 2. Pacing User Attention
1. **Curiosity Systems**: Start the experience with a minimal, high-tension statement or graphic that encourages scroll action. Do not explain the whole product in the hero fold.
2. **Interactive Details**: Introduce unexpected details (e.g. subtle hover transformations, monospaced metadata counters, custom scroll transitions) that reward user exploration.
3. **Continuous Transitions**: Ensure all transitions between routes are smooth and visual, keeping the brand's identity consistent.

---

## 3. Experience Blueprints By Product Type

### Luxury Product Launches
* **Focus**: Large visual assets, cinematic scroll timelines, high-fashion typography.
* **Journey**: Loading -> Hero isolation -> Material detail -> Craftsmanship narrative -> Interactive configurator.

### Developer & AI Platforms
* **Focus**: Real-time terminal overlays, interactive code editors, monospaced metadata.
* **Journey**: Concept -> Interactive prompt input -> Model output simulation -> Scaled architecture map.

### Enterprise Workspaces
* **Focus**: Information density, keyboard shortcuts, clean grid overlays.
* **Journey**: Summary dashboard -> Detail table -> Performance view -> Quick action menu.

---

## 4. Engineering & CSS/JS Implementations

### Interactive Curiosity Element Component (React & Tailwind)
```jsx
// React Component for hidden interactive detail panels
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function CuriosityPanel({ summary, children }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="border-t border-neutral-800 py-8 w-full max-w-3xl flex flex-col space-y-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setRevealed(!revealed)}>
        <h3 className="text-xl font-light text-neutral-200">{summary}</h3>
        <span className="font-mono text-xs text-neutral-500">[ {revealed ? 'Hide' : 'Reveal Details'} ]</span>
      </div>
      
      {revealed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-400 font-light text-base leading-relaxed"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
```

---

## 5. When to Use & Avoid
* **When to Use**: Editorial layouts, interactive portfolios, product walkthroughs, and main marketing landing paths.
* **When to Avoid**: Utility views, raw table pages, or billing management states.

---

## Benchmark Traceability

### Fantasy Interactive
- [DIRECT] Fantasy Interactive → tailwind CSS grid variables → Experience Architecture System → Bind components to responsive clamp sizes.

### Active Theory
- [DIRECT] Active Theory → WebGL canvas selectors `#Stage` → Experience Architecture System → Mount interactive overlays above canvas coordinates.

### Locomotive
- [DIRECT] Locomotive → Locomotive Scroll options → Experience Architecture System → Enforce scroll speed values on desktop views.
