'use client'

import { MapPin, Navigation } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

/**
 * High-precision delicate botanical leaf spray illustration
 * Matching the elegant botanical line-art in the reference image.
 */
function BotanicalBranchDecoration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('pointer-events-none select-none text-[#d9aa64]', className)}
      aria-hidden="true"
    >
      {/* Main graceful arching stem */}
      <path
        d="M20 360 C 45 280, 85 180, 195 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Primary leaf 1 - Top pinnacle */}
      <path
        d="M195 40 C 205 20, 225 15, 235 10 C 220 28, 208 45, 195 40 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M197 38 Q 215 22, 230 14" stroke="currentColor" strokeWidth="0.75" />

      {/* Leaf Pair 2 - Upper right & left */}
      <path
        d="M175 68 C 198 55, 222 58, 238 52 C 220 72, 194 78, 175 68 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M178 69 Q 205 63, 232 55" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M165 85 C 145 68, 128 72, 112 65 C 130 85, 150 92, 165 85 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M162 84 Q 138 75, 118 68" stroke="currentColor" strokeWidth="0.75" />

      {/* Leaf Pair 3 */}
      <path
        d="M145 125 C 172 110, 198 115, 215 110 C 195 130, 168 138, 145 125 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M148 126 Q 180 118, 208 112" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M132 142 C 105 125, 82 130, 62 122 C 85 145, 112 152, 132 142 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M129 141 Q 98 132, 68 125" stroke="currentColor" strokeWidth="0.75" />

      {/* Leaf Pair 4 - Mid stem */}
      <path
        d="M112 188 C 142 172, 172 178, 192 172 C 168 195, 138 202, 112 188 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M115 189 Q 152 180, 185 174" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M98 208 C 68 190, 42 195, 20 186 C 45 212, 75 220, 98 208 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M95 207 Q 60 198, 28 190" stroke="currentColor" strokeWidth="0.75" />

      {/* Leaf Pair 5 - Lower stem */}
      <path
        d="M78 255 C 110 238, 142 245, 165 238 C 138 265, 105 272, 78 255 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M81 256 Q 122 246, 158 240" stroke="currentColor" strokeWidth="0.75" />

      <path
        d="M62 278 C 30 260, 12 265, 2 258 C 22 284, 45 292, 62 278 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M59 277 Q 32 268, 8 261" stroke="currentColor" strokeWidth="0.75" />

      {/* Lowermost accent leaf */}
      <path
        d="M48 318 C 75 304, 102 310, 122 305 C 100 328, 72 334, 48 318 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M50 319 Q 84 311, 115 307" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  )
}

/**
 * Stylized Abstract Map Background Pattern
 * Evoking a high-end architectural city grid without external API dependencies.
 */
function AbstractMapCanvas() {
  return (
    <svg
      viewBox="0 0 320 160"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 size-full select-none opacity-20"
      aria-hidden="true"
    >
      {/* Background radial soft tint */}
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d9aa64" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#120d0a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#mapGlow)" />

      {/* City blocks & intersecting streets */}
      <path
        d="M-20 40 L340 130 M-20 120 L340 30 M80 -20 L240 180 M220 -20 L90 180 M160 -20 L160 180"
        stroke="#d9aa64"
        strokeWidth="1.2"
        strokeDasharray="4 2"
      />
      <path
        d="M20 20 L90 20 L90 80 L20 80 Z M130 30 L210 30 L190 75 L130 65 Z M40 100 L110 100 L120 145 L50 145 Z M180 95 L270 95 L250 145 L170 140 Z"
        stroke="#d9aa64"
        strokeWidth="0.8"
        strokeOpacity="0.6"
      />
      <circle cx="160" cy="80" r="28" stroke="#d9aa64" strokeWidth="0.75" strokeOpacity="0.5" strokeDasharray="2 3" />
      <circle cx="160" cy="80" r="14" stroke="#d9aa64" strokeWidth="0.9" strokeOpacity="0.7" />
    </svg>
  )
}

export function SiteFooter() {
  const { t, language, isRtl } = useLanguage()

  // Real verified office address in Tehran
  const addressText = t.footer.office.address
  const encodedAddress = encodeURIComponent('تهران، خیابان سهروردی شمالی، خیابان خلیل حسینی، جنب کوچه تهمتن، پلاک ۲۷')
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`

  // Localized copyright year
  const currentYear = new Date().getFullYear()
  const localizedYear = new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : 'en-US', {
    useGrouping: false,
  }).format(currentYear)

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-[#d9aa64]/20 bg-[#120d09] text-[#f7f4ed] scroll-mt-20"
      aria-label={language === 'fa' ? 'پاورقی وب‌سایت باریز' : 'Bariz Website Footer'}
    >
      {/* Delicate botanical line-art illustration on bottom-right corner */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-[260px] w-[180px] sm:h-[320px] sm:w-[220px] md:h-[380px] md:w-[260px] opacity-35 transition-opacity duration-700 hover:opacity-50">
        <BotanicalBranchDecoration className="size-full origin-bottom-right" />
      </div>

      {/* Delicate botanical line-art illustration on bottom-left corner (mirrored) */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[260px] w-[180px] sm:h-[320px] sm:w-[220px] md:h-[380px] md:w-[260px] opacity-35 transition-opacity duration-700 hover:opacity-50">
        <BotanicalBranchDecoration className="size-full origin-bottom-left -scale-x-100" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1520px] px-6 pt-16 pb-8 sm:px-8 md:px-12 md:pt-20 md:pb-10 lg:px-16 lg:pt-24 lg:pb-12 xl:px-20">
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* COLUMN 1 — BRAND IDENTITY (In RTL: Far Right) */}
          <div className="flex flex-col text-start sm:col-span-2 lg:col-span-4 lg:pe-4">
            <a
              href="#top"
              className="group inline-block w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d9aa64]/80"
              aria-label="Bariz"
            >
              <span className="font-display text-4xl font-normal tracking-wide text-ivory transition-colors group-hover:text-gold sm:text-[2.75rem]">
                Bar<span className="text-gold">i</span>z
              </span>
            </a>

            <p className="mt-4 text-base font-medium leading-snug text-ivory sm:text-lg lg:mt-5">
              {t.footer.brandStatement}
            </p>

            <p className="mt-3 max-w-sm text-xs font-light leading-relaxed text-[#bfae9b] sm:text-sm">
              {t.footer.brandDescription}
            </p>
          </div>

          {/* COLUMN 2 — QUICK ACCESS */}
          <div className="flex flex-col text-start lg:col-span-2">
            <h3 className="font-display text-base font-medium tracking-wide text-gold sm:text-[1.1rem]">
              {t.footer.quickAccess.title}
            </h3>
            <div className="mt-2.5 mb-5 h-[1.5px] w-12 bg-gradient-to-r from-gold/80 to-gold/20 rtl:bg-gradient-to-l" />

            <ul className="space-y-3">
              {t.footer.quickAccess.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block text-xs font-light text-ivory/75 transition-colors duration-200 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 — CUSTOMER SERVICE */}
          <div className="flex flex-col text-start lg:col-span-2">
            <h3 className="font-display text-base font-medium tracking-wide text-gold sm:text-[1.1rem]">
              {t.footer.customerService.title}
            </h3>
            <div className="mt-2.5 mb-5 h-[1.5px] w-12 bg-gradient-to-r from-gold/80 to-gold/20 rtl:bg-gradient-to-l" />

            <ul className="space-y-3">
              {t.footer.customerService.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block text-xs font-light text-ivory/75 transition-colors duration-200 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70 sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4 — HEAD OFFICE & LOCATION ACTIONS (In RTL: Far Left) */}
          <div className="flex flex-col text-start sm:col-span-2 lg:col-span-4 lg:ps-2">
            <h3 className="font-display text-base font-medium tracking-wide text-gold sm:text-[1.1rem]">
              {t.footer.office.title}
            </h3>
            <div className="mt-2.5 mb-5 h-[1.5px] w-12 bg-gradient-to-r from-gold/80 to-gold/20 rtl:bg-gradient-to-l" />

            {/* Stylized Location Preview Card */}
            <div className="relative overflow-hidden rounded-xl border border-gold/25 bg-[#17100b]/80 p-5 shadow-inner backdrop-blur-xs transition-colors hover:border-gold/40">
              <AbstractMapCanvas />

              <div className="relative z-10 flex flex-col items-center justify-center py-2 text-center">
                <MapPin className="mb-2 size-6 text-gold drop-shadow-[0_2px_8px_rgba(217,170,100,0.5)]" />
                <p className="max-w-[240px] text-xs font-light leading-relaxed text-[#c5b5a2]">
                  {t.footer.office.previewNotice}
                </p>
              </div>
            </div>

            {/* Exact Verified Address Display */}
            <div className="mt-4 flex items-start gap-2.5 text-xs font-light leading-relaxed text-ivory/90 sm:text-sm">
              <MapPin className="mt-0.5 size-4.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{addressText}</span>
            </div>

            {/* Functional Actions: Directions & View on Map */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#d5ad6b] px-5 py-2.5 text-xs font-medium text-[#140e0a] shadow-md transition-all duration-300 hover:bg-[#e0bb7b] hover:shadow-[0_4px_16px_rgba(213,173,107,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:text-sm"
              >
                <Navigation
                  className={cn(
                    'size-3.5 fill-[#140e0a] text-[#140e0a]',
                    isRtl ? '-scale-x-100' : '',
                  )}
                  aria-hidden="true"
                />
                <span>{t.footer.office.routeAction}</span>
              </a>

              <div className="hidden h-4 w-px bg-gold/30 sm:block" aria-hidden="true" />

              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-light text-ivory/85 underline underline-offset-4 decoration-gold/40 transition-colors hover:text-gold hover:decoration-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold sm:text-sm"
              >
                {t.footer.office.mapAction}
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gold/20 pt-7 text-xs font-light text-ivory/60 sm:flex-row">
          <p className="order-2 text-center text-ivory/60 sm:order-1 sm:text-start">
            &copy; {localizedYear} {t.footer.copyright}
          </p>

          <div className="order-1 flex items-center gap-3 sm:order-2">
            <a
              href="#privacy"
              className="text-ivory/70 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              {t.footer.privacyLink}
            </a>
            <span className="text-gold/40" aria-hidden="true">
              |
            </span>
            <a
              href="#terms"
              className="text-ivory/70 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
            >
              {t.footer.termsLink}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
