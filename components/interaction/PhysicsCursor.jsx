import { useEffect, useRef } from 'react'
import styles from './PhysicsCursor.module.css'

export function PhysicsCursor({ className = '', ...props }) {
  const canvasRef = useRef(null)
  const coordsRef = useRef({ x: 0, y: 0, px: 0, py: 0, vx: 0, vy: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Track actual mouse coords
    const handleMouseMove = (e) => {
      coordsRef.current.x = e.clientX
      coordsRef.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Spring physics constants
    const stiffness = 0.08
    const damping = 0.82

    const tick = () => {
      animationId = requestAnimationFrame(tick)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const coords = coordsRef.current
      // Calculate spring offset
      const dx = coords.x - coords.px
      const dy = coords.y - coords.py
      coords.vx += dx * stiffness
      coords.vy += dy * stiffness
      coords.vx *= damping
      coords.vy *= damping
      coords.px += coords.vx
      coords.py += coords.vy

      // Render custom physics cursor trail (vector circles)
      ctx.fillStyle = 'var(--color-accent)'
      ctx.beginPath()
      ctx.arc(coords.px, coords.py, 8, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'var(--color-accent)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(coords.x, coords.y, 4, 0, Math.PI * 2)
      ctx.stroke()

      // Render spring vector line connecting target cursor to lag cursor
      ctx.strokeStyle = 'var(--color-border-strong)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(coords.x, coords.y)
      ctx.lineTo(coords.px, coords.py)
      ctx.stroke()
    }

    tick()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.cursorCanvas} ${className}`}
      aria-hidden="true"
      {...props}
    />
  )
}
