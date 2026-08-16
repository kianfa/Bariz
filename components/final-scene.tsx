import { Reveal } from '@/components/reveal'

export function FinalScene() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-32">
      <div className="absolute inset-0">
        <img
          src="/final-nature.png"
          alt="A lush Persian garden with cypress trees and a reflecting pool at golden hour"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/60" />
      </div>

      <div className="relative z-10 text-center">
        <Reveal>
          <span className="text-gold/70" aria-hidden>
            &#10022;
          </span>
        </Reveal>
        <Reveal delay={140}>
          <h2 className="mt-8 font-display text-[clamp(2.6rem,8vw,7rem)] font-light leading-[1] text-balance text-ivory text-shadow-cinema">
            Bring Nature Closer.
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <span className="mx-auto mt-10 block h-px w-28 gold-line" />
        </Reveal>
      </div>
    </section>
  )
}
