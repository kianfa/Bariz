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
    description:
      'A luminous distillate drawn from orange blossom, offering a delicate floral presence in every sip.',
    attributes: ['100% NATURAL', 'PURE DISTILLED', 'FLORAL & LUMINOUS'],
    image: '/webp/عرق بهارنارنج.webp',
    alt: 'The Bariz bottle of orange blossom water with fresh orange blossoms',
  },
  {
    name: 'Bidmeshk Water',
    tag: 'THE SPIRIT OF BIDMESHK',
    note: 'HERBAL · DELICATE',
    description:
      'A gentle herbal water with a soft, meadow-like character — refined and quietly aromatic.',
    attributes: ['100% NATURAL', 'PURE DISTILLED', 'HERBAL & DELICATE'],
    image: '/webp/عرق بیدمشک.webp',
    alt: 'The Bariz bottle of bidmeshk water with purple bidmeshk flowers',
  },
  {
    name: 'Tarragon Water',
    tag: 'THE GRACE OF TARRAGON',
    note: 'AROMATIC · REFINED',
    description:
      'An elegant distillate capturing the vivid, aromatic spirit of fresh tarragon.',
    attributes: ['100% NATURAL', 'PURE DISTILLED', 'AROMATIC & REFINED'],
    image: '/webp/عرق طارونه.webp',
    alt: 'The Bariz bottle of tarragon water with fresh tarragon sprigs',
  },
  {
    name: 'Chicory Water',
    tag: 'THE ESSENCE OF CHICORY',
    note: 'BITTERSWEET · CLEANSING',
    description:
      'A bittersweet botanical water, distilled from wild chicory with quiet depth and character.',
    attributes: ['100% NATURAL', 'PURE DISTILLED', 'BITTERSWEET & CLEANSING'],
    image: '/webp/عرق کاسنی.webp',
    alt: 'The Bariz bottle of pure chicory water with purple chicory flowers',
  },
  {
    name: 'Nastaran Water',
    tag: 'THE HEART OF NASTARAN',
    note: 'SOFT · BLOSSOMING',
    description:
      'A soft, blossoming distillate with the tender grace of wild rose petals.',
    attributes: ['100% NATURAL', 'PURE DISTILLED', 'SOFT & BLOSSOMING'],
    image: '/webp/عرق نسترن.webp',
    alt: 'The Bariz bottle of nastaran water with wild rose blossoms',
  },
  {
    name: 'Mint Water',
    tag: 'THE BREATH OF MINT',
    note: 'COOL · VERDANT',
    description:
      'A crisp and refreshing distillate, capturing the pure, lively aroma of fresh mint.',
    attributes: ['100% NATURAL', 'PURE DISTILLED', 'COOL & REFRESHING'],
    image: '/webp/عرق نعنا.webp',
    alt: 'The Bariz bottle of pure mint water with fresh mint leaves',
  },
  {
    name: 'Saffron Golab',
    tag: 'THE GOLD OF SAFFRON',
    note: 'RADIANT · ORIENTAL',
    description:
      'A radiant rose distillate touched with saffron — golden, floral, and unmistakably Persian.',
    attributes: ['100% NATURAL', 'PURE DISTILLED', 'RADIANT & ORIENTAL'],
    image: '/webp/گلاب زعفران.webp',
    alt: 'The Bariz bottle of saffron golab with saffron threads and rose petals',
  },
  {
    name: 'Golab',
    tag: 'THE ESSENCE OF GOLAB',
    note: 'DELICATE · TIMELESS',
    description:
      'A delicate and timeless rose distillate — the pure essence of golab, distilled with patience.',
    attributes: ['100% NATURAL', 'PURE DISTILLED', 'DELICATE & TIMELESS'],
    image: '/webp/گلاب.webp',
    alt: 'The Bariz bottle of pure golab with rose petals',
  },
] as const

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? 'Previous product' : 'Next product'}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex size-10 items-center justify-center rounded-full border border-gold/40 bg-[rgba(12,14,12,0.55)] text-ivory/80 backdrop-blur-md transition-[color,border-color,opacity,background-color] duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70',
        disabled
          ? 'cursor-default opacity-25'
          : 'hover:border-gold/65 hover:bg-[rgba(12,14,12,0.7)] hover:text-gold',
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="size-4"
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
  const [progress, setProgress] = useState(0)

  const total = COLLECTION.length

  useEffect(() => {
    if (isPaused) return

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % COLLECTION.length)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused, timerReset])

  useEffect(() => {
    if (isPaused) return

    setProgress(0)
    const start = performance.now()
    let frame = 0

    const animate = (now: number) => {
      const elapsed = now - start
      setProgress(Math.min(elapsed / SLIDE_INTERVAL_MS, 1))
      if (elapsed < SLIDE_INTERVAL_MS) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
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
    <section id="products" className="relative w-full overflow-hidden py-16 md:py-24 lg:py-28">
      <div
        className="relative z-20 mx-auto w-full max-w-[1700px] px-5 md:px-8 lg:px-12 xl:px-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsPaused(false)
          }
        }}
      >
        {/* Background full-bleed photography canvas constrained to EXACT Collection content height */}
        <div
          className="pointer-events-none absolute inset-y-0 right-[calc(50%-50vw)] left-[20%] xl:left-[32%] z-0 hidden overflow-hidden lg:block"
          aria-hidden="true"
        >
          {COLLECTION.map((item, index) => (
            <img
              key={item.image}
              src={item.image}
              alt=""
              draggable={false}
              className={cn(
                'absolute inset-0 size-full object-cover object-[85%_top] transition-[opacity,transform] duration-[700ms] ease-out motion-reduce:transition-none [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_5%,rgba(0,0,0,0.75)_15%,black_30%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_5%,rgba(0,0,0,0.75)_15%,black_30%)]',
                activeIndex === index ? 'scale-100 opacity-100' : 'scale-[1.00] opacity-0',
              )}
            />
          ))}

          {/* Narrow multi-stage atmospheric dark gradient transition */}
          <div className="absolute inset-y-0 left-0 z-10 w-[30%] bg-gradient-to-r from-background via-background/80 via-35% to-transparent" />
          <div className="absolute inset-y-0 left-0 z-10 w-[22%] bg-[radial-gradient(ellipse_120%_100%_at_0%_50%,rgba(8,10,8,0.95)_0%,rgba(8,10,8,0.5)_40%,transparent_95%)]" />
          <div className="absolute inset-y-0 left-0 z-10 w-[15%] backdrop-blur-[6px] [mask-image:linear-gradient(to_right,rgba(0,0,0,0.9)_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.9)_0%,transparent_100%)]" />
        </div>

        <div className="relative z-10 grid items-start gap-10 lg:grid-cols-[44%_56%] lg:items-stretch lg:gap-8 xl:grid-cols-[40%_60%] xl:gap-12">
          {/* Left — editorial navigation block moved slightly right */}
          <Reveal className="order-2 flex min-h-0 flex-col lg:order-1 lg:h-full lg:py-1 relative z-30">
            <p className="text-[0.65rem] font-light uppercase tracking-luxe text-gold">
              The Collection
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,3.25rem)] font-light leading-[1.05] text-balance text-ivory lg:mt-4">
              The Bariz waters
            </h2>
            <p className="mt-3 max-w-md text-sm font-light leading-snug text-ivory/60 lg:mt-4 lg:max-w-none lg:text-[0.95rem]">
              The complete Bariz collection — traditional Persian botanical
              distilled waters, each bottled in gold and plum, each the pure voice
              of a single plant.
            </p>

            <ul className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-6 lg:flex-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {COLLECTION.map((item, i) => {
                const isActive = activeIndex === i

                return (
                  <li key={item.name} className="min-w-[17rem] shrink-0 lg:min-w-0 lg:shrink">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-label={`Show ${item.name}`}
                      onClick={() => selectProduct(i)}
                      className={cn(
                        'group flex w-full items-center gap-3 rounded-2xl border px-3 py-2 text-left transition-all duration-500 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:rounded-[14px] lg:px-3.5 lg:py-1.5',
                        isActive
                          ? 'border-gold/30 bg-[rgba(18,22,18,0.55)] opacity-100 backdrop-blur-sm'
                          : 'border-transparent bg-[rgba(12,14,12,0.3)] opacity-50 hover:border-white/5 hover:bg-[rgba(18,20,18,0.45)] hover:opacity-80',
                      )}
                    >
                      <span
                        className={cn(
                          'font-sans text-[0.65rem] tracking-[0.22em] transition-colors duration-500 motion-reduce:transition-none',
                          isActive ? 'text-gold' : 'text-ivory/35',
                        )}
                      >
                        {formatIndex(i)}
                      </span>

                      <span className="relative size-8 shrink-0 lg:size-9">
                        <img
                          src={item.image}
                          alt=""
                          aria-hidden="true"
                          draggable={false}
                          className={cn(
                            'size-full object-contain transition-opacity duration-500 motion-reduce:transition-none',
                            isActive ? 'opacity-100' : 'opacity-45 group-hover:opacity-65',
                          )}
                        />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block truncate font-display text-[0.95rem] leading-tight transition-colors duration-500 motion-reduce:transition-none lg:text-base',
                            isActive ? 'text-ivory' : 'text-ivory/70',
                          )}
                        >
                          {item.name}
                        </span>
                        <span
                          className={cn(
                            'mt-0.5 block truncate font-display text-[0.58rem] uppercase italic leading-none tracking-wide-luxe transition-colors duration-500 motion-reduce:transition-none',
                            isActive ? 'text-gold' : 'text-ivory/30',
                          )}
                        >
                          {item.tag}
                        </span>
                      </span>

                      <span
                        className={cn(
                          'hidden shrink-0 text-right text-[0.58rem] font-light uppercase leading-none tracking-wide-luxe transition-colors duration-500 motion-reduce:transition-none sm:block',
                          isActive ? 'text-gold/80' : 'text-ivory/25',
                        )}
                      >
                        {item.note}
                      </span>

                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        className={cn(
                          'size-3.5 shrink-0 transition-all duration-500 motion-reduce:transition-none',
                          isActive
                            ? 'translate-x-0 text-gold opacity-100'
                            : 'translate-x-0 text-ivory/20 opacity-0 group-hover:opacity-40',
                        )}
                      >
                        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Right — mobile photo view & desktop controls positioning */}
          <Reveal delay={120} className="order-1 flex min-h-0 h-full flex-col justify-end lg:order-2">
            {/* Mobile-only image card */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] lg:hidden">
              {COLLECTION.map((item, index) => (
                <img
                  key={item.image}
                  src={item.image}
                  alt={index === activeIndex ? item.alt : ''}
                  draggable={false}
                  className={cn(
                    'absolute inset-0 size-full object-cover object-[center_42%] transition-[opacity,transform] duration-[700ms] ease-out motion-reduce:transition-none',
                    activeIndex === index ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0',
                  )}
                />
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background/70 to-transparent" />
            </div>

            {/* Navigation & progress controls positioned in bottom-right corner */}
            <div className="mt-4 flex items-center justify-end gap-3 sm:mt-6 lg:mt-0 lg:pb-4 lg:pr-4 xl:pb-6 xl:pr-8">
              <span className="text-[0.62rem] font-light uppercase tracking-[0.22em] text-ivory/50">
                {formatIndex(activeIndex)} / {String(total).padStart(2, '0')}
              </span>

              <div className="h-px w-14 overflow-hidden bg-white/15 sm:w-20">
                <div
                  className="h-full bg-gold/80 transition-none motion-reduce:transition-none"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              <NavButton direction="prev" disabled={isFirst} onClick={goToPrevious} />
              <NavButton direction="next" disabled={isLast} onClick={goToNext} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

