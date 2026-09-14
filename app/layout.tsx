import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost, Vazirmatn } from 'next/font/google'

import { LanguageProvider } from '@/lib/i18n/context'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Bariz · Nature, Distilled.',
  description:
    'Bariz: Persian botanical distilled waters. A luxury collection of natural araghiyat crafted from rose, mint and chicory. Nature, distilled. Time perfected.',
  generator: 'v0.app',
  openGraph: {
    title: 'Bariz · Nature, Distilled.',
    description: 'Persian botanical distilled waters. Nature, distilled. Time perfected.',
    images: ['/bariz-hero.webp'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#12100c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className={`dark ${cormorant.variable} ${jost.variable} ${vazirmatn.variable}`}>
      <body className="bg-background antialiased">
        <LanguageProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  )
}
