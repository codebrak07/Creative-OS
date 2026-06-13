# 05_MOTION_SYSTEM: Animation Physics and Pacing

This document establishes the architecture for custom, physics-based motion. It details how to mimic the weight, drag, and friction of physical objects, creating a tactile and responsive web experience.

---

## Section 1: Stack and Setup

To build high-performance creative animations, award-winning developers establish a single RequestAnimationFrame (RAF) loop that choreographs all layout measurements, scroll calculations, and rendering updates.

### Dependencies

Install the core animation and scroll packages:

```bash
npm install @studio-freight/lenis gsap split-type howler
npm install @types/howler -D
```

### Setup Code

```javascript
// src/lib/raf.js: single RAF loop, everything plugs into this
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis

export function initRAF() {
  lenis = new Lenis({
    duration: 1.4,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.8,
    infinite: false,
  })

  // Bridge Lenis scroll position into GSAP ScrollTrigger
  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    ScrollTrigger.update()
    // Expose velocity globally for velocity-based effects
    window.__scrollVelocity = velocity
  })

  // Use GSAP's ticker so Lenis and GSAP animations are frame-perfect
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function getLenis() { return lenis }
```

### Why Award-Winning Developers Reach For It
This configuration links smooth kinetic scrolling with GSAP ticker timing, preventing layout thrashing and rendering desynchronization across platforms.

### Performance Notes
Ensure that only one global `gsap.ticker` listener is registered. Multiple RAF loops degrade CPU efficiency on low-spec systems.

### Mobile Fallback
On low-tier mobile devices, disable the custom scroll multiplier (`smoothWheel: false`) to let the browser rely entirely on native hardware-accelerated momentum scrolling.

---

## Section 2: Text Animations

### 2A. Cinematic Word Reveal

This pattern splits headers into individual lines and words, wrapping them in overflow containers to construct a mask reveal.

```jsx
// components/motion/WordReveal.jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

/**
 * Splits text into words, reveals with Y-translate + opacity.
 * Feel: authoritative, editorial, cinematic
 */
export function WordReveal({
  children,
  tag: Tag = 'h1',
  delay = 0,
  stagger = 0.04,
  duration = 0.9,
  trigger = 'top 88%',
  className = '',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Wrap each line in overflow:hidden to clip the reveal
    const split = new SplitType(el, { types: 'lines,words' })

    split.lines.forEach(line => {
      line.style.overflow = 'hidden'
      line.style.display = 'block'
    })

    gsap.set(split.words, { yPercent: 115, opacity: 0, rotationZ: 1.5 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: trigger,
        toggleActions: 'play none none none',
      },
      defaults: { ease: 'power4.out' },
    })

    tl.to(split.words, {
      yPercent: 0,
      opacity: 1,
      rotationZ: 0,
      duration,
      stagger,
      delay,
    })

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tl.progress(1).kill()
    }

    return () => {
      split.revert()
      tl.kill()
    }
  }, [])

  return <Tag ref={ref} className={className}>{children}</Tag>
}
```

#### Why Award-Winning Developers Reach For It
Cinematic reveals give typography a high-end editorial rhythm by showing characters emerging directly out of the page layout grids.

#### Performance Notes
Minimize the layout recalculations by applying `SplitType` only after web fonts are fully loaded.

#### Mobile Fallback
Disable the line-splitting effect on viewports narrower than 768px, relying instead on a simple opacity and vertical offset animation to avoid line-wrap re-triggering.

---

### 2B. RXK Echo Text

This effect creates a ghost duplicate element that detaches from the primary text object on user mouse interactions.

```jsx
// components/motion/EchoText.jsx
import { useEffect, useRef } from 'react'

/**
 * Text with a ghost duplicate that detaches on hover.
 * Signature technique: executed on hoverable text elements.
 */
export function EchoText({ children, tag: Tag = 'span', className = '' }) {
  const ref = useRef(null)
  const echoRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    const echo = echoRef.current
    if (!el || !echo) return

    let rafId
    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0

    const track = (e) => {
      const rect = el.getBoundingClientRect()
      targetX = (e.clientX - rect.left - rect.width / 2) * 0.12
      targetY = (e.clientY - rect.top - rect.height / 2) * 0.08
    }

    const reset = () => { targetX = 0; targetY = 0 }

    const loop = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06
      echo.style.transform = `translate(${currentX + 3}px, ${currentY + 2}px)`
      rafId = requestAnimationFrame(loop)
    }

    el.addEventListener('mousemove', track)
    el.addEventListener('mouseleave', reset)
    rafId = requestAnimationFrame(loop)

    return () => {
      el.removeEventListener('mousemove', track)
      el.removeEventListener('mouseleave', reset)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`echo-wrap ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <span
        ref={echoRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          color: 'var(--color-accent)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        {children}
      </span>
    </Tag>
  )
}
```

#### Why Award-Winning Developers Reach For It
It creates a tactile visual shadow that acts as a strong signifier of user interaction, enhancing the depth of typographic links.

#### Performance Notes
Use hardware-accelerated transforms (`translate3d` or `translate` on elements that have `will-change: transform` configured) to avoid paint updates.

#### Mobile Fallback
Disable the mousemove tracking loop entirely on touch-enabled devices and show the echo element at a static offset of 2px.

---

### 2C. Glitch Counter

This pattern animates numeric progressions through a sequence of random digits before landing on the final value.

```jsx
// components/motion/GlitchCounter.jsx
import { useEffect, useRef, useState } from 'react'

/**
 * Number counts through random digits before landing on final value.
 * Feel: technical, data-driven, earned reveal
 */
export function GlitchCounter({ end, duration = 2000, prefix = '', suffix = '' }) {
  const [display, setDisplay] = useState('000')
  const ref = useRef(null)
  const chars = '0123456789'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const start = performance.now()
        const glitchWindow = duration * 0.6 // glitch for first 60%
        const endStr = String(end)

        const tick = (now) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)

          if (elapsed < glitchWindow) {
            // Random glitch phase
            const glitched = endStr
              .split('')
              .map(char => (/\d/.test(char)
                ? chars[Math.floor(Math.random() * chars.length)]
                : char
              ))
              .join('')
            setDisplay(glitched)
          } else {
            // Counting phase: ease into final value
            const countProgress = (elapsed - glitchWindow) / (duration - glitchWindow)
            const eased = 1 - Math.pow(1 - countProgress, 3) // cubic ease out
            const current = Math.floor(eased * end)
            setDisplay(String(current).padStart(endStr.length, '0'))
          }

          if (progress < 1) requestAnimationFrame(tick)
          else setDisplay(String(end))
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{display}{suffix}
    </span>
  )
}
```

#### Why Award-Winning Developers Reach For It
This technique builds dynamic tension during the initial page entry sequence, drawing eyes to key numerical data points.

#### Performance Notes
Use `font-variant-numeric: tabular-nums` to prevent page reflows and layout shifting while digits cycle rapidly.

#### Mobile Fallback
On low-tier devices, decrease the duration to 500ms and run the counter cycle without the initial randomized glitch phase.

---

## Section 3: Scroll Choreography

### 3A. Horizontal Scroll with Lenis Bridge

This pattern pins the viewport to slide content horizontally, maintaining smooth scrolling by syncing with the global Lenis bridge.

```jsx
// components/motion/HorizontalScroll.jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { getLenis } from '@/lib/raf'

export function HorizontalScroll({ children, className = '' }) {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return

    const lenis = getLenis()

    // Pause Lenis during pinned horizontal section
    ScrollTrigger.create({
      trigger: wrap,
      start: 'top top',
      end: () => `+=${track.scrollWidth - window.innerWidth}`,
      pin: true,
      scrub: 1.4,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => lenis?.stop(),
      onLeave: () => lenis?.start(),
      onEnterBack: () => lenis?.stop(),
      onLeaveBack: () => lenis?.start(),
      onUpdate: (self) => {
        gsap.set(track, {
          x: -(track.scrollWidth - window.innerWidth) * self.progress,
          force3D: true,
        })
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section
      ref={wrapRef}
      style={{ overflow: 'hidden', position: 'relative' }}
      className={className}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </section>
  )
}
```

#### Why Award-Winning Developers Reach For It
Horizontal tracks break the vertical browsing pattern, framing narrative projects like film strips or linear timelines.

#### Performance Notes
Apply `will-change: transform` to the track container to leverage GPU compositing layers during scrubbing.

#### Mobile Fallback
Unpin the horizontal section on screens smaller than 1024px, transforming the horizontal track into standard vertical blocks.

---

### 3B. Scroll-Driven Background Color Shift

This script interpolates HSL values across sections to dynamically update CSS custom properties.

```javascript
// lib/colorShift.js
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

/**
 * Interpolates CSS custom properties between sections.
 * Creates the color transitions as user scrolls.
 */
export function initColorShift(sections) {
  // sections: [{ el, canvas: [h,s,l], ink: [h,s,l] }]
  sections.forEach((section, i) => {
    const next = sections[i + 1]
    if (!next) return

    ScrollTrigger.create({
      trigger: section.el,
      start: 'top center',
      end: 'bottom center',
      scrub: 0.8,
      onUpdate: (self) => {
        const p = self.progress
        const lerp = (a, b) => a + (b - a) * p

        const ch = lerp(section.canvas[0], next.canvas[0])
        const cs = lerp(section.canvas[1], next.canvas[1])
        const cl = lerp(section.canvas[2], next.canvas[2])

        const ih = lerp(section.ink[0], next.ink[0])
        const is_ = lerp(section.ink[1], next.ink[1])
        const il = lerp(section.ink[2], next.ink[2])

        const root = document.documentElement
        root.style.setProperty('--color-canvas', `hsl(${ch},${cs}%,${cl}%)`)
        root.style.setProperty('--color-ink-primary', `hsl(${ih},${is_}%,${il}%)`)
      },
    })
  })
}
```

#### Why Award-Winning Developers Reach For It
Modulating background colors changes the user emotional state across narrative chapters without introducing sudden, jarring cuts.

#### Performance Notes
Use HSL color interpolation instead of Hex or RGB to ensure smooth, visually linear transitions without muddy middle-zones.

#### Mobile Fallback
Limit updates to every 100ms or fall back to static CSS transition variables on mobile to conserve battery life and performance.

---

### 3C. Sticky Narrative Layout

A structure where the left-hand editorial columns remain fixed while the right-hand media elements scroll natively.

```jsx
// components/motion/StickyNarrative.jsx
import { useEffect, useRef, useState } from 'react'

/**
 * Left column: sticky text that updates per section.
 * Right column: normal scroll with one media item per section.
 */
export function StickyNarrative({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const rightRef = useRef(null)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* LEFT: sticky text container */}
      <div style={{ position: 'sticky', top: '20vh', height: 'fit-content', alignSelf: 'start' }}>
        <div
          key={activeIndex}
          style={{ animation: 'fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <p className="text-label" style={{ color: 'var(--color-ink-muted)' }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
          </p>
          <h3 className="text-display-md">{sections[activeIndex].heading}</h3>
          <p className="text-body-lg" style={{ color: 'var(--color-ink-secondary)' }}>
            {sections[activeIndex].body}
          </p>
        </div>
      </div>

      {/* RIGHT: scrolling media blocks */}
      <div ref={rightRef}>
        {sections.map((s, i) => (
          <StickySection key={i} index={i} onEnter={setActiveIndex}>
            {s.media}
          </StickySection>
        ))}
      </div>
    </div>
  )
}

function StickySection({ index, onEnter, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onEnter(index) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index, onEnter])

  return (
    <div ref={ref} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      {children}
    </div>
  )
}
```

#### Why Award-Winning Developers Reach For It
This layout anchors typographic context next to large scrolling visual showcases, matching the pacing of editorial magazines.

#### Performance Notes
Use `IntersectionObserver` to trigger state transitions instead of monitoring continuous scroll position handlers.

#### Mobile Fallback
On mobile displays, collapse the layout into a single column where text descriptions sit directly above their respective media.

---

## Section 4: Cursor and Interaction

### 4A. Velocity Cursor

A custom cursor with kinetic trail stretching that expands along the vector of pointer movement.

```javascript
// lib/cursor.js
/**
 * Custom cursor with velocity-based scaling.
 * Fast movement = stretched ellipse. Resting = perfect circle.
 */
export class VelocityCursor {
  constructor(el) {
    this.el = el
    this.x = -100
    this.y = -100
    this.targetX = -100
    this.targetY = -100
    this.lastX = -100
    this.lastY = -100
    this.velX = 0
    this.velY = 0
    this.raf = null

    document.addEventListener('mousemove', this.onMove.bind(this))
    this.loop()

    // Hide on touch devices
    if ('ontouchstart' in window) this.el.style.display = 'none'
  }

  onMove(e) {
    this.targetX = e.clientX
    this.targetY = e.clientY
  }

  loop() {
    this.velX = this.targetX - this.lastX
    this.velY = this.targetY - this.lastY
    this.lastX = this.x
    this.lastY = this.y

    // Lerp toward target
    this.x += (this.targetX - this.x) * 0.1
    this.y += (this.targetY - this.y) * 0.1

    const speed = Math.sqrt(this.velX ** 2 + this.velY ** 2)
    const stretch = Math.min(1 + speed * 0.04, 2.2) // max 2.2x stretch
    const angle = Math.atan2(this.velY, this.velX) * (180 / Math.PI)
    const scale = speed > 2 ? `scaleX(${stretch}) scaleY(${1 / stretch})` : 'scale(1)'

    this.el.style.transform = `
      translate(${this.x}px, ${this.y}px)
      rotate(${angle}deg)
      ${scale}
    `

    this.raf = requestAnimationFrame(this.loop.bind(this))
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    document.removeEventListener('mousemove', this.onMove.bind(this))
  }
}
```

#### Why Award-Winning Developers Reach For It
Velocity-stretched cursors add fluidity to pointer movements, creating a visceral interface that reacts immediately to users.

#### Performance Notes
Set the cursor element to `position: fixed` and `will-change: transform` to bypass CPU redraw cycles.

#### Mobile Fallback
Always hide custom cursor elements on touch-enabled hardware.

---

### 4B. Magnetic Elements

This wrapper pulls interactive buttons or links toward the mouse cursor when hover thresholds are breached.

```jsx
// components/motion/Magnetic.jsx
import { useRef, useCallback } from 'react'
import gsap from 'gsap'

export function Magnetic({ children, strength = 0.35, ease = 'power4.out' }) {
  const ref = useRef(null)

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    gsap.to(el, {
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
      duration: 0.5,
      ease,
    })
  }, [strength, ease])

  const onLeave = useCallback(() => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
    })
  }, [])

  // Disable on touch
  if ('ontouchstart' in window) return children

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </span>
  )
}
```

#### Why Award-Winning Developers Reach For It
Magnetic elements increase target focus areas and click accuracy, making core site navigation items feel incredibly physical.

#### Performance Notes
Use an elastic ease-out when the cursor exits the element to return it smoothly to its original position without visual popping.

#### Mobile Fallback
Return standard children elements statically without registration listeners on touch-enabled devices.

---

## EXPERIENCE ENGINE

Before writing code define:

HOOK
What captures attention?

DISCOVERY
What encourages exploration?

PROGRESSION
How does the experience evolve?

REWARD
What is earned?

MASTERY
What becomes deeper?

MEMORY
What remains tomorrow?

Every project must contain all six.

A beautiful experience without progression
is only a demo.

A memorable experience contains progression.

## EMOTION ENGINE

Every project selects ONE primary emotion.

Options:

- Wonder
- Curiosity
- Power
- Luxury
- Confidence
- Nostalgia
- Tension
- Belonging
- Chaos
- Playfulness

Every decision must reinforce
the selected emotion.

Typography
Motion
Interaction
Sound
Color
Layout

must all support the same feeling.

Conflicting emotions weaken the experience.

## MEMORY MOMENT SYSTEM

Every project requires:

1. Screenshot Moment
2. Share Moment
3. Story Moment
4. Reward Moment

Ask:

"What will users tell a friend about this?"

If no answer exists:

the experience is incomplete.

## STORY ENGINE

Every experience requires:

Beginning

Middle

Climax

Resolution

Users should feel progression.

Even portfolios.

Even SaaS.

Even dashboards.

Even landing pages.

Static experiences are forgotten.

Narrative experiences are remembered.

## WORLD BUILDING SYSTEM

Every project is a world.

Define:

Rules

Language

Physics

Symbols

Rewards

Culture

Interactions

Worlds create immersion.

Immersion creates memory.

Memory creates attachment.

## SIGNATURE GENERATOR

Generate at least ten possible
signature techniques.

Combine:

Typography
Motion
Physics
Interaction
Sound
Technology

Choose one.

Commit fully.

The experience should be identifiable
from a screenshot.

The experience should be identifiable
from a three second video.

If not:

the signature is weak.

## GRAVITY PRINCIPLE

The objective is not to create pages.

The objective is not to create interfaces.

The objective is to create gravity.

Gravity is the force that causes users to:

Stop
Stay
Explore
Return
Remember
Share

Every decision must increase:

Curiosity
Wonder
Utility
Mastery
Status
Belonging
Momentum

If none increase:

remove the decision.

## PRODUCT CHECK

For every interaction ask:

Does it improve:

Trust?

Clarity?

Retention?

Action?

Utility?

If not:

remove it.

Creative work must still solve problems.

## AI DETECTION AUDIT

Ask:

Could Framer generate this?

Could Lovable generate this?

Could Bolt generate this?

Could v0 generate this?

within five minutes?

If yes:

the idea is not original enough.

Push further.

Originality is mandatory.

Distinctiveness is mandatory.

## RISK ENGINE

Rate every concept.

1-3 = Generic

4-6 = Interesting

7-8 = Award-Level

9-10 = Industry Defining

Anything below 7
requires iteration.

Safe ideas do not create gravity.

## ANTIGRAVITY RULES

AntiGravity does not create interfaces.

AntiGravity creates gravity.

The goal is not beautiful work.

The goal is unforgettable work.

Prioritize:

Experience > Interface

Emotion > Features

Systems > Pages

Identity > Trends

Originality > Familiarity

Memorability > Decoration

Story > Sections

Worlds > Screens

Every output must increase:

Curiosity

Wonder

Utility

Mastery

Status

Belonging

or

Momentum.

If none increase:

the solution is incomplete.

---

## DESIGN PSYCHOLOGY ENGINE

Every color decision must answer:

What emotion does this create?

Every typography decision must answer:

What authority does this signal?

Examples:

Editorial Serif
-> Culture
-> Prestige
-> Expertise

Monospace
-> Technical authority
-> Precision
-> Systems thinking

Neo-Grotesk Sans
-> Modernity
-> Confidence
-> Product maturity

Warm Ivory
-> Craft
-> Human touch

Cool Obsidian
-> Scale
-> Technology
-> Seriousness

Never choose visual styles by taste.

Choose them by psychological outcome.

## IDENTITY RECOGNITION SYSTEM

A project must be identifiable from:

- One screenshot
- One crop
- One motion clip

without a logo.

Identity comes from:

Typography
Spacing
Motion
Composition
Color restraint

not branding assets.

If removing the logo destroys recognition:

the identity system failed.

## COMPOSITION ENGINE

Prefer:

Asymmetry
Editorial offsets
Negative space
Intentional imbalance

Avoid:

Perfect centering
Template symmetry
Generic SaaS layouts

Composition should create tension.

Tension creates attention.

## ANTI TEMPLATE SYSTEM

Reject layouts that resemble:

- Generic SaaS landing pages
- Framer starter kits
- Webflow templates
- AI-generated marketing sites

The objective is:

Recognition

not familiarity.

Originality before convenience.

## MATERIAL INTELLIGENCE

Every project chooses one material language.

Examples:

Paper
Stone
Steel
Glass
Fabric
Ink
Light
Void

All visual decisions should reinforce
the chosen material.

A project should feel physical
even when entirely digital.

## TYPOGRAPHY HIERARCHY RULES

Hero:
One dominant voice.

Subhead:
Support hero.

Body:
Explain.

Utility:
Orient.

Labels:
Organize.

Never allow two competing heroes.

Visual hierarchy should be understood
within three seconds.

## LUXURY PRINCIPLE

Luxury is:

Restraint

not decoration.

Luxury increases:

Space
Precision
Confidence
Craft

Luxury decreases:

Color count
Visual noise
Effects
Animation frequency

The more expensive the product,
the quieter the interface.

## ANTIGRAVITY DESIGN PRINCIPLE

Design is not decoration.

Design is gravity.

Every visual decision should increase:

Curiosity
Trust
Authority
Wonder
Belonging
Momentum

If a design choice does not increase one:

remove it.

Beauty alone is insufficient.

---

## Benchmark Traceability

### Active Theory
- [DIRECT] Active Theory: WebGL coordinate interpolation: Motion System: Smooth custom pointer moves using linear interpolation (lerp 0.1).

### Buttermax
- [DIRECT] Buttermax: Entrance transition timers: Motion System: Animate elements using custom curves with speed limits under 250ms.

### Resn
- [DIRECT] Resn: WebGL liquid timeline systems: Motion System: Map scroll progress ratios to custom cubic curves.


