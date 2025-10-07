// i18n/routing.js
import { defineRouting } from 'next-intl/routing';

export const config = {
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'always',
  pathnames: {
    '/': { tr: '/', en: '/' },
    '/contactus': { tr: '/iletisim', en: '/contactus' },
    '/aboutus': { tr: '/hakkimizda', en: '/about-us' },

    // Base
    '/travertine': {
      en: '/travertine',
      tr: '/traverten'
    },

    // Product level → /en/travertine-slabs  (template: travertine-[product])
    // [product] param'ı lib/travertine.js'te "slabs|tiles|blocks|special" olacak.
    '/travertine/[product]': {
      en: '/travertine-[product]',
      tr: '/traverten-[product]'
    },

       '/blog/[slug]': {
      en: '/blog/[slug]',
      tr: '/blog/[slug]'
    },

    '/blog/travertine-guide': {
  en: '/travertine-guide',
  tr: '/travertine-guide',
},

    // Cut level → /en/vein-cut-travertine-slabs
    // [cut] param'ı zaten "vein-cut-travertine-slabs" gibi komple slug (lib'ten gelir).
    '/travertine/[product]/[cut]': {
      en: '/[cut]',
      tr: '/[cut]'
    },

    // Process(+fill) level → /en/filled-honed-vein-cut-travertine-slabs
    // [process] param'ı "filled-honed" veya "natural" gibi birleşik gelir (lib'te buildProcessSlug).
    '/travertine/[product]/[cut]/[process]': {
      en: '/[process]-[cut]',
      tr: '/[process]-[cut]'
    },

    // (İstersen kalınlığı ayrıca route edebilirsin; şu an SEO gereği gerek yok)
    '/howweexport': { en: '/how-we-export', tr: '/nasil-ihracat-yapiyoruz' },
    '/howweexport/fob': { en: '/how-we-export/fob', tr: '/nasil-ihracat-yapiyoruz/fob' },
    '/howweexport/cif': { en: '/how-we-export/cif', tr: '/nasil-ihracat-yapiyoruz/cif' },
    '/howweexport/exw': { en: '/how-we-export/exw', tr: '/nasil-ihracat-yapiyoruz/exw' },
    '/blog': { en: '/blog', tr: '/blog' },
    '/[slug]': { en: '/[slug]', tr: '/[slug]' },
  },
};

export const routing = defineRouting(config);

// --- Aşağıdakiler link üretimine yardım eder; component'lerde import ediyorsan kalsın ---

export const PRODUCT_KEYS = ["blocks", "slabs", "tiles", "special-designs"];

// Dış görünen product segmentleri (path template "travertine-[product]" ile birleşecek)
// Örn: "slabs" → "/en/travertine-slabs"
export const PRODUCT_SLUGS = {
  en: { blocks: "blocks", slabs: "slabs", tiles: "tiles", "special-designs": "special" },
  tr: { blocks: "bloklar", slabs: "plakalar", tiles: "karolar", "special-designs": "ozel-tasarim" },
};

// Renk varyantları (artık sayfa içi)
export const COLOR_VARIANTS = ["ivory", "light", "antico"];

// Kesim → dış slug’lar zaten “ürün”ü içeriyor (ör. vein-cut-travertine-slabs)
export const CUTS = {
  en: {
    "vein-cut": "vein-cut-travertine-slabs",
    "cross-cut": "cross-cut-travertine-slabs"
  },
  tr: {
    "vein-cut": "damar-kesim-traverten-plakalar",
    "cross-cut": "enine-kesim-traverten-plakalar"
  }
};

// Process listesi (iç anahtarlar)
export const PROCESSES = {
  en: ["natural", "honed", "polished", "brushed", "tumbled"],
  tr: ["dogal", "honlanmis", "cilali", "fircalanmis", "eskitilmis"]
};

export const FILLING = {
  en: { filled: "filled", unfilled: "unfilled" },
  tr: { filled: "dolgulu", unfilled: "dolgusuz" }
};

export const THICKNESS = ["2cm", "3cm", "5cm"];

// Helpers
export function getLang(locale) {
  return String(locale || "en").toLowerCase().split("-")[0];
}
