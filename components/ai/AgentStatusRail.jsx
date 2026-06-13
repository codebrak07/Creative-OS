import React from 'react'
import styles from './AgentStatusRail.module.css'

export function AgentStatusRail({
  steps = [],
  className = '',
  ...props
}) {
  if (steps.length === 0) return null

  return (
    <div className={`${styles.rail} ${className}`} {...props}>
      <div className={styles.railHeader}>
        <span className={styles.statusDotActive} />
        <span className={`${styles.railTitle} t-label`}>Agent Execution Rail</span>
      </div>

      <div className={styles.stepsWrap}>
        {steps.map((step, idx) => (
          <div
            key={step.id || idx}
            className={`${styles.stepNode} ${styles[step.status || 'pending']}`}
          >
            <div className={styles.markerArea}>
              <div className={styles.dot} />
              {idx < steps.length - 1 && <div className={styles.line} />}
            </div>
            
            <div className={styles.info}>
              <span className={styles.label}>{step.label}</span>
              {step.duration && (
                <span className={`${styles.duration} t-mono`}>{step.duration}ms</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
