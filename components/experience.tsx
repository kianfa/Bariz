import { Reveal } from '@/components/reveal'

export function Experience() {
  return (
    <section
      id="experience"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-32"
    >
      <div className="absolute inset-0">
        <img
          src="/experience-glass.png"
          alt="An elegant cut-crystal glass of Bariz botanical water with a floating chicory blossom, backlit at golden hour"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative z-10 max-w-2xl text-center">
        <Reveal>
          <p className="text-xs font-light uppercase tracking-luxe text-gold">
            The Experience
          </p>
        </Reveal>
        <Reveal delay={140}>
          <h2 className="mt-6 font-display text-[clamp(2.2rem,6vw,5rem)] font-light leading-[1.05] text-balance text-ivory text-shadow-cinema">
            Poured, still and clear
          </h2>
        </Reveal>
        <Reveal delay={260}>
          <p className="mx-auto mt-8 max-w-md text-base font-light leading-relaxed text-ivory/75">
            Serve chilled over ice, or as a whisper within tea, cocktails and
            quiet moments. A sip of Bariz is a garden, distilled to its most
            elegant expression.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
