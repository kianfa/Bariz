'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { translations, Language, Translations } from './translations'
import {
  persianFonts,
  PersianFont,
  DEFAULT_PERSIAN_FONT_ID,
  getPersianFontById,
} from '@/lib/fonts/persian-fonts'

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
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [persianFont, setPersianFontState] = useState<PersianFont>(() =>
    getPersianFontById(DEFAULT_PERSIAN_FONT_ID),
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

