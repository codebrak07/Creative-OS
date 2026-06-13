import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './ProjectCredits.module.css'

gsap.registerPlugin(ScrollTrigger)

export function ProjectCredits({
  roles = [], // { title, name }
  collaborators = [], // { role, name, url }
  className = '',
  ...props
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const sections = el.querySelectorAll(`.${styles.column}`)
    const anim = gsap.fromTo(sections,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
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
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [roles, collaborators])

  return (
    <section ref={containerRef} className={`${styles.creditsWrap} ${className}`} {...props}>
      <div className={styles.grid}>
        {roles.length > 0 && (
          <div className={styles.column}>
            <h3 className={`${styles.title} t-label`}>Production Team</h3>
            <ul className={styles.list}>
              {roles.map((item, idx) => (
                <li key={idx} className={styles.item}>
                  <span className={styles.roleTitle}>{item.title}</span>
                  <span className={styles.name}>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {collaborators.length > 0 && (
          <div className={styles.column}>
            <h3 className={`${styles.title} t-label`}>Collaborators</h3>
            <ul className={styles.list}>
              {collaborators.map((item, idx) => (
                <li key={idx} className={styles.item}>
                  <span className={styles.roleTitle}>{item.role}</span>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {item.name}
                    </a>
                  ) : (
                    <span className={styles.name}>{item.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
