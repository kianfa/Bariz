export interface PersianFont {
  id: string
  name: string
  label: string
  family: string
  preview: string
  description?: string
}

export const persianFonts: PersianFont[] = [
  {
    id: 'estedad',
    name: 'Estedad',
    label: 'استعداد',
    family: 'Estedad',
    preview: '«عطر طبیعت، در هر قطره»',
    description: 'مدرن، خوانا و با هندسه دقیق',
  },
  {
    id: 'vazirmatn',
    name: 'Vazirmatn',
    label: 'وزیرمتن',
    family: 'Vazirmatn',
    preview: '«عطر طبیعت، در هر قطره»',
    description: 'استاندارد وب و خوانایی بالا در متن',
  },
  {
    id: 'peyda',
    name: 'Peyda',
    label: 'پیدا',
    family: 'Peyda',
    preview: '«عطر طبیعت، در هر قطره»',
    description: 'پویا، معاصر و با فرم‌های نرم',
  },
  {
    id: 'dana',
    name: 'Dana',
    label: 'دانا',
    family: 'Dana',
    preview: '«عطر طبیعت، در هر قطره»',
    description: 'هندسی، لوکس و چشم‌نواز',
  },
  {
    id: 'mikhak',
    name: 'Mikhak',
    label: 'میخک',
    family: 'Mikhak',
    preview: '«عطر طبیعت، در هر قطره»',
    description: 'دست‌خطی لطیف با حس اصالت و هنر',
  },
]

export const DEFAULT_PERSIAN_FONT_ID = 'estedad'

export function getPersianFontById(id: string): PersianFont {
  return (
    persianFonts.find((f) => f.id === id) ||
    persianFonts[0]
  )
}
