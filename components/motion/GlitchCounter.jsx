import { useEffect, useRef, useState } from 'react'
import styles from './GlitchCounter.module.css'

export function GlitchCounter({
  end,
  duration = 1500,
  prefix = '',
  suffix = '',
  className = '',
  ...props
}) {
  const [value, setValue] = useState(0)
  const [glitchText, setGlitchText] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    let frameId
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const currentVal = Math.floor(progress * end)

      setValue(currentVal)

      if (progress < 1) {
        // Generate a glitched suffix/middle representation if running
        const randomChars = '!@#$%^&*()_+{}|:"<>?[];\',./'
        const glitched = Array(3)
          .fill(0)
          .map(() => randomChars[Math.floor(Math.random() * randomChars.length)])
          .join('')
        setGlitchText(glitched)
        frameId = requestAnimationFrame(tick)
      } else {
        setValue(end)
        setGlitchText('')
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        frameId = requestAnimationFrame(tick)
        observer.disconnect()
      }
    })

    if (ref.current) observer.observe(ref.current)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
    }
  }, [end, duration])

  return (
    <span
      ref={ref}
      className={`${styles.counter} ${className}`}
      {...props}
    >
      {prefix}
      {value}
      {glitchText && <span className={styles.glitch}>{glitchText}</span>}
      {suffix}
    </span>
  )
}
