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

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/10 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

      {/* Vertical tagline rail */}
      <div
        className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-6 md:flex"
        style={{ opacity: fade }}
      >
        <span className="text-gold/70" aria-hidden>
          &#10022;
        </span>
        <p className="font-display text-xs uppercase leading-[2.2] tracking-luxe text-gold [writing-mode:vertical-rl]">
          Nature, Distilled. Time Perfected.
        </p>
        <span className="h-24 w-px bg-gradient-to-b from-gold/60 to-transparent" />
      </div>

      {/* Main copy */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-20 lg:px-28">
        <div
          className="max-w-3xl"
          style={{ opacity: fade, transform: `translateY(${offset * 0.12}px)` }}
        >
          <h1
            className={`font-display text-[clamp(3.5rem,13vw,11rem)] font-light leading-[0.92] tracking-[0.12em] text-ivory text-shadow-cinema transition-all duration-[1600ms] ease-out ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            BARIZ
          </h1>

          <p
            className={`mt-4 font-display text-[clamp(1.25rem,3.5vw,2.4rem)] font-light uppercase tracking-wide-luxe text-gold transition-all delay-200 duration-[1600ms] ease-out ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Nature, Distilled.
          </p>

          <div
            className={`mt-8 flex items-center gap-4 transition-all delay-500 duration-[1600ms] ease-out ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <span className="h-px w-16 gold-line md:w-28" />
            <span className="text-gold/60" aria-hidden>
              &#9670;
            </span>
          </div>

          <p
            className={`mt-6 text-sm font-light uppercase tracking-wide-luxe text-ivory/80 transition-all delay-700 duration-[1600ms] ease-out sm:text-base ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Persian Botanical Distilled Waters
          </p>

          <a
            href="#story"
            className={`group mt-12 inline-flex items-center gap-4 text-xs font-light uppercase tracking-luxe text-gold transition-all delay-1000 duration-[1600ms] ease-out hover:text-ivory ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            Discover Our World
            <span className="flex size-11 items-center justify-center rounded-full border border-gold/50 transition-all group-hover:border-ivory group-hover:bg-gold/10">
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 md:left-auto md:right-14 md:translate-x-0"
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
