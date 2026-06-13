import { useEffect, useRef, useState } from 'react'
import styles from './NoiseBackground.module.css'

export function NoiseBackground({
  opacity = 0.04,
  type = 'canvas', // 'canvas' | 'css'
  className = '',
  ...props
}) {
  const canvasRef = useRef(null)
  const [useFallback, setUseFallback] = useState(type === 'css')

  useEffect(() => {
    if (useFallback || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      setUseFallback(true)
      return
    }

    let animationId
    let resizeTimeout

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Dynamic noise pixel loop
    const noiseWidth = 200
    const noiseHeight = 200
    const noiseCanvas = document.createElement('canvas')
    noiseCanvas.width = noiseWidth
    noiseCanvas.height = noiseHeight
    const noiseCtx = noiseCanvas.getContext('2d')
    const noiseData = noiseCtx.createImageData(noiseWidth, noiseHeight)

    const renderNoisePattern = () => {
      const len = noiseData.data.length
      for (let i = 0; i < len; i += 4) {
        const val = Math.floor(Math.random() * 255)
        noiseData.data[i] = val
        noiseData.data[i + 1] = val
        noiseData.data[i + 2] = val
        noiseData.data[i + 3] = 255
      }
      noiseCtx.putImageData(noiseData, 0, 0)
    }

    let lastTime = 0
    const fpsInterval = 1000 / 24 // throttle to 24fps to preserve GPU/battery

    const loop = (time) => {
      animationId = requestAnimationFrame(loop)

      const elapsed = time - lastTime
      if (elapsed < fpsInterval) return
      lastTime = time

      renderNoisePattern()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Tile noise across screen
      const pattern = ctx.createPattern(noiseCanvas, 'repeat')
      if (pattern) {
        ctx.fillStyle = pattern
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    animationId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [useFallback])

  if (useFallback) {
    return (
      <div
        className={`${styles.cssNoise} ${className}`}
        style={{ opacity }} // cos-ignore
        aria-hidden="true"
        {...props}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvasNoise} ${className}`}
      style={{ opacity }} // cos-ignore
      aria-hidden="true"
      {...props}
    />
  )
}
