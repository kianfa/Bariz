export type Language = 'en' | 'fa'

export interface NavTranslations {
  homeAria: string
  links: {
    story: string
    botanicals: string
    craft: string
    experience: string
    journal: string
  }
  langBtnAria: string
  menuOpenAria: string
  menuCloseAria: string
}

export interface HeroTranslations {
  sectionAria: string
  brandRail: {
    nature: string
    distilled: string
    time: string
    perfected: string
    scroll: string
  }
  title: string
  subtitle: string
  tagline: string
  cta: string
}

export interface StoryTranslations {
  quote: string
  quoteHighlight: string
  paragraph: string
}

export interface BotanicalsTranslations {
  tag: string
  heading: string
  items: Array<{
    name: string
    latin: string
    note: string
    alt: string
  }>
}

export interface CraftTranslations {
  tag: string
  heading: string
  para1: string
  para2: string
  statNumber: string
  statCaption: string
  imgAlt: string
}

export interface ExperienceTranslations {
  tag: string
  heading: string
  paragraph: string
  imgAlt: string
}

export interface ProductItemTranslation {
  name: string
  tag: string
  note: string
  description: string
  attributes: string[]
  alt: string
}

export interface ProductsTranslations {
  tag: string
  heading: string
  description: string
  ariaLabel: string
  prevProductAria: string
  nextProductAria: string
  showProductAria: (name: string) => string
  items: ProductItemTranslation[]
}

export interface FinalSceneTranslations {
  heading: string
  imgAlt: string
}

export interface FooterLinkItem {
  label: string
  href: string
}

export interface FooterColTranslation {
  title: string
  links: FooterLinkItem[]
}

export interface FooterOfficeTranslation {
  title: string
  previewNotice: string
  address: string
  routeAction: string
  mapAction: string
}

export interface FooterTranslations {
  brandStatement: string
  brandDescription: string
  quickAccess: FooterColTranslation
  customerService?: FooterColTranslation
  office: FooterOfficeTranslation
  copyright: string
  privacyLink: string
  termsLink: string
}

export interface ComponentTranslations {
  nav: NavTranslations
  hero: HeroTranslations
  story: StoryTranslations
  botanicals: BotanicalsTranslations
  craft: CraftTranslations
  experience: ExperienceTranslations
  products: ProductsTranslations
  finalScene: FinalSceneTranslations
  footer: FooterTranslations
}

export type Translations = ComponentTranslations

export const translations: Record<Language, ComponentTranslations> = {
  en: {
    nav: {
      homeAria: 'Bariz home',
      links: {
        story: 'Our Story',
        botanicals: 'Botanicals',
        craft: 'Craft',
        experience: 'Experience',
        journal: 'Journal',
      },
      langBtnAria: 'Switch to Persian',
      menuOpenAria: 'Open menu',
      menuCloseAria: 'Close menu',
    },
    hero: {
      sectionAria: 'Bariz, Nature, distilled',
      brandRail: {
        nature: 'Nature,',
        distilled: 'Distilled.',
        time: 'Time',
        perfected: 'Perfected.',
        scroll: 'Scroll',
      },
      title: 'BARIZ',
      subtitle: 'Nature, Distilled.',
      tagline: 'Persian Botanical Distilled Waters',
      cta: 'Discover Our World',
    },
    story: {
      quote: 'For centuries, the gardens of Persia have surrendered their essence to patient hands and slow fire, ',
      quoteHighlight: 'a single, luminous drop at a time.',
      paragraph: 'Bariz continues that unhurried tradition of araghiyat, capturing the living soul of each botanical in its purest, most graceful form.',
    },
    botanicals: {
      tag: 'The Botanicals',
      heading: 'Three living essences',
      items: [
        {
          name: 'Rose',
          latin: 'Rosa damascena',
          note: 'Velvet, honeyed, endlessly romantic, the crown of the Persian garden.',
          alt: 'Macro photograph of rose, Rosa damascena',
        },
        {
          name: 'Mint',
          latin: 'Mentha spicata',
          note: 'Cool, bright, verdant, a clean breath drawn from the riverbank.',
          alt: 'Macro photograph of mint, Mentha spicata',
        },
        {
          name: 'Chicory',
          latin: 'Cichorium intybus',
          note: 'Bittersweet and quietly cleansing, the wild blue bloom of the fields.',
          alt: 'Macro photograph of chicory, Cichorium intybus',
        },
      ],
    },
    craft: {
      tag: 'The Craft',
      heading: 'Fire, copper, and time',
      para1: 'Each blossom is gathered at dawn and rested over gentle flame in copper alembics unchanged for generations. Steam rises, cools, and returns as water, carrying nothing but the pure breath of the plant.',
      para2: 'No shortcuts. No additives. Only the slow alchemy of distillation, patiently perfected.',
      statNumber: '1874',
      statCaption: 'A method carried through the years',
      imgAlt: 'A traditional Persian copper alembic still with a single drop of distilled water forming',
    },
    experience: {
      tag: 'The Experience',
      heading: 'Poured, still and clear',
      paragraph: 'Serve chilled over ice, or as a whisper within tea, cocktails and quiet moments. A sip of Bariz is a garden, distilled to its most elegant expression.',
      imgAlt: 'An elegant cut-crystal glass of Bariz botanical water with a floating chicory blossom, backlit at golden hour',
    },
    products: {
      tag: 'The Collection',
      heading: 'The Bariz waters',
      description: 'The complete Bariz collection: traditional Persian botanical distilled waters, each bottled in gold and plum, each the pure voice of a single plant.',
      ariaLabel: 'Product showcase',
      prevProductAria: 'Previous product',
      nextProductAria: 'Next product',
      showProductAria: (name: string) => `Show ${name}`,
      items: [
        {
          name: 'Orange Blossom Water',
          tag: 'THE SCENT OF BLOSSOM',
          note: 'FLORAL · LUMINOUS',
          description: 'A luminous distillate drawn from orange blossom, offering a delicate floral presence in every sip.',
          attributes: ['100% NATURAL', 'PURE DISTILLED', 'FLORAL & LUMINOUS'],
          alt: 'The Bariz bottle of orange blossom water with fresh orange blossoms',
        },
        {
          name: 'Bidmeshk Water',
          tag: 'THE SPIRIT OF BIDMESHK',
          note: 'HERBAL · DELICATE',
          description: 'A gentle herbal water with a soft, meadow-like character, refined and quietly aromatic.',
          attributes: ['100% NATURAL', 'PURE DISTILLED', 'HERBAL & DELICATE'],
          alt: 'The Bariz bottle of bidmeshk water with purple bidmeshk flowers',
        },
        {
          name: 'Tarragon Water',
          tag: 'THE GRACE OF TARRAGON',
          note: 'AROMATIC · REFINED',
          description: 'An elegant distillate capturing the vivid, aromatic spirit of fresh tarragon.',
          attributes: ['100% NATURAL', 'PURE DISTILLED', 'AROMATIC & REFINED'],
          alt: 'The Bariz bottle of tarragon water with fresh tarragon sprigs',
        },
        {
          name: 'Chicory Water',
          tag: 'THE ESSENCE OF CHICORY',
          note: 'BITTERSWEET · CLEANSING',
          description: 'A bittersweet botanical water, distilled from wild chicory with quiet depth and character.',
          attributes: ['100% NATURAL', 'PURE DISTILLED', 'BITTERSWEET & CLEANSING'],
          alt: 'The Bariz bottle of pure chicory water with purple chicory flowers',
        },
        {
          name: 'Nastaran Water',
          tag: 'THE HEART OF NASTARAN',
          note: 'SOFT · BLOSSOMING',
          description: 'A soft, blossoming distillate with the tender grace of wild rose petals.',
          attributes: ['100% NATURAL', 'PURE DISTILLED', 'SOFT & BLOSSOMING'],
          alt: 'The Bariz bottle of nastaran water with wild rose blossoms',
        },
        {
          name: 'Mint Water',
          tag: 'THE BREATH OF MINT',
          note: 'COOL · VERDANT',
          description: 'A crisp and refreshing distillate, capturing the pure, lively aroma of fresh mint.',
          attributes: ['100% NATURAL', 'PURE DISTILLED', 'COOL & REFRESHING'],
          alt: 'The Bariz bottle of pure mint water with fresh mint leaves',
        },
        {
          name: 'Saffron Golab',
          tag: 'THE GOLD OF SAFFRON',
          note: 'RADIANT · ORIENTAL',
          description: 'A radiant rose distillate touched with saffron, golden, floral, and unmistakably Persian.',
          attributes: ['100% NATURAL', 'PURE DISTILLED', 'RADIANT & ORIENTAL'],
          alt: 'The Bariz bottle of saffron golab with saffron threads and rose petals',
        },
        {
          name: 'Golab',
          tag: 'THE ESSENCE OF GOLAB',
          note: 'DELICATE · TIMELESS',
          description: 'A delicate and timeless rose distillate, the pure essence of golab, distilled with patience.',
          attributes: ['100% NATURAL', 'PURE DISTILLED', 'DELICATE & TIMELESS'],
          alt: 'The Bariz bottle of pure golab with rose petals',
        },
      ],
    },
    finalScene: {
      heading: 'Bring Nature Closer.',
      imgAlt: 'A lush Persian garden with cypress trees and a reflecting pool at golden hour',
    },
    footer: {
      brandStatement: 'Bariz; The essence of nature, with authenticity and elegance.',
      brandDescription: 'Rooted in authentic Persian botanicals, pure natural essences for your well-being and beauty.',
      quickAccess: {
        title: 'Quick Access',
        links: [
          { label: 'Home', href: '#top' },
          { label: 'About Us', href: '#story' },
          { label: 'Our Story', href: '#story' },
          { label: 'The Experience', href: '#experience' },
          { label: 'The Collection', href: '#products' },
          { label: 'Contact Us', href: '#contact' },
        ],
      },
      customerService: {
        title: 'Customer Service',
        links: [
          { label: 'FAQ', href: '#faq' },
          { label: 'Shopping Guide', href: '#guide' },
          { label: 'Shipping Methods', href: '#shipping' },
          { label: 'Terms & Conditions', href: '#terms' },
          { label: 'Privacy Policy', href: '#privacy' },
        ],
      },
      office: {
        title: 'Bariz Central Office',
        previewNotice: 'Office location will be displayed upon address registration',
        address: 'Bariz Central Office: Tehran, North Sohrevardi St., Khalil Hosseini St., Next to Tahamtan Alley, No. 27',
        routeAction: 'Directions',
        mapAction: 'View on Map',
      },
      copyright: 'All rights reserved for Bariz brand.',
      privacyLink: 'Privacy Policy',
      termsLink: 'Terms & Conditions',
    },
  },
  fa: {
    nav: {
      homeAria: 'صفحه اصلی باریز',
      links: {
        story: 'داستان ما',
        botanicals: 'گیاهان بوستان',
        craft: 'هنر تقطیر',
        experience: 'تجربه چشیدن',
        journal: 'مجموعه محصولات',
      },
      langBtnAria: 'تغییر به انگلیسی',
      menuOpenAria: 'باز کردن منو',
      menuCloseAria: 'بستن منو',
    },
    hero: {
      sectionAria: 'باریز، عصاره خالص طبیعت',
      brandRail: {
        nature: 'طبیعت،',
        distilled: 'خالص.',
        time: 'زمان،',
        perfected: 'تکامل‌یافته.',
        scroll: 'ورق بزنید',
      },
      title: 'باریز',
      subtitle: 'عصاره خالص طبیعت.',
      tagline: 'عرقیات اصیل و سنتی گیاهی ایران',
      cta: 'کشف دنیای باریز',
    },
    story: {
      quote: 'قرن‌هاست که باغ‌های ایران‌زمین، عصاره جان خود را به دست‌های صبور و آتش ملایم می‌سپارند، ',
      quoteHighlight: 'قطره به قطره، درخشان و زلال.',
      paragraph: 'باریز سنت دیرینه عرقیات اصیل را پاس می‌دارد؛ تجلی روح زنده هر گیاه در خالص‌ترین و فاخرترین صورت آن.',
    },
    botanicals: {
      tag: 'عصاره‌های گیاهی',
      heading: 'سه عصاره زنده طبیعت',
      items: [
        {
          name: 'گل محمدی',
          latin: 'Rosa damascena',
          note: 'مخملین، شهدآگین و پر‌رمز‌وراز، تاج سرسبز باغ‌های ایرانی.',
          alt: 'عکس ماکرو از گل محمدی، Rosa damascena',
        },
        {
          name: 'نعناع',
          latin: 'Mentha spicata',
          note: 'خنک، باطراوت و سرسبز، نسیم زلال از کرانه رود.',
          alt: 'عکس ماکرو از نعناع، Mentha spicata',
        },
        {
          name: 'کاسنی',
          latin: 'Cichorium intybus',
          note: 'تلخ‌وشیرین و پاک‌کننده جان، شکوفه لاجوردی دشت‌های بکر.',
          alt: 'عکس ماکرو از کاسنی، Cichorium intybus',
        },
      ],
    },
    craft: {
      tag: 'هنر تقطیر',
      heading: 'آتش، مس و گذر زمان',
      para1: 'هر شکوفه سپیده‌دم چیده می‌شود و بر فراز شعله ملایم دیگ‌های مسین دیرین آرام می‌گیرد. بخار برمی‌خیزد، سرد می‌شود و به قطره‌های زلال بدل می‌گردد، لبریز از نفس خالص گیاه.',
      para2: 'بدون شتاب، بدون افزوده. تنها کیمیای آرام تقطیر که به صبر و حوصله به کمال رسیده است.',
      statNumber: '۱۸۷۴',
      statCaption: 'سنت و روشی ماندگار در گذر قرون',
      imgAlt: 'دیگ مسین سنتی تقطیر ایرانی با شکل‌گیری قطره‌ای از عصاره زلال',
    },
    experience: {
      tag: 'تجربه چشیدن',
      heading: 'زلال، گوارا و آرام‌بخش',
      paragraph: 'خنک همراه با یخ نوش جان کنید، یا قطره‌ای از آن را به چای و لحظات آرام خود بیفزایید. هر جرعه باریز، تجربه‌ای فاخر از عطر باغ ایرانی است.',
      imgAlt: 'جام بلورین و تراش‌خورده از عصاره گیاهی باریز با شکوفه کاسنی',
    },
    products: {
      tag: 'مجموعه باریز',
      heading: 'مجموعه نوشیدنی‌های باریز',
      description: 'عصاره اصیل گیاهان در هر قطره',
      ariaLabel: 'ویترین محصولات',
      prevProductAria: 'محصول قبلی',
      nextProductAria: 'محصول بعدی',
      showProductAria: (name: string) => `نمایش ${name}`,
      items: [
        {
          name: 'بهارنارنج',
          tag: 'عطر شکوفه‌ها',
          note: 'گل‌گون · درخشان',
          description: 'عصاره درخشان بهارنارنج، ارمغان عطر ملایم شکوفه‌ها در هر جرعه.',
          attributes: ['۱۰۰٪ طبیعی', 'تقطیر خالص', 'معطر و درخشان'],
          alt: 'بطری عرق بهارنارنج باریز همراه با شکوفه‌های تازه نارنج',
        },
        {
          name: 'بیدمشک',
          tag: 'جان بیدمشک',
          note: 'گیاهی · لطیف',
          description: 'نوشیدنی معطر و آرام‌بخش بیدمشک، یادآور رایحه دل‌انگیز چمنزارهای بهاری.',
          attributes: ['۱۰۰٪ طبیعی', 'تقطیر خالص', 'آرام‌بخش و لطیف'],
          alt: 'بطری عرق بیدمشک باریز همراه با گل‌های بنفش بیدمشک',
        },
        {
          name: 'طارونه',
          tag: 'شکوه طارونه',
          note: 'معطر · فاخر',
          description: 'عصاره اصیل نخل طارونه با رایحه‌ای دلنشین و گوارا.',
          attributes: ['۱۰۰٪ طبیعی', 'تقطیر خالص', 'معطر و اصیل'],
          alt: 'بطری عرق طارونه باریز همراه با شاخه‌های تازه طارونه',
        },
        {
          name: 'کاسنی',
          tag: 'عصاره کاسنی',
          note: 'تلخ‌وشیرین · گوارا',
          description: 'عصاره سنتی کاسنی صحرایی، پاک‌کننده و طراوت‌بخش جان.',
          attributes: ['۱۰۰٪ طبیعی', 'تقطیر خالص', 'تصفیه‌کننده و گوارا'],
          alt: 'بطری عرق کاسنی باریز همراه با گل‌های بنفش کاسنی',
        },
        {
          name: 'نسترن',
          tag: 'قلب نسترن',
          note: 'لطیف · شکوفا',
          description: 'عصاره نسترن کوهی با لطافت گل‌برگ‌های رز وحشی.',
          attributes: ['۱۰۰٪ طبیعی', 'تقطیر خالص', 'لطیف و شکوفا'],
          alt: 'بطری عرق نسترن باریز همراه با گل‌های نسترن وحشی',
        },
        {
          name: 'نعناع',
          tag: 'نفس نعناع',
          note: 'خنک · طراوت‌بخش',
          description: 'نوشیدنی خنک و پرنشاط با عطر تازه برگ‌های نعناع.',
          attributes: ['۱۰۰٪ طبیعی', 'تقطیر خالص', 'خنک و معطر'],
          alt: 'بطری عرق نعناع باریز همراه با برگ‌های تازه نعناع',
        },
        {
          name: 'گلاب زعفران',
          tag: 'طلای زعفران',
          note: 'درخشان · اصیل',
          description: 'ترکیب طلایی گلاب اصیل با زعفران آمیخته به عطر ایران.',
          attributes: ['۱۰۰٪ طبیعی', 'تقطیر خالص', 'درخشان و زعفرانی'],
          alt: 'بطری گلاب زعفران باریز همراه با سرگل زعفران و گل‌برگ رز',
        },
        {
          name: 'گلاب',
          tag: 'عصاره گلاب',
          note: 'فاخر · ماندگار',
          description: 'گلاب خالص و بی‌نظیر، عصاره اصیل گل‌برگ‌های رز محمدی.',
          attributes: ['۱۰۰٪ طبیعی', 'تقطیر خالص', 'فاخر و ماندگار'],
          alt: 'بطری گلاب خالص باریز همراه با گل‌برگ‌های رز محمدی',
        },
      ],
    },
    finalScene: {
      heading: 'باریز طعمی از قلب طبیعت',
      imgAlt: 'باغ مصفای ایرانی با سروهای کهنسال و حوض فیروزه‌ای در غروب طلایی',
    },
    footer: {
      brandStatement: 'باریز طعمی از قلب طبیعت',
      brandDescription: 'با تکیه بر گیاهان اصیل ایرانی، عصاره‌های طبیعی برای مراقبت از پوست و زیبایی شما.',
      quickAccess: {
        title: 'دسترسی سریع',
        links: [
          { label: 'صفحه اصلی', href: '#top' },
          { label: 'درباره ما', href: '#story' },
          { label: 'داستان باریز', href: '#story' },
          { label: 'تجربه چشیدن', href: '#experience' },
          { label: 'مجموعه نوشیدنی‌ها', href: '#products' },
          { label: 'تماس با ما', href: '#contact' },
        ],
      },
      customerService: {
        title: 'خدمات مشتریان',
        links: [
          { label: 'سوالات متداول', href: '#faq' },
          { label: 'راهنمای خرید', href: '#guide' },
          { label: 'روش‌های ارسال', href: '#shipping' },
          { label: 'قوانین و مقررات', href: '#terms' },
          { label: 'حریم خصوصی', href: '#privacy' },
        ],
      },
      office: {
        title: 'دفتر مرکزی باریز',
        previewNotice: 'موقعیت دفتر پس از ثبت آدرس نمایش داده می‌شود',
        address: 'دفتر مرکزی باریز: تهران، خیابان سهروردی شمالی، خیابان خلیل حسینی، جنب کوچه تهمتن، پلاک ۲۷',
        routeAction: 'مسیریابی',
        mapAction: 'مشاهده روی نقشه',
      },
      copyright: 'تمامی حقوق برای برند باریز محفوظ است.',
      privacyLink: 'حریم خصوصی',
      termsLink: 'قوانین و مقررات',
    },
  },
}
