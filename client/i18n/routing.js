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


 // Blog’un slug sayfaları
   '/blog/[slug]': { en: '/[slug]', tr: '/[slug]' },

   // ÖZEL SAYFA: dosya yapısı app/[locale]/travertine-guide/page.js
   '/travertine-guide': { en: '/travertine-guide', tr: '/travertine-guide' },

    // Process(+fill) level → /en/filled-honed-vein-cut-travertine-slabs
    // [process] param'ı "filled-honed" veya "natural" gibi birleşik gelir (lib'te buildProcessSlug).
    '/travertine/[product]/[cut]/[process]': {
      en: '/[process]-[cut]',
      tr: '/[process]-[cut]'
    },

    // Cut level → /en/vein-cut-travertine-slabs
    // [cut] param'ı zaten "vein-cut-travertine-slabs" gibi komple slug (lib'ten gelir).
    '/travertine/[product]/[cut]': {
      en: '/[cut]',
      tr: '/[cut]'
    },



// Color level → /en/filled-honed-vein-cut-travertine-slabs/ivory
'/travertine/[product]/[cut]/[process]/[color]': {
  en: '/[color]-[process]-[cut]',
  tr: '/[color]-[process]-[cut]'
},

// Thickness (opsiyonel) → /en/filled-honed-vein-cut-travertine-slabs/ivory/2cm
'/travertine/[product]/[cut]/[process]/[color]/[thickness]': {
  en: '/[color]-[process]-[cut]/[thickness]',
  tr: '/[color]-[process]-[cut]/[thickness]'
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
export const COLOR_VARIANTS = {
  en: {
    ivory: "ivory",
    light: "light",
    antico: "antico"
  },
  tr: {
    ivory: "fildisi",
    light: "acik",
    antico: "antiko"
  }
};


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





export function baseFor(locale) {
  const lang = getLang(locale);
  return BASE_BY_LOCALE[lang] || BASE_BY_LOCALE.en;
}

export function productSlugFor(locale, key) {
  const lang = getLang(locale);
  return PRODUCT_SLUGS[lang]?.[key] ?? key;
}

export function productKeyFromSlug(locale, slug) {
  const lang = getLang(locale);
  const table = PRODUCT_SLUGS[lang] || {};
  return Object.keys(table).find((k) => table[k] === slug) || "blocks";
}

// Kesim slug'ını döndür
export function cutSlugFor(locale, cut) {
  const lang = getLang(locale);
  return CUTS[lang]?.[cut] || cut;
}

// İşlem + dolgu kombinasyonundan URL slug oluştur
export function buildProcessSlug(locale, process, filling) {
  const lang = getLang(locale);
  const processLabel = PROCESSES[lang]?.includes(process) ? process : "honed";
  const fillingLabel = filling === "unfilled" ? 
    (lang === "tr" ? "dolgusuz" : "unfilled") : 
    (lang === "tr" ? "dolgulu" : "filled");
  
  return `${processLabel}-${fillingLabel}`;
}

// Ürün derin seviye destekliyor mu?
export const PRODUCTS_WITH_DEEP_LEVELS = ["slabs", "tiles"];
export const PRODUCTS_NO_DEEP_LEVELS = ["blocks", "special-designs"];

export function hasDeepLevels(productKey) {
  return PRODUCTS_WITH_DEEP_LEVELS.includes(productKey);
}

// Ürün ana sayfası URL'i
export function productUrl(locale, productKey) {
  const base = baseFor(locale);
  const productSlug = productSlugFor(locale, productKey);
  return `/${locale}/${base}/${productSlug}`;
}

// Tam URL oluşturucu (cut + process + filling)
export function buildProductPath(locale, productKey, cut, process, filling, thickness = null) {
  const base = baseFor(locale);
  const productSlug = productSlugFor(locale, productKey);
  const cutSlug = cutSlugFor(locale, cut);
  const processSlug = buildProcessSlug(locale, process, filling);
  
  const parts = [
    "",
    locale,
    base,
    productSlug,
    cutSlug,
    processSlug
  ];
  
  if (thickness) parts.push(thickness);
  
  return parts.filter(Boolean).join("/");
}
