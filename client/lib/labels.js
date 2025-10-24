// lib/labels.js
export const PRODUCT_LABEL = {
  en: { blocks: "Blocks", slabs: "Slabs", tiles: "Tiles", pavers: "Pavers" },
  tr: { blocks: "bloklar", slabs: "plakalar", tiles: "karolar", pavers: "dosemeler" },
};

export const CUT_LABEL = {
  en: { "vein-cut": "vein-cut", "cross-cut": "cross-cut" },
  tr: { "vein-cut": "damar kesim", "cross-cut": "enine kesim" },
};

// ✅ TILE size slug listesi (route’ta kullanılacak)
// Tiles için geçerli ölçüler
export const TILE_SIZE_SLUGS_TILES = [
  "8x8",
  "12x12",
  "12x24",
  "16x16",
  "18x18",
  "24x24",
  "24x48",
  "48x110",
  "versailles-set"
];

// Pavers için geçerli ölçüler
export const TILE_SIZE_SLUGS_PAVERS = [
  "6x12",
  "8x8",
  "12x12",
  "12x24",
  "16x24",
  "18x36",
  "24x24",
  "versailles-set"
];

// Ortak olarak tüm possible slug'lara label veriyoruz.
// (ikisi de buradan okuyacak)
export const TILE_SIZE_LABEL = {
  en: {
    "6x12": `6"×12"`,
    "8x8": `8"×8"`,
    "12x12": `12"×12"`,
    "12x24": `12"×24"`,
    "16x16": `16"×16"`,
    "16x24": `16"×24"`,
    "18x18": `18"×18"`,
    "18x36": `18"×36"`,
    "24x24": `24"×24"`,
    "24x36": `24"×36"`,
    "24x48": `24"×48"`,
    "48x110": `48"×110"`,
    "versailles-set": "Versailles Set",
  },
  tr: {
    "6x12": `6"×12"`,
    "8x8": `8"×8"`,
    "12x12": `12"×12"`,
    "12x24": `12"×24"`,
    "16x16": `16"×16"`,
    "16x24": `16"×24"`,
    "18x18": `18"×18"`,
    "18x36": `18"×36"`,
    "24x24": `24"×24"`,
    "24x36": `24"×36"`,
    "24x48": `24"×48"`,
    "48x110": `48"×110"`,
    "versailles-set": "Versailles Set",
  },
};

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
// export function tileSizeLabelForLocale(locale, slug) {
//   const lang = locale?.startsWith("tr") ? "tr" : "en";
//   return TILE_SIZE_LABEL[lang]?.[slug] || slug;
// }

export function tileSizeLabelForLocale(locale, sizeKey) {
  const lang = locale?.toString().startsWith("tr") ? "tr" : "en";
  return TILE_SIZE_LABEL[lang]?.[sizeKey] ?? sizeKey;
}

// 4) (opsiyonel ama faydalı) slug <-> key yardımcıları
//    TR ve EN’de slug’larımız zaten aynı; yine de normalize edip güvene alıyoruz.
export function sizeKeyFromSlug(locale, slug) {
  if (!slug) return null;
  let s = String(slug).trim().toLowerCase()
    .replace(/["“”]/g, "")     // 12"x24" → 12x24
    .replace(/[×x]/g, "x")
    .replace(/\s+/g, "");
  // versailles eş anlamlıları
  if (s === "versailles" || s === "versailles-set") s = "versailles-set";
  return TILE_SIZE_SLUGS.includes(s) ? s : null;
}

export function sizeSlugForLocale(locale, sizeKey) {
  // şu an TR/EN aynı; ileride değişirse buradan yönetilir
  return TILE_SIZE_SLUGS.includes(sizeKey) ? sizeKey : null;
}
