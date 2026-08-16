'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  strength?: number
}

export function ParallaxImage({
  src,
  alt,
  className,
  strength = 60,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [shift, setShift] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const node = wrapRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const progress = (rect.top + rect.height / 2) / window.innerHeight - 0.5
      setShift(-progress * strength)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <div ref={wrapRef} className={cn('overflow-hidden', className)}>
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        className="size-full object-cover will-change-transform"
        style={{ transform: `translate3d(0, ${shift}px, 0) scale(1.15)` }}
      />
    </div>
  )
}
