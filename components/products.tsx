'use client'

import { useEffect, useState } from 'react'

import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

const SLIDE_INTERVAL_MS = 6500

const PRODUCT_IMAGES = [
  '/webp/aragh-baharnarenj.webp',
  '/webp/aragh-bidmeshk.webp',
  '/webp/aragh-tarooneh.webp',
  '/webp/aragh-kasni.webp',
  '/webp/aragh-nastaran.webp',
  '/webp/aragh-nana.webp',
  '/webp/golab-zaferan.webp',
  '/webp/golab.webp',
]

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

function NavButton({
  direction,
  disabled,
  onClick,
  prevAria,
  nextAria,
}: {
  direction: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
  prevAria: string
  nextAria: string
}) {
  return (
    <button
      type="button"
      aria-label={direction === 'prev' ? prevAria : nextAria}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex size-7.5 lg:size-[clamp(1.75rem,2.8vh,2.35rem)] items-center justify-center rounded-full border border-gold/40 bg-[rgba(12,14,12,0.55)] text-ivory/80 backdrop-blur-md transition-[color,border-color,opacity,background-color] duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70',
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
        className="size-3 lg:size-3.5 rtl:rotate-180"
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
  const { isRtl, t } = useLanguage()

  const collectionItems = t.products.items
  const total = collectionItems.length

  useEffect(() => {
    if (isPaused) return

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % collectionItems.length)
    }, SLIDE_INTERVAL_MS)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused, timerReset, collectionItems.length])

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
    if (activeIndex < collectionItems.length - 1) selectProduct(activeIndex + 1)
  }

  const isFirst = activeIndex === 0
  const isLast = activeIndex === collectionItems.length - 1

  return (
    <section
      id="products"
      className="relative w-full min-h-screen min-h-[100svh] flex flex-col justify-center overflow-hidden scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-28 py-10 md:py-14 lg:py-12 xl:py-16 bg-[rgb(26,19,14)] text-ivory"
    >
      {/* Background full-bleed photography canvas */}
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 z-0 hidden overflow-hidden lg:block',
          isRtl
            ? 'left-0 right-[22%] xl:right-[20%] 2xl:right-[19%]'
            : 'left-[22%] xl:left-[20%] 2xl:left-[19%] right-0',
        )}
        aria-hidden="true"
      >
        {collectionItems.map((_, index) => (
          <img
            key={PRODUCT_IMAGES[index]}
            src={PRODUCT_IMAGES[index]}
            alt=""
            draggable={false}
            className={cn(
              'absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[700ms] ease-out motion-reduce:transition-none',
              isRtl
                ? 'object-[center_top] [mask-image:linear-gradient(to_left,transparent_0%,rgba(0,0,0,0.15)_4%,rgba(0,0,0,0.85)_16%,black_32%)] [-webkit-mask-image:linear-gradient(to_left,transparent_0%,rgba(0,0,0,0.15)_4%,rgba(0,0,0,0.85)_16%,black_32%)]'
                : 'object-[center_top] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_4%,rgba(0,0,0,0.85)_16%,black_32%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.15)_4%,rgba(0,0,0,0.85)_16%,black_32%)]',
              activeIndex === index ? 'scale-100 opacity-100' : 'scale-[1.01] opacity-0',
            )}
          />
        ))}

        {/* Coordinated warm brownish transition overlay */}
        <div
          className={cn(
            'absolute inset-y-0 z-10 w-[50%]',
            isRtl
              ? 'right-0 bg-gradient-to-l from-[rgb(26,19,14)] via-[rgb(26,19,14)]/95 via-35% via-[rgb(26,19,14)]/65 via-65% via-[rgb(26,19,14)]/20 via-88% to-transparent'
              : 'left-0 bg-gradient-to-r from-[rgb(26,19,14)] via-[rgb(26,19,14)]/95 via-35% via-[rgb(26,19,14)]/65 via-65% via-[rgb(26,19,14)]/20 via-88% to-transparent',
          )}
        />
        <div
          className={cn(
            'absolute inset-y-0 z-10 w-[32%]',
            isRtl
              ? 'right-0 bg-[radial-gradient(ellipse_120%_100%_at_100%_50%,rgb(26,19,14)_0%,rgba(26,19,14,0.6)_50%,transparent_95%)]'
              : 'left-0 bg-[radial-gradient(ellipse_120%_100%_at_0%_50%,rgb(26,19,14)_0%,rgba(26,19,14,0.6)_50%,transparent_95%)]',
          )}
        />
        <div
          className={cn(
            'absolute inset-y-0 z-10 w-[18%]',
            isRtl
              ? 'right-0 backdrop-blur-[4px] [mask-image:linear-gradient(to_left,rgba(0,0,0,0.85)_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,rgba(0,0,0,0.85)_0%,transparent_100%)]'
              : 'left-0 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,rgba(0,0,0,0.85)_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.85)_0%,transparent_100%)]',
          )}
        />

        {/* Top & bottom subtle transitions */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background via-[rgb(26,19,14)]/70 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background via-[rgb(26,19,14)]/70 to-transparent z-20" />
      </div>

      <div
        className={cn(
          'relative z-20 mx-auto w-full max-w-[1920px] px-4 sm:px-6 md:px-8 lg:px-8 xl:px-12 2xl:px-16 rtl:pr-0 flex-1 flex flex-col justify-center',
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsPaused(false)
          }
        }}
      >
        <div
          className={cn(
            'relative z-10 grid items-stretch gap-6 lg:gap-10 lg:min-h-[78vh] xl:min-h-[82vh] lg:py-4',
            isRtl ? 'lg:grid-cols-[4fr_1fr]' : 'lg:grid-cols-[1fr_4fr]',
          )}
        >
          {/* Editorial navigation block (Right Panel in RTL) */}
          <Reveal className="order-2 flex w-full flex-col justify-between lg:order-1 relative z-30 text-start me-auto max-w-[22rem] xl:max-w-[25rem] h-full translate-x-3 lg:translate-x-6 xl:translate-x-8">
            <div className="w-full text-start me-auto">
              <p className="text-xs lg:text-xs xl:text-sm font-medium uppercase tracking-luxe text-gold/90 text-start">
                {t.products.tag}
              </p>
              <h2 className="mt-1.5 lg:mt-2 font-display text-[clamp(1.5rem,2.3vw,3.2rem)] font-light leading-[1.05] text-ivory text-start whitespace-nowrap">
                {t.products.heading}
              </h2>
              <p className="mt-2 lg:mt-2.5 w-full text-xs sm:text-sm lg:text-[0.92rem] xl:text-[0.98rem] font-light leading-relaxed text-gold/90 text-start tracking-wide">
                {t.products.description}
              </p>
              {/* Reference-matching decorative gold accent line */}
              <div className="mt-3 mb-1 h-[1.5px] w-16 bg-gradient-to-r from-gold/80 via-gold/40 to-transparent rtl:bg-gradient-to-l" />
            </div>

            {/* Editorial Product Selector List strictly matching Reference Specification */}
            <ul className="mt-5 flex flex-col gap-0 w-full me-auto divide-y divide-white/[0.06] border-t border-b border-white/[0.06] pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-5 lg:flex-1 lg:justify-center lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {collectionItems.map((item, i) => {
                const isActive = activeIndex === i

                return (
                  <li key={item.name} className="w-full">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-label={t.products.showProductAria(item.name)}
                      onClick={() => selectProduct(i)}
                      className={cn(
                        'group relative flex w-full items-center gap-3.5 lg:gap-4 py-2.5 lg:py-3 px-2 text-start transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 bg-transparent',
                        isActive
                          ? 'text-ivory'
                          : 'text-ivory/60 hover:text-ivory/90 hover:bg-white/[0.015]',
                      )}
                    >
                      {/* Active vertical gold indicator line (left edge facing visual canvas in RTL) */}
                      <span
                        className={cn(
                          'absolute top-1/2 -translate-y-1/2 w-[2.5px] h-7 lg:h-8 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.6)] transition-all duration-300 motion-reduce:transition-none',
                          isRtl ? 'left-0' : 'right-0',
                          isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
                        )}
                        aria-hidden="true"
                      />

                      {/* 1. Product Number (01, 02...) - Far Right in RTL (Increased by ~20%) */}
                      <span
                        className={cn(
                          'font-serif text-2xl lg:text-3xl xl:text-4xl font-light tracking-wider transition-all duration-300 shrink-0 w-10 lg:w-11 text-start',
                          isActive
                            ? 'text-gold font-normal scale-105'
                            : 'text-ivory/20 group-hover:text-ivory/45',
                        )}
                      >
                        {formatIndex(i)}
                      </span>

                      {/* 2. Botanical Icon / Thumbnail */}
                      <span className="relative size-6.5 shrink-0 lg:size-7.5 xl:size-8.5">
                        <img
                          src={PRODUCT_IMAGES[i]}
                          alt=""
                          aria-hidden="true"
                          draggable={false}
                          className={cn(
                            'size-full object-contain transition-all duration-300 motion-reduce:transition-none',
                            isActive
                              ? 'opacity-100 scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]'
                              : 'opacity-40 grayscale-[30%] group-hover:opacity-75 group-hover:grayscale-0',
                          )}
                        />
                      </span>

                      {/* 3. Product Name & Subtitle */}
                      <span className="min-w-0 flex-1 text-start">
                        <span
                          className={cn(
                            'block truncate font-display text-sm lg:text-[0.98rem] xl:text-[1.08rem] leading-tight transition-colors duration-300 motion-reduce:transition-none',
                            isActive
                              ? 'text-ivory font-semibold'
                              : 'text-ivory/60 group-hover:text-ivory/90',
                          )}
                        >
                          {item.name}
                        </span>
                        <span
                          className={cn(
                            'mt-0.5 block truncate font-display text-[0.62rem] lg:text-xs uppercase italic leading-none tracking-wide-luxe transition-colors duration-300 motion-reduce:transition-none',
                            isActive ? 'text-gold/90 font-medium' : 'text-ivory/30',
                          )}
                        >
                          {item.tag}
                        </span>
                      </span>

                      {/* 4. Secondary Note */}
                      <span
                        className={cn(
                          'hidden shrink-0 text-start text-[0.62rem] lg:text-xs font-light uppercase leading-none tracking-wide-luxe transition-colors duration-300 motion-reduce:transition-none sm:block me-2',
                          isActive ? 'text-gold/80 font-medium' : 'text-ivory/25',
                        )}
                      >
                        {item.note}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Right - mobile photo view & desktop controls positioning */}
          <Reveal delay={120} className="order-1 flex min-h-0 h-full flex-col justify-end lg:order-2">
            {/* Mobile-only image card */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl lg:hidden">
              {collectionItems.map((item, index) => (
                <img
                  key={PRODUCT_IMAGES[index]}
                  src={PRODUCT_IMAGES[index]}
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

            {/* Navigation & progress controls matching reference bottom left placement */}
            <div className="mt-3 flex items-center justify-end gap-3 sm:mt-4 lg:mt-0 lg:pb-2 lg:pr-3 xl:pb-4 xl:pr-4 rtl:lg:pr-0 rtl:lg:pl-3 rtl:xl:pr-0 rtl:xl:pl-4">
              <NavButton
                direction="prev"
                disabled={isFirst}
                onClick={goToPrevious}
                prevAria={t.products.prevProductAria}
                nextAria={t.products.nextProductAria}
              />
              <NavButton
                direction="next"
                disabled={isLast}
                onClick={goToNext}
                prevAria={t.products.prevProductAria}
                nextAria={t.products.nextProductAria}
              />

              <div className="h-px w-14 overflow-hidden bg-white/20 sm:w-20 lg:w-24">
                <div
                  className="h-full bg-gold/90 transition-none motion-reduce:transition-none"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

              <span className="text-xs lg:text-sm font-light uppercase tracking-[0.2em] text-gold/90 font-mono">
                {formatIndex(activeIndex)} <span className="text-ivory/40">/ {String(total).padStart(2, '0')}</span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

