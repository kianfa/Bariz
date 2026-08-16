import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Bariz — Nature, Distilled.',
  description:
    'Bariz — Persian botanical distilled waters. A luxury collection of natural araghiyat crafted from rose, mint and chicory. Nature, distilled. Time perfected.',
  generator: 'v0.app',
  openGraph: {
    title: 'Bariz — Nature, Distilled.',
    description: 'Persian botanical distilled waters. Nature, distilled. Time perfected.',
    images: ['/bariz-hero.png'],
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
    <html lang="en" className={`dark ${cormorant.variable} ${jost.variable}`}>
      <body className="bg-background antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
