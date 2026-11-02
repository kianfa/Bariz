'use client'

import { useEffect, useRef } from 'react'

const FRAME_COUNT = 70
const PRELOAD_BATCH_SIZE = 6

function frameSrc(index: number) {
  return `/bariz-scroll/frame-${String(index + 1).padStart(3, '0')}.webp`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function ScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    const canvas = canvasRef.current
    if (!section || !sticky || !canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const images: Array<HTMLImageElement | undefined> = new Array(FRAME_COUNT)
    const loading = new Map<number, Promise<HTMLImageElement>>()
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    let currentFrame = 0
    let rafId = 0
    let preloadStarted = false
    let disposed = false

    // Keep the existing reduced-motion behavior, but allow the same scrub
    // experience on both desktop and mobile.
    const canScrub = () => !reducedMotionQuery.matches

    const drawImage = (image: HTMLImageElement) => {
      if (!image.naturalWidth || !image.naturalHeight) return

      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const scale = Math.max(
        canvasWidth / image.naturalWidth,
        canvasHeight / image.naturalHeight,
      )
      const width = image.naturalWidth * scale
      const height = image.naturalHeight * scale
      const x = (canvasWidth - width) / 2
      const y = (canvasHeight - height) / 2

      context.clearRect(0, 0, canvasWidth, canvasHeight)
      context.drawImage(image, x, y, width, height)

      // Atmospheric top fade on canvas buffer
      const topFadeHeight = Math.min(180, Math.round(canvasHeight * 0.16))
      const topGrad = context.createLinearGradient(0, 0, 0, topFadeHeight)
      topGrad.addColorStop(0, '#151210')
      topGrad.addColorStop(0.35, 'rgba(21, 18, 16, 0.7)')
      topGrad.addColorStop(1, 'rgba(21, 18, 16, 0)')
      context.fillStyle = topGrad
      context.fillRect(0, 0, canvasWidth, topFadeHeight)

      // Atmospheric bottom fade on canvas buffer (brought lower to seal bottom seam)
      const bottomFadeHeight = Math.min(140, Math.round(canvasHeight * 0.12))
      const bottomGrad = context.createLinearGradient(0, canvasHeight - bottomFadeHeight, 0, canvasHeight)
      bottomGrad.addColorStop(0, 'rgba(21, 18, 16, 0)')
      bottomGrad.addColorStop(0.55, 'rgba(21, 18, 16, 0.75)')
      bottomGrad.addColorStop(0.85, '#151210')
      bottomGrad.addColorStop(1, '#151210')
      context.fillStyle = bottomGrad
      context.fillRect(0, canvasHeight - bottomFadeHeight, canvasWidth, bottomFadeHeight)
    }

    const findNearestLoadedFrame = (target: number) => {
      const exact = images[target]
      if (exact?.complete && exact.naturalWidth) return exact

      for (let distance = 1; distance < FRAME_COUNT; distance += 1) {
        const before = target - distance
        if (before >= 0) {
          const image = images[before]
          if (image?.complete && image.naturalWidth) return image
        }

        const after = target + distance
        if (after < FRAME_COUNT) {
          const image = images[after]
          if (image?.complete && image.naturalWidth) return image
        }
      }

      return undefined
    }

    const renderFrame = (index: number) => {
      const image = findNearestLoadedFrame(index)
      if (image) drawImage(image)
    }

    const loadFrame = (index: number) => {
      const existing = images[index]
      if (existing?.complete && existing.naturalWidth) {
        return Promise.resolve(existing)
      }

      const pending = loading.get(index)
      if (pending) return pending

      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        const image = existing ?? new Image()
        images[index] = image
        image.decoding = 'async'

        image.onload = () => {
          loading.delete(index)
          resolve(image)
        }
        image.onerror = () => {
          loading.delete(index)
          reject(new Error(`Unable to load frame ${index + 1}`))
        }

        if (!existing) image.src = frameSrc(index)
      })

      loading.set(index, promise)
      return promise
    }

    const resizeCanvas = () => {
      // Limit the backing-store scale on high-density phones to avoid large
      // canvas allocations while keeping the sequence crisp on Retina screens.
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, Math.round(canvas.clientWidth * ratio))
      const height = Math.max(1, Math.round(canvas.clientHeight * ratio))

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      renderFrame(currentFrame)
    }

    const ensureTargetFrames = (target: number) => {
      // Proactively buffer a window around current target frame
      const nearby = [
        target,
        target + 1,
        target + 2,
        target + 3,
        target + 4,
        target + 5,
        target - 1,
        target - 2,
        target - 3,
      ]

      for (const index of nearby) {
        if (index < 0 || index >= FRAME_COUNT) continue
        void loadFrame(index)
          .then((image) => {
            if (!disposed && index === currentFrame) drawImage(image)
          })
          .catch(() => undefined)
      }
    }

    const getScrollViewportHeight = () => {
      // Preserve the desktop calculation exactly. On mobile, use the actual
      // sticky viewport height so iOS/Android browser chrome does not distort
      // the frame-to-scroll mapping.
      if (desktopQuery.matches) return window.innerHeight
      return Math.max(1, sticky.clientHeight || window.innerHeight)
    }

    const updateFromScroll = () => {
      rafId = 0

      if (!canScrub()) {
        currentFrame = 0
        ensureTargetFrames(0)
        renderFrame(0)
        return
      }

      const rect = section.getBoundingClientRect()
      const scrollDistance = Math.max(1, rect.height - getScrollViewportHeight())
      const progress = clamp(-rect.top / scrollDistance, 0, 1)
      const nextFrame = Math.round(progress * (FRAME_COUNT - 1))

      if (nextFrame !== currentFrame) {
        currentFrame = nextFrame
        ensureTargetFrames(currentFrame)
      }

      renderFrame(currentFrame)
    }

    const scheduleUpdate = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(updateFromScroll)
    }

    const startPreload = () => {
      if (preloadStarted || !canScrub()) return
      preloadStarted = true

      // Eagerly preload all frames in parallel batches right from page mount
      // so frames are ready even on slow/throttled network connections.
      const BATCH_SIZE = 4
      let nextIndex = 1

      const loadNextBatch = async () => {
        if (disposed || nextIndex >= FRAME_COUNT) return

        const currentBatch: number[] = []
        for (let i = 0; i < BATCH_SIZE && nextIndex < FRAME_COUNT; i++) {
          currentBatch.push(nextIndex)
          nextIndex++
        }

        await Promise.allSettled(currentBatch.map((index) => loadFrame(index)))

        if (!disposed && nextIndex < FRAME_COUNT) {
          window.setTimeout(loadNextBatch, 16)
        }
      }

      void loadNextBatch()
    }

    const handleMediaChange = () => {
      if (canScrub()) {
        startPreload()
      } else {
        currentFrame = 0
      }
      resizeCanvas()
      scheduleUpdate()
    }

    const handleResize = () => {
      resizeCanvas()
      // Desktop keeps its existing resize behavior. Mobile also refreshes the
      // scroll mapping after viewport/orientation changes.
      if (!desktopQuery.matches) scheduleUpdate()
    }

    const handleOrientationChange = () => {
      if (desktopQuery.matches) return
      window.requestAnimationFrame(() => {
        if (disposed) return
        resizeCanvas()
        scheduleUpdate()
      })
    }

    resizeCanvas()
    void loadFrame(0)
      .then((image) => {
        if (!disposed) {
          drawImage(image)
          scheduleUpdate()
        }
      })
      .catch(() => undefined)

    // Start downloading the sequence immediately when the website opens
    startPreload()

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)
    desktopQuery.addEventListener('change', handleMediaChange)
    reducedMotionQuery.addEventListener('change', handleMediaChange)
    scheduleUpdate()

    return () => {
      disposed = true
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
      desktopQuery.removeEventListener('change', handleMediaChange)
      reducedMotionQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[300svh] w-full bg-background motion-reduce:h-[100svh] md:h-[320svh] md:motion-reduce:h-[100svh]"
      aria-hidden="true"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-background"
      >
        <canvas ref={canvasRef} className="block size-full bg-background" />

        {/* Top atmospheric fade from Hero */}
        <div className="pointer-events-none absolute -top-1 inset-x-0 h-24 sm:h-32 md:h-40 bg-gradient-to-b from-background from-10% via-background/70 to-transparent z-10 backdrop-blur-[1.5px] [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />

        {/* Bottom atmospheric fade into Story (shifted lower, compact, and overlapping boundary) */}
        <div className="pointer-events-none absolute -bottom-2 inset-x-0 h-20 sm:h-28 md:h-36 bg-gradient-to-t from-background from-25% via-background/75 to-transparent z-10 backdrop-blur-[1.5px] [mask-image:linear-gradient(to_top,black_30%,transparent)]" />
      </div>
    </section>
  )
}
