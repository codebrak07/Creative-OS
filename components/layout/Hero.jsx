import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './Hero.module.css'

export function Hero({
  label,          // e.g. "Creative Studio — Paris"
  headline,       // JSX or string — display size
  subCopy,        // 1–2 sentences max
  cta,            // { label, href }
  image,          // { src, alt }
  withNoise = false,
}) {
  const imageRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })

    // Image: clip-path reveal left→right
    tl.fromTo(imageRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power4.inOut' }
    )
    // Content: staggered fade up
    .fromTo(contentRef.current.children,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out' },
      '-=0.9'
    )
  }, [])

  return (
    <section className={styles.hero}>
      {withNoise && <div className={styles.noiseOverlay} aria-hidden="true" />}
      
      {/* Left column */}
      <div ref={contentRef} className={styles.content}>
        {label && (
          <span className={`${styles.label} t-label`}>{label}</span>
        )}
        <h1 className={`${styles.headline} t-2xl`}>{headline}</h1>
        {subCopy && (
          <p className={`${styles.sub} t-body-lg`}>{subCopy}</p>
        )}
        {cta && (
          <a href={cta.href} className={styles.cta}>
            {cta.label}
            <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        )}
      </div>

      {/* Right column */}
      <div ref={imageRef} className={styles.imageWrap}>
        <img
          src={image.src}
          alt={image.alt}
          className={styles.image}
          width={800}
          height={1000}
          loading="eager"
        />
      </div>
    </section>
  )
}
