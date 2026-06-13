import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './SectionTransition.module.css'

export function SectionTransition({
  type = 'wipe', // 'wipe' | 'curtain' | 'mask' | 'noise' | 'slide' | 'clip'
  direction = 'up', // 'up' | 'down' | 'left' | 'right'
  active = false,
  duration = 0.85,
  onComplete,
  className = '',
  ...props
}) {
  const overlayRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!active || !overlayRef.current) return

    setIsAnimating(true)
    const el = overlayRef.current
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
        onComplete?.()
      }
    })

    // Prepare styles based on wipe type & direction
    if (type === 'curtain') {
      const startProp = direction === 'up' || direction === 'down' ? 'scaleY' : 'scaleX'
      const origin = direction === 'up' ? 'bottom' : direction === 'down' ? 'top' : direction === 'left' ? 'right' : 'left'
      
      tl.set(el, { display: 'block', [startProp]: 0, transformOrigin: origin })
        .to(el, { [startProp]: 1, duration: duration * 0.5, ease: 'power4.inOut' })
        .set(el, { transformOrigin: origin === 'bottom' ? 'top' : origin === 'top' ? 'bottom' : origin === 'right' ? 'left' : 'right' })
        .to(el, { [startProp]: 0, duration: duration * 0.5, ease: 'power4.inOut', delay: 0.1 })
        .set(el, { display: 'none' })
    }
    else if (type === 'clip' || type === 'wipe') {
      const clipStart = 
        direction === 'up' ? 'inset(100% 0 0 0)' :
        direction === 'down' ? 'inset(0 0 100% 0)' :
        direction === 'left' ? 'inset(0 0 0 100%)' :
        'inset(0 100% 0 0)'

      const clipEnd = 'inset(0% 0% 0% 0%)'
      
      const clipOut = 
        direction === 'up' ? 'inset(0 0 100% 0)' :
        direction === 'down' ? 'inset(100% 0 0 0)' :
        direction === 'left' ? 'inset(0 100% 0 0)' :
        'inset(0 0 0 100%)'

      tl.set(el, { display: 'block', clipPath: clipStart })
        .to(el, { clipPath: clipEnd, duration: duration * 0.5, ease: 'power4.inOut' })
        .to(el, { clipPath: clipOut, duration: duration * 0.5, ease: 'power4.inOut', delay: 0.1 })
        .set(el, { display: 'none' })
    }
    else if (type === 'mask') {
      // Circle radial mask sweep
      tl.set(el, { display: 'block', clipPath: 'circle(0% at 50% 50%)' })
        .to(el, { clipPath: 'circle(150% at 50% 50%)', duration: duration, ease: 'power3.inOut' })
        .to(el, { opacity: 0, duration: 0.3 })
        .set(el, { display: 'none', opacity: 1 })
    }
    else if (type === 'noise') {
      // Noise dissolve opacity sweep
      tl.set(el, { display: 'block', opacity: 0 })
        .to(el, { opacity: 1, duration: duration * 0.4, ease: 'power2.out' })
        .to(el, { opacity: 0, duration: duration * 0.6, ease: 'power2.in', delay: 0.15 })
        .set(el, { display: 'none' })
    }
    else {
      // slide mode
      const axis = direction === 'up' || direction === 'down' ? 'yPercent' : 'xPercent'
      const startSign = direction === 'up' || direction === 'left' ? 100 : -100
      
      tl.set(el, { display: 'block', [axis]: startSign })
        .to(el, { [axis]: 0, duration: duration * 0.5, ease: 'power3.inOut' })
        .to(el, { [axis]: -startSign, duration: duration * 0.5, ease: 'power3.inOut', delay: 0.1 })
        .set(el, { display: 'none' })
    }

    return () => {
      tl.kill()
    }
  }, [active, type, direction, duration, onComplete])

  return (
    <div
      ref={overlayRef}
      className={`${styles.transitionOverlay} ${styles[type]} ${className}`}
      style={{ display: 'none' }} // cos-ignore
      aria-hidden="true"
      {...props}
    />
  )
}
