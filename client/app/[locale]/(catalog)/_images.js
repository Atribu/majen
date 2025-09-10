// app/[locale]/(catalog)/_images.js

// --- Common (tek görsel sayfalarda da kullanılır)
import phBlock   from "@/public/images/traverterBlock.jpeg";
import phTiles   from "@/public/images/homepage/kesim.webp";
import phSpecial from "@/public/images/homepage/masa.webp";
import phSlabs from "@/public/images/homepage/slabler.webp";

// --- Slabs
import slabIvory from "@/public/images/slabs/Ivory.webp";
import slabLight from "@/public/images/slabs/light.webp";
import slabAntik from "@/public/images/slabs/antik.webp";

import slabAntikVein  from "@/public/images/slabs/antikveincut.webp";
import slabAntikCross from "@/public/images/slabs/antikcorscut.webp";
import slabLightVein  from "@/public/images/slabs/lightveincut.webp";
import slabLightCross from "@/public/images/slabs/lightcrosscut.webp";
import slabIvoryVein  from "@/public/images/slabs/Ivoryveincut2.webp";
import slabIvoryCross from "@/public/images/slabs/Iverycrosscut2.webp";

// --- Block (örnek yolları değiştir)
import blockIvory from "@/public/images/blocks/Ivoryblok.webp";
import blockLight from "@/public/images/blocks/Lightblok.webp";
import blockAntik from "@/public/images/blocks/antik.webp";

// --- Tiles (örnek yolları değiştir)
import tilesIvory from "@/public/images/homepage/kesim.webp";
import tilesLight from "@/public/images/homepage/kesim.webp";
import tilesAntik from "@/public/images/homepage/kesim.webp";

// --- Special (örnek yolları değiştir)
import specialIvory from "@/public/images/homepage/masa.webp";
import specialLight from "@/public/images/homepage/masa.webp";
import specialAntik from "@/public/images/homepage/masa.webp";

/**
 * Ürün başına görsel haritası:
 * - Tek görsel istersen "cover" yeter.
 * - Varyant bazlı kart/hero için { cover, ivory, light, antiko } yapısı.
 */
export const PRODUCT_IMG = {
  block: {
    cover: blockIvory ?? phBlock, // fallback mevcut tek görselin
    ivory: blockIvory,
    light: blockLight,
    antiko: blockAntik,
  },
  slabs: {
    cover: phSlabs,
    ivory: slabIvory,
    light: slabLight,
    antiko: slabAntik,
  },
  tiles: {
    cover: tilesIvory ?? phTiles,
    ivory: tilesIvory,
    light: tilesLight,
    antiko: tilesAntik,
  },
  special: {
    cover: specialIvory ?? phSpecial,
    ivory: specialIvory,
    light: specialLight,
    antiko: specialAntik,
  },
};

/**
 * ÜRÜN + SLUG'a göre kesin görsel seçimi:
 * Aynı slug farklı ürünlerde farklı görseller kullanacaksa bunu kullan.
 * Örn. "/tr/traverten/block/blaundos-antiko" kartı → IMAGE_BY_PRODUCT_AND_VARIANT.block["blaundos-antiko"]
 */
export const IMAGE_BY_PRODUCT_AND_VARIANT = {
  block: {
    "blaundos-ivory": blockIvory,
    "blaundos-light": blockLight,
    "blaundos-antiko": blockAntik,
  },
  slabs: {
    "blaundos-ivory": slabIvory,
    "blaundos-light": slabLight,
    "blaundos-antiko": slabAntik,
  },
  tiles: {
    "blaundos-ivory": tilesIvory,
    "blaundos-light": tilesLight,
    "blaundos-antiko": tilesAntik,
  },
  special: {
    "blaundos-ivory": specialIvory,
    "blaundos-light": specialLight,
    "blaundos-antiko": specialAntik,
  },
};

export const IMAGE_BY_PRODUCT_VARIANT_AND_CUT = {
  slabs: {
    "blaundos-antiko": {
      "vein-cut":  slabAntikVein,
      "cross-cut": slabAntikCross,
    },
    "blaundos-light": {
      "vein-cut":  slabLightVein,
      "cross-cut": slabLightCross,
    },
    "blaundos-ivory": {
      "vein-cut":  slabIvoryVein,
      "cross-cut": slabIvoryCross,
    },
  },
  
  tiles: {
    "blaundos-antiko": {
      "vein-cut":  phTiles,
      "cross-cut": phTiles,
    },
    "blaundos-light": {
      "vein-cut":  phTiles,
      "cross-cut": phTiles,
    },
    "blaundos-ivory": {
      "vein-cut":  phTiles,
      "cross-cut": phTiles,
    },
  },

    special: {
    "blaundos-antiko": {
      "vein-cut":  phSpecial,
      "cross-cut": phSpecial,
    },
    "blaundos-light": {
      "vein-cut":  phSpecial,
      "cross-cut": phSpecial,
    },
    "blaundos-ivory": {
      "vein-cut":  phSpecial,
      "cross-cut": phSpecial,
    },
  },
};
