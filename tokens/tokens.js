// Creative OS: Design Tokens v3.0
// JavaScript constants for use in Three.js, Canvas, GSAP, and animation libraries
// Mirrors tokens.css exactly: single source of truth is 35_DESIGN_TOKENS.json

export const color = {
  canvas: {
    obsidian:     'hsl(220, 8%, 7%)',
    obsidianWarm: 'hsl(30, 5%, 8%)',
    obsidianCool: 'hsl(230, 12%, 6%)',
    ivory:        'hsl(40, 20%, 97%)',
    ivoryWarm:    'hsl(35, 25%, 95%)',
  },
  ink: {
    primary:   'hsl(40, 20%, 96%)',
    secondary: 'hsl(220, 5%, 65%)',
    muted:     'hsl(220, 5%, 40%)',
    ghost:     'hsl(220, 5%, 20%)',
  },
  accent: {
    orange:   'hsl(24, 90%, 55%)',
    electric: 'hsl(195, 95%, 55%)',
    mint:     'hsl(155, 70%, 50%)',
    bone:     'hsl(38, 45%, 72%)',
  },
}

// Three.js Color objects (pre-instantiated for performance if THREE is available)
export const threeColor = typeof THREE !== 'undefined' ? {
  canvas:      new THREE.Color('hsl(220, 8%, 7%)'),
  ink:         new THREE.Color('hsl(40, 20%, 96%)'),
  accentOrange: new THREE.Color('hsl(24, 90%, 55%)'),
} : {
  // Fallback helper to retrieve raw HSL strings if THREE is not imported
  canvas:      'hsl(220, 8%, 7%)',
  ink:         'hsl(40, 20%, 96%)',
  accentOrange: 'hsl(24, 90%, 55%)',
}

export const duration = {
  micro:      0.08,
  fast:       0.16,
  base:       0.32,
  slow:       0.56,
  slower:     0.9,
  cinematic:  1.4,
  epic:       2.2,
}

export const ease = {
  sovereign:  [0.16, 1, 0.3, 1],       // cubic-bezier array for GSAP
  out:        [0.0, 0.0, 0.2, 1],
  expoOut:    [0.19, 1, 0.22, 1],
  bounce:     [0.34, 1.56, 0.64, 1],
}

// GSAP-compatible spring configs
export const spring = {
  gentle:  { stiffness: 100, damping: 15, mass: 1 },
  default: { stiffness: 240, damping: 22, mass: 1 },
  snappy:  { stiffness: 380, damping: 28, mass: 1 },
  elastic: { stiffness: 280, damping: 9,  mass: 1 },
}

export const breakpoint = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
}

// Lenis config: import directly
export const lenisConfig = {
  duration: 1.4,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 0.85,
  touchMultiplier: 1.8,
  infinite: false,
}
