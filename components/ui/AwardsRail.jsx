import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './AwardsRail.module.css'

gsap.registerPlugin(ScrollTrigger)

export function AwardsRail({ awards = [], className = '', ...props }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || awards.length === 0) return

    const items = el.querySelectorAll(`.${styles.awardItem}`)
    const tl = gsap.fromTo(items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [awards])

  if (awards.length === 0) return null

  return (
    <section ref={containerRef} className={`${styles.rail} ${className}`} {...props}>
      <h3 className={`${styles.railTitle} t-label`}>Honors & Awards</h3>
      <div className={styles.list}>
        {awards.map((award, index) => (
          <div key={index} className={styles.awardItem}>
            <span className={styles.year}>{award.date || award.year}</span>
            <div className={styles.mainInfo}>
              <span className={styles.name}>{award.name}</span>
              <span className={styles.category}>{award.category}</span>
            </div>
            {award.logo && (
              <img src={award.logo} alt="" className={styles.logo} width={120} height={40} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
