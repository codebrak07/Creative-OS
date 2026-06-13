import { useEffect, useRef, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { label: 'Work',     href: '/work' },
  { label: 'About',   href: '/about' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
]

export function Nav({ links = NAV_LINKS }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const overlayRef = useRef(null)
  const linksRef = useRef([])
  const tlRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const openNav = useCallback(() => {
    setOpen(true)
    window.__cos?.sound?.play('transition')
    document.body.style.overflow = 'hidden'
    
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tl = gsap.timeline()
    tlRef.current = tl
    
    if (prefersReducedMotion) {
      tl.set(overlayRef.current, { display: 'flex' })
        .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
        .fromTo(linksRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 }, '-=0.1')
      return
    }

    tl.set(overlayRef.current, { display: 'flex' })
      .fromTo(overlayRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.65, ease: 'power4.inOut' }
      )
      .fromTo(linksRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power4.out' },
        '-=0.3'
      )
  }, [])

  const closeNav = useCallback(() => {
    window.__cos?.sound?.play('transition')
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tl = gsap.timeline({
      onComplete: () => {
        setOpen(false)
        document.body.style.overflow = ''
        gsap.set(overlayRef.current, { display: 'none' })
      },
    })
    
    if (prefersReducedMotion) {
      tl.to(overlayRef.current, { opacity: 0, duration: 0.2 })
      return
    }

    tl.to(linksRef.current, {
      yPercent: -60, opacity: 0, duration: 0.4, stagger: 0.03, ease: 'power3.in',
    }).to(overlayRef.current, {
      clipPath: 'inset(0 0 100% 0)', duration: 0.55, ease: 'power4.inOut',
    }, '-=0.2')
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) closeNav() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeNav])

  return (
    <>
      {/* Hamburger trigger */}
      <button
        className={styles.trigger}
        onClick={open ? closeNav : openNav}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
      >
        <span className={`${styles.bar} ${open ? styles.barOpen : ''}`} />
        <span className={`${styles.bar} ${open ? styles.barOpen : ''}`} />
      </button>

      {/* Overlay portal */}
      {mounted && createPortal(
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className={styles.overlay}
          style={{ display: 'none' }} // cos-ignore
        >
          <a href="#main" className={styles.skipLink}>Skip to content</a>
          <nav className={styles.navInner}>
            <ol className={styles.linkList}>
              {links.map((link, i) => (
                <li key={link.href} className={styles.linkItem}>
                  <a
                    ref={el => linksRef.current[i] = el}
                    href={link.href}
                    className={styles.link}
                    onClick={closeNav}
                  >
                    <span className={styles.linkIndex}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.linkLabel}>{link.label}</span>
                  </a>
                </li>
              ))}
            </ol>
            <footer className={styles.navFooter}>
              <a href="mailto:hello@studio.com" className={styles.footerLink}>
                hello@studio.com
              </a>
              <span className={styles.footerMeta}>
                Based in Paris, FR
              </span>
            </footer>
          </nav>
        </div>,
        document.body
      )}
    </>
  )
}
