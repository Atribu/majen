// app/components/CollectionsSection.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

// Görseller
import imgAntiko from "@/public/images/figure1.webp";
import imgLight from "@/public/images/figre2.webp"; // dosya adını kontrol edin
import imgIvory from "@/public/images/figure3.webp";

export default function CollectionsSection() {
  const t = useTranslations("CollectionsSection");
  const locale = useLocale();
  const prefix = `/${locale}`;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Metinleri doğrudan diziden okuyacağız
  const collections = [
    {
      key: "antiko",
      title: t("titleAntiko"),
      alt: t("altAntiko"),

      src: imgAntiko,
      href: "/collections/blaundos-antiko",
    },
    {
      key: "light",
      title: t("titleLight"),
      alt: t("altLight"),

      src: imgLight,
      href: "/collections/blaundos-light",
    },
    {
      key: "ivory",
      title: t("titleIvory"),
      alt: t("altIvory"),
      // desc: t("descIvory"),
      // area: t("areaIvory"),
      // view: t("viewIvory"),
      // buttonText: t("buttonText"),
      src: imgIvory,
      href: "/collections/blaundos-ivory",
    },
  ];

  return (
    <div className="flex flex-col w-screen gap-[20px] lg:gap-[40px] items-center justify-center mt-10 mb-20">
      <div className="flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[17px] md:gap-[15px] lg:gap-[20px] items-center justify-center text-center">
        <span className="text-[12px] leading-[14px] uppercase tracking-[0.48px] font-medium font-jost">
          {t("span")}
        </span>
        <h3 className="text-[28px] md:text-[32px] md:leading-[57.6px] lg:text-[48px] capsizedText2 font-marcellus font-normal leading-normal">
          {t("header")}
        </h3>
      </div>

      <div className="flex flex-col md:flex-row w-full md:h-[49vh] md:min-h-[354px] lg:h-[498px]">
        {collections.map((coll, index) => {
          let widthClass;
          if (hoveredIndex === null) widthClass = "w-full md:w-1/3";
          else if (hoveredIndex === index) widthClass = "w-full md:w-1/2";
          else widthClass = "w-full md:w-1/4";

          return (
            <div
              key={coll.key}
              className={`
                relative 
                overflow-hidden 
                group 
                transition-all 
                duration-[1000ms] 
                ease-in-out
                ${widthClass}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Görsel */}
              <Image
                src={coll.src}
                alt={coll.alt || coll.title || ""}
                width={1200}
                height={800}
                sizes="100vw"
                className="w-full h-[44vh] md:h-[498px] object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105 relative"
                priority={index === 0}
              />

              {/* Hover overlay */}
              <div
                className="
                  absolute top-0 left-0 w-full h-full opacity-0
                  group-hover:opacity-100 transition-opacity duration-[1200ms]
                  text-white z-10 flex items-center
                "
              >
                {/* Soldaki şerit */}
                <div
                  className="h-full bg-black bg-opacity-50 flex flex-col lg:justify-end lg:pb-12 w-full md:w-1/4 md:min-w-[310px] gap-[20px]
                    md:opacity-0 md:translate-x-[-10px] opacity-100 md:group-hover:opacity-100 md:group-hover:translate-x-0
                    transition-all duration-[800ms] ease-in-out font-jost items-start justify-center">
                  <Link href={coll.href} className="flex items-center gap-4 text-[28px] lg:text-[28px] leading-[37.5px] tracking-[-0.66px] capitalize font-marcellus font-normal text-left w-auto ml-6 lg:ml-8 cursor-pointer">
                    {coll.title} <ArrowRight
                    className="
                  h-8 w-8
                  translate-x-0 group-hover:translate-x-1
                  transition-transform duration-300"
                  />
                  </Link>

                  
                  {/* İkon satırı / metrikler */}
                  <div className="flex items-center gap-4 ml-6 lg:ml-16 text-[14px] lg:text-[16px]"></div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
