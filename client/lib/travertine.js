// lib/travertine.js

// Base sadece breadcrumb vs. için lazım olabilir.
export const BASE_BY_LOCALE = {
  en: "travertine",
  tr: "traverten"
};

export const PRODUCT_KEYS = ["blocks", "slabs", "tiles", "pavers"];

// İçte [product] paramını “slabs|tiles|blocks|pavers” yapıyoruz.
// routing.js path template "travertine-[product]" ile birleşince SEO URL çıkacak.
export const PRODUCT_SLUGS = {
  en: {
    blocks: "blocks",
    slabs: "slabs",
    tiles: "tiles",
    pavers: "pavers"
  },
  tr: {
    blocks: "bloklar",
    slabs: "plakalar",
    tiles: "karolar",
    pavers: "dosemeler"
  },
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
  const s = String(slug || "").toLowerCase();
  const table = PRODUCT_SLUGS[lang] || {};

  // 1) Mevcut dil haritasında ara
  const inLang = Object.keys(table).find((k) => table[k] === s);
  if (inLang) return inLang;

  // 2) Slug zaten iç anahtar olabilir (tiles/slabs/blocks/pavers)
  if (PRODUCT_KEYS.includes(s)) return s;

  // 3) EN haritasında da dene (middleware iç rotayı EN key ile kurabiliyor)
  const inEn = Object.keys(PRODUCT_SLUGS.en || {}).find((k) => PRODUCT_SLUGS.en[k] === s);
  if (inEn) return inEn;

  // 4) Fallback
  return "slabs";
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
export const PRODUCTS_WITH_DEEP_LEVELS = ["slabs", "tiles", "blocks", "pavers"];
export const PRODUCTS_NO_DEEP_LEVELS = [];

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

// --- RENKLER (variant) ---
export const VARIANT_KEYS = ["ivory", "light", "antico"];

export const VARIANTS = {
  en: {
    ivory:  { slug: "ivory",  label: "Ivory"  },
    light:  { slug: "light",  label: "Light"  },
    antico: { slug: "antico", label: "Antico" }
  },
  tr: {
    ivory:  { slug: "ivory",  label: "Ivory"  },
    light:  { slug: "light",  label: "Light"  },
    antico: { slug: "antico", label: "Antiko" }
  }
};

// slug -> key eşlemesi (her iki dilde de aynı slug'lar)
export const VARIANT_KEY_BY_SLUG = {
  ivory: "ivory",
  light: "light",
  antico: "antico",
};

export function variantSlugFor(locale, key) {
  const lang = getLang(locale);
  return VARIANTS[lang]?.[key]?.slug ?? key;
}
export function variantLabelFor(locale, key) {
  const lang = getLang(locale);
  return VARIANTS[lang]?.[key]?.label ?? key;
}
export function variantKeys() {
  return [...VARIANT_KEYS];
}


// /{lang}/[process]-[cut]/[variant]
export function buildSeoVariantPath(locale, productKey, cutKey, process, filling, variantKey) {
  const lang = getLang(locale);
  const cutSeo = CUTS[lang]?.[cutKey] ?? cutKey;
  const proc  = buildProcessSlug(locale, process, filling); // "filled-honed" ya da "natural"
  const varSlug = variantSlugFor(locale, variantKey);       // "ivory" / "light" / "antico"
  return `/${lang}/${proc}-${cutSeo}/${varSlug}`;
}

// (İstersen boyut/kalınlık ekli tam yol)
// /{lang}/[process]-[cut]/[variant]/[finishOrSize]
export function buildSeoVariantWithSizePath(locale, productKey, cutKey, process, filling, variantKey, sizeSlug) {
  return `${buildSeoVariantPath(locale, productKey, cutKey, process, filling, variantKey)}/${sizeSlug}`;
}

// === Color helpers (alias) ===

// --- COLORS ---
export const COLOR_KEYS = ["ivory", "light", "antico"];

export const COLORS = {
  en: {
    ivory:  { slug: "ivory",  label: "Ivory"  },
    light:  { slug: "light",  label: "Light"  },
    antico: { slug: "antico", label: "Antico" }
  },
  tr: {
    // slug'ları SEO için sabit tutmak istersen EN ile aynı bırakabilirsin.
    // Eğer TR'de URL'de yerelleştirilmiş slug istiyorsan burayı değiştir.
    ivory:  { slug: "ivory",  label: "Ivory"  },
    light:  { slug: "acik",   label: "Açık"   },
    antico: { slug: "antiko", label: "Antiko" }
  }
};

// slug -> colorKey (her iki dil)
export const COLOR_KEY_BY_SLUG = {
  // EN
  ivory: "ivory",
  light: "light",
  antico:"antico",
  // TR yerelleştirilmiş slug'lar (kullanıyorsan)
  fildisi: "ivory",
  acik:    "light",
  antiko:  "antico"
};

export function colorKeys() {
  return [...COLOR_KEYS];
}
export function colorSlugFor(locale, key) {
  const lang = getLang(locale);
  return COLORS[lang]?.[key]?.slug ?? key;
}
export function colorLabelFor(locale, key) {
  const lang = getLang(locale);
  return COLORS[lang]?.[key]?.label ?? key;
}

// --- SIZE helpers (renk sayfasındaki "Choose Thickness / Size" için) ---
export function sizeSlugListForProduct(productKey, t) {
  if (productKey === "slabs") {
    return ["2cm", "3cm", "5cm"];
  }

  if (productKey === "tiles") {
    const sizes = (t?.raw && t.raw("tiles.sizes")) 
      || ["30x60", "60x60", "60x120"];
    return sizes.map((s) =>
      String(s)
        .toLowerCase()
        .replace(/["“”]/g, "")   // inç işaretlerini kaldır
        .replace(/[×x]/g, "x")   // × → x
        .replace(/\s+/g, "")     // boşlukları kaldır
    );
  }

  if (productKey === "pavers") {
    // senin verdiğin ölçüler
    const sizes = [
      `6x12`,
      `8x8`,
      `12x12`,
      `12x24`,
      `16x24`,
      `18x36`,
      `24x24`,
      `24x36`,
      `versailles-set`,
    ];

    return sizes.map((s) =>
      String(s)
        .toLowerCase()
        .replace(/["“”]/g, "")   // güvenlik için yine aynı normalize
        .replace(/[×x]/g, "x")
        .replace(/\s+/g, "")
    );
  }

  return ["custom"];
}



export function sizeLabelFromSlug(slug) {
  if (slug === "custom") return "Custom / Project-based";
  if (slug === "versailles-set") return "Versailles Set";

  // pavers/tile boyutu gibi görünüyor mu? örn "18x36"
  const m = String(slug).match(/^(\d{1,3})x(\d{1,3})$/);
  if (m) {
    const w = m[1];
    const h = m[2];
    return `${w}" × ${h}"`;
  }

  // slab kalınlık gibi ise (2cm)
  return String(slug)
    .replace(/x/g, "×")
    .replace(/([0-9])cm$/, "$1 cm");
}

function normalizePaverSizeSlug(raw) {
  if (!raw) return null;
  let s = String(raw).trim().toLowerCase();
  s = s.replace(/["“”]/g, "").replace(/[×x]/g, "x").replace(/\s+/g, "");
  // pavers ölçü setin:
  const ALLOWED = new Set([
    "6x12",
    "8x8",
    "12x12",
    "12x24",
    "16x24",
    "18x36",
    "24x24",
    "24x36",
    "versailles-set",
    "versailles"
  ]);
  if (ALLOWED.has(s)) {
    // "versailles" -> "versailles-set"
    return s === "versailles" ? "versailles-set" : s;
  }
  // son çare: tiles normalizer gibi davran
  return s;
}




// export function buildSeoColorPath(locale, productKey, cutSlugOrKey, processSlug, colorKey) {
//   const lang = getLang(locale);
//   const cutSeo = CUTS[lang]?.[cutSlugOrKey] ?? cutSlugOrKey;     // key verildiyse slug'a çevir, yoksa olduğu gibi
//   const colorSeo = variantSlugFor(locale, colorKey);             // "ivory" | "light" | "antico"
//   const proc = String(processSlug).toLowerCase();                // "natural" | "filled-honed" | "dolgulu-honlanmis"

//   return `/${colorSeo}-${proc}-${cutSeo}`;
// }

export function buildSeoColorPath(locale, productKey, cutSlug, processSlug, colorKey) {
  const lang = getLang(locale);

  // colorSlugFor: en→ ivory|light|antico, tr→ fildisi|acik|antiko
  const cSlug = colorSlugFor(locale, colorKey);   // örn: 'ivory' / 'fildisi'

  // processSlug: zaten birleşik ve yerelleştirilmiş geliyor (filled-honed / dogal / dolgusuz-honlanmis ...)
  const pSlug = String(processSlug).toLowerCase();

  // cutSlug: SEO tam slug (vein-cut-travertine-slabs / damar-kesim-traverten-plakalar ...)
  const cut = String(cutSlug);

  // YENİ PATTERN: /{lang}/{color}-{process}-{cut}
  return `/${cSlug}-${pSlug}-${cut}`;
}

export function cutKeyFromExternalSlug(locale, cutSlug) {
  const lang = getLang(locale);
  const table = CUTS[lang] || {};
  return Object.keys(table).find((k) => table[k] === String(cutSlug)) || null;
}

export function externalCutSlugFor(locale, cutKey) {
  const lang = getLang(locale);
  return CUTS[lang]?.[cutKey] || cutKey;
}