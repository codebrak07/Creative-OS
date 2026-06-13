import React from 'react'
import styles from './PromptSuggestions.module.css'

export function PromptSuggestions({ suggestions = [], onClick, className = '', ...props }) {
  if (suggestions.length === 0) return null

  return (
    <div className={`${styles.wrap} ${className}`} {...props}>
      {suggestions.map((suggestion, idx) => (
        <button
          key={idx}
          className={styles.suggestionBtn}
          onClick={() => onClick?.(suggestion)}
        >
          <span className={styles.pillText}>{suggestion}</span>
          <span className={styles.arrow}>↗</span>
        </button>
      ))}
    </div>
  )
}
