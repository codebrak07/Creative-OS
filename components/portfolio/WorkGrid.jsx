import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './WorkGrid.module.css'

gsap.registerPlugin(ScrollTrigger)

const LAYOUT_SEQUENCE = [
  // [cols, aspectRatio]
  ['8-4',  ['3/4',  '4/5']],   // Large left + portrait right
  ['full', ['16/9']],            // Full width landscape
  ['6-6',  ['4/5',  '4/5']],   // Two equal portraits
]

export function WorkGrid({ projects }) {
  return (
    <section className={styles.grid}>
      {projects.map((project, i) => {
        return (
          <WorkGridItem
            key={project.slug}
            project={project}
            index={i}
          />
        )
      })}
    </section>
  )
}

function WorkGridItem({ project, index }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const anim = gsap.fromTo(ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  return (
    <article ref={ref} className={`${styles.item} ${styles[`item-${(index % 3)}`]}`}>
      <a href={`/work/${project.slug}`} className={styles.itemLink}>
        <div className={styles.imageWrap}>
          <img
            src={project.thumbnail}
            alt={project.name}
            className={styles.image}
            loading={index < 2 ? 'eager' : 'lazy'}
            width={800} height={600}
          />
          <div className={styles.overlay}>
            <span className={styles.viewLabel}>View Project →</span>
          </div>
        </div>
        <footer className={styles.meta}>
          <h2 className={styles.metaTitle}>{project.name}</h2>
          <span className={styles.metaYear}>{project.year}</span>
        </footer>
      </a>
    </article>
  )
}
