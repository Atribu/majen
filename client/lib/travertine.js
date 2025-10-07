// lib/travertine.js

// Base sadece breadcrumb vs. için lazım olabilir.
export const BASE_BY_LOCALE = {
  en: "travertine",
  tr: "traverten"
};

export const PRODUCT_KEYS = ["blocks", "slabs", "tiles", "special"];

// İçte [product] paramını “slabs|tiles|blocks|special” yapıyoruz.
// routing.js path template "travertine-[product]" ile birleşince SEO URL çıkacak.
export const PRODUCT_SLUGS = {
  en: { blocks: "blocks", slabs: "slabs", tiles: "tiles", "special": "special" },
  tr: { blocks: "bloklar", slabs: "plakalar", tiles: "karolar", "special": "ozel-tasarim" },
};

// Sayfa içi gösterebilirsin
export const COLOR_VARIANTS = {
  en: { ivory: "ivory", light: "light", antico: "antico" },
  tr:  { ivory: "ivory", light: "light", antico: "antico" },
};

// CUT’lar dış slug’ları: ürün tipi gömülü.
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

// Process iç anahtarları
export const PROCESSES = {
  en: ["natural", "honed", "polished", "brushed", "tumbled"],
  tr: ["dogal", "honlanmis", "cilali", "fircalanmis", "eskitilmis"]
};

export const FILLING = {
  en: { filled: "filled", unfilled: "unfilled" },
  tr: { filled: "dolgulu", unfilled: "dolgusuz" }
};

export const THICKNESS = ["2cm", "3cm", "5cm"];

// --- Helpers ---

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
  return Object.keys(table).find((k) => table[k] === slug) || "slabs";
}

export function cutSlugFor(locale, cut) {
  const lang = getLang(locale);
  return CUTS[lang]?.[cut] || cut;
}

// 🔁 SEO kurallarına göre: "filled-honed" sırası ve "natural" tek başına
export function buildProcessSlug(locale, process, filling) {
  const lang = getLang(locale);

  // natural → tek segment
  if ((lang === "tr" && process === "dogal") || process === "natural") {
    return lang === "tr" ? "dogal" : "natural";
  }

  const procMap = {
    en: { honed:"honed", polished:"polished", brushed:"brushed", tumbled:"tumbled" },
    tr: { honlanmis:"honlanmis", cilali:"cilali", fircalanmis:"fircalanmis", eskitilmis:"eskitilmis" }
  };
  const fillMap = FILLING[lang] || { filled:"filled", unfilled:"unfilled" };

  const p = procMap[lang]?.[process] ?? process;
  const f = fillMap[filling || "filled"] ?? (lang === "tr" ? "dolgulu" : "filled");

  // İstenen sıra: filled-honed (fill önce)
  return `${f}-${p}`;
}

// Bu ürünler derinleşir (cut/process)
export const PRODUCTS_WITH_DEEP_LEVELS = ["slabs", "tiles"];
export const PRODUCTS_NO_DEEP_LEVELS = ["blocks", "special-designs"];

export function hasDeepLevels(productKey) {
  return PRODUCTS_WITH_DEEP_LEVELS.includes(productKey);
}

// --- SEO path builder'lar ---
// /{locale}/travertine
export function buildSeoBasePath(locale) {
  return `/${getLang(locale)}/travertine`;
}

// /{locale}/travertine-slabs (template: travertine-[product])
export function buildSeoProductPath(locale, productKey) {
  const lang = getLang(locale);
  const p = productSlugFor(locale, productKey);
  const prefix = lang === "tr" ? "traverten" : "travertine";
  return `/${lang}/${prefix}-${p}`;
}

// /{locale}/vein-cut-travertine-slabs
export function buildSeoCutPath(locale, productKey, cutKey) {
  const lang = getLang(locale);
  const cutSeo = CUTS[lang]?.[cutKey] ?? cutKey;
  return `/${lang}/${cutSeo}`;
}

// /{locale}/filled-honed-vein-cut-travertine-slabs  veya  /{locale}/natural-vein-cut-travertine-slabs
export function buildSeoProcessPath(locale, productKey, cutKey, process, filling) {
  const lang = getLang(locale);
  const cutSeo = CUTS[lang]?.[cutKey] ?? cutKey;
  const proc = buildProcessSlug(locale, process, filling); // "filled-honed" ya da "natural"
  return `/${lang}/${proc}-${cutSeo}`;
}

/**
 * Eğer component'lerin eski helper'ı kullanıyorsa (kanonik iç rota) burada
 * artık direkt SEO path döndürelim ki Link hep kısa URL'ye gitsin.
 */

// Ürün ana sayfası SEO URL'i
export function productUrl(locale, productKey) {
  return buildSeoProductPath(locale, productKey);
}

// Tam URL (cut + process + filling) → direkt SEO pattern
export function buildProductPath(locale, productKey, cutKey, process, filling, thickness = null) {
  // thickness SEO'da görünmeyecek; filtre olarak UI'da kalır.
  return buildSeoProcessPath(locale, productKey, cutKey, process, filling);
}
