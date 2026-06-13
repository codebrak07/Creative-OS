import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './CaseStudyHero.module.css'

export function CaseStudyHero({
  client,
  year,
  services = [],
  headline,
  image,
  className = '',
  ...props
}) {
  const metaRef = useRef(null)
  const headRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 })

    // Stagger meta reveal
    if (metaRef.current) {
      tl.fromTo(metaRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' }
      )
    }

    // Headline letter/word slide
    if (headRef.current) {
      tl.fromTo(headRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' },
        '-=0.5'
      )
    }

    // Image wipe reveal
    if (imageRef.current) {
      tl.fromTo(imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut' },
        '-=0.8'
      )
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <header className={`${styles.header} ${className}`} {...props}>
      <div className={styles.topMeta} ref={metaRef}>
        <div className={styles.metaCol}>
          <span className="t-label">Client</span>
          <span className={styles.metaVal}>{client}</span>
        </div>
        <div className={styles.metaCol}>
          <span className="t-label">Year</span>
          <span className={styles.metaVal}>{year}</span>
        </div>
        <div className={styles.metaCol}>
          <span className="t-label">Services</span>
          <span className={styles.metaVal}>{services.join(', ')}</span>
        </div>
      </div>

      <h1 ref={headRef} className={`${styles.headline} t-hero`}>
        {headline}
      </h1>

      {image && (
        <div ref={imageRef} className={styles.imageContainer}>
          <img src={image.src || image} alt={image.alt || ''} className={styles.heroImg} width={1920} height={1080} />
        </div>
      )}
    </header>
  )
}
