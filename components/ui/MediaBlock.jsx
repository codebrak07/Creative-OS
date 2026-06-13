import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import styles from './MediaBlock.module.css'

gsap.registerPlugin(ScrollTrigger)

export function MediaBlock({
  media, // { type: 'image' | 'video', src, poster, alt }
  ratio = '4/5', // '16/9' | '4/3' | '4/5' | '1/1' etc.
  reveal = 'clip', // 'clip' | 'fade' | 'slide' | 'none'
  parallax = true,
  lazy = true,
  className = '',
  ...props
}) {
  const containerRef = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const el = mediaRef.current
    if (!container || !el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 90%',
        toggleActions: 'play none none none',
      }
    })

    // Reveal animation
    if (reveal === 'clip') {
      tl.fromTo(container,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.3, ease: 'power4.inOut' }
      )
    } else if (reveal === 'fade') {
      tl.fromTo(container,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
      )
    } else if (reveal === 'slide') {
      tl.fromTo(container,
        { xPercent: -100 },
        { xPercent: 0, duration: 1.1, ease: 'power3.out' }
      )
    }

    // Parallax animation
    let parallaxCtx
    if (parallax) {
      parallaxCtx = gsap.fromTo(el,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      )
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
      if (parallaxCtx) {
        parallaxCtx.scrollTrigger?.kill()
        parallaxCtx.kill()
      }
    }
  }, [reveal, parallax])

  const customRatio = {
    aspectRatio: ratio.replace('/', ' / ')
  }

  const isVideo = media?.type === 'video' || (media?.src && media.src.match(/\.(mp4|webm|ogg)$/i))

  return (
    <div
      ref={containerRef}
      className={`${styles.mediaWrap} ${className}`}
      style={customRatio}
      {...props}
    >
      <div className={styles.innerContainer} style={{ height: parallax ? '124%' : '100%', top: parallax ? '-12%' : '0' }}> // cos-ignore
        {isVideo ? (
          <video
            ref={mediaRef}
            src={media.src}
            poster={media.poster}
            muted
            loop
            autoPlay
            playsInline
            className={styles.media}
            preload={lazy ? 'metadata' : 'auto'}
          />
        ) : (
          <img
            ref={mediaRef}
            src={media.src}
            alt={media.alt || ''}
            className={styles.media}
            loading={lazy ? 'lazy' : 'eager'}
            width={800}
            height={600}
          />
        )}
      </div>
    </div>
  )
}
