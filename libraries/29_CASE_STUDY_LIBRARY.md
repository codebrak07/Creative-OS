# 29_CASE_STUDY_LIBRARY — Case Study Layout Templates

## 1. Why This Exists & Why It Works
Many web agencies format case studies as simple blog posts, which fails to highlight the unique details of each project. This document establishes guidelines for formatting case studies. It works by setting clear rules for image displays, typography weights, and monospaced metadata columns, showcasing work in an editorial style.

---

## 2. Case Study Blueprint
1. **Focal Image Header**: Start case studies with a single vertical image next to large display typography.
2. **Project Parameters Column**: Use a monospaced sidebar on columns 1-3 to list project metadata (e.g. `[CLIENT]`, `[SERVICES]`, `[YEAR]`).
3. **Alternating Grid Layouts**: alternate between full-screen media showcases and multi-column text grids to maintain visual interest.

---

## 3. Engineering & React Case Study Layout

```jsx
// React Component for structured, high-fidelity Case Study views
import React from 'react';

export function CaseStudyTemplate({ title, client, year, services, children }) {
  return (
    <article className="w-full min-h-screen bg-neutral-950 text-neutral-100 px-6 md:px-16 py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Monospaced Metadata Sidebar */}
        <div className="md:col-span-3 flex flex-col space-y-4 text-xs font-mono text-neutral-500 uppercase tracking-widest sticky top-24">
          <div>[ Client ] <br /><span className="text-neutral-200">{client}</span></div>
          <div>[ Year ] <br /><span className="text-neutral-200">{year}</span></div>
          <div>[ Services ] <br /><span className="text-neutral-200">{services.join(', ')}</span></div>
        </div>

        {/* Primary Narrative Column */}
        <div className="md:col-span-9 flex flex-col space-y-12">
          <h1 className="text-5xl md:text-8xl font-light tracking-tight leading-none text-neutral-100">{title}</h1>
          <div className="w-full aspect-[16/7] bg-neutral-900 my-8"></div>
          <div className="max-w-xl text-lg text-neutral-400 font-light leading-relaxed space-y-6">
            {children}
          </div>
        </div>

      </div>
    </article>
  );
}
```

## Benchmark Traceability

### Buttermax
- [DIRECT] Buttermax → Suisse Intl grid alignments → Case Study Library → Render case studies in structured typographical columns.

### Instrument
- [DIRECT] Instrument → storyblok CMS data variables → Case Study Library → Fetch outcome metrics dynamically next to text fields.

### Locomotive
- [INFERRED] Locomotive → Asymmetrical media blocks → Case Study Library → Alternate spacing between full-bleed assets and copy grids.
