import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './ArtifactPanel.module.css'

export function ArtifactPanel({
  artifact, // { type: 'code' | 'document' | 'table' | 'visual', title, content, language }
  open = false,
  onClose,
  className = '',
  ...props
}) {
  const panelRef = useRef(null)

  useEffect(() => {
    const el = panelRef.current
    if (!el) return

    if (open) {
      gsap.to(el, {
        xPercent: 0,
        duration: 0.65,
        ease: 'power4.out',
      })
    } else {
      gsap.to(el, {
        xPercent: 100,
        duration: 0.5,
        ease: 'power3.in',
      })
    }
  }, [open])

  return (
    <aside
      ref={panelRef}
      className={`${styles.panel} ${className}`}
      style={{ transform: 'translateX(100%)' }}
      aria-hidden={!open}
      {...props}
    >
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={`${styles.typeBadge} t-mono`}>[{artifact?.type || 'File'}]</span>
          <h2 className={styles.title}>{artifact?.title || 'Artifact View'}</h2>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close panel">
          ✕
        </button>
      </div>

      <div className={styles.contentWrap}>
        {artifact?.type === 'code' && (
          <pre className={styles.codePre}>
            <code className={styles.code}>
              {artifact?.content}
            </code>
          </pre>
        )}

        {artifact?.type === 'table' && (
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <tbody>
                {Array.isArray(artifact?.content) ? (
                  artifact.content.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={rIdx === 0 ? styles.tableHeader : styles.tableCell}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{artifact?.content}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {artifact?.type === 'document' && (
          <div className={styles.document}>
            {artifact?.content}
          </div>
        )}

        {artifact?.type === 'visual' && (
          <div className={styles.visual}>
            {typeof artifact?.content === 'string' ? (
              <img src={artifact.content} alt={artifact.title || ''} className={styles.visualImg} width={800} height={600} />
            ) : (
              artifact?.content
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
