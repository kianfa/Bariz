'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Our Story', href: '#story' },
  { label: 'Botanicals', href: '#botanicals' },
  { label: 'Craft', href: '#craft' },
  { label: 'Experience', href: '#experience' },
  { label: 'Journal', href: '#products' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-700',
        scrolled
          ? 'bg-background/70 py-3 backdrop-blur-md'
          : 'bg-transparent py-5',
      )}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
        <a
          href="#top"
          className="font-display text-2xl font-medium tracking-wide text-ivory"
          aria-label="Bariz home"
        >
          Bar<span className="text-gold">i</span>z
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative flex items-center gap-3 text-[0.7rem] font-light uppercase tracking-luxe text-ivory/80 transition-colors hover:text-gold"
              >
                <span className="text-gold/50" aria-hidden>
                  &#9670;
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button className="hidden text-[0.7rem] font-light uppercase tracking-luxe text-ivory/80 transition-colors hover:text-gold sm:block">
            EN
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex size-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="flex flex-col gap-1 px-6 pb-6 pt-4">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border/60 py-3 text-sm font-light uppercase tracking-wide-luxe text-ivory/80 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
