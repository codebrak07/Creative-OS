import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './HeritageTimeline.module.css'

gsap.registerPlugin(ScrollTrigger)

export function HeritageTimeline({ events = [], className = '', ...props }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || events.length === 0) return

    const items = el.querySelectorAll(`.${styles.eventItem}`)
    items.forEach((item) => {
      const line = item.querySelector(`.${styles.lineNode}`)
      const content = item.querySelector(`.${styles.contentCol}`)
      const img = item.querySelector(`.${styles.imgWrap}`)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })

      if (line) {
        tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: 'power2.out' })
      }
      if (content) {
        tl.fromTo(content.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.4'
        )
      }
      if (img) {
        tl.fromTo(img,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.inOut' },
          '-=0.8'
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [events])

  if (events.length === 0) return null

  return (
    <section ref={containerRef} className={`${styles.timelineSection} ${className}`} {...props}>
      <h2 className={`${styles.secTitle} t-label`}>Our Heritage</h2>
      <div className={styles.list}>
        {events.map((event, idx) => (
          <div key={idx} className={styles.eventItem}>
            <div className={styles.timelineCol}>
              <span className={`${styles.year} t-mono`}>{event.year}</span>
              <div className={styles.lineNode} />
            </div>
            
            <div className={styles.contentCol}>
              <h3 className={styles.title}>{event.title}</h3>
              <p className={styles.desc}>{event.description}</p>
            </div>

            <div className={styles.imageCol}>
              {event.image && (
                <div className={styles.imgWrap}>
                  <img src={event.image} alt="" className={styles.img} width={800} height={600} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
