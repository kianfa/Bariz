import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Story } from '@/components/story'
import { Botanicals } from '@/components/botanicals'

import { Experience } from '@/components/experience'
import { Products } from '@/components/products'
import { FinalScene } from '@/components/final-scene'
import { SiteFooter } from '@/components/site-footer'
import { ScrollSequence } from '@/components/scroll-sequence'

export default function Page() {
  return (
    <main className="relative bg-background">
      <SiteNav />
      <Hero />
      <Story />
      <Botanicals />

      <Experience />
      <Products />
      <FinalScene />
      <ScrollSequence />
      <SiteFooter />
    </main>
  )
}
