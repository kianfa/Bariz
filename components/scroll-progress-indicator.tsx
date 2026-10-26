'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

const STORAGE_KEY_POS = 'bariz_scroll_indicator_pos'
const STORAGE_KEY_HIDDEN = 'bariz_scroll_indicator_hidden'

const DESKTOP_TRACK_HEIGHT = 148
const MOBILE_TRACK_HEIGHT = 112
const BEAD_SIZE = 20
const WIDGET_WIDTH = 58
const SAFE_MARGIN_X = 12
const SAFE_MARGIN_Y_TOP = 64
const SAFE_MARGIN_Y_BOTTOM = 24
const IDLE_TIMEOUT_MS = 1800

interface Position {
  x: number
  y: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Bespoke Bariz "B" Monogram SVG Component
 * Extracted directly from official Bariz vector branding mark.
 */
function BarizBMonogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-15 -1 210 210"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Bariz B"
    >
      <path
        d="M 40 10 L 30 16 L 24 21 L 17 29 L 10 40 L 9 46 L 5 54 L 5 196 L 6 198 L 13 198 L 18 196 L 41 194 L 67 196 L 89 202 L 111 203 L 125 201 L 133 197 L 140 195 L 143 192 L 146 191 L 151 186 L 155 184 L 165 172 L 168 164 L 172 158 L 175 146 L 175 124 L 174 117 L 171 108 L 166 97 L 164 94 L 146 77 L 133 71 L 119 69 L 115 66 L 114 64 L 115 48 L 112 37 L 105 25 L 97 17 L 90 12 L 86 10 L 77 8 L 74 6 L 69 5 L 56 5 Z M 134 175 L 133 178 L 132 178 L 130 180 L 126 179 L 126 177 L 128 175 L 131 174 Z M 55 140 L 55 143 L 52 146 L 45 146 L 43 144 L 43 142 L 45 140 L 49 140 L 51 138 L 53 138 Z M 67 84 L 71 85 L 71 87 L 69 89 L 65 88 L 65 86 Z M 74 82 L 75 79 L 78 78 L 83 79 L 82 82 L 80 83 Z M 46 35 L 58 30 L 70 30 L 79 34 L 87 43 L 89 53 L 89 64 L 88 68 L 85 72 L 78 76 L 74 76 L 70 78 L 57 89 L 48 100 L 43 108 L 41 113 L 40 128 L 40 145 L 41 147 L 54 148 L 57 146 L 58 144 L 59 136 L 58 128 L 59 125 L 62 121 L 65 113 L 69 109 L 69 108 L 77 101 L 86 96 L 94 94 L 101 93 L 119 94 L 132 100 L 142 110 L 147 118 L 149 124 L 149 146 L 147 152 L 138 165 L 130 172 L 115 178 L 98 178 L 87 174 L 74 173 L 56 168 L 34 169 L 29 165 L 28 163 L 29 141 L 28 71 L 29 60 L 37 44 Z M 100 27 L 103 28 L 102 31 L 99 30 Z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function ScrollProgressIndicator() {
  const { t, language } = useLanguage()

  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [pos, setPos] = useState<Position | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isInHero, setIsInHero] = useState(true)
  const [isIdle, setIsIdle] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [isDraggingWidget, setIsDraggingWidget] = useState(false)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  // Medallion drag state (moves the widget position)
  const medallionPointerRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    initX: number
    initY: number
    hasMoved: boolean
  } | null>(null)

  // Scrubber drag state (scrolls the page)
  const scrubberPointerRef = useRef<{
    pointerId: number
  } | null>(null)

  const trackHeight = isMobile ? MOBILE_TRACK_HEIGHT : DESKTOP_TRACK_HEIGHT
  const beadDiameter = isMobile ? 16 : BEAD_SIZE
  const travelDistance = Math.max(0, trackHeight - beadDiameter)
  const beadTop = progress * travelDistance
  const fillHeight = beadTop + beadDiameter / 2
  const widgetHeight = trackHeight + 118

  const isNearRightEdge = pos ? pos.x > window.innerWidth / 2 : true

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false)
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true)
    }, IDLE_TIMEOUT_MS)
  }, [])

  // Mount & initial position restoration
  useEffect(() => {
    setMounted(true)
    const mobileCheck = window.innerWidth < 768
    setIsMobile(mobileCheck)

    try {
      const savedHidden = localStorage.getItem(STORAGE_KEY_HIDDEN)
      if (savedHidden === 'true') {
        setIsHidden(true)
      }
    } catch {}

    const tHeight = mobileCheck ? MOBILE_TRACK_HEIGHT : DESKTOP_TRACK_HEIGHT
    const wHeight = tHeight + 118

    try {
      const savedPos = localStorage.getItem(STORAGE_KEY_POS)
      if (savedPos) {
        const parsed = JSON.parse(savedPos)
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          const clampedX = clamp(
            parsed.x,
            SAFE_MARGIN_X,
            window.innerWidth - WIDGET_WIDTH - SAFE_MARGIN_X,
          )
          const clampedY = clamp(
            parsed.y,
            SAFE_MARGIN_Y_TOP,
            window.innerHeight - wHeight - SAFE_MARGIN_Y_BOTTOM,
          )
          setPos({ x: clampedX, y: clampedY })
          return
        }
      }
    } catch {}

    // Default position: fixed near right edge on desktop, right side on mobile
    const defaultX = window.innerWidth - WIDGET_WIDTH - (mobileCheck ? 10 : 26)
    const defaultY = Math.max(
      SAFE_MARGIN_Y_TOP,
      Math.round((window.innerHeight - wHeight) / 2),
    )
    setPos({ x: defaultX, y: defaultY })
  }, [])

  // Document scroll progress listener & Hero detection
  useEffect(() => {
    if (!mounted) return

    let rafId: number | null = null

    const calculateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const docHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight || 0
      const winHeight = window.innerHeight || 0
      const scrollable = docHeight - winHeight

      // Check if user is currently inside the Hero section (top viewport)
      const heroThreshold = winHeight * 0.72
      setIsInHero(scrollTop < heroThreshold)

      const p = scrollable > 0 ? clamp(scrollTop / scrollable, 0, 1) : 0
      setProgress(p)
      resetIdleTimer()
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(calculateProgress)
    }

    const onResize = () => {
      const mob = window.innerWidth < 768
      setIsMobile(mob)

      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        calculateProgress()
        setPos((prev) => {
          if (!prev) return prev
          const tH = mob ? MOBILE_TRACK_HEIGHT : DESKTOP_TRACK_HEIGHT
          const wH = tH + 118
          return {
            x: clamp(
              prev.x,
              SAFE_MARGIN_X,
              Math.max(SAFE_MARGIN_X, window.innerWidth - WIDGET_WIDTH - SAFE_MARGIN_X),
            ),
            y: clamp(
              prev.y,
              SAFE_MARGIN_Y_TOP,
              Math.max(SAFE_MARGIN_Y_TOP, window.innerHeight - wH - SAFE_MARGIN_Y_BOTTOM),
            ),
          }
        })
      })
    }

    calculateProgress()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    const observer = new ResizeObserver(() => {
      onScroll()
    })
    if (document.body) {
      observer.observe(document.body)
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [mounted, resetIdleTimer])

  // 1. MEDALLION DRAG HANDLERS (Moves the entire widget across screen)
  const handleMedallionPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return

    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    medallionPointerRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initX: pos?.x ?? 0,
      initY: pos?.y ?? 0,
      hasMoved: false,
    }
    setIsInteracting(true)
    resetIdleTimer()
  }

  const handleMedallionPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = medallionPointerRef.current
    if (!state || state.pointerId !== e.pointerId) return

    const dx = e.clientX - state.startX
    const dy = e.clientY - state.startY

    if (!state.hasMoved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      state.hasMoved = true
      setIsDraggingWidget(true)
    }

    if (state.hasMoved) {
      e.preventDefault()
      const newX = clamp(
        state.initX + dx,
        SAFE_MARGIN_X,
        window.innerWidth - WIDGET_WIDTH - SAFE_MARGIN_X,
      )
      const newY = clamp(
        state.initY + dy,
        SAFE_MARGIN_Y_TOP,
        window.innerHeight - widgetHeight - SAFE_MARGIN_Y_BOTTOM,
      )
      setPos({ x: newX, y: newY })
    }
  }

  const handleMedallionPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = medallionPointerRef.current
    if (state && state.pointerId === e.pointerId) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}

      if (state.hasMoved && pos) {
        try {
          localStorage.setItem(STORAGE_KEY_POS, JSON.stringify(pos))
        } catch {}
      }

      medallionPointerRef.current = null
      setTimeout(() => {
        setIsDraggingWidget(false)
      }, 50)
      setIsInteracting(false)
      resetIdleTimer()
    }
  }

  // 2. SCRUBBER DRAG HANDLERS (Grabbing the bead fast-scrolls the document page)
  const applyScrubToPosition = (clientY: number) => {
    const trackEl = trackRef.current
    if (!trackEl) return
    const rect = trackEl.getBoundingClientRect()
    const relativeY = clientY - rect.top
    const newProgress = clamp(relativeY / rect.height, 0, 1)

    const docHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight || 0
    const winHeight = window.innerHeight || 0
    const scrollable = docHeight - winHeight

    if (scrollable > 0) {
      window.scrollTo({
        top: newProgress * scrollable,
        behavior: 'auto',
      })
      setProgress(newProgress)
    }
  }

  const handleScrubberPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return

    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    scrubberPointerRef.current = {
      pointerId: e.pointerId,
    }
    setIsScrubbing(true)
    setIsInteracting(true)
    resetIdleTimer()

    applyScrubToPosition(e.clientY)
  }

  const handleScrubberPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = scrubberPointerRef.current
    if (!state || state.pointerId !== e.pointerId) return
    e.preventDefault()
    applyScrubToPosition(e.clientY)
  }

  const handleScrubberPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = scrubberPointerRef.current
    if (state && state.pointerId === e.pointerId) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}
      scrubberPointerRef.current = null
      setIsScrubbing(false)
      setIsInteracting(false)
      resetIdleTimer()
    }
  }

  // Click on track to smoothly jump to that location
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isScrubbing || isDraggingWidget) return
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return
    const clickY = e.clientY - rect.top
    const targetProgress = clamp(clickY / rect.height, 0, 1)

    const docHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight || 0
    const winHeight = window.innerHeight || 0
    const scrollable = docHeight - winHeight

    if (scrollable > 0) {
      window.scrollTo({
        top: targetProgress * scrollable,
        behavior: 'smooth',
      })
    }
  }

  // Click on "تا انتها اسکرول کنید" scrolls smoothly all the way to bottom of page
  const handleScrollToBottom = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isDraggingWidget || isScrubbing) return
    const docHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight || 0
    const winHeight = window.innerHeight || 0
    const maxScroll = Math.max(0, docHeight - winHeight)

    window.scrollTo({
      top: maxScroll,
      behavior: 'smooth',
    })
  }

  const toggleHide = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsHidden(true)
    try {
      localStorage.setItem(STORAGE_KEY_HIDDEN, 'true')
    } catch {}
  }

  const restoreWidget = () => {
    setIsHidden(false)
    try {
      localStorage.setItem(STORAGE_KEY_HIDDEN, 'false')
    } catch {}
    resetIdleTimer()
  }

  if (!mounted || !pos) return null

  const percentNumber = Math.round(progress * 100)
  const formattedPercent =
    language === 'fa'
      ? `${new Intl.NumberFormat('fa-IR').format(percentNumber)}٪`
      : `${percentNumber}%`

  // Render minimized dock tab when user hides the widget (only outside hero)
  if (isHidden) {
    if (isInHero) return null

    return (
      <button
        type="button"
        onClick={restoreWidget}
        className={cn(
          'fixed z-40 flex items-center gap-1.5 rounded-full border border-gold/45 bg-background/95 px-2.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 hover:border-gold hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold max-md:scale-[0.80] max-md:origin-center',
          isIdle
            ? 'opacity-40 hover:opacity-100'
            : 'opacity-90 hover:opacity-100',
        )}
        style={{
          left: `${Math.min(pos.x, window.innerWidth - 64)}px`,
          top: `${pos.y}px`,
        }}
        aria-label={t.scrollIndicator.showButton}
        title={t.scrollIndicator.showButton}
      >
        <BarizBMonogram className="size-4 text-gold drop-shadow-[0_1px_3px_rgba(216,153,78,0.4)]" />
        <span className="font-display text-[0.65rem] font-medium text-gold leading-none">
          {formattedPercent}
        </span>
      </button>
    )
  }

  return (
    <aside
      role="progressbar"
      aria-label={t.scrollIndicator.label}
      aria-valuenow={percentNumber}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={t.scrollIndicator.progressTitle.replace(
        '{percent}',
        String(percentNumber),
      )}
      onMouseEnter={() => {
        setIsInteracting(true)
        setIsIdle(false)
      }}
      onMouseLeave={() => {
        setIsInteracting(false)
        resetIdleTimer()
      }}
      className={cn(
        'fixed z-40 flex w-14 flex-col items-center select-none touch-none',
        // 20% smaller on mobile as requested
        'max-md:scale-[0.80] max-md:origin-center',
        // Hidden when in the Hero section
        isInHero
          ? 'opacity-0 pointer-events-none translate-y-3'
          : isDraggingWidget || isScrubbing
            ? 'opacity-100 scale-100 max-md:scale-[0.80]'
            : isInteracting
              ? 'opacity-100 scale-100 max-md:scale-[0.80] duration-150'
              : isIdle
                ? 'opacity-35 scale-[0.98] max-md:scale-[0.78] duration-500 ease-out hover:opacity-100 hover:scale-100 max-md:hover:scale-[0.80]'
                : 'opacity-90 scale-100 max-md:scale-[0.80] duration-150',
        'transition-[opacity,transform] motion-reduce:transition-none',
      )}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      {/* Top Axis Accent (Dot + Fine Vertical Line) */}
      <div className="flex flex-col items-center select-none pointer-events-none" aria-hidden="true">
        <span className="size-[2px] rounded-full bg-gold/70" />
        <span className="my-1.5 h-3.5 w-px bg-gradient-to-b from-transparent via-gold/50 to-gold/70" />
      </div>

      {/* Top Circular Badge with "B" Monogram (Reposition handle) */}
      <div
        onPointerDown={handleMedallionPointerDown}
        onPointerMove={handleMedallionPointerMove}
        onPointerUp={handleMedallionPointerUp}
        onPointerCancel={handleMedallionPointerUp}
        className={cn(
          'relative group/badge flex items-center justify-center cursor-grab active:cursor-grabbing',
          isDraggingWidget && 'cursor-grabbing',
        )}
        title={language === 'fa' ? 'برای جابه‌جایی نشانگر بکشید' : 'Drag to reposition'}
      >
        {/* Compass Crosshair Ticks */}
        <span className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-px bg-gold/70" aria-hidden="true" />
        <span className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-px bg-gold/70" aria-hidden="true" />
        <span className="pointer-events-none absolute top-1/2 -left-1 -translate-y-1/2 h-px w-1 bg-gold/70" aria-hidden="true" />
        <span className="pointer-events-none absolute top-1/2 -right-1 -translate-y-1/2 h-px w-1 bg-gold/70" aria-hidden="true" />

        {/* Circular Medallion */}
        <div
          className={cn(
            'flex size-11 sm:size-12 items-center justify-center rounded-full border border-gold/55 bg-background/95 backdrop-blur-md transition-all duration-200',
            isDraggingWidget
              ? 'border-gold shadow-[0_0_20px_rgba(216,153,78,0.55),0_4px_20px_rgba(0,0,0,0.65)] scale-105'
              : 'shadow-[0_4px_16px_rgba(0,0,0,0.6),0_0_10px_rgba(216,153,78,0.25)] hover:border-gold hover:shadow-[0_0_16px_rgba(216,153,78,0.45)]',
          )}
        >
          {/* Extracted Authentic Bariz "B" Lettermark */}
          <BarizBMonogram className="size-6 sm:size-6.5 text-gold filter drop-shadow-[0_1px_5px_rgba(216,153,78,0.35)]" />
        </div>

        {/* Discreet Hide button toggle (appears on hover) */}
        <button
          type="button"
          data-no-drag="true"
          onClick={toggleHide}
          aria-label={t.scrollIndicator.hideButton}
          title={t.scrollIndicator.hideButton}
          className="absolute -top-1 -end-1 flex size-4 items-center justify-center rounded-full bg-background/95 border border-gold/40 text-gold opacity-0 transition-opacity duration-200 hover:scale-110 focus-visible:opacity-100 group-hover/badge:opacity-90"
        >
          <span className="text-[0.55rem] leading-none">&times;</span>
        </button>
      </div>

      {/* Main Vertical Progress Track & Scrubber */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative flex w-full items-center justify-center cursor-pointer py-0.5"
        style={{ height: `${trackHeight}px` }}
      >
        {/* Uncompleted Track Line (Subtle dark bronze/brown) */}
        <div
          className="absolute inset-x-1/2 -translate-x-1/2 w-[1.75px] rounded-full bg-[#523e31]/75"
          style={{
            top: 0,
            bottom: 0,
          }}
          aria-hidden="true"
        />

        {/* Completed Glowing Gold Line */}
        <div
          className="absolute inset-x-1/2 -translate-x-1/2 w-[2px] rounded-full bg-gradient-to-b from-gold/60 via-gold/90 to-gold shadow-[0_0_8px_rgba(216,153,78,0.75),0_0_18px_rgba(216,153,78,0.45)] transition-[height] duration-75 ease-out motion-reduce:transition-none"
          style={{
            top: 0,
            height: `${Math.max(0, fillHeight)}px`,
          }}
          aria-hidden="true"
        />

        {/* Moving Concentric Bead Scrubber (Interactive scroll scrub handle) */}
        <div
          onPointerDown={handleScrubberPointerDown}
          onPointerMove={handleScrubberPointerMove}
          onPointerUp={handleScrubberPointerUp}
          onPointerCancel={handleScrubberPointerUp}
          className={cn(
            'absolute inset-x-0 z-20 flex items-center justify-center pointer-events-auto cursor-ns-resize transition-[top] duration-75 ease-out motion-reduce:transition-none',
            isScrubbing ? 'scale-115' : 'hover:scale-110',
          )}
          style={{
            top: `${beadTop}px`,
            height: `${beadDiameter}px`,
          }}
          title={language === 'fa' ? 'برای اسکرول سریع بکشید' : 'Drag to scroll'}
        >
          {/* Concentric Double Circle */}
          <div
            className={cn(
              'relative flex items-center justify-center rounded-full border-[1.5px] border-gold bg-background/95 shadow-[0_0_12px_rgba(216,153,78,0.75),0_0_24px_rgba(216,153,78,0.4)] transition-all duration-200',
              isScrubbing && 'border-gold shadow-[0_0_16px_rgba(216,153,78,0.9),0_0_32px_rgba(216,153,78,0.6)]',
            )}
            style={{
              width: `${beadDiameter}px`,
              height: `${beadDiameter}px`,
            }}
          >
            {/* Center Solid Gold Bead */}
            <span
              className="rounded-full bg-gold shadow-[0_0_6px_rgba(216,153,78,0.9)]"
              style={{
                width: `${isMobile ? 4.5 : 6}px`,
                height: `${isMobile ? 4.5 : 6}px`,
              }}
            />
          </div>

          {/* Progress Percent Tag: Placed dynamically on the inner side so it never clips off-screen */}
          <span
            className={cn(
              'pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-gold/40 bg-background/95 px-2 py-0.5 text-[0.62rem] font-light text-gold shadow-[0_2px_10px_rgba(0,0,0,0.5)] backdrop-blur-xs transition-opacity duration-200',
              isNearRightEdge ? 'right-full mr-2.5' : 'left-full ml-2.5',
              isInteracting || isScrubbing || isDraggingWidget ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden="true"
          >
            {formattedPercent}
          </span>
        </div>
      </div>

      {/* Bottom Editorial Callout ("تا انتها اسکرول کنید" & Chevron) */}
      <div
        className="mt-2.5 flex flex-col items-center text-center select-none cursor-pointer group/bottom"
        onClick={handleScrollToBottom}
        data-no-drag="true"
        title={language === 'fa' ? 'اسکرول به انتهای صفحه' : 'Scroll to bottom'}
      >
        <span className="font-display text-[0.68rem] sm:text-[0.72rem] font-light leading-tight tracking-wide text-ivory/80 group-hover/bottom:text-gold transition-colors">
          {language === 'fa' ? 'تا انتها' : 'Scroll to'}
        </span>
        <span className="font-display text-[0.68rem] sm:text-[0.72rem] font-light leading-tight tracking-wide text-ivory/80 group-hover/bottom:text-gold transition-colors mt-0.5">
          {language === 'fa' ? 'اسکرول کنید' : 'the end'}
        </span>

        {/* Downward Chevron */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-1.5 size-3.5 text-gold/80 transition-transform duration-300 group-hover/bottom:translate-y-1 group-hover/bottom:text-gold animate-bounce"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>

        {/* Tiny Bottom Axis Accent Dot */}
        <span className="mt-1 size-[2px] rounded-full bg-gold/50" aria-hidden="true" />
      </div>
    </aside>
  )
}
