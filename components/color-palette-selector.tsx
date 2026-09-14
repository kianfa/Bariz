'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Palette, Sparkles, Sliders } from 'lucide-react'
import { useLanguage, useColorPalette } from '@/lib/i18n/context'
import { ColorPalette } from '@/lib/theme/color-palettes'
import { cn } from '@/lib/utils'

export function ColorPaletteSelector({ className }: { className?: string }) {
  const { isRtl } = useLanguage()
  const { colorPalette, setColorPalette, colorPalettes } = useColorPalette()
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'curated' | 'ai'>('all')
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

  const curatedCount = colorPalettes.filter((p) => p.source !== 'ai').length
  const aiCount = colorPalettes.filter((p) => p.source === 'ai').length

  const filteredPalettes = colorPalettes.filter((p) => {
    if (activeTab === 'curated') return p.source !== 'ai'
    if (activeTab === 'ai') return p.source === 'ai'
    return true
  })

  return (
    <div ref={menuRef} className={cn('relative inline-block text-left', className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={isRtl ? 'انتخاب پالت رنگ' : 'Select Color Palette'}
        className={cn(
          'group flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.72rem] font-light transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/70',
          open
            ? 'border-gold/60 bg-gold/15 text-gold'
            : 'border-gold/25 bg-background/40 text-ivory/85 hover:border-gold/50 hover:bg-gold/10 hover:text-gold'
        )}
      >
        {/* Active mini swatch dots */}
        <div className="flex items-center -space-x-1 rtl:space-x-reverse" aria-hidden="true">
          <span
            className="size-2.5 rounded-full border border-black/30 shadow-xs"
            style={{ backgroundColor: colorPalette.colors.background }}
          />
          <span
            className="size-2.5 rounded-full border border-black/30 shadow-xs"
            style={{ backgroundColor: colorPalette.colors.accent }}
          />
          <span
            className="size-2.5 rounded-full border border-black/30 shadow-xs"
            style={{ backgroundColor: colorPalette.colors.accentMuted }}
          />
        </div>

        <span className="inline-block font-normal truncate max-w-[5.5rem] sm:max-w-none">
          {isRtl ? colorPalette.faName : colorPalette.name}
        </span>

        <ChevronDown
          className={cn(
            'size-3 opacity-70 transition-transform duration-300',
            open && 'rotate-180 text-gold opacity-100'
          )}
        />
      </button>

      {/* Dropdown Comparison Menu */}
      {open && (
        <div
          role="listbox"
          aria-label="Color Palettes"
          className={cn(
            'absolute z-50 mt-2 w-[19.5rem] sm:w-[23rem] md:w-[25rem] rounded-2xl border border-gold/30 bg-card/95 p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200',
            isRtl ? 'left-0 sm:left-auto sm:right-0 origin-top-right' : 'right-0 origin-top-right'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/60 pb-2.5 text-foreground">
            <div className="flex items-center gap-1.5">
              <Palette className="size-3.5 text-gold" />
              <span className="text-[0.75rem] font-medium tracking-wide">
                {isRtl ? 'پالت‌های رنگی باریز' : 'Bariz Color Palettes'}
              </span>
            </div>
            <span className="text-[0.65rem] text-gold/80 font-mono">
              {isRtl ? `${colorPalettes.length} تم زنده` : `${colorPalettes.length} Live Themes`}
            </span>
          </div>

          {/* Filter Tabs */}
          <div className="mt-2.5 flex items-center rounded-xl bg-background/60 p-1 text-[0.68rem] border border-border/50">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={cn(
                'flex-1 py-1 rounded-lg text-center transition-all font-medium',
                activeTab === 'all'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isRtl ? `همه (${colorPalettes.length})` : `All (${colorPalettes.length})`}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('curated')}
              className={cn(
                'flex-1 py-1 rounded-lg text-center transition-all font-medium flex items-center justify-center gap-1',
                activeTab === 'curated'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Sliders className="size-2.5" />
              {isRtl ? `طراحی شده (${curatedCount})` : `Curated (${curatedCount})`}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ai')}
              className={cn(
                'flex-1 py-1 rounded-lg text-center transition-all font-medium flex items-center justify-center gap-1',
                activeTab === 'ai'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Sparkles className="size-2.5" />
              {isRtl ? `پیشنهاد هوش مصنوعی (${aiCount})` : `AI Created (${aiCount})`}
            </button>
          </div>

          {/* Palettes List */}
          <div className="mt-2.5 flex flex-col gap-2 max-h-[22rem] overflow-y-auto pr-1">
            {filteredPalettes.map((palette) => {
              const isSelected = colorPalette.id === palette.id
              const sourceLabel =
                palette.source === 'true-black'
                  ? isRtl ? 'دارک مشکی' : 'True Black'
                  : palette.source === 'curated-dark'
                    ? isRtl ? 'طراحی تاریک' : 'Curated Dark'
                    : palette.source === 'ai'
                      ? isRtl ? 'هوش مصنوعی' : 'AI'
                      : isRtl ? 'طراحی شده' : 'Curated'

              return (
                <button
                  key={palette.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setColorPalette(palette)
                    setOpen(false)
                  }}
                  className={cn(
                    'group/item relative flex flex-col gap-2 rounded-xl p-2.5 text-left rtl:text-right transition-all duration-200 border',
                    isSelected
                      ? 'border-gold/60 bg-gold/15 shadow-inner shadow-gold/10'
                      : 'border-border/60 bg-background/30 hover:border-gold/35 hover:bg-background/60'
                  )}
                >
                  {/* Top line: English & Persian Names + Source Badge + Selected Check */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <span className="flex size-4 items-center justify-center rounded-full bg-gold text-[#14120f] shadow-xs">
                          <Check className="size-2.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="size-4 rounded-full border border-border/80 group-hover/item:border-gold/50" />
                      )}
                      <div>
                        <span className="font-sans text-[0.78rem] font-medium tracking-wide text-foreground">
                          {palette.name}
                        </span>
                        <span className="mx-1.5 text-xs text-muted-foreground">·</span>
                        <span className="text-[0.74rem] text-muted-foreground">
                          {palette.faName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span
                        className={cn(
                          'text-[0.6rem] uppercase tracking-wider px-1.5 py-0.5 rounded-md font-mono border',
                          palette.source === 'true-black'
                            ? 'border-neutral-700 bg-neutral-900 text-neutral-200'
                            : palette.source === 'ai'
                              ? 'border-gold/40 bg-gold/10 text-gold'
                              : palette.source === 'curated-dark'
                                ? 'border-emerald-700/50 bg-emerald-950/40 text-emerald-300'
                                : 'border-border/80 bg-background/50 text-muted-foreground'
                        )}
                      >
                        {sourceLabel}
                      </span>
                      <span className="text-[0.6rem] uppercase px-1 py-0.5 rounded-md bg-background/40 text-muted-foreground/75 font-mono">
                        {palette.mode}
                      </span>
                    </div>
                  </div>

                  {/* Swatches Row */}
                  <div className="flex items-center gap-1.5 w-full">
                    {palette.swatches.map((swatch, idx) => (
                      <div
                        key={idx}
                        className="h-4 flex-1 rounded-md border border-black/15 shadow-2xs transition-transform duration-200 group-hover/item:scale-105"
                        style={{ backgroundColor: swatch }}
                        title={swatch}
                      />
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-[0.68rem] leading-relaxed text-muted-foreground text-left rtl:text-right">
                    {isRtl ? palette.faDescription : palette.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}