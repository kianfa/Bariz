'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const [offset, setOffset] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setOffset(window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const fade = Math.max(0, 1 - offset / 620)

  return (
    <section
      id="top"
      className="relative h-[100svh] w-full overflow-hidden"
      aria-label="Bariz — Nature, distilled"
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 scale-110"
        style={{ transform: `translate3d(0, ${offset * 0.35}px, 0) scale(1.1)` }}
      >
        <img
          src="/bariz-hero.webp"
          alt="A bottle of Bariz pure chicory water beside a crystal glass on a stone ledge overlooking a Persian garden at sunset"
          className="size-full object-cover object-[70%_center] md:object-center"
          fetchPriority="high"
        />
      </div>

      {/* Desktop / tablet branding rail */}
      <aside
        className="absolute bottom-[6.5%] left-[clamp(1.75rem,3vw,3rem)] top-[34%] z-10 hidden w-16 flex-col items-center md:flex"
        style={{ opacity: fade }}
        aria-hidden="true"
      >
        <span className="flex size-7 rotate-45 items-center justify-center border border-gold/55 text-gold/80">
          <span className="-rotate-45 text-[0.7rem] leading-none">&#10022;</span>
        </span>

        <p className="mt-5 text-center font-display text-[0.68rem] font-medium uppercase leading-[1.95] tracking-[0.12em] text-gold/85">
          <span className="block">Nature,</span>
          <span className="block">Distilled.</span>
          <span className="block">Time</span>
          <span className="block">Perfected.</span>
        </p>

        <div className="relative mt-8 min-h-24 w-px flex-1 bg-gradient-to-b from-gold/45 via-gold/25 to-gold/10">
          <span className="absolute left-0 top-0 block h-5 w-px animate-scroll-hint bg-gold/70" />
          <span className="absolute -left-[3px] bottom-8 size-[7px] rounded-full border border-gold/70 bg-background/40" />
        </div>

        <span className="mt-3 font-display text-[0.66rem] font-medium uppercase tracking-[0.08em] text-gold/80">
          Scroll
        </span>
      </aside>

      {/* Main copy */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 md:translate-x-12 md:translate-y-10 md:pl-[18vw] md:pr-8 lg:translate-x-[clamp(-2.75rem,-3vw,-1.9rem)] lg:translate-y-12 lg:pl-[18.5vw]">
        <div
          className="max-w-[42rem]"
          style={{ opacity: fade, transform: `translateY(${offset * 0.12}px)` }}
        >
          <h1
            className={`font-display text-[clamp(3.2rem,16vw,4rem)] font-light leading-[0.9] tracking-[0.12em] text-ivory text-shadow-cinema transition-all duration-[1600ms] ease-out md:text-[clamp(5.85rem,9.75vw,10.725rem)] ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            BARIZ
          </h1>

          <p
            className={`mt-3 font-display text-[clamp(1.15rem,4.8vw,1.5rem)] font-light uppercase tracking-wide-luxe text-gold transition-all delay-200 duration-[1600ms] ease-out md:text-[clamp(1.56rem,2.21vw,2.275rem)] ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Nature, Distilled.
          </p>

          <div
            className={`mt-7 flex w-full max-w-[24rem] items-center transition-all delay-500 duration-[1600ms] ease-out ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <span className="h-px flex-1 bg-gradient-to-r from-gold/10 via-gold/45 to-gold/55" />
            <span className="mx-4 text-[0.55rem] text-gold/65" aria-hidden>
              &#9670;
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-gold/55 via-gold/35 to-gold/10" />
          </div>

          <p
            className={`mt-6 text-sm font-light uppercase tracking-wide-luxe text-ivory/80 transition-all delay-700 duration-[1600ms] ease-out sm:text-base md:text-[1.3rem] ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Persian Botanical Distilled Waters
          </p>

          <a
            href="#story"
            className={`group mt-11 inline-flex items-center gap-4 text-xs font-light uppercase tracking-luxe text-gold md:text-[0.975rem] transition-all delay-1000 duration-[1600ms] ease-out hover:text-ivory ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Discover Our World
            <span className="flex size-10 items-center justify-center rounded-full border border-gold/50 transition-all group-hover:border-ivory group-hover:bg-gold/10 md:size-11">
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 md:hidden"
        style={{ opacity: fade }}
      >
        <span className="text-[0.65rem] font-light uppercase tracking-luxe text-ivory/70">
          Scroll
        </span>
        <span className="h-14 w-px overflow-hidden bg-ivory/15">
          <span className="block h-4 w-px animate-scroll-hint bg-gold" />
        </span>
      </div>
    </section>
  )
}
