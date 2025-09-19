// app/components/HighlightSection.jsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
// Eğer otomatik oynatma istersek yorum satırını aç:
// import Autoplay from "embla-carousel-autoplay";

import imgA1 from "@/public/images/homepage/Antik/Antiktasarim1.webp";
import imgA2 from "@/public/images/homepage/Antik/Antiktasarim2.webp";
import imgA3 from "@/public/images/homepage/Antik/Antiktasarim3.webp";
import imgA4 from "@/public/images/homepage/Antik/Antiktasarim4.webp";
// İstersen burada başka görseller de ekle:
// import imgA2 from "@/public/images/homepage/Antiktasarim4.webp";
// import imgA3 from "@/public/images/homepage/Antiktasarim5.webp";

import imgB1 from "@/public/images/homepage/Light/Lighttasarim1.webp";
import imgB2 from "@/public/images/homepage/Light/Lighttasarim2.webp";
import imgB3 from "@/public/images/homepage/Light/lighttasarim3.webp";
import imgB4 from "@/public/images/homepage/Light/lighttasarim4.webp";
// import imgB2 from "@/public/images/homepage/Lighttasarim2.webp";

import imgC1 from "@/public/images/homepage/Ivory/Ivorytasarim1.webp";
import imgC2 from "@/public/images/homepage/Ivory/Ivorytasarim2.webp";
import imgC3 from "@/public/images/homepage/Ivory/Ivorytasarim3.webp";
import imgC4 from "@/public/images/homepage/Ivory/Ivorytasarim4.webp";
// import imgC2 from "@/public/images/homepage/Ivorytasarim2.webp";

export default function HighlightSection() {
  const t = useTranslations("HighlightSection");

  // imgA → arrayA, imgB → arrayB, imgC → arrayC
  const arrayA = [imgA1 , imgA2, imgA3, imgA4];
  const arrayB = [imgB1 , imgB2, imgB3,imgB4 ];
  const arrayC = [imgC1 , imgC2, imgC3, imgC4 ];

  // Hangi görsel grubu hangi bloğa gelecek + yön
  const items = [
    { key: "item1", imgs: arrayA, reverse: false },
    { key: "item2", imgs: arrayB, reverse: true },
    { key: "item3", imgs: arrayC, reverse: false },
  ];

  return (
    <section className="relative w-full mt-24 z-[990]">
      <div className="max-w-7xl mx-auto space-y-24 lg:space-y-28 w-[95%] lg:w-[90%]">
        {items.map(({ key, imgs, reverse }, idx) => (
          <div
            key={key}
            className={`flex flex-col-reverse ${
              reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center`}>
            {/* Görsel (her blok için bağımsız carousel) */}
            <div className="w-full lg:w-[96%]">
              <Carousel
  images={imgs}
  altBase={t.raw(`items.${key}.alts`)} // dizi olarak alıyoruz
  priorityFirst={idx === 0}
/>
            </div>
            {/* Kart */}
            <div
              className={`w-full lg:w-1/2 flex ${
                reverse ? "lg:justify-start" : "lg:justify-end"
              }`}>
              <div
                className={`bg-white shadow-xl p-4 lg:p-8 max-w-md text-center items-center justify-center flex flex-col
                -mt-12 sm:-mt-16 lg:mt-0
                ${reverse
                    ? "lg:translate-x-16 xl:translate-x-24"
                    : "lg:-translate-x-16 xl:-translate-x-24"
                }`} >
                <h4 className="text-[20px] md:text-[22px] lg:text-[26px] font-bold leading-[100%] md:leading-tight text-black">
                  {t(`items.${key}.title`)}
                </h4>
                <p className="mt-4 text-[12px] lg:text-[16px] text-gray-600 leading-tight lg:leading-relaxed">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ———————————————————————————————————————————
   Re-usable Embla Carousel (yalın, tasarımı bozmaz)
   ——————————————————————————————————————————— */
function Carousel({ images, altBase, priorityFirst = false }) {
  // Autoplay istersen:
  // const [emblaRef, emblaApi] = useEmblaCarousel(
  //   { loop: true, containScroll: "trimSnaps", skipSnaps: false },
  //   [Autoplay({ delay: 4000, stopOnInteraction: false })]
  // );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: "trimSnaps",
    skipSnaps: false,
    dragFree: false,
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative">
      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        {/* Container */}
        <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {images.map((img, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%]">
              <div className="relative w-full h-60 sm:h-96 lg:h-[600px]">
                <Image
                  src={img}
                  alt={altBase[i] || "Travertine project image"}
                  fill
                  priority={priorityFirst && i === 0}
                  className="object-cover"
                  sizes="(min-width: 1024px) 96vw, 100vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Kontroller (tasarımı bozmadan köşelere) */}
      <button
        onClick={scrollPrev}
        aria-label="Previous"
        className="absolute left-2 top-[90%] -translate-y-1/2 z-[10] rounded-full bg-white/70 hover:bg-white px-2 lg:px-3 py-1 lg:py-2 shadow ">
        ‹
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next"
        className="absolute right-2 top-[90%] -translate-y-1/2 z-[10] rounded-full bg-white/70 hover:bg-white px-2 lg:px-3 py-1 lg:py-2 shadow  " >
        ›
      </button>

      {/* Basit dots (isteğe bağlı) */}
      {images.length > 1 && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-[990]">
          {images.map((_, i) => (
            <span
              key={i}
              className="size-2 rounded-full bg-white/70 shadow"
            />
          ))}
        </div>
      )}
    </div>
  );
}
