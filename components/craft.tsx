import { Reveal } from '@/components/reveal'
import { ParallaxImage } from '@/components/parallax-image'

export function Craft() {
  return (
    <section id="craft" className="relative overflow-hidden">
      <div className="grid items-stretch lg:grid-cols-2">
        <ParallaxImage
          src="/craft-distillation.png"
          alt="A traditional Persian copper alembic still with a single drop of distilled water forming"
          className="h-[60vh] lg:h-auto lg:min-h-[90vh]"
          strength={80}
        />

        <div className="flex items-center bg-secondary/40 px-6 py-24 md:px-16 lg:py-40">
          <div className="max-w-lg">
            <Reveal>
              <p className="text-xs font-light uppercase tracking-luxe text-gold">
                The Craft
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.1] text-balance text-ivory">
                Fire, copper, and time
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 text-base font-light leading-relaxed text-ivory/70">
                Each blossom is gathered at dawn and rested over gentle flame in
                copper alembics unchanged for generations. Steam rises, cools,
                and returns as water — carrying nothing but the pure breath of
                the plant.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-6 text-base font-light leading-relaxed text-ivory/70">
                No shortcuts. No additives. Only the slow alchemy of
                distillation, patiently perfected.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <div className="mt-12 flex items-center gap-6">
                <span className="font-display text-5xl font-light text-gold">
                  1874
                </span>
                <span className="max-w-[10rem] text-xs font-light uppercase leading-relaxed tracking-wide-luxe text-ivory/50">
                  A method carried through the years
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
