// app/[locale]/(catalog)/_images.js

// --- Common (tek görsel sayfalarda da kullanılır)
import phBlock   from "@/public/images/traverterBlock.jpeg";
import phTiles   from "@/public/images/homepage/kesim.webp";
import phSpecial from "@/public/images/homepage/masa.webp";
import phSlabs from "@/public/images/slabs/Allslabs.webp";

// --- Slabs
import slabIvory from "@/public/images/slabs/newIvory.webp";
import slabLight from "@/public/images/slabs/newLight.webp";
import slabAntik from "@/public/images/slabs/newAntiko.webp";

import slabAntikVein  from "@/public/images/slabs/antikveincut.webp";
import slabAntikCross from "@/public/images/slabs/antikcorscut.webp";
import slabLightVein  from "@/public/images/slabs/lightveincut.webp";
import slabLightCross from "@/public/images/slabs/lightcrosscut.webp";
import slabIvoryVein  from "@/public/images/slabs/Ivoryveincut2.webp";
import slabIvoryCross from "@/public/images/slabs/Iverycrosscut2.webp";

// --- Block (örnek yolları değiştir)
import blockIvory from "@/public/images/homepage/Ivoryblok.webp";
import blockLight from "@/public/images/homepage/lightblok3.webp";
import blockAntik from "@/public/images/homepage/Blokantiko.webp";

// --- Tiles (örnek yolları değiştir)
import tilesIvory from "@/public/images/tiles/Ivorykesim.webp";
import tilesLight from "@/public/images/homepage/kesim.webp";
import tilesAntik from "@/public/images/tiles/antikokesim.webp";

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


// /app/_data/_images.js
export const IMAGES_BLOG = {
  "travertine-tiles": {
    hero: { src: tilesIvory, alt: "Travertine tile close-up hero" },
    colors: {
      ivory:  { src: tilesIvory,  alt: "Ivory travertine tiles close-up" },
      light:  { src: tilesLight,  alt: "Light travertine tiles in warm beige" },
      antico: { src: tilesAntik, alt: "Antico travertine tiles rustic texture" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp",  alt: "Polished travertine tile reflecting light" },
      honed:    { src: "/images/newblog/Polishedtravertine.webp",    alt: "Honed travertine tile matte look" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine tile rounded edges" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine tile gentle texture" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine tile floor in a sunlit kitchen" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Ivory travertine bathroom with walk-in shower" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Outdoor terrace with tumbled travertine tiles" }
    ]
  },

  "travertine-slabs": {
    hero: { src: slabAntik, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "travertine-blocks": { 
    hero: { src: blockAntik, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },
  "travertine-pavers": {
    hero: { src: "/images/newblog/travertinepavers.webp", alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },
  "travertine-mosaics": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },
    "polished-travertine": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

   "honed-travertine": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "tumbled-travertine": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },
  "brushed-travertine": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "unfilled-travertine": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

    "ivory-travertine": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "light-travertine": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "antico-travertine": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

    "travertine-flooring": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

      "travertine-cladding": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "travertine-facade": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "travertine-bathroom": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "travertine-kitchen": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

   "travertine-pool": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "travertine-turkey": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "turkish-travertine": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "travertine-quarry": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "travertine-supplier": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "travertine-exporter": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "travertine-manufacturer": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "travertine-distributor": {
    hero: { src: tilesIvory, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: slabIvory,  alt: "Ivory travertine slab close-up" },
      light:  { src: slabLight,  alt: "Light travertine slab warm beige" },
      antico: { src: slabAntik, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/newblog/Polishedtravertine.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/newblog/Polishedtravertine.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/newblog/travertinetumbled.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/homepage/Light/Lighttasarim1.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },
};
