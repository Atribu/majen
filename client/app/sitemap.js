// app/sitemap.js
export const dynamic = "force-static"; // metadata route için güvenli
// export const revalidate = 3600; // istersen

import {
  getLang,
  BASE_BY_LOCALE,
  CUTS,
  buildProcessSlug,
  colorKeys,
  colorSlugFor,
} from "@/lib/travertine";
import {
  TILE_SIZE_SLUGS_TILES,
  TILE_SIZE_SLUGS_PAVERS,
} from "@/lib/labels";

// ---- sabitler ----
const SITE = "https://majen.com.tr";
const LOCALES = ["en", "tr"];
const CUT_KEYS = ["vein-cut", "cross-cut"];
const PROCESS_EN = [
  "filled-honed","filled-polished","filled-brushed","filled-tumbled",
  "unfilled-honed","unfilled-brushed","unfilled-tumbled","unfilled-natural",
];
const PRODUCT_LIST_TAIL = {
  en: { blocks: "travertine-blocks", slabs: "travertine-slabs", tiles: "travertine-tiles", pavers: "travertine-pavers" },
  tr: { blocks: "traverten-bloklar", slabs: "traverten-plakalar", tiles: "traverten-karolar", pavers: "traverten-dosemeler" },
};
const VERS_TILES = "versailles-set";
const VERS_PAVERS = "versailles-pattern";

// --- product'a göre cut slug dönüştürücü (slabs tabanını tiles/blocks/pavers'a çevirir)
function cutSlugForProduct(locale, cutKey, productKey) {
  const lang = getLang(locale);
  const base = (CUTS[lang] || {})[cutKey] || "";
  if (!base) return "";

  if (lang === "en") {
    if (productKey === "slabs")  return base.replace(/-travertine-slabs$/i, "-travertine-slabs");
    if (productKey === "tiles")  return base.replace(/-travertine-slabs$/i, "-travertine-tiles");
    if (productKey === "pavers") return base.replace(/-travertine-slabs$/i, "-travertine-pavers");
    if (productKey === "blocks") return ""; // blocks'ta cut yok
  } else {
    if (productKey === "slabs")  return base.replace(/-traverten-plakalar$/i, "-traverten-plakalar");
    if (productKey === "tiles")  return base.replace(/-traverten-plakalar$/i, "-traverten-karolar");
    if (productKey === "pavers") return base.replace(/-traverten-plakalar$/i, "-traverten-dosemeler");
    if (productKey === "blocks") return ""; // blocks'ta cut yok
  }
  return "";
}

const abs = (locale, path) =>
  `${SITE}/${locale}${path.startsWith("/") ? "" : "/"}${path}`;

// 1) Base + ürün liste sayfaları
function baseAndProductUrls(locale) {
  const lang = getLang(locale);
  const base = BASE_BY_LOCALE[lang] || BASE_BY_LOCALE.en; // travertine | traverten
  const list = ["blocks","slabs","tiles","pavers"].map((p) => `/${PRODUCT_LIST_TAIL[lang][p]}`);
  return [abs(locale, `/${base}`), ...list.map((p) => abs(locale, p))];
}

// 2) Blocks: sadece renk kısa URL'leri (3 adet)
function blockColorUrls(locale) {
  const lang = getLang(locale);
  const colors = colorKeys();
  const tail = lang === "tr" ? "traverten-bloklar" : "travertine-blocks";
  return colors.map((key) => {
    const cSlug = colorSlugFor(locale, key); // tr: fildisi/acik/antiko
    return abs(locale, `/${cSlug}-${tail}`);
  });
}

// 3) Slabs/Tiles/Pavers cut kısa URL'leri
function cutUrls(locale) {
  const out = [];
  for (const product of ["slabs","tiles","pavers"]) {
    for (const ck of CUT_KEYS) {
      const cutSlug = cutSlugForProduct(locale, ck, product);
      if (cutSlug) out.push(abs(locale, `/${cutSlug}`));
    }
  }
  return out;
}

// 4) Slabs/Tiles/Pavers process+cut kısa URL'leri
function processCutUrls(locale) {
  const out = [];
  for (const product of ["slabs","tiles","pavers"]) {
    for (const ck of CUT_KEYS) {
      const cutSlug = cutSlugForProduct(locale, ck, product);
      if (!cutSlug) continue;

      for (const p of PROCESS_EN) {
        const proc = buildProcessSlug(
          locale,
          p.split("-")[1] ?? p, // process
          p.startsWith("unfilled") || p === "natural" ? "unfilled" : "filled"
        );
        out.push(abs(locale, `/${proc}-${cutSlug}`));
      }
    }
  }
  return out;
}

// 5) Tiles/Pavers size-first kısa URL'leri (+ versailles ayrımı)
function sizeFirstUrls(locale) {
  const out = [];
  const gen = (product, sizes) => {
    for (const ck of CUT_KEYS) {
      const cutSlug = cutSlugForProduct(locale, ck, product);
      if (!cutSlug) continue;

      for (const p of PROCESS_EN) {
        const proc = buildProcessSlug(
          locale,
          p.split("-")[1] ?? p,
          p.startsWith("unfilled") || p === "natural" ? "unfilled" : "filled"
        );

        for (let s of sizes) {
          if (product === "tiles"  && s === VERS_PAVERS) s = VERS_TILES;
          if (product === "pavers" && s === VERS_TILES)  s = VERS_PAVERS;
          out.push(abs(locale, `/${s}-${proc}-${cutSlug}`));
        }
      }
    }
  };

  gen("tiles",  [...TILE_SIZE_SLUGS_TILES]);
  gen("pavers", [...TILE_SIZE_SLUGS_PAVERS]);

  return out;
}

export default async function sitemap() {
  try {
    const now = new Date();
    const rows = [];

    for (const locale of LOCALES) {
      for (const url of baseAndProductUrls(locale)) {
        rows.push({ url, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
      }
      for (const url of blockColorUrls(locale)) {
        rows.push({ url, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
      }
      for (const url of cutUrls(locale)) {
        rows.push({ url, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
      }
      for (const url of processCutUrls(locale)) {
        rows.push({ url, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
      }
      for (const url of sizeFirstUrls(locale)) {
        rows.push({ url, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
      }
    }

    // Next.js metadata route: array of {url, lastModified?, changeFrequency?, priority?}
    return rows;
  } catch (err) {
    // Sunucu loguna hata düşsün, route yine boş dizi döndürsün (500 yerine)
    console.error("[sitemap] error:", err);
    return [];
  }
}
