import { Reveal } from '@/components/reveal'

const COLLECTION = [
  { name: 'Chicory Water', tag: 'The Essence of Chicory', note: 'Bittersweet · Cleansing' },
  { name: 'Rose Water', tag: 'The Essence of Rose', note: 'Floral · Honeyed' },
  { name: 'Mint Water', tag: 'The Essence of Mint', note: 'Cool · Verdant' },
]

export function Products() {
  return (
    <section id="products" className="relative px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <p className="text-xs font-light uppercase tracking-luxe text-gold">
            The Collection
          </p>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] text-balance text-ivory">
            The Bariz waters
          </h2>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-ivory/65">
            A trilogy of Persian botanical distilled waters — each bottled in
            gold and plum, each the pure voice of a single plant.
          </p>

          <ul className="mt-12 divide-y divide-border/60 border-y border-border/60">
            {COLLECTION.map((item, i) => (
              <li key={item.name}>
                <Reveal
                  delay={i * 120}
                  className="group flex items-center justify-between gap-4 py-6"
                >
                  <div>
                    <h3 className="font-display text-2xl font-light text-ivory transition-colors group-hover:text-gold">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-display text-xs uppercase italic tracking-wide-luxe text-gold/70">
                      {item.tag}
                    </p>
                  </div>
                  <span className="text-right text-[0.7rem] font-light uppercase tracking-wide-luxe text-ivory/50">
                    {item.note}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160} className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="/bariz-hero.png"
              alt="The Bariz bottle of pure chicory water with its purple and gold label"
              className="size-full scale-[1.6] object-cover object-[76%_38%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
