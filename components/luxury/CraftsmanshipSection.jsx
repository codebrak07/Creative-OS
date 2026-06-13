import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './CraftsmanshipSection.module.css'

gsap.registerPlugin(ScrollTrigger)

export function CraftsmanshipSection({
  title,
  steps = [],
  className = '',
  ...props
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || steps.length === 0) return

    const items = el.querySelectorAll(`.${styles.stepItem}`)
    items.forEach((item) => {
      const img = item.querySelector(`.${styles.imgWrap}`)
      const text = item.querySelector(`.${styles.textCol}`)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      })

      if (img) {
        tl.fromTo(img,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power4.inOut' }
        )
      }

      if (text) {
        tl.fromTo(text.children,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
          '-=0.8'
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [steps])

  return (
    <section ref={containerRef} className={`${styles.section} ${className}`} {...props}>
      {title && <h2 className={`${styles.secTitle} t-label`}>{title}</h2>}
      
      <div className={styles.list}>
        {steps.map((step, idx) => (
          <div key={idx} className={styles.stepItem}>
            <div className={styles.visualCol}>
              {step.image && (
                <div className={styles.imgWrap}>
                  <img src={step.image} alt="" className={styles.img} width={800} height={600} />
                </div>
              )}
            </div>

            <div className={styles.textCol}>
              <span className={`${styles.stepNum} t-mono`}>
                Step {String(step.step || idx + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
