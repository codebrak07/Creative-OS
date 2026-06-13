import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import styles from './Button.module.css'

export function Button({
  children,
  variant = 'primary',  // 'primary' | 'ghost' | 'text'
  size = 'md',          // 'sm' | 'md' | 'lg'
  loading = false,
  disabled = false,
  magnetic = true,
  onClick,
  href,
  className = '',
  ...props
}) {
  const ref = useRef(null)
  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window

  const onMouseMove = useCallback((e) => {
    if (!magnetic || isTouch) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    gsap.to(el, {
      x: (e.clientX - cx) * 0.28,
      y: (e.clientY - cy) * 0.22,
      duration: 0.5,
      ease: 'power3.out',
    })
  }, [magnetic, isTouch])

  const onMouseLeave = useCallback(() => {
    if (!magnetic || isTouch) return
    if (!ref.current) return
    gsap.to(ref.current, {
      x: 0, y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.4)',
    })
  }, [magnetic, isTouch])

  const handleClick = useCallback((e) => {
    window.__cos?.sound?.play('click')
    onClick?.(e)
  }, [onClick])

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={ref}
      href={href}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        <span className={styles.label}>{children}</span>
      )}
    </Tag>
  )
}
