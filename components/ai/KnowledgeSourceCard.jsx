import { useState } from 'react'
import styles from './KnowledgeSourceCard.module.css'

export function KnowledgeSourceCard({
  sources = [],
  className = '',
  ...props
}) {
  const [expanded, setExpanded] = useState(false)

  if (sources.length === 0) return null

  return (
    <div className={`${styles.card} ${className}`} {...props}>
      <button
        className={styles.headerBtn}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className={styles.headerTitle}>
          <span className={styles.icon}>🗂</span>
          <span className={styles.titleText}>Reference Sources ({sources.length})</span>
        </div>
        <span className={styles.toggleArrow}>{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <ol className={styles.sourceList}>
          {sources.map((src, idx) => (
            <li key={idx} className={styles.sourceItem}>
              <div className={styles.sourceHeader}>
                {src.url ? (
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                    {src.title || 'Citation'}
                  </a>
                ) : (
                  <span className={styles.sourceTitle}>{src.title || 'Citation'}</span>
                )}
                {src.relevance && (
                  <span className={`${styles.relevance} t-mono`}>
                    Confidence: {src.relevance}%
                  </span>
                )}
              </div>
              {src.snippet && (
                <p className={styles.snippet}>"{src.snippet}"</p>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
