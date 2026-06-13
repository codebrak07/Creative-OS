import React from 'react'
import styles from './EchoText.module.css'

export function EchoText({
  children,
  tag: Tag = 'span',
  divergence = 8,
  hoverDistort = true,
  className = '',
  ...props
}) {
  const customStyles = {
    '--divergence-1': `${divergence}px`,
    '--divergence-2': `${divergence * 2}px`,
    '--skew-amount': hoverDistort ? '-6deg' : '0deg',
  }

  return (
    <Tag
      className={`${styles.echoTrigger} ${className}`}
      style={customStyles}
      {...props}
    >
      <span className={styles.frontText}>{children}</span>
      <span className={`${styles.echoElement} ${styles.echo1}`} aria-hidden="true">
        {children}
      </span>
      <span className={`${styles.echoElement} ${styles.echo2}`} aria-hidden="true">
        {children}
      </span>
    </Tag>
  )
}
