import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './ProductHero.module.css'

export function ProductHero({ brand, headline, descriptor, image }) {
  const ref = useRef(null)

  useEffect(() => {
    // Luxury animation: nothing bounces. Nothing is fast.
    // Elements appear as if they were always there.
    if (!ref.current) return
    const anim = gsap.fromTo(ref.current.children,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.8,
        stagger: 0.3,
        ease: 'power2.out',
        delay: 0.4,
      }
    )
    return () => {
      anim.kill()
    }
  }, [])

  return (
    <section ref={ref} className={styles.hero}>
      {/* Brand mark — small, top left, restrained */}
      <span className={styles.brand}>{brand}</span>

      {/* Portrait image — right side, 45vw, static */}
      <div className={styles.imageWrap}>
        <img
          src={image.src}
          alt={image.alt}
          className={styles.image}
          width={900}
          height={1200}
          loading="eager"
        />
      </div>

      {/* Text block — left side, bottom-anchored */}
      <div className={styles.text}>
        {/* Max 6 words. No verb. Noun + adjective only. */}
        <h1 className={styles.headline}>{headline}</h1>
        {/* Max 2 lines. Active voice. No features. */}
        <p className={styles.descriptor}>{descriptor}</p>
        {/* No CTA here. User must scroll to discover. */}
      </div>
    </section>
  )
}
