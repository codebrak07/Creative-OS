import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './WordReveal.module.css'

gsap.registerPlugin(ScrollTrigger)

const STAGGER_PRESETS = {
  fast: 0.02,
  default: 0.04,
  slow: 0.08,
  cinematic: 0.12,
}

export function WordReveal({
  children,
  tag: Tag = 'span',
  delay = 0,
  stagger = 'default', // 'fast' | 'default' | 'slow' | 'cinematic' | number
  trigger = 'viewport', // 'viewport' | 'immediate'
  split = 'word',       // 'word' | 'line' | 'char'
  className = '',
  ...props
}) {
  const containerRef = useRef(null)
  const [lines, setLines] = useState([])
  const [isClient, setIsClient] = useState(false)

  const staggerVal = typeof stagger === 'number' ? stagger : (STAGGER_PRESETS[stagger] || 0.04)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !containerRef.current || split !== 'line') return

    const container = containerRef.current
    const words = Array.from(container.querySelectorAll(`.${styles.word}`))
    if (words.length === 0) return

    const calculateLines = () => {
      const lineMap = {}
      words.forEach((word) => {
        // Reset transform to measure accurately
        word.style.transform = 'none'
        const top = word.offsetTop
        if (!lineMap[top]) {
          lineMap[top] = []
        }
        lineMap[top].push(word.textContent)
      })

      // Sort lines by vertical position
      const sortedTops = Object.keys(lineMap).sort((a, b) => Number(a) - Number(b))
      const groupedLines = sortedTops.map((top) => lineMap[top].join(' '))
      setLines(groupedLines)
    }

    calculateLines()
    window.addEventListener('resize', calculateLines)
    return () => window.removeEventListener('resize', calculateLines)
  }, [children, split, isClient])

  useEffect(() => {
    if (!isClient || !containerRef.current) return
    const el = containerRef.current

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(el.querySelectorAll(`.${styles.revealInner}`), { yPercent: 0 })
      return
    }

    const targets = el.querySelectorAll(`.${styles.revealInner}`)
    if (targets.length === 0) return

    const animConfig = {
      yPercent: 0,
      duration: 1.2,
      stagger: staggerVal,
      delay: delay,
      ease: 'power4.out',
    }

    if (trigger === 'viewport') {
      const scrollAnim = gsap.fromTo(targets,
        { yPercent: 100 },
        {
          ...animConfig,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      )
      return () => {
        scrollAnim.scrollTrigger?.kill()
        scrollAnim.kill()
      }
    } else {
      const immediateAnim = gsap.fromTo(targets,
        { yPercent: 100 },
        animConfig
      )
      return () => {
        immediateAnim.kill()
      }
    }
  }, [lines, split, trigger, delay, staggerVal, isClient])

  if (typeof children !== 'string') {
    return <Tag className={className} {...props}>{children}</Tag>
  }

  // Character split rendering
  if (split === 'char') {
    return (
      <Tag ref={containerRef} className={`${styles.container} ${className}`} {...props}>
        {children.split(' ').map((word, wordIdx, wordsArray) => (
          <span key={wordIdx} className={styles.wordCharOuter}>
            {word.split('').map((char, charIdx) => (
              <span key={charIdx} className={styles.charOuter}>
                <span className={`${styles.revealInner} ${styles.charInner}`}>
                  {char}
                </span>
              </span>
            ))}
            {wordIdx < wordsArray.length - 1 && <span className={styles.space}>&nbsp;</span>}
          </span>
        ))}
      </Tag>
    )
  }

  // Line split rendering (Client-side calculated)
  if (split === 'line' && lines.length > 0) {
    return (
      <Tag ref={containerRef} className={`${styles.container} ${className}`} {...props}>
        {lines.map((lineText, lineIdx) => (
          <span key={lineIdx} className={styles.lineOuter}>
            <span className={`${styles.revealInner} ${styles.lineInner}`}>
              {lineText}
            </span>
          </span>
        ))}
      </Tag>
    )
  }

  // Fallback / Initial Word split rendering
  return (
    <Tag ref={containerRef} className={`${styles.container} ${className}`} {...props}>
      {children.split(' ').map((word, idx, wordsArray) => (
        <span key={idx} className={`${styles.wordOuter} ${styles.word}`}>
          <span className={`${styles.revealInner} ${styles.wordInner}`}>
            {word}
          </span>
          {idx < wordsArray.length - 1 && <span className={styles.space}>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
