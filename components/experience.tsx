'use client'

import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n/context'

export function Experience() {
  const { t } = useLanguage()

  return (
    <section
      id="experience"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-32"
    >
      <div className="absolute inset-0">
        <img
          src="/experience-glass.png"
          alt={t.experience.imgAlt}
          className="size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        <Reveal>
          <p className="text-xs font-light uppercase tracking-luxe text-gold">
            {t.experience.tag}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,6vw,5rem)] font-light leading-[1.05] text-balance text-ivory text-shadow-cinema">
            {t.experience.heading}
          </h2>
        </Reveal>
        <Reveal delay={260}>
          <p className="mx-auto mt-8 max-w-md text-base font-light leading-relaxed text-ivory/75">
            {t.experience.paragraph}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
