'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

const BOTANICAL_IMAGES = [
  '/botanical-rose.webp',
  '/botanical-mint.webp',
  '/botanical-chicory.webp',
]

export function Botanicals() {
  const { t, isRtl } = useLanguage()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollRaf = useRef(0)

  // Real-time scroll listener to update active index smoothly as user swipes (RAF throttled)
  const handleScroll = useCallback(() => {
    if (scrollRaf.current) return
    scrollRaf.current = window.requestAnimationFrame(() => {
      scrollRaf.current = 0
      const container = scrollContainerRef.current
      if (!container) return
      const cards = cardRefs.current
      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2

      let closestIdx = 0
      let minDistance = Infinity

      cards.forEach((card, idx) => {
        if (!card) return
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2
        const distance = Math.abs(cardCenter - containerCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestIdx = idx
        }
      })

      setActiveIndex(closestIdx)
    })
  }, [])

  const scrollToCard = useCallback((index: number) => {
    const card = cardRefs.current[index]
    if (card) {
      card.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest',
      })
      setActiveIndex(index)
    }
  }, [])

  const handleBackward = () => {
    if (activeIndex > 0) {
      scrollToCard(activeIndex - 1)
    }
  }

  const handleForward = () => {
    if (activeIndex < BOTANICAL_IMAGES.length - 1) {
      scrollToCard(activeIndex + 1)
    }
  }

  return (
    <section id="botanicals" className="relative px-6 py-12 md:px-10 md:py-16 lg:py-20 scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-28">
      <div className="mx-auto max-w-[1500px]">
        <Reveal className="mx-auto mb-8 max-w-2xl text-center md:mb-10 lg:mb-12">
          <p className="text-xs font-light uppercase tracking-luxe text-gold">
            {t.botanicals.tag}
          </p>
          <h2 className="mt-2.5 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-tight text-balance text-ivory md:mt-3">
            {t.botanicals.heading}
          </h2>
        </Reveal>

        {/* Carousel (Mobile) / Grid (Desktop) */}
        <Reveal delay={120}>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className={cn(
                // Mobile: horizontal swipe with scroll snapping and edge padding
                'flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar scroll-px-6',
                'gap-4 sm:gap-6 px-6 -mx-6 pb-2 pt-1',
                // Desktop: standard 3-column grid
                'md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:mx-0 md:pb-0 md:pt-0'
              )}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {t.botanicals.items.map((item, i) => (
                <div
                  key={item.latin}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  className={cn(
                    'transition-all duration-300',
                    // Mobile: peek width (82vw) & start snap aligned with padding
                    'w-[82vw] sm:w-[65vw] max-w-[340px] flex-shrink-0 snap-start',
                    // Desktop: auto width grid item
                    'md:w-auto md:max-w-none md:flex-shrink'
                  )}
                >
                  <figure
                    className={cn(
                      'group relative overflow-hidden transition-all duration-500',
                      // Mobile luxury card styling: refined border, rounded corners, ambient shadow
                      'rounded-2xl border border-gold/25 bg-background/50 shadow-[0_12px_36px_rgba(0,0,0,0.55)]',
                      // Desktop reset to original clean luxury look
                      'md:rounded-none md:border-none md:bg-transparent md:shadow-none'
                    )}
                  >

                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={BOTANICAL_IMAGES[i] || '/placeholder.svg'}
                        alt={item.alt}
                        className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      {/* Atmospheric luxury dual gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
                      <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                    </div>

                    <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7">
                      <p className="font-display text-[0.72rem] uppercase italic tracking-wide-luxe text-gold/90">
                        {item.latin}
                      </p>
                      <h3 className="mt-1 font-display text-2xl sm:text-3xl font-light text-ivory tracking-wide">
                        {item.name}
                      </h3>
                      <p className="mt-2.5 max-w-xs text-xs sm:text-sm font-light leading-relaxed text-ivory/70 line-clamp-3">
                        {item.note}
                      </p>
                    </figcaption>
                  </figure>
                </div>
              ))}

              {/* Trailing space for smooth end padding on mobile */}
              <div className="w-1 flex-shrink-0 md:hidden" aria-hidden="true" />
            </div>

            {/* Mobile Controls: Dots + Step Buttons + Cue (Mobile Only) */}
            <div className="mt-6 flex flex-col items-center gap-3 md:hidden">
              <div className="flex items-center gap-4">
                {/* Backward Button */}
                <button
                  type="button"
                  onClick={handleBackward}
                  disabled={activeIndex === 0}
                  aria-label={isRtl ? 'گیاه قبلی' : 'Previous botanical'}
                  className={cn(
                    'flex size-8 items-center justify-center rounded-full border border-gold/30 bg-background/80 text-gold transition-all backdrop-blur-md active:scale-95',
                    activeIndex === 0
                      ? 'opacity-25 cursor-not-allowed border-border/30 text-muted-foreground'
                      : 'hover:border-gold hover:bg-gold/15'
                  )}
                >
                  {isRtl ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
                </button>

                {/* Progress Dots */}
                <div className="flex items-center gap-2 px-1">
                  {t.botanicals.items.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToCard(idx)}
                      aria-label={isRtl ? `گیاه شماره ${idx + 1}` : `Botanical ${idx + 1}`}
                      className={cn(
                        'h-1.5 rounded-full transition-all duration-300',
                        activeIndex === idx
                          ? 'w-7 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.45)]'
                          : 'w-2 bg-gold/25 hover:bg-gold/50'
                      )}
                    />
                  ))}
                </div>

                {/* Forward Button */}
                <button
                  type="button"
                  onClick={handleForward}
                  disabled={activeIndex === t.botanicals.items.length - 1}
                  aria-label={isRtl ? 'گیاه بعدی' : 'Next botanical'}
                  className={cn(
                    'flex size-8 items-center justify-center rounded-full border border-gold/30 bg-background/80 text-gold transition-all backdrop-blur-md active:scale-95',
                    activeIndex === t.botanicals.items.length - 1
                      ? 'opacity-25 cursor-not-allowed border-border/30 text-muted-foreground'
                      : 'hover:border-gold hover:bg-gold/15'
                  )}
                >
                  {isRtl ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
