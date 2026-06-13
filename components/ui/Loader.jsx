import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './Loader.module.css'

export function Loader({ onComplete, awards = [], minDuration = 2000 }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const overlayRef = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const start = performance.now()
    let raf

    const tick = (now) => {
      const elapsed = now - start
      const naturalProgress = Math.min(elapsed / minDuration, 1)
      // Ease progress: fast start, slow finish (like real loading)
      const eased = 1 - Math.pow(1 - naturalProgress, 2.5)
      setProgress(Math.floor(eased * 100))

      if (naturalProgress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        // Exit animation
        const tl = gsap.timeline({
          onComplete: () => {
            setDone(true)
            onComplete?.()
          }
        })
        tl.to(overlayRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.9,
          ease: 'power4.inOut',
          delay: 0.3,
        })
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [minDuration, onComplete])

  if (done) return null

  return (
    <div ref={overlayRef} className={styles.loader}>
      {/* Awards row — Lempens signature */}
      {awards.length > 0 && (
        <div className={styles.awards}>
          {awards.map((award) => (
            <img
              key={award.name}
              src={award.logo}
              alt={award.name}
              className={styles.awardBadge}
              width={100}
              height={30}
            />
          ))}
        </div>
      )}

      {/* Progress counter — always large, always monospaced */}
      <div ref={counterRef} className={styles.counter}>
        {String(progress).padStart(3, '0')}
      </div>

      {/* Experience hint */}
      <p className={styles.hint}>
        For the best experience —<br />
        <span>Turn your sound on</span>
      </p>

      {/* Bottom credit line */}
      <span className={styles.credit}>
        © {new Date().getFullYear()} — Studio
      </span>
    </div>
  )
}
