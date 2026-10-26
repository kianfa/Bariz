'use client'

import { MapPin } from 'lucide-react'
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
 * Rendered behind the iframe as instant visual architecture.
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
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d9aa64" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#120d0a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#mapGlow)" />

      {/* City blocks & street grid */}
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

/**
 * Official Bariz Bespoke Logotype SVG
 * Matches the official header branding mark with luxury precision.
 */
function BarizLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 561 209"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Bariz"
    >
      <path
        d="M 451 77 L 450 79 L 452 86 L 451 94 L 452 96 L 455 98 L 486 99 L 495 98 L 511 98 L 513 99 L 514 105 L 504 116 L 502 120 L 498 124 L 494 131 L 490 135 L 488 139 L 472 158 L 470 162 L 465 167 L 463 171 L 459 174 L 459 175 L 455 180 L 452 189 L 452 196 L 455 199 L 458 200 L 474 199 L 475 200 L 499 200 L 500 199 L 523 200 L 552 199 L 554 198 L 555 196 L 554 188 L 555 180 L 552 177 L 510 177 L 497 176 L 495 174 L 495 170 L 514 147 L 522 134 L 527 129 L 532 121 L 536 117 L 538 113 L 553 96 L 555 91 L 555 79 L 554 77 L 550 75 L 542 75 L 541 76 L 455 75 Z M 411 74 L 408 77 L 408 153 L 409 166 L 408 167 L 408 194 L 410 199 L 412 200 L 419 199 L 432 200 L 435 197 L 434 176 L 435 160 L 435 79 L 431 76 L 420 76 L 416 74 Z M 392 75 L 390 74 L 384 74 L 383 75 L 371 74 L 361 77 L 355 83 L 350 83 L 348 81 L 347 78 L 343 75 L 328 75 L 322 78 L 321 80 L 321 95 L 322 102 L 321 197 L 322 199 L 326 201 L 333 199 L 345 200 L 348 197 L 348 125 L 349 120 L 353 111 L 365 100 L 374 98 L 391 98 L 393 96 L 394 94 L 395 79 Z M 206 83 L 205 85 L 205 93 L 207 96 L 207 103 L 209 105 L 214 105 L 221 101 L 235 97 L 249 96 L 256 97 L 264 100 L 271 107 L 273 111 L 273 114 L 272 117 L 266 122 L 249 121 L 232 123 L 222 126 L 210 132 L 205 136 L 198 144 L 193 153 L 192 157 L 192 172 L 195 182 L 197 185 L 206 194 L 209 196 L 220 201 L 224 202 L 244 202 L 249 201 L 258 197 L 269 188 L 272 188 L 274 190 L 277 198 L 280 200 L 297 200 L 299 198 L 300 194 L 300 154 L 299 148 L 300 131 L 299 110 L 297 103 L 292 92 L 283 83 L 271 77 L 263 76 L 255 73 L 240 73 L 219 77 L 214 79 L 212 81 Z M 273 144 L 273 156 L 271 165 L 269 169 L 260 177 L 256 179 L 247 181 L 237 181 L 227 178 L 220 171 L 218 166 L 218 161 L 221 154 L 225 150 L 235 144 L 243 142 L 256 141 L 261 139 L 268 139 L 270 140 Z M 207 88 L 208 85 L 214 86 L 214 88 L 212 90 L 209 90 Z M 40 10 L 30 16 L 24 21 L 17 29 L 10 40 L 9 46 L 5 54 L 5 196 L 6 198 L 13 198 L 18 196 L 41 194 L 67 196 L 89 202 L 111 203 L 125 201 L 133 197 L 140 195 L 143 192 L 146 191 L 151 186 L 155 184 L 165 172 L 168 164 L 172 158 L 175 146 L 175 124 L 174 117 L 171 108 L 166 97 L 164 94 L 146 77 L 133 71 L 119 69 L 115 66 L 114 64 L 115 48 L 112 37 L 105 25 L 97 17 L 90 12 L 86 10 L 77 8 L 74 6 L 69 5 L 56 5 Z M 134 175 L 133 178 L 132 178 L 130 180 L 126 179 L 126 177 L 128 175 L 131 174 Z M 55 140 L 55 143 L 52 146 L 45 146 L 43 144 L 43 142 L 45 140 L 49 140 L 51 138 L 53 138 Z M 67 84 L 71 85 L 71 87 L 69 89 L 65 88 L 65 86 Z M 74 82 L 75 79 L 78 78 L 83 79 L 82 82 L 80 83 Z M 46 35 L 58 30 L 70 30 L 79 34 L 87 43 L 89 53 L 89 64 L 88 68 L 85 72 L 78 76 L 74 76 L 70 78 L 57 89 L 48 100 L 43 108 L 41 113 L 40 128 L 40 145 L 41 147 L 54 148 L 57 146 L 58 144 L 59 136 L 58 128 L 59 125 L 62 121 L 65 113 L 69 109 L 69 108 L 77 101 L 86 96 L 94 94 L 101 93 L 119 94 L 132 100 L 142 110 L 147 118 L 149 124 L 149 146 L 147 152 L 138 165 L 130 172 L 115 178 L 98 178 L 87 174 L 74 173 L 56 168 L 34 169 L 29 165 L 28 163 L 29 141 L 28 71 L 29 60 L 37 44 Z M 100 27 L 103 28 L 102 31 L 99 30 Z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  )
}

export function SiteFooter() {
  const { t, language } = useLanguage()

  // Verified coordinates and map destination in Tehran
  const lat = 35.727103
  const lng = 51.436052
  const mapAppUrl = 'https://maps.app.goo.gl/TgrXnDnCvsR3o4Mq6'
  const mapEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed&hl=${language === 'fa' ? 'fa' : 'en'}`

  const addressText = t.footer.office.address

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
              className="group inline-flex items-center gap-3.5 w-fit focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d9aa64]/80"
              aria-label="Bariz"
            >
              <div className="relative flex shrink-0 items-center justify-center">
                <img
                  src="/bariz-bottle-icon.png"
                  alt=""
                  className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 drop-shadow-[0_2px_10px_rgba(217,170,100,0.2)] sm:h-11 md:h-12"
                />
              </div>
              <BarizLogo className="h-8.5 sm:h-9.5 md:h-11 w-auto text-gold transition-all duration-300 group-hover:brightness-125 drop-shadow-[0_2px_12px_rgba(217,170,100,0.25)]" />
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

          {/* COLUMN 4 — HEAD OFFICE MAP & ADDRESS (In RTL: Far Left) */}
          <div className="flex flex-col text-start sm:col-span-2 lg:col-span-4 lg:ps-2">
            {/* Embedded Google Map Card displaying exact coordinates (35.727103, 51.436052) */}
            <div className="group relative block aspect-[16/9] w-full overflow-hidden rounded-xl border border-gold/30 bg-[#17100b] shadow-inner transition-all hover:border-gold/60">
              <AbstractMapCanvas />

              <iframe
                src={mapEmbedUrl}
                title={language === 'fa' ? 'نقشه موقعیت دفتر مرکزی باریز' : 'Bariz Head Office Map'}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0 opacity-80 invert-[90%] hue-rotate-180 contrast-[110%] brightness-[85%] transition-opacity duration-300 group-hover:opacity-95"
              />

              {/* Interactive badge & direct click destination to Google Maps */}
              <a
                href={mapAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={language === 'fa' ? 'مشاهده روی نقشه گوگل' : 'Open in Google Maps'}
                className="absolute inset-0 z-10 flex flex-col justify-between p-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="flex items-center justify-end">
                  <span className="flex items-center gap-1 rounded-md border border-gold/35 bg-[#140e0a]/90 px-2 py-0.5 text-[0.65rem] font-medium text-gold shadow-sm backdrop-blur-xs">
                    <MapPin className="size-3 text-gold shrink-0" aria-hidden="true" />
                    <span>35.7271° N, 51.4361° E</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-gold/25 bg-[#140e0a]/85 px-2.5 py-1 text-[0.68rem] font-light text-ivory/90 backdrop-blur-xs transition-colors group-hover:border-gold/50 group-hover:text-gold">
                    {t.footer.office.mapAction} &larr;
                  </span>
                </div>
              </a>
            </div>

            {/* Exact Verified Address Display with 'دفتر مرکزی باریز:' prefix */}
            <div className="mt-4 flex items-start gap-2.5 text-xs font-light leading-relaxed text-ivory/90 sm:text-sm">
              <MapPin className="mt-0.5 size-4.5 shrink-0 text-gold" aria-hidden="true" />
              <span>{addressText}</span>
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
