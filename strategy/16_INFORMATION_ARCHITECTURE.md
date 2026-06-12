# 16_INFORMATION_ARCHITECTURE — Navigation Architectures

## 1. Why This Exists & Why It Works
Standard multi-level dropdown menus clutter layouts, causing cognitive load and visual clutter. This document establishes guidelines for information architecture that prioritize clean navigation pathways, context-aware links, and minimalist menus. It works by keeping the viewport clean while maintaining clear navigation pathways.

---

## 2. Navigation Rules
1. **The Three-Click Maximum**: Users must reach any major page section in three actions or fewer.
2. **Contextual Footers**: Offload secondary and tertiary paths (e.g. Terms, Privacy, FAQs) to the footer. Keep the primary header restricted to 4 items max.
3. **Full-Screen Overlays**: If complex menus are required, use a clean overlay transition rather than standard multi-tier dropdown menus.

---

## 3. Engineering & Navigation Patterns

### React Fullscreen Navigation Overlay (Tailwind & Framer Motion)
```jsx
// Clean overlay navigation replacing standard dropdown menus
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Portfolio', 'About', 'Research', 'Contact'];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-16 mix-blend-difference text-neutral-100">
        <span className="text-sm font-mono tracking-widest">[STUDIO]</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-xs uppercase tracking-widest focus:outline-none">
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-neutral-950 flex flex-col justify-center px-6 md:px-16"
          >
            <nav className="flex flex-col space-y-6">
              {links.map((link, idx) => (
                <motion.a
                  key={link}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl md:text-6xl font-light text-neutral-100 hover:italic tracking-tight leading-none"
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## 4. When to Use & Avoid
* **When to Use**: Marketing and editorial websites, brand collections, and agency showcases.
* **When to Avoid**: Massive catalog stores and documentation systems where side-bar indexes must remain permanently visible.

## Benchmark Traceability

### Instrument
- [DIRECT] Instrument → Storyblok client details → Information Architecture → Map navigation trees to custom CMS paths.

### Fantasy Interactive
- [INFERRED] Fantasy Interactive → full-screen menu states → Information Architecture → Keep main menu levels under five options.
