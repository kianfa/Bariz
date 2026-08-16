import { Reveal } from '@/components/reveal'

export function Story() {
  return (
    <section
      id="story"
      className="relative mx-auto max-w-4xl px-6 py-32 text-center md:py-48"
    >
      <Reveal>
        <span className="text-gold/70" aria-hidden>
          &#10022;
        </span>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-8 font-display text-[clamp(1.6rem,4.5vw,3.4rem)] font-light leading-[1.35] text-balance text-ivory">
          For centuries, the gardens of Persia have surrendered their essence to
          patient hands and slow fire — <span className="text-gold">a single, luminous drop</span> at a time.
        </p>
      </Reveal>

      <Reveal delay={260}>
        <p className="mx-auto mt-10 max-w-xl text-sm font-light leading-relaxed tracking-wide text-ivory/60">
          Bariz continues that unhurried tradition of araghiyat — capturing the
          living soul of each botanical in its purest, most graceful form.
        </p>
      </Reveal>

      <Reveal delay={360}>
        <span className="mx-auto mt-12 block h-px w-24 gold-line" />
      </Reveal>
    </section>
  )
}
