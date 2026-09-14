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
        className="size-4 rtl:rotate-180"
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
      className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* Background full-bleed photography canvas spanning entire full-screen section */}
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 z-0 hidden overflow-hidden lg:block',
          isRtl
            ? 'left-0 right-[42%] xl:right-[40%] 2xl:right-[38%]'
            : 'left-[42%] xl:left-[40%] 2xl:left-[38%] right-0',
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

        {/* Multi-stage atmospheric edge gradients */}
        <div
          className={cn(
            'absolute inset-y-0 z-10 w-[30%]',
            isRtl
              ? 'right-0 bg-gradient-to-l from-background via-background/80 via-35% to-transparent'
              : 'left-0 bg-gradient-to-r from-background via-background/80 via-35% to-transparent',
          )}
        />
        <div
          className={cn(
            'absolute inset-y-0 z-10 w-[22%]',
            isRtl
              ? 'right-0 bg-[radial-gradient(ellipse_120%_100%_at_100%_50%,rgba(8,10,8,0.95)_0%,rgba(8,10,8,0.5)_40%,transparent_95%)]'
              : 'left-0 bg-[radial-gradient(ellipse_120%_100%_at_0%_50%,rgba(8,10,8,0.95)_0%,rgba(8,10,8,0.5)_40%,transparent_95%)]',
          )}
        />
        <div
          className={cn(
            'absolute inset-y-0 z-10 w-[15%]',
            isRtl
              ? 'right-0 backdrop-blur-[6px] [mask-image:linear-gradient(to_left,rgba(0,0,0,0.9)_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_left,rgba(0,0,0,0.9)_0%,transparent_100%)]'
              : 'left-0 backdrop-blur-[6px] [mask-image:linear-gradient(to_right,rgba(0,0,0,0.9)_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,rgba(0,0,0,0.9)_0%,transparent_100%)]',
          )}
        />

        {/* Top & bottom subtle transitions */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/35 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/35 to-transparent z-10" />
      </div>

      <div
        className="relative z-20 mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-12 xl:px-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsPaused(false)
          }
        }}
      >
        <div className="relative z-10 grid items-stretch gap-8 lg:grid-cols-[48%_52%] xl:grid-cols-[44%_56%] 2xl:grid-cols-[42%_58%] lg:min-h-[78vh] xl:min-h-[82vh]">
          {/* Editorial navigation block */}
          <Reveal className="order-2 flex flex-col justify-between lg:order-1 relative z-30 lg:py-2">
            <div>
              <p className="text-[0.68rem] font-light uppercase tracking-luxe text-gold">
                {t.products.tag}
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.8vw,3.6rem)] font-light leading-[1.08] text-balance text-ivory lg:mt-3.5">
                {t.products.heading}
              </h2>
              <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-ivory/65 lg:mt-3.5 lg:text-[0.95rem]">
                {t.products.description}
              </p>
            </div>

            <ul className="mt-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-6 lg:flex-1 lg:flex-col lg:justify-center lg:gap-1.5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {collectionItems.map((item, i) => {
                const isActive = activeIndex === i

                return (
                  <li key={item.name} className="min-w-[17rem] shrink-0 lg:min-w-0 lg:shrink">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      aria-label={t.products.showProductAria(item.name)}
                      onClick={() => selectProduct(i)}
                      className={cn(
                        'group flex w-full items-center gap-3 rounded-2xl border px-3 py-2 text-left rtl:text-right transition-all duration-500 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:rounded-[14px] lg:px-3.5 lg:py-2',
                        isActive
                          ? 'border-gold/30 bg-[rgba(18,22,18,0.55)] opacity-100 backdrop-blur-sm shadow-sm'
                          : 'border-transparent bg-[rgba(12,14,12,0.3)] opacity-50 hover:border-white/5 hover:bg-[rgba(18,20,18,0.45)] hover:opacity-80',
                      )}
                    >
                      <span
                        className={cn(
                          'font-sans text-[0.68rem] tracking-[0.22em] transition-colors duration-500 motion-reduce:transition-none',
                          isActive ? 'text-gold' : 'text-ivory/35',
                        )}
                      >
                        {formatIndex(i)}
                      </span>

                      <span className="relative size-8 shrink-0 lg:size-9">
                        <img
                          src={PRODUCT_IMAGES[i]}
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
                            'block truncate font-display text-[0.95rem] leading-tight transition-colors duration-500 motion-reduce:transition-none lg:text-[1.02rem]',
                            isActive ? 'text-ivory' : 'text-ivory/70',
                          )}
                        >
                          {item.name}
                        </span>
                        <span
                          className={cn(
                            'mt-0.5 block truncate font-display text-[0.6rem] uppercase italic leading-none tracking-wide-luxe transition-colors duration-500 motion-reduce:transition-none',
                            isActive ? 'text-gold' : 'text-ivory/30',
                          )}
                        >
                          {item.tag}
                        </span>
                      </span>

                      <span
                        className={cn(
                          'hidden shrink-0 text-right rtl:text-left text-[0.6rem] font-light uppercase leading-none tracking-wide-luxe transition-colors duration-500 motion-reduce:transition-none sm:block',
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
                          'size-3.5 shrink-0 transition-all duration-500 motion-reduce:transition-none rtl:rotate-180',
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

          {/* Right - mobile photo view & desktop controls positioning */}
          <Reveal delay={120} className="order-1 flex min-h-0 h-full flex-col justify-end lg:order-2">
            {/* Mobile-only image card */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] lg:hidden">
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

            {/* Navigation & progress controls positioned in bottom corner */}
            <div className="mt-4 flex items-center justify-end gap-3.5 sm:mt-6 lg:mt-0 lg:pb-4 lg:pr-4 xl:pb-6 xl:pr-8 rtl:lg:pr-0 rtl:lg:pl-4 rtl:xl:pr-0 rtl:xl:pl-8">
              <span className="text-[0.65rem] font-light uppercase tracking-[0.22em] text-ivory/50">
                {formatIndex(activeIndex)} / {String(total).padStart(2, '0')}
              </span>

              <div className="h-px w-14 overflow-hidden bg-white/15 sm:w-24">
                <div
                  className="h-full bg-gold/80 transition-none motion-reduce:transition-none"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>

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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

