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
import specialIvory from "@/public/images/design/IvoryMasa.webp";
import specialLight from "@/public/images/design/LightMasa.webp";
import specialAntik from "@/public/images/design/AntikoMasa.webp";
import travertineTurkey from "@/public/images/blogs/TravertineTurkey.webp"

//-------------------Cut
import anticoepoxycrosspolish from "@/public/images/cut/antico/epoxy/Cross/Antikcrossepoxypolished.webp"
import anticoepoxycrossunpolish from "@/public/images/cut/antico/epoxy/Cross/Antikcrossepoxyunpolished.webp"

import anticoepoxyveinpolish from "@/public/images/cut/antico/epoxy/veincut/Antikveinepoxypolished.webp"
import anticoepoxyveinunpolish from "@/public/images/cut/antico/epoxy/veincut/Antikveinepoxypolished.webp"

import anticofillingcrosspolish from "@/public/images/cut/antico/filling/Crosscut/Antikfillingpolishedcross.webp"
import anticofillingcrossunpolish from "@/public/images/cut/antico/filling/Crosscut/Antikfillingunpolishedcross.webp"

import anticofillingveinpolish from "@/public/images/cut/antico/filling/Veincut/Antikfillingveincutpolished.webp"
import anticofillingveinunpolish from "@/public/images/cut/antico/filling/Veincut/Antikveincutfillingunpolished.webp"

import anticoslabcrosscut from "@/public/images/cut/antico/Slab/Antikcrosscut.webp"
import anticoslabveincut from "@/public/images/cut/antico/Slab/Antikveincut.webp"

import anticotransparentcrosspolish from "@/public/images/cut/antico/Transparent/cross/antikcrosstransparentpolished.webp"
import anticotransparentcrossunpolish from "@/public/images/cut/antico/Transparent/cross/Antikcrosstransparentunpolished.webp"

import ivoryAntiquecrosspolish from "@/public/images/cut/ivory/Antique/cross/Iverycrossantiquepolished.webp"
import ivoryAntiquecrossunpolish from "@/public/images/cut/ivory/Antique/cross/Iverycrossantiqueunpolished.webp"

import ivoryepoxycrosspolish from "@/public/images/cut/ivory/epoxy/Cross/Iverycrossepoxypolished.webp"
import ivoryepoxycrossunpolish from "@/public/images/cut/ivory/epoxy/Cross/Iverycrossepoxyunpolished.webp"

import ivoryepoxyveinpolish from "@/public/images/cut/ivory/epoxy/vein/Iveryveinepoxypolished.webp"
import ivoryepoxyveinunpolish from "@/public/images/cut/ivory/epoxy/vein/Iveryveinepoxyunpolished.webp"

import ivoryfillingcrosspolish from "@/public/images/cut/ivory/Filling/Crosscut/crosscutfillingpolished.webp"
import ivoryfillingcrossunpolish from "@/public/images/cut/ivory/Filling/Crosscut/crosscutfillingunpolished.webp"

import ivoryfillingveinunpolish from "@/public/images/cut/ivory/Filling/Veincut/Ivoryveinfilling.png"

import ivoryslabcross from "@/public/images/cut/ivory/Slab/Iverycrosscut.webp"
import ivoryslabvein from "@/public/images/cut/ivory/Slab/Iveryveincut.webp"

import ivorytransparentcross from "@/public/images/cut/ivory/Transparent/Iverycrosstransparent.webp"

import lightepoxycrosspolish from "@/public/images/cut/light/epoxy/Cross/Lightcrossepoxypolished.webp"
import lightepoxycrossunpolish from "@/public/images/cut/light/epoxy/Cross/Lightcrossepoxyunpolished.webp"

import lightfillingcrosspolish from "@/public/images/cut/light/Filling/Crosscut/lightgcrosspolish.webp"
import lightfillingcrossunpolish from "@/public/images/cut/light/Filling/Crosscut/lightguncrosspolish.webp"

import lightfillingveinunpolish from "@/public/images/cut/light/Filling/Veincut/lightunpolishedvein.webp"

import lightslabcross from "@/public/images/cut/light/Slab/lightcrosscut.webp"
import lightslabvein from "@/public/images/cut/light/Slab/lightveincut.webp"

import lightslabveinpolish from "@/public/images/cut/light/Transparent/Lightcrosstransparent.webp"

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
      "vein-cut":  anticoepoxyveinpolish,
      "cross-cut": anticoepoxycrosspolish,
    },
    "blaundos-light": {
      "vein-cut":  lightslabvein,
      "cross-cut": lightslabcross,
    },
    "blaundos-ivory": {
      "vein-cut":  ivoryslabvein,
      "cross-cut": ivoryslabcross,
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
  }
};

export const IMAGE_BY_PRODUCT_VARIANT_AND_PROCESS = {
  slabs: {
    "blaundos-antiko": {
      "vein-cut":  {
        "natural":anticoslabveincut,
        "filling":anticofillingveinpolish,
        "epoxy":anticoepoxyveinpolish,
        "transparent":slabAntikVein,
        "antique":slabAntikVein,
      },
      "cross-cut": {
        "natural":anticoslabcrosscut,
        "filling":anticofillingcrosspolish,
        "epoxy":anticoepoxycrosspolish,
        "transparent":slabAntikVein,
        "antique":slabAntikVein,
      },
    },

    "blaundos-light": {
      "vein-cut":  {
        "natural":lightslabvein,
        "filling":lightfillingveinunpolish,
        "epoxy":slabAntikVein,
        "transparent":slabAntikVein,
        "antique":slabAntikVein,
      },
      "cross-cut": {
        "natural":lightslabcross,
        "filling":lightfillingcrosspolish,
        "epoxy":lightepoxycrosspolish,
        "transparent":slabAntikVein,
        "antique":slabAntikVein,
      },
    },

    "blaundos-ivory": {
      "vein-cut":  {
        "natural":ivoryslabvein,
        "filling":ivoryfillingveinunpolish,
        "epoxy":ivoryepoxyveinpolish,
        "transparent":slabAntikVein,
        "antique":slabAntikVein,
      },
      "cross-cut": {
        "natural":ivoryslabcross,
        "filling":ivoryfillingcrosspolish,
        "epoxy":ivoryepoxycrosspolish,
        "transparent":ivorytransparentcross,
        "antique":slabAntikVein,
      },
    },
  },
  
  tiles: {
    "blaundos-antiko": {
      "vein-cut":  {
        "natural":phTiles,
        "filling":phTiles,
        "epoxy":phTiles,
        "transparent":phTiles,
        "antique":phTiles,
      },
      "cross-cut": {
        "natural":phTiles,
        "filling":phTiles,
        "epoxy":phTiles,
        "transparent":phTiles,
        "antique":phTiles,
      },
    },
    "blaundos-light": {
      "vein-cut":  {
        "natural":phTiles,
        "filling":phTiles,
        "epoxy":phTiles,
        "transparent":phTiles,
        "antique":phTiles,
      },
      "cross-cut": {
        "natural":phTiles,
        "filling":phTiles,
        "epoxy":phTiles,
        "transparent":phTiles,
        "antique":phTiles,
      },
    },
    "blaundos-ivory": {
      "vein-cut":  {
        "natural":phTiles,
        "filling":phTiles,
        "epoxy":phTiles,
        "transparent":phTiles,
        "antique":phTiles,
      },
      "cross-cut": {
        "natural":phTiles,
        "filling":phTiles,
        "epoxy":phTiles,
        "transparent":phTiles,
        "antique":phTiles,
      },
    },
  }
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
    hero: { src: "/images/homepage/antikarkaplan4.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/newblog/Polishedtravertine.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/blog/honed.jpg", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/newblog/travertinetumbled.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/blog/Brushed.jpg", alt: "Large Ivory travertine slab on a kitchen island" },
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

   "filled-travertine": {
    hero: { src: "/images/newblog/Filledtravertine.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/blog/unfilled.jpg", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/homepage/Ivory/ivory.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src:  "/images/homepage/Light/light.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/homepage/antik/antik.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/homepage/Light/lighttasarim3.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/homepage/Light/lighttasarim4.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/homepage/Antik/Antiktasarim4.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/homepage/Ivory/Ivorytasarim1.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/homepage/Antik/Antiktasarim2.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/homepage/Ivory/Ivorytasarim2.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: travertineTurkey, alt: "Large Ivory travertine slab on a kitchen island" },
    colors: {
      ivory:  { src: travertineTurkey,  alt: "Ivory travertine slab close-up" },
      light:  { src: travertineTurkey,  alt: "Light travertine slab warm beige" },
      antico: { src: travertineTurkey, alt: "Antico travertine slab rustic hues" }
    },
    finishes: {
      polished: { src: "/images/blogs/TravertineTurkey.webp", alt: "Polished travertine slab reflective" },
      honed:     { src: "/images/blogs/TravertineTurkey.webp",  alt: "Honed travertine slab matte" },
      brushed:  { src: "/images/blogs/TravertineTurkey.webp", alt: "Brushed travertine slab texture" },
      tumbled:  { src: "/images/blogs/TravertineTurkey.webp",  alt: "Tumbled travertine slab antique finish" }
    },
    gallery: [
      { src: "/images/blogs/TravertineTurkey.webp", alt: "Travertine slab facade on a modern building" },
      { src: "/images/blogs/TravertineTurkey.webp", alt: "Kitchen countertop in Ivory travertine slab" },
      { src: "/images/blogs/TravertineTurkey.webp", alt: "Bathroom vanity top from Light travertine slab" }
    ]
  },

  "turkish-travertine": {
    hero: { src: "/images/blogs/TurkishTravertine.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/blogs/TravertineQuarry.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/blogs/Travertinesupplier.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src:  "/images/blogs/travertineexporter.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/blogs/Travertinemanufacturer.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
    hero: { src: "/images/blogs/travertinedistributor.webp", alt: "Large Ivory travertine slab on a kitchen island" },
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
