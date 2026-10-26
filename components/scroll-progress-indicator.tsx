'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

const STORAGE_KEY_POS = 'bariz_scroll_indicator_pos'
const STORAGE_KEY_HIDDEN = 'bariz_scroll_indicator_hidden'
const LOGO_SRC = '/bariz-bottle-icon.png'

const DESKTOP_TRACK_HEIGHT = 156
const MOBILE_TRACK_HEIGHT = 114
const WIDGET_WIDTH = 44
const SAFE_MARGIN_X = 12
const SAFE_MARGIN_Y_TOP = 76
const SAFE_MARGIN_Y_BOTTOM = 28
const IDLE_TIMEOUT_MS = 1800

interface Position {
  x: number
  y: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function ScrollProgressIndicator() {
  const { t, language } = useLanguage()

  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [pos, setPos] = useState<Position | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isIdle, setIsIdle] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const pointerStateRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    initX: number
    initY: number
    hasMoved: boolean
  } | null>(null)

  const trackHeight = isMobile ? MOBILE_TRACK_HEIGHT : DESKTOP_TRACK_HEIGHT
  const badgeSize = isMobile ? 30 : 34
  const travelDistance = trackHeight - badgeSize
  const logoTop = progress * travelDistance
  const fillHeight = progress * travelDistance + badgeSize / 2

  const resetIdleTimer = useCallback(() => {
    setIsIdle(false)
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true)
    }, IDLE_TIMEOUT_MS)
  }, [])

  // Mount & initial geometry calculation
  useEffect(() => {
    setMounted(true)
    const mobileCheck = window.innerWidth < 768
    setIsMobile(mobileCheck)

    // Restore hidden state
    try {
      const savedHidden = localStorage.getItem(STORAGE_KEY_HIDDEN)
      if (savedHidden === 'true') {
        setIsHidden(true)
      }
    } catch {}

    // Restore or initialize position
    const tHeight = mobileCheck ? MOBILE_TRACK_HEIGHT : DESKTOP_TRACK_HEIGHT
    const widgetH = tHeight + 40

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
            window.innerHeight - widgetH - SAFE_MARGIN_Y_BOTTOM,
          )
          setPos({ x: clampedX, y: clampedY })
          return
        }
      }
    } catch {}

    // Default position: near right edge on desktop, right side on mobile
    const defaultX = window.innerWidth - WIDGET_WIDTH - (mobileCheck ? 14 : 26)
    const defaultY = Math.max(
      SAFE_MARGIN_Y_TOP,
      Math.round((window.innerHeight - widgetH) / 2),
    )
    setPos({ x: defaultX, y: defaultY })
  }, [])

  // Document scroll progress listener & ResizeObserver
  useEffect(() => {
    if (!mounted) return

    let rafId: number | null = null

    const calculateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const docHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight || 0
      const winHeight = window.innerHeight || 0
      const scrollable = docHeight - winHeight

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
          const wH = tH + 40
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

    // Initial calculation
    calculateProgress()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    // Observe document height shifts (image loads, dynamic DOM changes)
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

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button
    if (e.pointerType === 'mouse' && e.button !== 0) return
    // Prevent drag when clicking controls marked with data-no-drag
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return

    e.currentTarget.setPointerCapture(e.pointerId)
    pointerStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      initX: pos?.x ?? 0,
      initY: pos?.y ?? 0,
      hasMoved: false,
    }
    setIsInteracting(true)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = pointerStateRef.current
    if (!state || state.pointerId !== e.pointerId) return

    const dx = e.clientX - state.startX
    const dy = e.clientY - state.startY

    if (!state.hasMoved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      state.hasMoved = true
      setIsDragging(true)
    }

    if (state.hasMoved) {
      e.preventDefault()
      const wH = trackHeight + 40
      const newX = clamp(
        state.initX + dx,
        SAFE_MARGIN_X,
        window.innerWidth - WIDGET_WIDTH - SAFE_MARGIN_X,
      )
      const newY = clamp(
        state.initY + dy,
        SAFE_MARGIN_Y_TOP,
        window.innerHeight - wH - SAFE_MARGIN_Y_BOTTOM,
      )
      setPos({ x: newX, y: newY })
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = pointerStateRef.current
    if (state && state.pointerId === e.pointerId) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}

      if (state.hasMoved && pos) {
        try {
          localStorage.setItem(STORAGE_KEY_POS, JSON.stringify(pos))
        } catch {}
      }

      pointerStateRef.current = null
      setTimeout(() => {
        setIsDragging(false)
      }, 50)
      setIsInteracting(false)
      resetIdleTimer()
    }
  }

  // Click on track to jump to corresponding document position
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return
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

  // Render minimized dock tab when user hid the widget
  if (isHidden) {
    return (
      <button
        type="button"
        onClick={restoreWidget}
        className={cn(
          'fixed z-40 flex items-center gap-1.5 rounded-full border border-gold/45 bg-background/95 px-2.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 hover:border-gold hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold',
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
        <img
          src={LOGO_SRC}
          alt=""
          className="h-4 w-auto object-contain drop-shadow-[0_1px_3px_rgba(216,153,78,0.4)]"
        />
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
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        setIsInteracting(true)
        setIsIdle(false)
      }}
      onMouseLeave={() => {
        setIsInteracting(false)
        resetIdleTimer()
      }}
      className={cn(
        'fixed z-40 flex w-11 flex-col items-center select-none touch-none',
        isDragging
          ? 'cursor-grabbing opacity-100 scale-105'
          : 'cursor-grab',
        // Idle opacity transition
        !isDragging &&
          (isInteracting
            ? 'opacity-100 scale-100 duration-150'
            : isIdle
              ? 'opacity-35 scale-[0.98] duration-500 ease-out hover:opacity-100 hover:scale-100'
              : 'opacity-90 scale-100 duration-150'),
        'transition-[opacity,transform] motion-reduce:transition-none',
      )}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      }}
    >
      {/* Discreet Hide Button */}
      <button
        type="button"
        data-no-drag="true"
        onClick={toggleHide}
        aria-label={t.scrollIndicator.hideButton}
        title={t.scrollIndicator.hideButton}
        className="mb-1 flex size-5.5 items-center justify-center rounded-full text-ivory/35 opacity-0 transition-all duration-200 hover:bg-gold/10 hover:text-gold hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 group-hover:opacity-80"
        style={{ opacity: isInteracting ? 0.75 : undefined }}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-2.5"
          aria-hidden="true"
        >
          <line x1="3" y1="8" x2="13" y2="8" strokeLinecap="round" />
        </svg>
      </button>

      {/* Main Vertical Track Container */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="group/track relative flex w-full items-center justify-center cursor-pointer py-1"
        style={{ height: `${trackHeight}px` }}
      >
        {/* Uncompleted Track Line (Subtle bronze/muted-gold) */}
        <div
          className="absolute inset-x-1/2 -translate-x-1/2 w-[1.5px] rounded-full bg-gold/20"
          style={{
            top: `${badgeSize / 2}px`,
            bottom: `${badgeSize / 2}px`,
          }}
          aria-hidden="true"
        />

        {/* Completed Track Line (Muted Champagne Gold Fill) */}
        <div
          className="absolute inset-x-1/2 -translate-x-1/2 w-[1.75px] rounded-full bg-gradient-to-b from-gold/50 via-gold/85 to-gold shadow-[0_0_6px_rgba(216,153,78,0.45)] transition-[height] duration-75 ease-out motion-reduce:transition-none"
          style={{
            top: `${badgeSize / 2}px`,
            height: `${Math.max(0, fillHeight - badgeSize / 2)}px`,
          }}
          aria-hidden="true"
        />

        {/* Understated Visual Markings */}
        <div
          className="pointer-events-none absolute inset-x-1/2 -translate-x-1/2 flex flex-col justify-between"
          style={{
            top: `${badgeSize / 2}px`,
            bottom: `${badgeSize / 2}px`,
          }}
          aria-hidden="true"
        >
          <span className="block h-[1px] w-2.5 -translate-x-1/2 bg-gold/40 rounded-full" />
          <span className="block size-1 -translate-x-1/2 bg-gold/30 rounded-full" />
          <span className="block h-[1px] w-3 -translate-x-1/2 bg-gold/50 rounded-full" />
          <span className="block size-1 -translate-x-1/2 bg-gold/30 rounded-full" />
          <span className="block h-[1px] w-2.5 -translate-x-1/2 bg-gold/40 rounded-full" />
        </div>

        {/* Moving Indicator Badge with Bariz Bottle Logo */}
        <div
          className={cn(
            'absolute inset-x-0 z-20 flex items-center justify-center pointer-events-auto transition-[top] duration-75 ease-out motion-reduce:transition-none',
            isDragging ? 'scale-110' : 'hover:scale-105',
          )}
          style={{
            top: `${logoTop}px`,
            height: `${badgeSize}px`,
          }}
        >
          {/* Circular Badge Canvas with Luxury Halo */}
          <div
            className={cn(
              'relative flex items-center justify-center rounded-full border border-gold/45 bg-background/90 backdrop-blur-md transition-all duration-200',
              isDragging
                ? 'border-gold shadow-[0_0_16px_rgba(216,153,78,0.55),0_4px_16px_rgba(0,0,0,0.6)]'
                : 'shadow-[0_2px_12px_rgba(0,0,0,0.55),0_0_8px_rgba(216,153,78,0.2)] hover:border-gold hover:shadow-[0_0_12px_rgba(216,153,78,0.4)]',
            )}
            style={{
              width: `${badgeSize}px`,
              height: `${badgeSize}px`,
            }}
          >
            {/* Authentic Bariz Bottle Logo */}
            <img
              src={LOGO_SRC}
              alt=""
              draggable={false}
              className={cn(
                'w-auto object-contain transition-transform duration-200 pointer-events-none drop-shadow-[0_1px_4px_rgba(216,153,78,0.35)]',
                isMobile ? 'h-5' : 'h-6',
              )}
            />
          </div>

          {/* Understated Percentage Pill (Visible on hover or dragging) */}
          <span
            className={cn(
              'pointer-events-none absolute -start-11 top-1/2 -translate-y-1/2 rounded-full border border-gold/35 bg-background/95 px-2 py-0.5 text-[0.62rem] font-light text-gold shadow-[0_2px_10px_rgba(0,0,0,0.4)] backdrop-blur-xs transition-opacity duration-200',
              isInteracting || isDragging ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden="true"
          >
            {formattedPercent}
          </span>
        </div>
      </div>

      {/* Tiny Understated Drag Affordance Dots at bottom */}
      <div
        className="mt-1 flex items-center gap-1 opacity-25 transition-opacity hover:opacity-60"
        aria-hidden="true"
      >
        <span className="size-0.5 rounded-full bg-gold" />
        <span className="size-0.5 rounded-full bg-gold" />
        <span className="size-0.5 rounded-full bg-gold" />
      </div>
    </aside>
  )
}
