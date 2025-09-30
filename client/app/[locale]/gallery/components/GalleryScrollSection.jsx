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

import tiles1 from "@/public/images/tiles/Ivorykesim.webp";
import tiles2 from "@/public/images/homepage/kesim.webp";
import tiles3 from "@/public/images/tiles/antikokesim.webp";

import special1 from "@/public/images/design/IvoryMasa.webp";
import special2 from "@/public/images/design/LightMasa.webp";
import special3 from "@/public/images/design/AntikoMasa.webp";

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


const GalleryScrollSection = () => {
  const [modalIndex, setModalIndex] = useState(null);
  const t = useTranslations('Gallery');

  // Kategorilere göre resimler
const imageCategories = {
  [t("general")]: [special3, slabs1,general1,block1, general2,tiles1, slabs2, general3, general4,slabs3, general5, special3, tiles2, general6,general7,block2,general8,general9, tiles3, general10,block3,special2],
  [t("blocks")]: [block1,block2, block3,,block1,block2, block3,],
  [t("slabs")]: [slabs1, slabs2, slabs3, slabs4, slabs5,slabs6,slabIvory,slabLight,slabAntik],
  [t("tiles")]: [tiles1, tiles2, tiles3,tiles1, tiles2, tiles3,],
  [t("special")]: [special1, special2, special3, special1, special2],
  [t("export")]: [export1, export2, export3, export4, export5,export6,export7,export8,export9,export10,export11],

}

const categories = Object.keys(imageCategories)
  // Seçili kategori (başlangıçta "GENERAL VIEW")
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [modalImage, setModalImage] = useState(null) 

  const openModal = (img, index) => {
    setModalImage(img);
    setModalIndex(index);
  };

  const scrollPrev = () => {
    const images = imageCategories[selectedCategory];
    const newIndex = modalIndex === 0 ? images.length - 1 : modalIndex - 1;
    setModalIndex(newIndex);
    setModalImage(images[newIndex]);
  };

  // Sağ ok: index'i artır, wrap-around uygulayarak ilk elemana geçsin
  const scrollNext = () => {
    const images = imageCategories[selectedCategory];
    const newIndex = modalIndex === images.length - 1 ? 0 : modalIndex + 1;
    setModalIndex(newIndex);
    setModalImage(images[newIndex]);
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
        <div className="grid grid-cols-4 xl:flex items-center justify-center gap-[10px] lg:gap-[30px] w-full max-w-[1008px]">
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
              {imageCategories[selectedCategory].map((imgSrc, index) => (
                <div
                  className="mb-[19.16px] transition-all duration-[350ms] ease-in-out cursor-pointer"
                  key={index}
                  onClick={() => openModal(imgSrc,index)} // Resme tıklandığında modal açılır
                >
                  <Image src={imgSrc} alt="gallery" className="lg:w-[322px] h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal (Lightbox) */}
        {modalImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={() => setModalImage(null)} // Modal dışına tıklandığında kapanır
          >
            <div className="relative w-[80%] " onClick={(e) => e.stopPropagation()}>
              <Image src={modalImage} alt="Enlarged gallery" className="w-full h-auto object-cover max-h-[890px]" />
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white"
                onClick={scrollPrev}
                aria-label="Previous"
              >
                <MdArrowBackIosNew size={32} />
              </button>
              {/* Sağ Ok */}
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white"
                onClick={scrollNext}
                aria-label="Next"
              >
                <MdArrowForwardIos size={32} />
              </button>
            </div>
            <button
                className="absolute top-6 right-4 text-white text-4xl"
                onClick={() => setModalImage(null)}
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
