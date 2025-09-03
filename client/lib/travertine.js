export const BASE_BY_LOCALE = { en: "travertine", tr: "traverten" };

export const PRODUCT_KEYS = ["block", "slabs", "tiles", "special"];

export const PRODUCT_SLUGS = {
  en: { block: "block", slabs: "slabs", tiles: "tiles", special: "special-designs" },
  tr: { block: "blok",  slabs: "plakalar", tiles: "karolar", special: "ozel-tasarimlar" },
};

export const VARIANT_KEY_BY_SLUG = {
  "blaundos-antiko": "variant1",
  "blaundos-light":  "variant2",
  "blaundos-ivory":  "variant3",
};

// --- NEW: locale normalize + helper'lar ---
export function getLang(locale) {
  return String(locale || "en").toLowerCase().split("-")[0]; // "tr-TR" -> "tr"
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
  return Object.keys(table).find((k) => table[k] === slug) || "block";
}
