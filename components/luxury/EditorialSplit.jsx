import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './EditorialSplit.module.css'

gsap.registerPlugin(ScrollTrigger)

export function EditorialSplit({
  image, // { src, alt }
  title,
  description,
  imageLeft = true,
  className = '',
  ...props
}) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })

    if (imageRef.current) {
      tl.fromTo(imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut' }
      )
    }

    if (textRef.current) {
      tl.fromTo(textRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: 'power3.out' },
        '-=0.8'
      )
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className={`${styles.section} ${imageLeft ? styles.layoutLeft : styles.layoutRight} ${className}`}
      {...props}
    >
      <div ref={imageRef} className={styles.imageCol}>
        {image && (
          <div className={styles.imgWrap}>
            <img src={image.src} alt={image.alt || ''} className={styles.img} width={800} height={600} />
          </div>
        )}
      </div>
      <div ref={textRef} className={styles.textCol}>
        <h2 className={`${styles.title} t-xl`}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  )
}
