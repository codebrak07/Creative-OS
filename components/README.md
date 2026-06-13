# Creative OS — Component Catalogue
Built to SOTD standard. Every component is token-integrated, accessible,
performance-safe, and tested against 14_DESIGN_ANTI_PATTERNS.

## UI Components
| Component | Path | Key Props | Tokens Used | When to use |
|-----------|------|-----------|-------------|-------------|
| Button | ui/Button | variant, size, magnetic, loading | color, font-utility, dur, ease | Every CTA — primary, ghost, text variants |
| Nav | ui/Nav | links[] | color, font-display-sans, text-display, z-overlay | Every site — fullscreen overlay nav |
| Loader | ui/Loader | awards[], minDuration, onComplete | font-mono, text-hero, color-canvas | Every site with load time > 1s |
| MediaBlock | ui/MediaBlock | media, ratio, reveal, parallax, lazy | dur-slow, ease-sovereign, z-raised | Performance-safe image/video grid cell |
| Marquee | ui/Marquee | speed, direction, pauseOnHover | dur-slow, ease-out, color-accent | Zero-JS scrolling logos, service reels |
| AwardsRail | ui/AwardsRail | awards[] | font-mono, text-caption, color-border | Lempens listing honors segment |
| NoiseBackground | ui/NoiseBackground | opacity, type | mix-blend-mode, color-canvas | Dynamic animated grain viewport |

## Layout Components
| Component | Path | Key Props | Tokens Used | When to use |
|-----------|------|-----------|-------------|-------------|
| Hero | layout/Hero | label, headline, subCopy, cta, image, withNoise | text-2xl, font-display-serif, space-gutter | Every landing page above fold |

## Portfolio Components
| Component | Path | Key Props | Tokens Used | When to use |
|-----------|------|-----------|-------------|-------------|
| WorkList | portfolio/WorkList | projects[], imagePreview | font-mono, font-display-sans, color-border | Agency/freelancer portfolio — Aufresne pattern |
| WorkGrid | portfolio/WorkGrid | projects[] | text-body-lg, color-border, dur-cinematic | Portfolio with rich visual thumbnails |
| CaseStudyHero | portfolio/CaseStudyHero | client, year, services, headline, image | text-hero, font-display-serif, space-gutter | Top of case study project page |
| ProjectCredits | portfolio/ProjectCredits | roles, collaborators | font-mono, font-body, color-border | Credits list at bottom of portfolio |
| NextProject | portfolio/NextProject | project | text-hero, dur-cinematic, ease-sovereign | Bottom gate prompt to scroll forward |

## Luxury Components
| Component | Path | Key Props | Tokens Used | When to use |
|-----------|------|-----------|-------------|-------------|
| ProductHero | luxury/ProductHero | brand, headline, descriptor, image | font-display-serif (weight 300), 15vw margins | Luxury brand, watch, fashion, premium product |
| ProductGallery | luxury/ProductGallery | images[] | font-display-serif, 15vw margins, ratio-2/3 | Horizontal snapped editorial gallery |
| EditorialSplit | luxury/EditorialSplit | image, title, description, imageLeft | font-display-serif, 15vw margins, aspect-4/5 | Split layout balancing text & portrait media |
| HeritageTimeline | luxury/HeritageTimeline | events[] | font-display-serif, font-mono, color-border-strong | Chronological milestones showcase |
| CraftsmanshipSection | luxury/CraftsmanshipSection | title, steps[] | font-display-serif, font-mono, color-accent | Procedure creation details and steps |

## AI Components
| Component | Path | Key Props | Tokens Used | When to use |
|-----------|------|-----------|-------------|-------------|
| ChatInterface | ai/ChatInterface | messages[], onSend, thinking | font-body, color-surface, radius-xl | AI product UI, chat interface, assistant wrapper |
| PromptSuggestions | ai/PromptSuggestions | suggestions[], onClick | color-surface, radius-pill, dur-fast | Fast recommendation prompts segment |
| ModelSwitcher | ai/ModelSwitcher | models[], current, onChange | color-surface, radius-md, z-dropdown | Switch active context target parameters |
| ArtifactPanel | ai/ArtifactPanel | artifact, open, onClose | color-surface, radius-md, z-overlay | Sidebar display for code, visual, table, and docs |
| KnowledgeSourceCard | ai/KnowledgeSourceCard | sources[] | color-surface, radius-md, font-mono | Citations list showing intelligence origin |
| AgentStatusRail | ai/AgentStatusRail | steps[] | color-surface, radius-md, color-accent | Execution nodes display for multi-stage agents |

## Motion Components
| Component | Path | Key Props | Tokens Used | When to use |
|-----------|------|-----------|-------------|-------------|
| WordReveal | motion/WordReveal | tag, delay, stagger, trigger, split | ease-sovereign, dur-cinematic | Headline text reveals (word, line, char) |
| EchoText | motion/EchoText | tag, divergence, hoverDistort | color-accent, dur-slow, ease-sovereign | Diverging trail look on links and menu lists |
| GlitchCounter | motion/GlitchCounter | end, duration, prefix, suffix | font-mono, font-variant-numeric | Procedural glitched counters |
| Magnetic | motion/Magnetic | strength, ease | ease-sovereign | Magnet cursor helper wrapper |
| SectionTransition | motion/SectionTransition | type, direction, active, onComplete | color-accent, color-canvas, z-transition | Section transition curtains and wipes |
| PageTransition | motion/PageTransition | trigger, mode, onStart, onComplete | color-canvas-cool, z-transition | Full-screen wipe transition between routes |

## Interaction Components
| Component | Path | Key Props | Tokens Used | When to use |
|-----------|------|-----------|-------------|-------------|
| InteractiveWorld | interaction/InteractiveWorld | children | color-canvas, color-accent, z-dropdown | Spring simulation viewport boundary field |
| PhysicsCursor | interaction/PhysicsCursor | - | color-accent, z-cursor | Elastic vector lag cursor |
| PhysicsObject | interaction/PhysicsObject | x, y, radius, mass, targetX, targetY | color-accent, color-surface-elevated | Bouncing particles inside InteractiveWorld |
| DraggableArtifact | interaction/DraggableArtifact | strength, bounce | will-change, dur-fast, ease-out | Wrap components to make them drag-physics ready |

---

## Benchmark Traceability

### Resn
- [DIRECT] Resn → Interactive component loaders → Component Catalogue → Integrate detailed progress metrics in loaders.

### Locomotive
- [DIRECT] Locomotive → Custom scrolling components → Component Catalogue → Define coordinate-based scrolling effects for work grids.
