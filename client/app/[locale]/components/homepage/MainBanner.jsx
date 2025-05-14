// app/components/MainBanner.jsx
"use client";
import { useTranslations } from 'next-intl';
import { useState } from "react";
import Image from "next/image";
import img1 from "@/public/images/maden.webp";
import img2 from "@/public/images/salon.webp";

export default function MainBanner() {
  const t = useTranslations('MainBanner');
  const [active, setActive] = useState(2);

  const slides = [
    {
      id: 1,
      img: img1,
      alt: t('alt1'),
      title: t('title1'),
      description: t('description1'),
      buttonText: t('buttonText1'),
      buttonLink: t('buttonLink1'),
    },
    {
      id: 2,
      img: img2,
      alt: t('alt2'),
      title: t('title2'),
      description: t('description2'),
      buttonText: t('buttonText2'),
      buttonLink: t('buttonLink2'),
    },
  ];

  return (
    <section className="relative max-w-screen h-screen overflow-hidden">
      {slides.map((slide) => {
        const isActive = active === slide.id;
        return (
          <div
            key={slide.id}
            className={`
              absolute inset-0
              transition-transform duration-700 ease-in-out
              ${isActive
                ? "translate-y-0 z-20"
                : slide.id < active
                ? "-translate-y-full z-10"
                : "translate-y-full z-10"}`}>
            {/* Arka plan görseli */}
            <Image
              src={slide.img}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={slide.id === 1}
            />
            {/* Yarı saydam karartma */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* İçerik: metin bloğu */}
            <div className="absolute inset-0 flex items-center z-20 pointer-events-none">
              <div
                className={`
                  ml-[14%] mr-[1%] md:ml-[16%] -mt-[5%] lg:mt-[10%] max-w-lg lg:max-w-[780px]
                  text-white pointer-events-auto
                  transform transition-all duration-700 ease-in-out
                  ${isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"}
                `}>
                <h1 className="whitespace-pre-wrap text-[32px] md:text-5xl lg:text-[56px] xl:text-[60px] font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-4 text-[12px] md:text-base lg:text-lg leading-relaxed">
                  {slide.description}
                </p>
                <a
                  href={slide.buttonLink}
                  className="inline-block mt-6 px-3 py-1 hover:bg-white hover:text-gray-900 transition text-[16px] lg:text-[20px] font-semibold"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        );
      })}

      {/* Kontroller */}
      <div className="absolute top-1/2 left-3 lg:left-8 transform -translate-y-1/2 flex flex-col space-y-4 z-30">
        {slides.map(({ id }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`
              text-[14px] md:text-[18px] lg:text-xl font-medium transition-colors
              ${active === id ? "text-white border px-[6px] py-[2px] md:px-2 md:py-1 shadow-lg" : "text-gray-300 hover:text-white  px-[6px] py-[2px] md:px-2 md:py-1"}
            `}
          >
            {id < 10 ? `0${id}` : id}
          </button>
        ))}
      </div>
    </section>
  );
}
