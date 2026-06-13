import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import styles from './InteractiveWorld.module.css'

const PhysicsContext = createContext(null)

export function usePhysics() {
  return useContext(PhysicsContext)
}

export function InteractiveWorld({ children, className = '', ...props }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const objectsRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, down: false, activeId: null })

  const registerObject = (id, options = {}) => {
    const defaultObj = {
      id,
      x: options.x || Math.random() * 300 + 100,
      y: options.y || Math.random() * 300 + 100,
      vx: 0,
      vy: 0,
      radius: options.radius || 40,
      mass: options.mass || 1,
      targetX: options.targetX || null,
      targetY: options.targetY || null,
      element: options.element || null,
      ...options
    }
    objectsRef.current.push(defaultObj)
    return () => {
      objectsRef.current = objectsRef.current.filter((o) => o.id !== id)
    }
  }

  const updateObject = (id, updates) => {
    objectsRef.current = objectsRef.current.map((obj) => {
      if (obj.id === id) {
        return { ...obj, ...updates }
      }
      return obj
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId

    const resize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth
        canvas.height = containerRef.current.clientHeight
      }
    }

    resize()
    window.addEventListener('resize', resize)

    // Physics constants
    const gravity = 0.15
    const friction = 0.96
    const springStrength = 0.05

    const tick = () => {
      animationId = requestAnimationFrame(tick)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const width = canvas.width
      const height = canvas.height

      // Render connection lines if objects are close (neural net visual)
      ctx.strokeStyle = 'var(--color-border)'
      ctx.lineWidth = 0.5

      const len = objectsRef.current.length
      for (let i = 0; i < len; i++) {
        const objA = objectsRef.current[i]
        for (let j = i + 1; j < len; j++) {
          const objB = objectsRef.current[j]
          const dx = objB.x - objA.x
          const dy = objB.y - objA.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            ctx.beginPath()
            ctx.moveTo(objA.x, objA.y)
            ctx.lineTo(objB.x, objB.y)
            ctx.stroke()
          }
        }
      }

      // Physics loop
      objectsRef.current.forEach((obj) => {
        // Drag logic
        if (mouse.down && mouse.activeId === obj.id) {
          // Spring pull toward mouse coordinates
          const dx = mouse.x - obj.x
          const dy = mouse.y - obj.y
          obj.vx += dx * 0.1
          obj.vy += dy * 0.1
        } else {
          // Target anchor spring
          if (obj.targetX !== null && obj.targetY !== null) {
            const dx = obj.targetX - obj.x
            const dy = obj.targetY - obj.y
            obj.vx += dx * springStrength
            obj.vy += dy * springStrength
          }
          // Gravity
          obj.vy += gravity
        }

        // Apply velocities & friction
        obj.vx *= friction
        obj.vy *= friction
        obj.x += obj.vx
        obj.y += obj.vy

        // Viewport boundaries checks
        const r = obj.radius
        if (obj.x < r) {
          obj.x = r
          obj.vx *= -0.6 // bounce
        } else if (obj.x > width - r) {
          obj.x = width - r
          obj.vx *= -0.6
        }

        if (obj.y < r) {
          obj.y = r
          obj.vy *= -0.6
        } else if (obj.y > height - r) {
          obj.y = height - r
          obj.vy *= -0.6
        }

        // Render object background nodes on canvas
        ctx.fillStyle = 'var(--color-surface-elevated)'
        ctx.beginPath()
        ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = 'var(--color-accent)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Sync visual DOM position of HTML node if attached
        if (obj.element) {
          obj.element.style.transform = `translate3d(${obj.x - obj.radius}px, ${obj.y - obj.radius}px, 0)`
        }
      })
    }

    tick()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current.x = e.clientX - rect.left
    mouseRef.current.y = e.clientY - rect.top
  }

  const handleMouseDown = () => {
    mouseRef.current.down = true
    // Find closest object to select for drag
    const mouse = mouseRef.current
    let closestId = null
    let minDist = Infinity

    objectsRef.current.forEach((obj) => {
      const dx = mouse.x - obj.x
      const dy = mouse.y - obj.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < obj.radius + 20 && dist < minDist) {
        minDist = dist
        closestId = obj.id
      }
    })
    mouseRef.current.activeId = closestId
  }

  const handleMouseUp = () => {
    mouseRef.current.down = false
    mouseRef.current.activeId = null
  }

  return (
    <PhysicsContext.Provider value={{ registerObject, updateObject }}>
      <div
        ref={containerRef}
        className={`${styles.container} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.domContent}>{children}</div>
      </div>
    </PhysicsContext.Provider>
  )
}
