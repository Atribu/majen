export const BASE_BY_LOCALE = { en: "travertine", tr: "traverten" };

export const PRODUCT_KEYS = ["block", "slabs", "tiles", "special"];

export const PRODUCT_SLUGS = {
  en: { block: "blocks", slabs: "slabs", tiles: "tiles", special: "special-designs" },
  tr: { block: "bloklar",  slabs: "plakalar", tiles: "karolar", special: "ozel-tasarimlar" },
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

export const CUTS = ["vein-cut", "cross-cut"]; // kesim şekli

export const PROCESSES = [
  "natural",
  "filling",
  "epoxy",
  "transparent",
  "antique",
]; // işleme

// Ürüne göre genişletebilirsin; şimdilik ortak
export const FINISHES = ["polished", "unpolished"];

// --- Ölçü slug yardımcıları (ilerisi için hazır) ---
export function sizeLabelToSlug(label) {
  return String(label).toLowerCase().replace(/[×*]/g, "x").replace(/\s+/g, "").replace(/"/g, "");
}
export function sizeSlugToLabel(slug) {
  if (slug === "custom") return "Custom / Project-based";
  return String(slug).replace(/x/g, "×").replace(/([0-9])cm$/, "$1 cm");
}

// --- Derin yol kurucu: variant altına istediğin segmentleri ekler ---
export function buildVariantChildPath(locale, productSlug, variantSlug, parts = []) {
  const base = baseFor(locale); // "travertine" | "traverten"
  const segs = ["", locale, base, productSlug, variantSlug, ...parts.filter(Boolean)];
  return segs.join("/");
}

// (opsiyonel) doğrulayıcılar
export const isCutValid = (cut) => CUTS.includes(String(cut || "").toLowerCase());
export const isProcessValid = (p) => PROCESSES.includes(String(p || "").toLowerCase());
export const isFinishValid = (f) => FINISHES.includes(String(f || "").toLowerCase());