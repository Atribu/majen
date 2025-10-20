// lib/labels.js
export const PRODUCT_LABEL = {
  en: { blocks: "Blocks", slabs: "Slabs", tiles: "Tiles", special: "Custom Designs" },
  tr: { blocks: "bloklar", slabs: "plakalar", tiles: "karolar", special: "özel tasarım" },
};

export const CUT_LABEL = {
  en: { "vein-cut": "vein-cut", "cross-cut": "cross-cut" },
  tr: { "vein-cut": "damar kesim", "cross-cut": "enine kesim" },
};

// ✅ TILE size slug listesi (route’ta kullanılacak)
export const TILE_SIZE_SLUGS = [
  "8x8","12x12","12x24","16x16","18x18","24x24","24x48","48x110","versailles-set"
];

// ✅ TILE size etiketleri (UI’de gösterilecek)
export const TILE_SIZE_LABEL = {
  en: {
    "8x8": `8"×8"`,
    "12x12": `12"×12"`,
    "12x24": `12"×24"`,
    "16x16": `16"×16"`,
    "18x18": `18"×18"`,
    "24x24": `24"×24"`,
    "24x48": `24"×48"`,
    "48x110": `48"×110"`,
    "versailles-set": "Versailles Set",
  },
  tr: {
    "8x8": `8"×8"`,
    "12x12": `12"×12"`,
    "12x24": `12"×24"`,
    "16x16": `16"×16"`,
    "18x18": `18"×18"`,
    "24x24": `24"×24"`,
    "24x48": `24"×48"`,
    "48x110": `48"×110"`,
    "versailles-set": "Versailles Set",
  },
};

/**
 * NEW: Color labels for last-level pages (Ivory / Antico / Light)
 * Slug keys lowercase sabit: ivory, antico, light
 */
export const COLOR_LABEL = {
  en: { ivory: "Ivory", antico: "Antico", light: "Light" },
  tr: { ivory: "Fildişi", antico: "Antik", light: "Açık" },
};

/** küçük yardımcı: locale → 'en' | 'tr' */
const L = (locale) => (String(locale).toLowerCase().startsWith("tr") ? "tr" : "en");

/** Güvenli label okuyucu (bulunamazsa slug’ı insanlaştırır) */
export function colorLabelForLocale(locale, slug = "") {
  const key = String(slug).toLowerCase();
  const map = COLOR_LABEL[L(locale)] || {};
  const fall = key
    .split("-")
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
  return map[key] || fall;
}

// EN↔TR process slug dönüştürücü: "filled-polished" → "dolgulu-cilali"
export function procSlugForLocale(locale, proc) {
  const s = String(proc || "").toLowerCase();
  if (!s) return s;
  if (s === "natural" || s === "dogal") return locale.startsWith("tr") ? "dolgusuz-dogal" : "unfilled-natural";

  // normalize EN-combo
  const [fillRaw, pRaw] = s.includes("-") ? s.split("-") : ["filled", s];
  const fillEn = ({ dolgulu:"filled", dolgusuz:"unfilled", filled:"filled", unfilled:"unfilled" })[fillRaw] || fillRaw;
  const procEn = ({
    honlanmis:"honed", cilali:"polished", fircalanmis:"brushed", eskitilmis:"tumbled",
    honed:"honed", polished:"polished", brushed:"brushed", tumbled:"tumbled"
  })[pRaw] || pRaw;

  if (!locale.startsWith("tr")) return `${fillEn}-${procEn}`;

  const fillTr = fillEn === "filled" ? "dolgulu" : "dolgusuz";
  const procTr = { honed:"honlanmis", polished:"cilali", brushed:"fircalanmis", tumbled:"eskitilmis" }[procEn] || procEn;
  return `${fillTr}-${procTr}`;
}


// yardımcı: locale’e göre ölçü etiketi
export function tileSizeLabelForLocale(locale, slug) {
  const lang = locale?.startsWith("tr") ? "tr" : "en";
  return TILE_SIZE_LABEL[lang]?.[slug] || slug;
}