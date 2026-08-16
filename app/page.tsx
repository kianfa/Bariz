import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { Story } from '@/components/story'
import { Botanicals } from '@/components/botanicals'
import { Craft } from '@/components/craft'
import { Experience } from '@/components/experience'
import { Products } from '@/components/products'
import { FinalScene } from '@/components/final-scene'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative bg-background">
      <SiteNav />
      <Hero />
      <Story />
      <Botanicals />
      <Craft />
      <Experience />
      <Products />
      <FinalScene />
      <SiteFooter />
    </main>
  )
}
