import React from 'react'
import styles from './Marquee.module.css'

export function Marquee({
  children,
  speed = 0.4, // speed coefficient
  direction = 'left', // 'left' | 'right'
  pauseOnHover = true,
  className = '',
  ...props
}) {
  const duration = speed > 0 ? 30 / speed : 30
  
  const customStyles = {
    '--duration': `${duration}s`,
    '--direction': direction === 'right' ? 'reverse' : 'normal',
    '--pause-on-hover': pauseOnHover ? 'paused' : 'running',
  }

  return (
    <div
      className={`${styles.marqueeWrap} ${className}`}
      style={customStyles}
      {...props}
    >
      <div className={styles.track}>
        <div className={styles.content}>{children}</div>
        <div className={styles.content} aria-hidden="true">{children}</div>
        <div className={styles.content} aria-hidden="true">{children}</div>
        <div className={styles.content} aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
