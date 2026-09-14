'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Type } from 'lucide-react'
import { useLanguage, usePersianFont } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

export function PersianFontSelector({ className }: { className?: string }) {
  const { language, isRtl } = useLanguage()
  const { persianFont, setPersianFont, persianFonts } = usePersianFont()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={menuRef} className={cn('relative inline-block text-left', className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={isRtl ? 'انتخاب فونت فارسی' : 'Select Persian Font'}
        className={cn(
          'group flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.72rem] font-light transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70',
          open
            ? 'border-gold/60 bg-gold/15 text-gold'
            : 'border-gold/25 bg-background/40 text-ivory/85 hover:border-gold/50 hover:bg-gold/10 hover:text-gold'
        )}
      >
        <Type className="size-3 text-gold/80 transition-transform duration-300 group-hover:scale-110" />
        <span className="inline-block font-normal">
          {isRtl ? persianFont.label : `فونت: ${persianFont.label}`}
        </span>
        <ChevronDown
          className={cn(
            'size-3 opacity-70 transition-transform duration-300',
            open && 'rotate-180 text-gold opacity-100'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          role="listbox"
          aria-label="Persian Fonts"
          className={cn(
            'absolute z-50 mt-2 w-72 sm:w-80 rounded-2xl border border-gold/30 bg-[#14120f]/95 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200',
            isRtl ? 'left-0 sm:left-auto sm:right-0 origin-top-right' : 'right-0 origin-top-right'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gold/15 px-3 py-2 text-[0.7rem] text-ivory/60">
            <span className="font-mono uppercase tracking-wider">
              {isRtl ? 'انتخاب قلم فارسی' : 'Persian Typography'}
            </span>
            <span className="text-[0.65rem] text-gold/70">
              {isRtl ? 'پیش‌نمایش زنده' : 'Live Preview'}
            </span>
          </div>

          {/* Options */}
          <div className="mt-1 flex flex-col gap-1 max-h-80 overflow-y-auto pr-0.5">
            {persianFonts.map((font) => {
              const isSelected = persianFont.id === font.id
              const previewClass = `font-preview-${font.id}`

              return (
                <button
                  key={font.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setPersianFont(font)
                    setOpen(false)
                  }}
                  className={cn(
                    'group/item relative flex flex-col gap-1 rounded-xl p-2.5 text-right transition-all duration-200 border',
                    isSelected
                      ? 'border-gold/50 bg-gold/15 text-ivory shadow-inner shadow-gold/5'
                      : 'border-transparent text-ivory/80 hover:border-gold/25 hover:bg-gold/5 hover:text-ivory'
                  )}
                >
                  {/* Top line: English name + Persian name + Check icon */}
                  <div className="flex items-center justify-between w-full text-xs">
                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <span className="flex size-4 items-center justify-center rounded-full bg-gold text-[#14120f]">
                          <Check className="size-2.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="size-4 rounded-full border border-gold/30 group-hover/item:border-gold/60" />
                      )}
                      <span className="font-sans text-[0.75rem] font-medium tracking-wide text-gold">
                        {font.name}
                      </span>
                    </div>

                    <span
                      className={cn(
                        'text-[0.8rem] font-medium text-ivory/90',
                        previewClass
                      )}
                    >
                      {font.label}
                    </span>
                  </div>

                  {/* Font Preview Sentence */}
                  <div
                    dir="rtl"
                    className={cn(
                      'mt-0.5 rounded-lg bg-black/30 px-2.5 py-1.5 text-center text-sm font-normal text-ivory transition-colors',
                      isSelected ? 'text-gold-100 bg-gold/10' : 'text-ivory/90',
                      previewClass
                    )}
                  >
                    {font.preview}
                  </div>

                  {/* Optional short description */}
                  {font.description && (
                    <div
                      dir="rtl"
                      className="text-[0.65rem] text-ivory/50 px-1 text-right"
                    >
                      {font.description}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}