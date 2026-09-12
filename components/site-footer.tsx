'use client'

import { useLanguage } from '@/lib/i18n/context'

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border/60 bg-background px-6 py-16 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="font-display text-3xl font-medium tracking-wide text-ivory">
              Bar<span className="text-gold">i</span>z
            </p>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-ivory/55">
              {t.footer.brandTagline}
            </p>
          </div>

          {t.footer.cols.map((col) => (
            <div key={col.title}>
              <p className="text-[0.7rem] font-light uppercase tracking-luxe text-gold">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm font-light text-ivory/60 transition-colors hover:text-gold"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-[0.7rem] font-light uppercase tracking-wide-luxe text-ivory/40 sm:flex-row sm:items-center">
          <span>&copy; {new Date().getFullYear()} {t.footer.copyright}</span>
          <span>{t.footer.crafted}</span>
        </div>
      </div>
    </footer>
  )
}
