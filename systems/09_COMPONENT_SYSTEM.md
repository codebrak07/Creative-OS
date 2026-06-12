# 09_COMPONENT_SYSTEM — Reusable Component Architectures

## 1. Why This Exists & Why It Works
Traditional component libraries often bundle extra styling and scripts, resulting in large, slow codebases. This document establishes guidelines for creating lightweight, semantic, and accessible UI components. It works by restricting component scope and prioritizing clean, native HTML structures.

---

## 2. Core Component Rules
1. **Zero Styling Overrides**: Do not place custom style overrides inside individual component files. All styling variables must map directly to the design tokens.
2. **Accessible by Default**: All components must support keyboard navigation and use semantic HTML tags.
3. **Focused State Hooks**: Separate component rendering logic from state changes to keep code clean and testable.

---

## 3. Accessibility Standards
* **Aria Attributes**: Include `aria-expanded`, `aria-label`, and `role` properties on all interactive components.
* **Keyboard Navigation**: Ensure tabs, overlays, and modals can be navigated and closed using the `Tab` and `Escape` keys.

---

## 4. Engineering & React Component Example

### Semantic Accordion Component (React & Tailwind)
```jsx
// React Component for clean, semantic accordions
import React, { useState } from 'react';

export function PremiumAccordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-800 py-4 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex justify-between items-center text-left py-2 text-lg text-neutral-100 hover:text-neutral-300 transition-colors duration-300 focus:outline-none"
      >
        <span>{title}</span>
        <span className="font-mono text-xs text-neutral-500">[ {isOpen ? '-' : '+'} ]</span>
      </button>
      
      {isOpen && (
        <div className="pt-2 pb-4 text-neutral-400 font-light text-base leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
```

---

## 5. When to Use & Avoid
* **When to Use**: Navigation links, text highlights, visual details, and metadata cards.
* **When to Avoid**: Dynamic custom tables, canvas integrations, or WebGL contexts.

## Benchmark Traceability

### Fantasy Interactive
- [DIRECT] Fantasy Interactive → Tailwind CSS grids → Component System → Define component templates using responsive CSS variables.

### MediaMonks
- [DIRECT] MediaMonks → Drupal data-component attributes → Component System → Bind component declarations to declarative loading rules.
