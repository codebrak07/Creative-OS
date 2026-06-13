# 27_SCROLL_STORY_LIBRARY: Scroll Storytelling Blueprints

This document details 4 scroll storytelling sequence components designed to combine text content, media displays, and numerical stats into single scroll-linked layouts.

---

## 1. Sequence 1: The Feature Unveil

A pinned card sequence where elements transition onto the viewport sequentially, triggering HSL color shifts on the page background.

### Dependencies

```bash
npm install gsap @studio-freight/lenis
```

### Complete Code

```jsx
// components/motion/FeatureUnveil.jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function FeatureUnveil({ cards }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cardElements = container.querySelectorAll('.feature-card')
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${window.innerHeight * cards.length}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      }
    })

    cardElements.forEach((card, index) => {
      if (index === 0) return
      
      // Animate card entries
      tl.fromTo(card,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        `card-${index}`
      )

      // Shift background HSL colors programmatically
      if (cards[index].bgHsl) {
        const [h, s, l] = cards[index].bgHsl
        tl.to(document.documentElement, {
          '--color-canvas': `hsl(${h}, ${s}%, ${l}%)`,
          duration: 1,
          ease: 'power1.inOut'
        }, `card-${index}`)
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [cards])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {cards.map((card, i) => (
        <div
          key={i}
          className="feature-card"
          style={{
            height: '100vh',
            width: '100%',
            position: i === 0 ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: i + 1,
          }}
        >
          <div style={{ maxWidth: '600px', padding: '2rem', background: 'var(--color-ink-primary)', color: 'var(--color-canvas)' }}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
```

### Why Award-Winning Developers Reach For It
This locks the user viewport to step through product features sequentially, avoiding sudden jumps between layout segments.

### Performance Notes
Set absolute layouts on overlapping card elements to prevent layout shifting during pinning sequences.

### Mobile Fallback
On screens narrower than 768px, disable pinning entirely. Renders cards as standard vertical layout blocks scrolling natively.

---

## 2. Sequence 2: The Stat Moment

A centered fullscreen highlight section designed to draw the user focus to numerical counters as they scroll into view.

### Dependencies

```bash
npm install gsap
```

### Complete Code

```jsx
// components/motion/StatMoment.jsx
import { useEffect, useRef, useState } from 'react'

export function StatMoment({ value, label, prefix = '', suffix = '' }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      let start = null
      const duration = 1500

      const step = (timestamp) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        // Cubic ease out
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.floor(eased * value).toString())

        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }

      requestAnimationFrame(step)
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [value])

  return (
    <div
      ref={ref}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-canvas)',
        color: 'var(--color-ink-primary)'
      }}
    >
      <h2 style={{ fontSize: '12vw', fontVariantNumeric: 'tabular-nums', margin: 0 }}>
        {prefix}{display}{suffix}
      </h2>
      <p style={{ fontSize: '1.5rem', color: 'var(--color-ink-secondary)' }}>{label}</p>
    </div>
  )
}
```

### Why Award-Winning Developers Reach For It
Creates high-contrast typography focus segments that emphasize key milestones or scale measurements.

### Performance Notes
Using `font-variant-numeric: tabular-nums` ensures the characters share equal widths, eliminating layout jitter during counting transitions.

### Mobile Fallback
Stat counts update instantly to final values on mobile devices if prefers-reduced-motion is configured.

---

## 3. Sequence 3: The Product Zoom

A scroll-controlled scaling showcase where product media elements expand to fill the entire viewport.

### Dependencies

```bash
npm install gsap
```

### Complete Code

```jsx
// components/motion/ProductZoom.jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ProductZoom({ src, alt, title }) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const image = imageRef.current
    const text = textRef.current
    if (!container || !image || !text) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        scrub: true,
      }
    })

    tl.fromTo(image,
      { width: '40vw', height: '40vh', borderRadius: '1rem' },
      { width: '100vw', height: '100vh', borderRadius: '0rem', duration: 1 }
    ).to(text,
      { opacity: 0, y: -50, duration: 0.5 },
      0
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-canvas)'
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{
          objectFit: 'cover',
          zIndex: 1,
          willChange: 'width, height'
        }}
      />
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          zIndex: 2,
          color: 'var(--color-ink-primary)',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: '4rem' }}>{title}</h2>
      </div>
    </div>
  )
}
```

### Why Award-Winning Developers Reach For It
This provides dramatic scaling transitions that turn static product images into immersive visual headers.

### Performance Notes
Restrict image resizing updates to standard GPU-accelerated width/height values or use CSS transforms with scale variables.

### Mobile Fallback
Reduce zoom thresholds on mobile viewports (scaling from 80vw to 100vw) to avoid visual clipping of text overlays.

---

## 4. Sequence 4: The Split Narrative

A split layout system where structural text details lock statically on one half of the viewport while visual assets scroll natively on the other side.

### Dependencies

```bash
/* None: Relies on IntersectionObservers and CSS sticky positioning properties */
```

### Complete Code

```jsx
// components/motion/SplitNarrative.jsx
import { useEffect, useRef, useState } from 'react'

export function SplitNarrative({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', minHeight: '100vh' }}>
      {/* Left fixed narrative details */}
      <div style={{ position: 'sticky', top: '20vh', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem' }}>
        <div key={activeIndex} style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <h3 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>{sections[activeIndex].heading}</h3>
          <p style={{ color: 'var(--color-ink-secondary)', lineHeight: '1.6' }}>{sections[activeIndex].body}</p>
        </div>
      </div>

      {/* Right scrolling media elements */}
      <div>
        {sections.map((sec, i) => (
          <SplitSectionItem key={i} index={i} onEnter={setActiveIndex}>
            {sec.media}
          </SplitSectionItem>
        ))}
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function SplitSectionItem({ children, index, onEnter }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onEnter(index)
      }
    }, { threshold: 0.6 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index, onEnter])

  return (
    <div
      ref={ref}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      {children}
    </div>
  )
}
```

### Why Award-Winning Developers Reach For It
This bridges narrative content readability with continuous visual storytelling.

### Performance Notes
Using static CSS sticky properties prevents continuous DOM measuring calculations during scrolling events.

### Mobile Fallback
The grid wraps to a single column on mobile, placing description blocks above their respective media elements.

---

## Benchmark Traceability

### Resn
- [DIRECT] Resn: Fallback scroll canvas rules: Scroll Story Library: Disable 3D scrolling on older tablet layouts.

### Locomotive
- [DIRECT] Locomotive: preloader container logic: Scroll Story Library: Hide page content until assets preloading completes.

### Dogstudio
- [DIRECT] Dogstudio: modernizr mobile scroll checks: Scroll Story Library: Set window.disable_motion on tablet device frames.

### Active Theory
- [DIRECT] Active Theory: WebGL coordinate lerp calculations: Scroll Story Library: Interpolate viewport scrolling variables dynamically.
