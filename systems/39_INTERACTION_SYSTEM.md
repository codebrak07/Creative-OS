# 39_INTERACTION_SYSTEM — Physics & Vector Interaction Specifications

## 1. Why This Exists & Why It Works
Bespoke interactions, especially physics-based elements pioneered by Bruno Simon, make interfaces feel playful, tactile, and alive. Incorporating gravity, vector inertia, springs, and cursor drag reactions increases user session duration and leaves a strong, memorable impression. This system defines standard physics behaviors for canvas environments.

---

## 2. Core Physics Rules & Guidelines
1. **Zero Layout Recalculations**: Physics loops must run inside HTML5 Canvas elements or use composite-only transform updates (e.g. `transform: translate3d(...)`) to keep the CPU load minimal.
2. **Dynamic Springs & Inertia**: Dragged objects must feature realistic spring calculations (e.g. Hooke's Law spring forces combined with velocity dampening) to prevent abrupt stopping or jittering.
3. **Responsive Boundaries**: Physics worlds must dynamically recalculate bounding boxes on window resize actions to prevent components from dropping outside active viewport domains.

---

## 3. Implementation Details
* **InteractiveWorld**: The main physics manager rendering and coordinating bounding container fields.
* **PhysicsCursor**: Interactive trails following cursor velocities with spring physics.
* **DraggableArtifact**: Wrap helper enabling cursor drag-and-throw inertia calculations.

---

## Benchmark Traceability

### Locomotive
- [DIRECT] Locomotive → Team page GLB canvas rigs → Interaction System → Bind 3D/2D spring physics coordinates directly to scrolling positions.

### Dogstudio
- [DIRECT] Dogstudio → dog.js WASM character components → Interaction System → Adjust physics velocity constants dynamically based on cursor movement speeds.
