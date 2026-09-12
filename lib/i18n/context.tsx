'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { translations, Language, Translations } from './translations'

interface LanguageContextType {
  language: Language
  direction: 'ltr' | 'rtl'
  isRtl: boolean
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('bariz_lang') as Language | null
      if (saved === 'en' || saved === 'fa') {
        setLanguageState(saved)
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

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'fa' : 'en'))
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
