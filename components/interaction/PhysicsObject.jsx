import { useEffect, useRef } from 'react'
import { usePhysics } from './InteractiveWorld'

let nextId = 0

export function PhysicsObject({
  children,
  x,
  y,
  radius = 40,
  mass = 1,
  targetX = null,
  targetY = null,
  style = {},
  ...props
}) {
  const ref = useRef(null)
  const physics = usePhysics()

  useEffect(() => {
    if (!physics || !ref.current) return
    const id = `physics-obj-${nextId++}`
    const el = ref.current

    // Register with context
    const unregister = physics.registerObject(id, {
      x,
      y,
      radius,
      mass,
      targetX,
      targetY,
      element: el
    })

    return () => {
      unregister()
    }
  }, [physics, x, y, radius, mass, targetX, targetY])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        width: radius * 2,
        height: radius * 2,
        borderRadius: '50%',
        willChange: 'transform',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}
