'use client'

import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

function BotanicalAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('pointer-events-none select-none text-[#d9aa64]', className)}
      aria-hidden="true"
    >
      <path
        d="M20 360 C 45 280, 85 180, 195 40"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M195 40 C 205 20, 225 15, 235 10 C 220 28, 208 45, 195 40 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M197 38 Q 215 22, 230 14" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M175 68 C 198 55, 222 58, 238 52 C 220 72, 194 78, 175 68 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M178 69 Q 205 63, 232 55" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M165 85 C 145 68, 128 72, 112 65 C 130 85, 150 92, 165 85 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M162 84 Q 138 75, 118 68" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M142 122 C 168 108, 194 112, 212 106 C 190 128, 162 135, 142 122 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M146 123 Q 178 116, 204 109" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M130 145 C 108 126, 90 130, 72 122 C 92 144, 112 152, 130 145 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M126 144 Q 100 133, 78 126" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M106 186 C 134 170, 162 175, 180 168 C 158 192, 128 200, 106 186 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M110 187 Q 145 178, 172 171" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M92 214 C 68 192, 48 196, 28 188 C 50 212, 72 222, 92 214 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M88 213 Q 60 201, 35 192" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M68 260 C 96 242, 126 248, 145 240 C 122 266, 90 275, 68 260 Z"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M72 261 Q 110 251, 138 243" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  )
}

export function AboutUs() {
  const { t } = useLanguage()

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-background via-[#16100c] to-[#120d09] px-6 py-24 sm:px-10 sm:py-32 md:py-36 lg:py-44 text-ivory scroll-mt-20"
      aria-label={t.aboutUs.heading}
    >
      {/* Ambient warm champagne gold glow in the background */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 -z-0 size-[550px] rounded-full bg-[#d9aa64]/5 blur-[140px]"
        aria-hidden="true"
      />

      {/* Delicate botanical line-art illustration on side edge */}
      <div
        className="pointer-events-none absolute -bottom-10 end-0 z-0 h-[320px] w-[220px] sm:h-[400px] sm:w-[280px] opacity-15 md:opacity-20"
        aria-hidden="true"
      >
        <BotanicalAccent className="size-full origin-bottom-right" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Main 2-column editorial grid */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* Brand Story Column (In RTL: Right side) */}
          <div className="flex flex-col text-start lg:col-span-7 xl:col-span-7">
            {/* Eyebrow Label */}
            <Reveal>
              <div className="flex items-center gap-2.5 text-xs font-light uppercase tracking-widest text-gold sm:text-sm">
                <span className="text-[0.65rem] text-gold/80" aria-hidden="true">
                  ✦
                </span>
                <span>{t.aboutUs.eyebrow}</span>
                <span className="h-px w-8 bg-gradient-to-r from-gold/60 to-transparent rtl:bg-gradient-to-l" />
              </div>
            </Reveal>

            {/* Main Section Heading */}
            <Reveal delay={100}>
              <h2 className="mt-4 font-display text-3xl font-light leading-[1.3] text-balance text-ivory sm:text-4xl md:text-5xl lg:text-[3.25rem] text-shadow-cinema">
                {t.aboutUs.heading}
              </h2>
            </Reveal>

            {/* Thin gold accent line */}
            <Reveal delay={150}>
              <div className="mt-5 mb-8 h-[1.5px] w-20 bg-gradient-to-r from-gold/80 to-transparent rtl:bg-gradient-to-l" />
            </Reveal>

            {/* Introductory Statement with visual emphasis */}
            <Reveal delay={200}>
              <div className="relative border-s-2 border-gold/60 ps-5 sm:ps-6 py-1">
                <p className="font-display text-lg sm:text-xl md:text-[1.25rem] font-medium leading-[1.85] text-ivory/95 text-balance">
                  {t.aboutUs.intro}
                </p>
              </div>
            </Reveal>

            {/* Full Brand Story Paragraphs */}
            <div className="mt-8 space-y-6 text-sm sm:text-base md:text-[1.03rem] font-light leading-[2.2] text-ivory/80 text-justify">
              {t.aboutUs.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={250 + index * 80}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Heritage Milestones Column (In RTL: Left side) */}
          <div className="flex flex-col text-start lg:col-span-5 xl:col-span-5 lg:sticky lg:top-28">
            <Reveal delay={200}>
              <div className="relative rounded-2xl border border-gold/25 bg-[#18110b]/75 p-6 sm:p-8 md:p-9 shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-md">
                {/* Header of Milestones panel */}
                <div className="flex items-center justify-between border-b border-gold/20 pb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gold/80" aria-hidden="true">
                      &#10022;
                    </span>
                    <span className="font-display text-sm font-medium tracking-wide text-gold sm:text-base">
                      {t.aboutUs.milestoneTitle}
                    </span>
                  </div>
                  <span className="font-mono text-[0.68rem] tracking-widest text-[#bfae9b]/70 uppercase">
                    1399 — 2026
                  </span>
                </div>

                {/* Milestone Items */}
                <div className="mt-6 divide-y divide-gold/15">
                  {t.aboutUs.milestones.map((item, idx) => (
                    <div key={idx} className={idx > 0 ? 'pt-6 pb-6 last:pb-0' : 'pb-6'}>
                      <span className="font-display text-3xl font-light tracking-tight text-gold sm:text-4xl">
                        {item.value}
                      </span>
                      <h3 className="mt-1.5 text-base font-medium text-ivory sm:text-lg">
                        {item.label}
                      </h3>
                      <p className="mt-1 text-xs font-light leading-relaxed text-[#bfae9b] sm:text-sm">
                        {item.sublabel}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Closing Brand Statement with special visual emphasis */}
        <Reveal delay={450}>
          <div className="mx-auto mt-16 max-w-4xl border-t border-gold/20 pt-10 text-center sm:mt-24 sm:pt-14">
            <span
              className="inline-block text-sm text-gold/70"
              aria-hidden="true"
            >
              &#10022;
            </span>
            <p className="mt-4 font-display text-xl font-normal leading-relaxed tracking-wide text-gold text-balance sm:text-2xl md:text-3xl lg:text-[2.2rem]">
              «{t.aboutUs.closing.replace(/^[«"“]|["”»]$/g, '')}»
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
