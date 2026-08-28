'use client'

import { useEffect, useState } from 'react'

import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

const SLIDE_INTERVAL_MS = 6500

const COLLECTION = [
  {
    name: 'Orange Blossom Water',
    tag: 'THE SCENT OF BLOSSOM',
    note: 'FLORAL · LUMINOUS',
    image: '/webp/عرق بهارنارنج.webp',
    alt: 'The Bariz bottle of orange blossom water with fresh orange blossoms',
  },
  {
    name: 'Bidmeshk Water',
    tag: 'THE SPIRIT OF BIDMESHK',
    note: 'HERBAL · DELICATE',
    image: '/webp/عرق بیدمشک.webp',
    alt: 'The Bariz bottle of bidmeshk water with purple bidmeshk flowers',
  },
  {
    name: 'Tarragon Water',
    tag: 'THE GRACE OF TARRAGON',
    note: 'AROMATIC · REFINED',
    image: '/webp/عرق طارونه.webp',
    alt: 'The Bariz bottle of tarragon water with fresh tarragon sprigs',
  },
  {
    name: 'Chicory Water',
    tag: 'THE ESSENCE OF CHICORY',
    note: 'BITTERSWEET · CLEANSING',
    image: '/webp/عرق کاسنی.webp',
    alt: 'The Bariz bottle of pure chicory water with purple chicory flowers',
  },
  {
    name: 'Nastaran Water',
    tag: 'THE HEART OF NASTARAN',
    note: 'SOFT · BLOSSOMING',
    image: '/webp/عرق نسترن.webp',
    alt: 'The Bariz bottle of nastaran water with wild rose blossoms',
  },
  {
    name: 'Mint Water',
    tag: 'THE BREATH OF MINT',
    note: 'COOL · VERDANT',
    image: '/webp/عرق نعنا.webp',
    alt: 'The Bariz bottle of pure mint water with fresh mint leaves',
  },
  {
    name: 'Saffron Golab',
    tag: 'THE GOLD OF SAFFRON',
    note: 'RADIANT · ORIENTAL',
    image: '/webp/گلاب زعفران.webp',
    alt: 'The Bariz bottle of saffron golab with saffron threads and rose petals',
  },
  {
    name: 'Golab',
    tag: 'THE ESSENCE OF GOLAB',
    note: 'DELICATE · TIMELESS',
    image: '/webp/گلاب.webp',
    alt: 'The Bariz bottle of pure golab with rose petals',
  },
] as const

function NavButton({
  direction,
  disabled,
  onClick,
  className,
}: {
  direction: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous product' : 'Next product'}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'absolute z-10 flex size-[2.116125rem] items-center justify-center rounded-full border border-gold/40 bg-background/50 text-ivory/80 backdrop-blur-sm transition-[color,border-color,opacity] duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 sm:size-[2.3085rem]',
        disabled
          ? 'cursor-default opacity-25'
          : 'hover:border-gold/65 hover:text-gold',
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="size-[0.7695rem] sm:size-[0.8656875rem]"
      >
        {direction === 'prev' ? (
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  )
}

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

  const goToPrevious = () => {
    if (activeIndex > 0) selectProduct(activeIndex - 1)
  }

  const goToNext = () => {
    if (activeIndex < COLLECTION.length - 1) selectProduct(activeIndex + 1)
  }

  const isFirst = activeIndex === 0
  const isLast = activeIndex === COLLECTION.length - 1

  return (
    <section id="products" className="relative px-6 py-24 md:px-10 md:py-36">
      <div
        className="mx-auto grid max-w-[1500px] items-stretch gap-12 lg:grid-cols-2 lg:gap-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsPaused(false)
          }
        }}
      >
        <Reveal className="order-2 flex min-h-0 flex-col lg:order-1 lg:h-full">
          <p className="text-xs font-light uppercase tracking-luxe text-gold">
            The Collection
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.75rem,4.5vw,3.5rem)] font-light leading-[1.05] text-balance text-ivory md:mt-5">
            The Bariz waters
          </h2>
          <p className="mt-4 max-w-xl text-sm font-light leading-snug text-ivory/65 md:mt-5 md:text-base lg:max-w-none">
            The complete Bariz collection — traditional Persian botanical
            distilled waters, each bottled in gold and plum, each the pure voice
            of a single plant.
          </p>

          <div className="mt-5 min-h-0 flex-1 lg:mt-6">
            <ul className="min-h-0 divide-y divide-border/40 border-y border-border/40 lg:h-[87.5%] lg:grid lg:grid-rows-8">
            {COLLECTION.map((item, i) => {
              const isActive = activeIndex === i

              return (
                <li key={item.name} className="min-h-0">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`Show ${item.name}`}
                    onClick={() => selectProduct(i)}
                    className={cn(
                      'group flex h-full w-full items-center gap-2 px-1.5 py-2.5 text-left transition-[opacity,box-shadow] duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:gap-2 lg:px-2 lg:py-0',
                      isActive
                        ? 'opacity-100 ring-1 ring-inset ring-gold/45'
                        : 'opacity-45 hover:opacity-65',
                    )}
                  >
                    <span className="relative size-6 shrink-0">
                      <img
                        src={item.image}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        className="size-full object-contain"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'block truncate font-display text-base leading-tight transition-[color,font-weight] duration-300 motion-reduce:transition-none lg:text-lg',
                          isActive
                            ? 'font-normal text-ivory'
                            : 'font-light text-ivory/80',
                        )}
                      >
                        {item.name}
                      </span>
                      <span
                        className={cn(
                          'mt-0.5 block truncate font-display text-[0.62rem] uppercase italic leading-none tracking-wide-luxe transition-colors duration-300 motion-reduce:transition-none',
                          isActive
                            ? 'text-gold'
                            : 'text-ivory/35 group-hover:text-ivory/45',
                        )}
                      >
                        {item.tag}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'hidden shrink-0 self-center text-right text-[0.62rem] font-light uppercase leading-none tracking-wide-luxe transition-colors duration-300 motion-reduce:transition-none sm:block',
                        isActive
                          ? 'text-gold/90'
                          : 'text-ivory/30 group-hover:text-ivory/40',
                      )}
                    >
                      {item.note}
                    </span>
                  </button>
                </li>
              )
            })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={160} className="order-1 flex min-h-0 w-full justify-center lg:order-2">
          <div
            className="relative aspect-[4/5] w-[85.5%] overflow-hidden"
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

            <NavButton
              direction="prev"
              disabled={isFirst}
              onClick={goToPrevious}
              className="bottom-[11%] left-[40%]"
            />
            <NavButton
              direction="next"
              disabled={isLast}
              onClick={goToNext}
              className="bottom-[11%] right-[40%]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
