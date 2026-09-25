'use client'

import { Reveal } from '@/components/reveal'
import { ParallaxImage } from '@/components/parallax-image'
import { useLanguage } from '@/lib/i18n/context'

export function Craft() {
  const { t } = useLanguage()

  return (
    <section id="craft" className="relative overflow-hidden scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-28">
      <div className="grid items-stretch lg:grid-cols-2">
        <ParallaxImage
          src="/craft-distillation.png"
          alt={t.craft.imgAlt}
          className="h-64 sm:h-80 md:h-96 lg:h-auto lg:min-h-0"
          strength={60}
        />

        <div className="flex items-center bg-secondary/40 px-6 py-12 sm:py-16 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <div className="max-w-lg">
            <Reveal>
              <p className="text-xs font-light uppercase tracking-luxe text-gold">
                {t.craft.tag}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-2.5 font-display text-[clamp(1.75rem,3.2vw,3rem)] font-light leading-[1.1] text-balance text-ivory md:mt-3">
                {t.craft.heading}
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-4 text-xs sm:text-sm lg:text-[0.925rem] font-light leading-relaxed text-ivory/70 md:mt-5">
                {t.craft.para1}
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-3 text-xs sm:text-sm lg:text-[0.925rem] font-light leading-relaxed text-ivory/70 md:mt-4">
                {t.craft.para2}
              </p>
            </Reveal>
            <Reveal delay={420}>
              <div className="mt-6 flex items-center gap-5 md:mt-8 md:gap-6">
                <span className="font-display text-4xl sm:text-5xl font-light text-gold">
                  {t.craft.statNumber}
                </span>
                <span className="max-w-[10rem] text-[0.68rem] sm:text-xs font-light uppercase leading-relaxed tracking-wide-luxe text-ivory/50">
                  {t.craft.statCaption}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
