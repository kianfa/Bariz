'use client'

import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n/context'

const BOTANICAL_IMAGES = [
  '/botanical-rose.png',
  '/botanical-mint.png',
  '/botanical-chicory.png',
]

export function Botanicals() {
  const { t } = useLanguage()

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

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {t.botanicals.items.map((item, i) => (
            <Reveal key={item.latin} delay={i * 140}>
              <figure className="group relative overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={BOTANICAL_IMAGES[i] || '/placeholder.svg'}
                    alt={item.alt}
                    className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-[0.7rem] uppercase italic tracking-wide-luxe text-gold/80">
                    {item.latin}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-light text-ivory">
                    {item.name}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-ivory/65">
                    {item.note}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
