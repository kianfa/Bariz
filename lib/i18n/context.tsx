'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { translations, Language, Translations } from './translations'
import {
  persianFonts,
  PersianFont,
  DEFAULT_PERSIAN_FONT_ID,
  getPersianFontById,
} from '@/lib/fonts/persian-fonts'
import {
  colorPalettes,
  ColorPalette,
  DEFAULT_COLOR_PALETTE_ID,
  getColorPaletteById,
} from '@/lib/theme/color-palettes'

interface LanguageContextType {
  language: Language
  direction: 'ltr' | 'rtl'
  isRtl: boolean
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: Translations
  persianFont: PersianFont
  setPersianFont: (font: PersianFont | string) => void
  persianFonts: PersianFont[]
  colorPalette: ColorPalette
  setColorPalette: (palette: ColorPalette | string) => void
  colorPalettes: ColorPalette[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [persianFont, setPersianFontState] = useState<PersianFont>(() =>
    getPersianFontById(DEFAULT_PERSIAN_FONT_ID),
  )
  const [colorPalette, setColorPaletteState] = useState<ColorPalette>(() =>
    getColorPaletteById(DEFAULT_COLOR_PALETTE_ID),
  )
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const savedLang = localStorage.getItem('bariz_lang') as Language | null
      if (savedLang === 'en' || savedLang === 'fa') {
        setLanguageState(savedLang)
      }

      const savedFontId = localStorage.getItem('bariz_persian_font')
      if (savedFontId) {
        const found = getPersianFontById(savedFontId)
        setPersianFontState(found)
      }

      const savedPaletteId =
        localStorage.getItem('bariz-color-palette') ||
        localStorage.getItem('bariz_color_palette')
      if (savedPaletteId) {
        const found = getColorPaletteById(savedPaletteId)
        setColorPaletteState(found)
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const dir = language === 'fa' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    document.documentElement.dir = dir

    if (language === 'fa') {
      document.documentElement.classList.add('lang-fa')
    } else {
      document.documentElement.classList.remove('lang-fa')
    }

    try {
      localStorage.setItem('bariz_lang', language)
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [language, mounted])

  useEffect(() => {
    if (!mounted) return
    document.documentElement.style.setProperty(
      '--font-persian-current',
      `'${persianFont.family}', var(--font-estedad), sans-serif`,
    )
    document.documentElement.setAttribute('data-persian-font', persianFont.id)

    try {
      localStorage.setItem('bariz_persian_font', persianFont.id)
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [persianFont, mounted])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.setAttribute('data-palette', colorPalette.id)
    root.style.colorScheme = colorPalette.mode

    if (colorPalette.mode === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }

    // Set semantic CSS variables
    root.style.setProperty('--background', colorPalette.colors.background)
    root.style.setProperty('--foreground', colorPalette.colors.text)
    root.style.setProperty('--card', colorPalette.colors.surface)
    root.style.setProperty('--card-foreground', colorPalette.colors.text)
    root.style.setProperty('--popover', colorPalette.colors.surface)
    root.style.setProperty('--popover-foreground', colorPalette.colors.text)
    root.style.setProperty('--primary', colorPalette.colors.accent)
    root.style.setProperty('--primary-foreground', colorPalette.colors.buttonText)
    root.style.setProperty('--secondary', colorPalette.colors.surface)
    root.style.setProperty('--secondary-foreground', colorPalette.colors.text)
    root.style.setProperty('--muted', colorPalette.colors.surface)
    root.style.setProperty('--muted-foreground', colorPalette.colors.textMuted)
    root.style.setProperty('--accent', colorPalette.colors.accent)
    root.style.setProperty('--accent-foreground', colorPalette.colors.buttonText)
    root.style.setProperty('--border', colorPalette.colors.border)
    root.style.setProperty('--input', colorPalette.colors.border)
    root.style.setProperty('--ring', colorPalette.colors.focus)
    root.style.setProperty('--gold', colorPalette.colors.accent)
    root.style.setProperty('--gold-muted', colorPalette.colors.accentMuted)
    root.style.setProperty('--ivory', colorPalette.colors.text)
    if (colorPalette.colors.plum) {
      root.style.setProperty('--plum', colorPalette.colors.plum)
    }

    // Semantic CSS custom properties
    root.style.setProperty('--color-background', colorPalette.colors.background)
    root.style.setProperty('--color-surface', colorPalette.colors.surface)
    root.style.setProperty('--color-text', colorPalette.colors.text)
    root.style.setProperty('--color-text-muted', colorPalette.colors.textMuted)
    root.style.setProperty('--color-accent', colorPalette.colors.accent)
    root.style.setProperty('--color-accent-muted', colorPalette.colors.accentMuted)
    root.style.setProperty('--color-border', colorPalette.colors.border)
    root.style.setProperty('--color-inverted-background', colorPalette.colors.invertedBackground)
    root.style.setProperty('--color-inverted-text', colorPalette.colors.invertedText)
    root.style.setProperty('--color-button-background', colorPalette.colors.buttonBackground)
    root.style.setProperty('--color-button-text', colorPalette.colors.buttonText)
    root.style.setProperty('--color-focus', colorPalette.colors.focus)

    try {
      localStorage.setItem('bariz-color-palette', colorPalette.id)
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [colorPalette, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'fa' : 'en'))
  }

  const setPersianFont = (fontOrId: PersianFont | string) => {
    if (typeof fontOrId === 'string') {
      setPersianFontState(getPersianFontById(fontOrId))
    } else {
      setPersianFontState(fontOrId)
    }
  }

  const setColorPalette = (paletteOrId: ColorPalette | string) => {
    if (typeof paletteOrId === 'string') {
      setColorPaletteState(getColorPaletteById(paletteOrId))
    } else {
      setColorPaletteState(paletteOrId)
    }
  }

  const direction = language === 'fa' ? 'rtl' : 'ltr'
  const isRtl = language === 'fa'
  const t = translations[language]

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isRtl,
        setLanguage,
        toggleLanguage,
        t,
        persianFont,
        setPersianFont,
        persianFonts,
        colorPalette,
        setColorPalette,
        colorPalettes,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function usePersianFont() {
  const context = useLanguage()
  return {
    persianFont: context.persianFont,
    setPersianFont: context.setPersianFont,
    persianFonts: context.persianFonts,
  }
}

export function useColorPalette() {
  const context = useLanguage()
  return {
    colorPalette: context.colorPalette,
    setColorPalette: context.setColorPalette,
    colorPalettes: context.colorPalettes,
  }
}


