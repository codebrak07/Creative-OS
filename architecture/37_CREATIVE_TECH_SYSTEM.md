# 37_CREATIVE_TECH_SYSTEM — Creative Technology & WebGL Strategy

## 1. Why This Exists & Why It Works
Many creative websites feature heavy WebGL or 3D animations that render slowly on older devices. This document establishes guidelines for using WebGL and 3D technologies. It works by setting clear performance boundaries and defining when simple, lightweight HTML/CSS layouts are preferred.

---

## 2. When to Use & Avoid WebGL / 3D
* **When to Use**: High-concept brand showcases, interactive landing pages, and luxury product launches where visual impact is a key requirement.
* **When to Avoid (HTML/CSS is Superior)**: Informational sites, documentation centers, settings panels, or search directories where fast load times and clean accessibility are critical.
* **When to Avoid Shaders**: Keep shader usage low on page loads. Avoid complex post-processing effects (like chromatic aberration or motion blur) on mobile viewports.

---

## 3. WebGL Rendering & Performance Budgets
* **Framerate Minimum**: Must maintain a stable `60fps` on mid-tier mobile hardware.
* **Draw Calls Maximum**: Limit draw calls to `50` or fewer per frame.
* **Polycount Threshold**: Limit total active polygons in the scene to under `100,000`.

---

## 4. Engineering & React Three Fiber (R3F) Implementations

### Basic Canvas & Shader Setup (R3F React)
```jsx
// React Three Fiber WebGL Canvas setup with performance fallback logic
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';

export function CreativeCanvas({ children }) {
  const handlePerformanceRegression = () => {
    console.warn('Performance drop detected. Adjusting render resolutions...');
    // Reduce pixel ratio dynamically on slower devices
  };

  return (
    <div className="w-full h-screen absolute inset-0 z-0 bg-neutral-950">
      <Canvas
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]} // Restrict device pixel ratio to prevent performance lag
      >
        <Suspense fallback={null}>
          <PerformanceMonitor onDecline={handlePerformanceRegression}>
            {children}
          </PerformanceMonitor>
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### Fragment Shader Philosophy
Keep shaders simple. Place animation logic in vertex shaders rather than executing heavy pixel calculations in fragment shaders.
```glsl
// Vertex Shader: Perform coordinate transforms efficiently
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

---

## 5. Third-Party Integrations
* **GSAP Timelines**: Use GSAP to animate camera tracks, coordinate variables, and Three.js uniform inputs.
* **Framer Motion**: Use Framer Motion to manage DOM layout panels that overlay the WebGL canvas.

---

## Benchmark Traceability

### Active Theory
- [DIRECT] Active Theory → WebGL Stage overlays → Creative Tech System → Render entire environment inside canvas selector #Stage.

### Resn
- [DIRECT] Resn → Fallback loader checks → Creative Tech System → Enforce legacy canvas scripts for older browser layouts.

### Dogstudio
- [DIRECT] Dogstudio → WASM check scripts → Creative Tech System → Check WASM support before loading dog.js character assets.

### MediaMonks
- [DIRECT] MediaMonks → Drupal custom templates → Creative Tech System → Load Lottie runtime navigation JSON programmatically.
