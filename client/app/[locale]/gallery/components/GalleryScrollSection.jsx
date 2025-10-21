"use client"
import React, { useState, useEffect } from "react"
import {useTranslations} from 'next-intl';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import Image from "next/image"
import block1 from "@/public/images/homepage/Ivoryblok.webp";
import block2 from "@/public/images/homepage/lightblok3.webp";
import block3 from "@/public/images/homepage/Blokantiko.webp";

import slabs1  from "@/public/images/slabs/antikveincut.webp";
import slabs2 from "@/public/images/slabs/antikcorscut.webp";
import slabs3  from "@/public/images/slabs/lightveincut.webp";
import slabs4 from "@/public/images/slabs/lightcrosscut.webp";
import slabs5  from "@/public/images/slabs/Ivoryveincut2.webp";
import slabs6 from "@/public/images/slabs/Iverycrosscut2.webp";
import slabIvory from "@/public/images/slabs/newIvory.webp";
import slabLight from "@/public/images/slabs/newLight.webp";
import slabAntik from "@/public/images/slabs/newAntiko.webp";

import slabAntikVein  from "@/public/images/slabs/antikveincut.webp";
import slabAntikCross from "@/public/images/slabs/antikcorscut.webp";
import slabLightVein  from "@/public/images/slabs/lightveincut.webp";
import slabLightCross from "@/public/images/slabs/lightcrosscut.webp";
import slabIvoryVein  from "@/public/images/slabs/Ivoryveincut2.webp";
import slabIvoryCross from "@/public/images/slabs/Iverycrosscut2.webp";

import tiles1 from "@/public/images/tiles/Ivorykesim.webp";
import tiles2 from "@/public/images/homepage/kesim.webp";
import tiles3 from "@/public/images/tiles/antikokesim.webp";

import special1 from "@/public/images/design/IvoryMasa.webp";
import special2 from "@/public/images/design/LightMasa.webp";
import special3 from "@/public/images/design/AntikoMasa.webp";
import special4 from "@/public/images/design/antiko/Antikoaksesuar.webp";
import special5 from "@/public/images/design/antiko/Antikoaksesuar2.webp";
import special6 from "@/public/images/design/antiko/Antikoaksesuar3.webp";
import special7 from "@/public/images/design/antiko/Antikoaksesuar4.webp";
import special8 from "@/public/images/design/antiko/Antikoaksesuar5.webp";
import special9 from "@/public/images/design/light/Lightaksesuar1.webp";
import special10 from "@/public/images/design/light/Lightaksesuar2.webp";
import special11 from "@/public/images/design/light/Lightaksesuar3.webp";
import special12 from "@/public/images/design/light/lighttasarim5.webp";
import special13 from "@/public/images/design/light/lighttasarim6.webp";
import special14 from "@/public/images/design/light/lighttasarim7.webp";
import special15 from "@/public/images/design/ivory/IvoryAksesuar2.webp";
import special16 from "@/public/images/design/ivory/IvoryAksesuar3.webp";
import special17 from "@/public/images/design/ivory/IvoryAksesuar4.webp";
import special18 from "@/public/images/design/ivory/IvoryAksesuar5.webp";
import special19 from "@/public/images/design/ivory/IvoryAksesuar6.webp";

import general1 from "@/public/images/newblog/Polishedtravertine.webp";
import general2 from "@/public/images/newblog/travertinetumbled.webp";
import general3 from "@/public/images/newblog/Filledtravertine.webp";
import general4 from "@/public/images/newblog/travertinepavers.webp";
import general5 from "@/public/images/homepage/antikarkaplan2.webp";
import general6 from "@/public/images/homepage/antikarkaplan4.webp";
import general7 from "@/public/images/homepage/antikoarkplan.webp";
import general8 from "@/public/images/homepage/Antiktasarim3.webp";
import general9 from "@/public/images/homepage/Lighttasarim1.webp";
import general10 from "@/public/images/homepage/Ivorytasarim1.webp";
import general11 from "@/public/images/design/design1.webp";
import general12 from "@/public/images/design/design2.webp";
import general13 from "@/public/images/design/design3.webp";

import export1 from "@/public/images/blogs/travertinedistributor.webp";
import export2 from "@/public/images/blogs/Travertinemanufacturer.webp";
import export3 from "@/public/images/blogs/travertineexporter.webp";
import export4 from "@/public/images/blogs/Travertinesupplier.webp"
import export5 from "@/public/images/blogs/TravertineQuarry.webp"
import export6 from "@/public/images/blogs/TurkishTravertine.webp"
import export7 from "@/public/images/blogs/TravertineTurkey.webp"
import export8 from "@/public/images/export/WhoWorks.webp"
import export9 from "@/public/images/export/FOB.webp"
import export10 from "@/public/images/export/CIF.webp"
import export11 from "@/public/images/export/EXW.webp"

// --- SEO helpers -------------------------------------------------------------
const img = (src, caption = null, alt = "gallery") => ({ src, caption, alt });

function inferColorFromPath(srcPath = "") {
  const p = String(srcPath).toLowerCase();
  if (/ivory/.test(p)) return "Ivory";
  if (/light/.test(p)) return "Light";
  if (/(antik|antico)/.test(p)) return "Antico";
  return null;
}

function inferCutFromPath(srcPath = "") {
  const p = String(srcPath).toLowerCase();
  if (/vein/.test(p)) return "Vein Cut";
  if (/cross/.test(p)) return "Cross Cut";
  return null;
}

function makeSeoMeta(srcModule, category /* "blocks" | "slabs" | ... */) {
  const path = (srcModule && srcModule.src) || String(srcModule || "");
  const color = inferColorFromPath(path);
  const cut   = inferCutFromPath(path);

  if (category === "blocks") {
    const text = `Travertine Blocks${color ? ` — ${color}` : ""}`;
    return { alt: text, caption: text };
  }
  if (category === "slabs") {
    const text = `Travertine Slabs${color ? ` — ${color}` : ""}${cut ? ` (${cut})` : ""}`;
    return { alt: text, caption: text };
  }

  const defaults = {
    tiles:   "Travertine Tiles",
    special: "Travertine Special Designs",
    export:  "Travertine Export & Logistics",
    general: "Travertine Gallery",
  };
  const text = defaults[category] || "Travertine";
  return { alt: text, caption: text };
}

function addSeo(list, category) {
  return (list || []).map((src) => {
    const { alt, caption } = makeSeoMeta(src, category);
    return img(src, caption, alt);
  });
}
// ---------------------------------------------------------------------------


const GalleryScrollSection = () => {
  const [modalIndex, setModalIndex] = useState(null);
  const t = useTranslations('Gallery');

  // Kategorilere göre resimler
const imageCategories = {
  [t("general")]: addSeo(
    [special3, general11, special4, slabs1, general1, block1, general2, special5, tiles1,
     slabs2, special6, special18, special12, general3, general4, special8, slabs3, general5,
     special9, general12, special3, tiles2, general6, general7, special10, block2, general8,
     general9, special18, tiles3, general13, general10, block3, special2],
    "general"
  ),
  [t("blocks")]: addSeo([block1, block2, block3], "blocks"),
  [t("slabs")]: addSeo(
    [slabIvory, slabs1, slabs2, slabLight, slabs3, slabs4, slabs5, slabAntik,
     slabs6, slabAntikVein, slabIvoryVein],
    "slabs"
  ),
  [t("tiles")]:   addSeo([tiles1, tiles2, tiles3], "tiles"),
  [t("special")]: addSeo([special1, special2, special3, general11, general12, general13,
                          special4, special5, special6, special7, special8, special9, special10,
                          special11, special12, special13, special14, special15, special16,
                          special17, special18, special19], "special"),
  [t("export")]:  addSeo([export1, export2, export3, export4, export5, export6, export7,
                          export8, export9, export10, export11], "export"),
};


const categories = Object.keys(imageCategories)
  // Seçili kategori (başlangıçta "GENERAL VIEW")
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [modalImage, setModalImage] = useState(null) 

const openModal = (index) => setModalIndex(index);

// aktif dizi ve görsel (seçili kategoriden)
const activeList = imageCategories[selectedCategory] || [];
const activeItem = (modalIndex != null) ? activeList[modalIndex] : null; 

const scrollPrev = () => {
  const images = imageCategories[selectedCategory];
  if (!images?.length) return;
  const newIndex = modalIndex === 0 ? images.length - 1 : modalIndex - 1;
  setModalIndex(newIndex);
};

const scrollNext = () => {
  const images = imageCategories[selectedCategory];
  if (!images?.length) return;
  const newIndex = modalIndex === images.length - 1 ? 0 : modalIndex + 1;
  setModalIndex(newIndex);
};

  useEffect(() => {
    if (!modalImage) return; // Modal kapalıysa listener ekleme
    
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        scrollNext();
      } else if (e.key === "Escape") {
        setModalImage(null);
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalImage, scrollPrev, scrollNext]);

  return (
    <div className="flex w-screen items-center justify-center mt-[50px] max-w-[1440px]">
      <div className="flex flex-col items-center justify-between w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[40px]">
        {/* Butonlar */}
        <div className="grid grid-cols-3 xl:flex items-center justify-center gap-[10px] lg:gap-[30px] w-full max-w-[1008px]">
          {Object.keys(imageCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex border border-lagoGray items-center justify-center whitespace-nowrap py-[12px] px-[16px] lg:py-[16px] lg:px-[20px] lg:w-[140px] text-[12px] lg:text-[14px] font-medium uppercase leading-[125%] -tracking-[0.33px] font-jost ${
                selectedCategory === category ? "bg-gray-700 text-white" : "text-lagoGray"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resimler */}
        <div className="flex lg:w-[1006px] h-[500px] md:h-[1000px] lg:h-[1700px]">
          <div className="flex flex-col w-full overflow-auto hover:overflow-scroll custom-scroll h-auto">
            <div className="columns-2 lg:columns-3 gap-[16px] lg:gap-[0px] transition-all duration-[350ms] ease-in-out cursor-pointer">
             {imageCategories[selectedCategory].map(({ src, alt, caption }, index) => (
  <figure
    className="mb-[19.16px] transition-all duration-[350ms] ease-in-out cursor-pointer"
    key={index}
    onClick={() => openModal(index)}  // ← sadece index gönder
  >
    <Image src={src} alt={alt} className="lg:w-[322px] h-full" />
    {/* İstersen küçük alt yazı */}
    {/* <figcaption className="mt-1 text-[11px] text-neutral-600">{caption}</figcaption> */}
  </figure>
))}

            </div>
          </div>
        </div>

        {/* Modal (Lightbox) */}
       {activeItem && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    onClick={() => setModalIndex(null)}
  >
    <div className="relative w-[80%]" onClick={(e) => e.stopPropagation()}>
      <Image
        src={activeItem.src}
        alt={activeItem.alt}
        className="w-full h-auto object-cover max-h-[890px]"
      />
      {activeItem.caption && (
        <div className="mt-2 text-center text-white/90 text-sm">
          {activeItem.caption}
        </div>
      )}

      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-700/50 hover:bg-gray-700/75 text-white"
        onClick={scrollPrev}
        aria-label="Previous"
      >
        <MdArrowBackIosNew size={32} />
      </button>

      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-700/50 hover:bg-gray-700/75 text-white"
        onClick={scrollNext}
        aria-label="Next"
      >
        <MdArrowForwardIos size={32} />
      </button>
    </div>

    <button
      className="absolute top-6 right-4 text-white text-4xl"
      onClick={() => setModalIndex(null)}
      aria-label="Close"
    >
      &times;
    </button>
  </div>
)}

      </div>
    </div>
  )
}

export default GalleryScrollSection
