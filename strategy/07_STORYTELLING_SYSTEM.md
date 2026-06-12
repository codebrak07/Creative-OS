# 07_STORYTELLING_SYSTEM — Narrative Sequencing

## 1. Why This Exists & Why It Works
Most business websites list features in a random sequence. This fails to capture user interest. This document defines a framework for interactive narratives that build user curiosity, introduce visual conflict, and resolve it with product value. It works by structuring pages into five cinematic narrative beats.

---

## 2. The Five Cinematic Beats
1. **The Hook (Intro)**: Present the differentiator immediately using bold typography and vast space.
2. **The Tension (Problem)**: Introduce the market's standard limits or visual noise.
3. **The Reveal (Solution)**: Introduce the product's interface or core differentiator.
4. **The Proof (Validation)**: Showcase high-fidelity case studies or quantitative metrics.
5. **The Gateway (Action)**: Transition the user to high-intent steps without typical CTA buttons.

---

## 3. Narrative Pacing Guidelines
* **Read Time Pacing**: Restrict each cinematic section to under 150 words of total copy.
* **Choreography Shifts**: Use scroll triggers to fade copy block paragraphs sequentially, preventing users from skimming past key brand messages.

---

## 4. Engineering & React/Framer Motion Implementations

### Narrative Fade-In Beat Component (Framer Motion)
```jsx
// React Component for sequential fade-in storytelling blocks
import React from 'react';
import { motion } from 'framer-motion';

export function StorytellingBeat({ children, stepNumber }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col space-y-4 md:grid md:grid-cols-12 gap-8 items-start my-24"
    >
      {/* Monospaced Beat Counter */}
      <div className="md:col-span-2 text-xs font-mono text-neutral-400 tracking-wider">
        [BEAT_{String(stepNumber).padStart(2, '0')}]
      </div>
      
      {/* Body Content */}
      <div className="md:col-span-8 text-xl md:text-2xl font-light text-neutral-800 leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
}
```

---

## 5. When to Use & Avoid
* **When to Use**: Homepage index routes, case studies, product launches, and brand story pages.
* **When to Avoid**: API document references, user login routes, checkout workflows, and dashboard settings pages.

---

## Benchmark Traceability

### Resn
- [DIRECT] Resn → custom canvas loaders → Storytelling System → Stagger intro page components next to custom percent counters.

### Active Theory
- [INFERRED] Active Theory → gamified spatial walks → Storytelling System → Orchestrate text transitions sequentially to guide focus.

### Basic Agency
- [DIRECT] Basic Agency → SVG noise backdrops → Storytelling System → Frame narrative segments against beige textured zones.
