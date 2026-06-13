import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './PageTransition.module.css'

export function PageTransition({
  trigger, // changing this triggers the transition
  mode = 'cinematic', // 'cinematic' | 'fade' | 'wipe'
  duration = 0.9,
  onStart,
  onComplete,
}) {
  const overlayRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip on mount, only transition on actual route/trigger modifications
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const el = overlayRef.current
    if (!el) return

    onStart?.()
    document.body.style.overflow = 'hidden'
    document.body.style.pointerEvents = 'none'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        document.body.style.pointerEvents = ''
        onComplete?.()
      }
    })

    if (mode === 'cinematic') {
      // Scale slide wipe with double-panel visual feel
      tl.set(el, { transformOrigin: 'bottom', scaleY: 0, opacity: 1 })
        .to(el, { scaleY: 1, duration: duration * 0.5, ease: 'power4.inOut' })
        .call(() => {
          // Scroll restoration checkpoint
          window.scrollTo(0, 0)
        })
        .set(el, { transformOrigin: 'top' })
        .to(el, { scaleY: 0, duration: duration * 0.5, ease: 'power4.inOut', delay: 0.1 })
    }
    else if (mode === 'wipe') {
      // Direct Y sweep
      tl.set(el, { yPercent: 100 })
        .to(el, { yPercent: 0, duration: duration * 0.45, ease: 'power3.inOut' })
        .call(() => {
          window.scrollTo(0, 0)
        })
        .to(el, { yPercent: -100, duration: duration * 0.45, ease: 'power3.inOut', delay: 0.1 })
    }
    else {
      // Simple overlay crossfade
      tl.set(el, { opacity: 0, scaleY: 1 })
        .to(el, { opacity: 1, duration: duration * 0.4, ease: 'power2.out' })
        .call(() => {
          window.scrollTo(0, 0)
        })
        .to(el, { opacity: 0, duration: duration * 0.6, ease: 'power2.in', delay: 0.1 })
    }

    return () => {
      tl.kill()
    }
  }, [trigger, mode, duration])

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      aria-hidden="true"
      style={{ transform: 'scaleY(0)' }}
    />
  )
}
