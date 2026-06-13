import { useRef, useState } from 'react'
import styles from './WorkList.module.css'

export function WorkList({ projects, imagePreview = false }) {
  const [hovered, setHovered] = useState(null)
  const previewRef = useRef(null)
  const containerRef = useRef(null)

  const onMouseMove = (e) => {
    if (!imagePreview || !previewRef.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    previewRef.current.style.transform =
      `translate(${e.clientX - rect.left + 24}px, ${e.clientY - rect.top - 80}px)`
  }

  return (
    <section
      ref={containerRef}
      className={styles.section}
      onMouseMove={onMouseMove}
    >
      <ol className={styles.list}>
        {projects.map((project, i) => (
          <li key={project.slug} className={styles.item}>
            <a
              href={project.url || `/work/${project.slug}`}
              className={styles.link}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Index */}
              <span className={styles.index}>
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title */}
              <span className={styles.title}>{project.name}</span>

              {/* Collaborators */}
              <span className={styles.collab}>
                {project.collaborators?.join(' + ')}
              </span>

              {/* Year */}
              <span className={styles.year}>{project.year}</span>

              {/* Awards */}
              {project.awards?.length > 0 && (
                <span className={styles.awards}>
                  {project.awards.map(award => (
                    <img
                      key={award.name}
                      src={award.logo || `/awards/${award.slug}.svg`}
                      alt={award.name}
                      className={styles.badge}
                      width={20}
                      height={20}
                    />
                  ))}
                </span>
              )}
            </a>
          </li>
        ))}
      </ol>

      {/* Hover image preview */}
      {imagePreview && hovered !== null && (
        <div ref={previewRef} className={styles.preview} aria-hidden="true">
          <img
            src={projects[hovered]?.thumbnail}
            alt=""
            className={styles.previewImg}
            width={320}
            height={200}
          />
        </div>
      )}
    </section>
  )
}
