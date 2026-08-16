'use client'

import { useEffect, useState } from 'react'

import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

const SLIDE_INTERVAL_MS = 6500

const COLLECTION = [
  {
    name: 'Chicory Water',
    tag: 'THE ESSENCE OF CHICORY',
    note: 'BITTERSWEET · CLEANSING',
    image: '/bariz-chicory-water.webp',
    alt: 'The Bariz bottle of pure chicory water with purple chicory flowers',
  },
  {
    name: 'Rose Water',
    tag: 'THE SOUL OF THE ROSE',
    note: 'FLORAL · HONEYED',
    image: '/bariz-rose-water.png',
    alt: 'The Bariz bottle of pure rose water with a rose and rose petals',
  },
  {
    name: 'Mint Water',
    tag: 'THE BREATH OF MINT',
    note: 'COOL · VERDANT',
    image: '/bariz-mint-water.webp',
    alt: 'The Bariz bottle of pure mint water with fresh mint leaves',
  },
] as const

export function Products() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [timerReset, setTimerReset] = useState(0)

  useEffect(() => {
    if (isPaused) return

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % COLLECTION.length)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused, timerReset])

  const selectProduct = (index: number) => {
    setActiveIndex(index)
    setTimerReset((current) => current + 1)
  }

  return (
    <section id="products" className="relative px-6 py-24 md:px-10 md:py-36">
      <div
        className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-2 lg:gap-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsPaused(false)
          }
        }}
      >
        <Reveal className="order-2 lg:order-1">
          <p className="text-xs font-light uppercase tracking-luxe text-gold">
            The Collection
          </p>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] text-balance text-ivory">
            The Bariz waters
          </h2>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-ivory/65">
            A trilogy of Persian botanical distilled waters — each bottled in
            gold and plum, each the pure voice of a single plant.
          </p>

          <ul className="mt-12 divide-y divide-border/60 border-y border-border/60">
            {COLLECTION.map((item, i) => {
              const isActive = activeIndex === i

              return (
                <li key={item.name} className="relative">
                  <Reveal delay={i * 120}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-label={`Show ${item.name}`}
                      onClick={() => selectProduct(i)}
                      className="group relative flex w-full items-center justify-between gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      <div>
                        <h3
                          className={cn(
                            'font-display text-2xl font-light transition-colors duration-500 motion-reduce:transition-none',
                            isActive
                              ? 'text-gold'
                              : 'text-ivory group-hover:text-gold',
                          )}
                        >
                          {item.name}
                        </h3>
                        <p
                          className={cn(
                            'mt-1 font-display text-xs uppercase italic tracking-wide-luxe transition-colors duration-500 motion-reduce:transition-none',
                            isActive ? 'text-gold' : 'text-gold/70',
                          )}
                        >
                          {item.tag}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'text-right text-[0.7rem] font-light uppercase tracking-wide-luxe transition-colors duration-500 motion-reduce:transition-none',
                          isActive ? 'text-ivory/75' : 'text-ivory/50',
                        )}
                      >
                        {item.note}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gold transition-opacity duration-500 motion-reduce:transition-none',
                          isActive ? 'opacity-55' : 'opacity-0',
                        )}
                      />
                    </button>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={160} className="order-1 lg:order-2">
          <div
            className="relative aspect-[4/5] overflow-hidden"
            role="img"
            aria-label={COLLECTION[activeIndex].alt}
            aria-live="polite"
          >
            {COLLECTION.map((item, index) => (
              <img
                key={item.image}
                src={item.image}
                alt=""
                aria-hidden="true"
                draggable={false}
                className={cn(
                  'absolute inset-0 size-full scale-[0.79] object-contain transition-opacity duration-700 ease-out motion-reduce:transition-none',
                  activeIndex === index ? 'opacity-100' : 'opacity-0',
                )}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
