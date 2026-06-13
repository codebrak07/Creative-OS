import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './NextProject.module.css'

gsap.registerPlugin(ScrollTrigger)

export function NextProject({
  project, // { slug, name, thumbnail, category }
  className = '',
  ...props
}) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const anim = gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
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
  }, [project])

  if (!project) return null

  return (
    <section ref={containerRef} className={`${styles.section} ${className}`} {...props}>
      <a href={`/work/${project.slug}`} className={styles.link}>
        <div className={styles.bgWrap}>
          {project.thumbnail && (
            <img
              ref={imageRef}
              src={project.thumbnail}
              alt=""
              className={styles.bgImage}
              width={1920}
              height={1080}
            />
          )}
          <div className={styles.overlay} />
        </div>
        <div className={styles.content}>
          <span className={`${styles.label} t-label`}>Next Project — {project.category}</span>
          <h2 className={`${styles.title} t-hero`}>{project.name}</h2>
          <span className={styles.arrow}>→</span>
        </div>
      </a>
    </section>
  )
}
