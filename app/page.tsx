import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { ScrollSequence } from '@/components/scroll-sequence'
import { Story } from '@/components/story'
import { Botanicals } from '@/components/botanicals'

import { Experience } from '@/components/experience'
import { Products } from '@/components/products'
import { FinalScene } from '@/components/final-scene'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative bg-background">
      <SiteNav />
      <Hero />
      <ScrollSequence />
      <Story />
      <Botanicals />

      <Experience />
      <Products />
      <FinalScene />
      <SiteFooter />
    </main>
  )
}
