import { useRef, useCallback } from 'react'
import gsap from 'gsap'

export function Magnetic({
  children,
  strength = 0.3,
  ease = 'power3.out',
  ...props
}) {
  const ref = useRef(null)
  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window

  const onMouseMove = useCallback((e) => {
    if (isTouch || !ref.current) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    gsap.to(el, {
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
      duration: 0.5,
      ease: ease,
    })
  }, [strength, ease, isTouch])

  const onMouseLeave = useCallback(() => {
    if (isTouch || !ref.current) return
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.4)',
    })
  }, [isTouch])

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-block', willChange: 'transform' }}
      {...props}
    >
      {children}
    </div>
  )
}
