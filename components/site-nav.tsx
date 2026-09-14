'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { useLanguage } from '@/lib/i18n/context'
import { PersianFontSelector } from '@/components/font-selector'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t.nav.links.story, href: '#story' },
    { label: t.nav.links.botanicals, href: '#botanicals' },
    { label: t.nav.links.craft, href: '#craft' },
    { label: t.nav.links.experience, href: '#experience' },
    { label: t.nav.links.journal, href: '#products' },
  ]

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-700',
        scrolled
          ? 'bg-background/70 py-3 backdrop-blur-md'
          : 'bg-transparent py-5',
      )}
    >
      <nav className="relative mx-auto flex w-full items-center justify-between px-4 sm:px-6 md:px-10 lg:px-12">
        <a
          href="#top"
          className="block w-[4.75rem] shrink-0 md:w-[5.75rem]"
          aria-label={t.nav.homeAria}
        >
          <img
            src="/bariz-logo.svg"
            alt=""
            className="block h-auto w-full"
          />
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-9">
          {links.map((link) => (
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

        <div className="flex items-center gap-2.5 sm:gap-4">
          <PersianFontSelector />

          <button
            onClick={toggleLanguage}
            aria-label={t.nav.langBtnAria}
            className="px-2 py-1 text-[0.775rem] font-light uppercase tracking-luxe text-ivory/90 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 rounded-md"
          >
            {language === 'en' ? 'EN' : 'FA'}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.menuCloseAria : t.nav.menuOpenAria}
            className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/10 lg:hidden"
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
          {links.map((link) => (
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
