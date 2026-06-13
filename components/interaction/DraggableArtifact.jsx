import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function DraggableArtifact({
  children,
  strength = 0.2,
  bounce = 0.45,
  style = {},
  ...props
}) {
  const ref = useRef(null)
  const dragRef = useRef({ x: 0, y: 0, vx: 0, vy: 0, active: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseDown = () => {
      dragRef.current.active = true
      document.body.style.userSelect = 'none'
    }

    const handleMouseMove = (e) => {
      if (!dragRef.current.active) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      
      const dx = e.clientX - cx
      const dy = e.clientY - cy

      dragRef.current.vx += dx * strength
      dragRef.current.vy += dy * strength

      gsap.to(el, {
        x: `+=${dragRef.current.vx}`,
        y: `+=${dragRef.current.vy}`,
        duration: 0.2,
        ease: 'power3.out',
      })
    }

    const handleMouseUp = () => {
      if (!dragRef.current.active) return
      dragRef.current.active = false
      document.body.style.userSelect = ''

      // Inertia slide release
      gsap.to(el, {
        x: `+=${dragRef.current.vx * 3}`,
        y: `+=${dragRef.current.vy * 3}`,
        duration: 0.9,
        ease: 'power3.out',
        onComplete: () => {
          // Spring dampening back to zero velocities
          dragRef.current.vx = 0
          dragRef.current.vy = 0
        }
      })
    }

    el.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      el.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [strength])

  return (
    <div
      ref={ref}
      style={{
        display: 'inline-block',
        cursor: 'grab',
        willChange: 'transform',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  )
}
