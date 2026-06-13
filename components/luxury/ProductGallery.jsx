import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './ProductGallery.module.css'

gsap.registerPlugin(ScrollTrigger)

export function ProductGallery({ images = [], className = '', ...props }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track || images.length === 0) return

    // Calculate total horizontal scroll width
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth
      const containerWidth = container.clientWidth
      return -(trackWidth - containerWidth)
    }

    const scrollAnim = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${track.scrollWidth - container.clientWidth}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      }
    })

    return () => {
      scrollAnim.scrollTrigger?.kill()
      scrollAnim.kill()
    }
  }, [images])

  if (images.length === 0) return null

  return (
    <section ref={containerRef} className={`${styles.gallerySection} ${className}`} {...props}>
      <div className={styles.stickyWrap}>
        <div ref={trackRef} className={styles.track}>
          <div className={styles.introCol}>
            <span className="t-label">Collection</span>
            <h2 className={styles.introTitle}>Bespoke Details</h2>
            <p className={styles.introDesc}>
              A visual sequence detailing geometry, textures, and form.
            </p>
          </div>
          {images.map((img, idx) => (
            <div key={idx} className={styles.imageCol}>
              <div className={styles.imgWrap}>
                <img src={img.src} alt={img.alt || ''} className={styles.img} width={800} height={600} />
              </div>
              {img.label && (
                <span className={`${styles.imgLabel} t-mono`}>{img.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
