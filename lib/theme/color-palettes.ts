export type PaletteSource = 'curated' | 'ai' | 'curated-dark' | 'true-black'
export type PaletteMode = 'light' | 'dark'

export interface ColorPaletteTokens {
  background: string
  surface: string
  surfaceElevated?: string
  text: string
  textMuted: string
  textSubtle?: string
  accent: string
  accentMuted: string
  specialAccent?: string
  border: string
  invertedBackground: string
  invertedText: string
  buttonBackground: string
  buttonText: string
  buttonHover?: string
  specialButtonBackground?: string
  specialButtonText?: string
  focus: string
  plum?: string
}

export interface ColorPalette {
  id: string
  name: string
  faName: string
  source: PaletteSource
  mode: PaletteMode
  description: string
  faDescription: string
  swatches: string[]
  colors: ColorPaletteTokens
}

export const colorPalettes: ColorPalette[] = [
  // Curated 1: Botanical Ivory (Default)
  {
    id: 'botanical-ivory',
    name: 'Botanical Ivory',
    faName: 'عاج گیاهشناسی',
    source: 'curated',
    mode: 'light',
    description: 'Refined, warm, natural, and premium botanical identity.',
    faDescription: 'هویتی گیاهی، طبیعی، گرم، روشن و لوکس.',
    swatches: ['#F5F1E8', '#FFFDF8', '#24352B', '#5D7050', '#9A8B6F'],
    colors: {
      background: '#F5F1E8',
      surface: '#FFFDF8',
      text: '#24352B',
      textMuted: '#6D7568',
      accent: '#5D7050',
      accentMuted: '#9A8B6F',
      border: '#DCD8CC',
      invertedBackground: '#24352B',
      invertedText: '#F5F1E8',
      buttonBackground: '#5D7050',
      buttonText: '#FFFDF8',
      focus: '#5D7050',
      plum: '#6E4F5D',
    },
  },

  // Curated 2: Deep Forest
  {
    id: 'deep-forest',
    name: 'Deep Forest',
    faName: 'جنگل عمیق',
    source: 'curated',
    mode: 'dark',
    description: 'Immersive, sophisticated, and luxurious dark botanical atmosphere.',
    faDescription: 'فضایی تاریک، غنی، عمیق و مجلل از جنگل‌های بکر.',
    swatches: ['#141F1A', '#1E2B24', '#F3EFE5', '#A7B58B', '#C9B58A'],
    colors: {
      background: '#141F1A',
      surface: '#1E2B24',
      text: '#F3EFE5',
      textMuted: '#A8B3A1',
      accent: '#A7B58B',
      accentMuted: '#C9B58A',
      border: '#36453A',
      invertedBackground: '#0C1410',
      invertedText: '#F3EFE5',
      buttonBackground: '#A7B58B',
      buttonText: '#141F1A',
      focus: '#A7B58B',
      plum: '#8C5A6E',
    },
  },

  // Curated 3: Sandalwood Atelier
  {
    id: 'sandalwood-atelier',
    name: 'Sandalwood Atelier',
    faName: 'آتلیه چوب صندل',
    source: 'curated',
    mode: 'light',
    description: 'Warm, tactile, artisanal identity inspired by wood and craftsmanship.',
    faDescription: 'الهام‌گرفته از عطر چوب صندل، کاغذ دست‌ساز و کارگاه‌های کهن.',
    swatches: ['#ECE2D3', '#F6EFE5', '#3B2D24', '#9A684B', '#C1A17E'],
    colors: {
      background: '#ECE2D3',
      surface: '#F6EFE5',
      text: '#3B2D24',
      textMuted: '#7D6B5C',
      accent: '#9A684B',
      accentMuted: '#C1A17E',
      border: '#D5C3AD',
      invertedBackground: '#3B2D24',
      invertedText: '#F6EFE5',
      buttonBackground: '#9A684B',
      buttonText: '#F6EFE5',
      focus: '#9A684B',
      plum: '#7A4B3A',
    },
  },

  // Curated 4: Sage & Mineral
  {
    id: 'sage-mineral',
    name: 'Sage & Mineral',
    faName: 'مریمگلی و کانی',
    source: 'curated',
    mode: 'light',
    description: 'Contemporary, calm, clean, and design-led interpretation of nature.',
    faDescription: 'ترکیب آرام‌بخش مریم‌گلی با بافت مات کانی‌ها و مینیمالیسم معاصر.',
    swatches: ['#E2E7DE', '#F4F6F1', '#23302B', '#6C826D', '#9EB0A5'],
    colors: {
      background: '#E2E7DE',
      surface: '#F4F6F1',
      text: '#23302B',
      textMuted: '#63726A',
      accent: '#6C826D',
      accentMuted: '#9EB0A5',
      border: '#C6D1C5',
      invertedBackground: '#23302B',
      invertedText: '#F4F6F1',
      buttonBackground: '#6C826D',
      buttonText: '#F4F6F1',
      focus: '#6C826D',
      plum: '#5A6E64',
    },
  },

  // True Black: Noir Botanica
  {
    id: 'noir-botanica',
    name: 'Noir Botanica',
    faName: 'بوتانیکای نوآر',
    source: 'true-black',
    mode: 'dark',
    description: 'A true-black botanical theme with ivory typography, muted botanical green, and restrained matte gold.',
    faDescription: 'فضای مشکی مطلق با تایپوگرافی عاجی، سبز ملایم گیاهی و طلاکاری مات.',
    swatches: ['#000000', '#0B0B0B', '#F1EEE7', '#A6B58A', '#C8A96B'],
    colors: {
      background: '#000000',
      surface: '#0B0B0B',
      surfaceElevated: '#151515',
      text: '#F1EEE7',
      textMuted: '#A6A6A1',
      textSubtle: '#73736F',
      accent: '#A6B58A',
      accentMuted: '#737F5D',
      specialAccent: '#C8A96B',
      border: '#292929',
      invertedBackground: '#F1EEE7',
      invertedText: '#000000',
      buttonBackground: '#F1EEE7',
      buttonText: '#000000',
      buttonHover: '#D8D5CE',
      specialButtonBackground: '#C8A96B',
      specialButtonText: '#000000',
      focus: '#B8C99A',
      plum: '#737F5D',
    },
  },

  // Curated Dark: Obsidian Herbarium
  {
    id: 'obsidian-herbarium',
    name: 'Obsidian Herbarium',
    faName: 'هرباریوم آبسیدین',
    source: 'curated-dark',
    mode: 'dark',
    description: 'A deep botanical dark theme with moss and muted amber accents.',
    faDescription: 'فضایی عمیق، رازآلود و گیاه‌شناسی از سنگ آبسیدین، خزه و رگه‌های کهربا.',
    swatches: ['#101714', '#19231F', '#E8E2D5', '#879B78', '#C39A62'],
    colors: {
      background: '#101714',
      surface: '#19231F',
      surfaceElevated: '#26332C',
      text: '#E8E2D5',
      textMuted: '#A5AEA3',
      accent: '#879B78',
      accentMuted: '#806B4D',
      specialAccent: '#C39A62',
      border: '#354239',
      invertedBackground: '#E8E2D5',
      invertedText: '#19231F',
      buttonBackground: '#C39A62',
      buttonText: '#101714',
      buttonHover: '#D3B17D',
      focus: '#A7B995',
      plum: '#806B4D',
    },
  },

  // AI 1: Botanical Mist
  {
    id: 'botanical-mist',
    name: 'Botanical Mist',
    faName: 'مه گیاهان',
    source: 'ai',
    mode: 'light',
    description: 'Soft, airy, delicate palette inspired by morning mist and pale leaves.',
    faDescription: 'مه صبحگاهی، لطافت شبنم و نسیم خنک باغ‌های تقطیر.',
    swatches: ['#EBF1EE', '#F7FAF8', '#1C2B23', '#4D756A', '#7E9F94'],
    colors: {
      background: '#EBF1EE',
      surface: '#F7FAF8',
      text: '#1C2B23',
      textMuted: '#596C62',
      accent: '#4D756A',
      accentMuted: '#7E9F94',
      border: '#CEDAD3',
      invertedBackground: '#1C2B23',
      invertedText: '#F7FAF8',
      buttonBackground: '#4D756A',
      buttonText: '#F7FAF8',
      focus: '#4D756A',
      plum: '#627D72',
    },
  },

  // AI 2: Amber Ritual
  {
    id: 'amber-ritual',
    name: 'Amber Ritual',
    faName: 'آیین کهربا',
    source: 'ai',
    mode: 'dark',
    description: 'Warm, intimate sensory palette inspired by amber, resin, and dried botanicals.',
    faDescription: 'گرمای کهربا، صمغ‌های معطر سنتی و آیین‌های شیشه‌گری و تقطیر.',
    swatches: ['#151210', '#221C18', '#F5ECE3', '#D8994E', '#E5BE8A'],
    colors: {
      background: '#151210',
      surface: '#221C18',
      text: '#F5ECE3',
      textMuted: '#B7A697',
      accent: '#D8994E',
      accentMuted: '#E5BE8A',
      border: '#42342B',
      invertedBackground: '#0D0B09',
      invertedText: '#F5ECE3',
      buttonBackground: '#D8994E',
      buttonText: '#151210',
      focus: '#D8994E',
      plum: '#8C4D38',
    },
  },

  // AI 3: Midnight Herbarium
  {
    id: 'midnight-herbarium',
    name: 'Midnight Herbarium',
    faName: 'هرباریوم نیمهشب',
    source: 'ai',
    mode: 'dark',
    description: 'Dramatic editorial palette of pressed flora, ink, moss, and museum prestige.',
    faDescription: 'کتابخانه شبانه گیاهان نایاب، جوهر کهن، خزه و خطوط طلایی.',
    swatches: ['#0C1210', '#141D1A', '#E4ECE7', '#C5A566', '#527E6D'],
    colors: {
      background: '#0C1210',
      surface: '#141D1A',
      text: '#E4ECE7',
      textMuted: '#8B9E95',
      accent: '#C5A566',
      accentMuted: '#527E6D',
      border: '#253630',
      invertedBackground: '#060908',
      invertedText: '#E4ECE7',
      buttonBackground: '#C5A566',
      buttonText: '#0C1210',
      focus: '#C5A566',
      plum: '#6E4E5A',
    },
  },

  // AI 4: Mineral Bloom
  {
    id: 'mineral-bloom',
    name: 'Mineral Bloom',
    faName: 'شکوفه کانی',
    source: 'ai',
    mode: 'light',
    description: 'Stone, muted petals, mineral surfaces, and modern luxury packaging.',
    faDescription: 'گلبرگ‌های گل سرخ و نسترن بر بستر سنگ‌های مرمرین و روشن.',
    swatches: ['#F2ECEE', '#FAF6F7', '#2F2127', '#A85E76', '#C79AA9'],
    colors: {
      background: '#F2ECEE',
      surface: '#FAF6F7',
      text: '#2F2127',
      textMuted: '#746068',
      accent: '#A85E76',
      accentMuted: '#C79AA9',
      border: '#D8C8CE',
      invertedBackground: '#2F2127',
      invertedText: '#FAF6F7',
      buttonBackground: '#A85E76',
      buttonText: '#FAF6F7',
      focus: '#A85E76',
      plum: '#8F4B61',
    },
  },
]

export const DEFAULT_COLOR_PALETTE_ID = 'botanical-ivory'

export function getColorPaletteById(id: string): ColorPalette {
  return colorPalettes.find((p) => p.id === id) || colorPalettes[0]
}