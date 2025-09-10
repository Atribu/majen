// app/components/CollectionsSection.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import antik from "@/public/images/slabs/antik.webp";
import ivory from "@/public/images/slabs/Ivory.webp";
import light from "@/public/images/slabs/light.webp";

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

      src: antik,
      href: "/collections/blaundos-antiko",
    },
    {
      key: "light",
      title: t("titleLight"),
      alt: t("altLight"),

      src: light,
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
      src: ivory,
      href: "/collections/blaundos-ivory",
    },
  ];

  return (
    <div className="flex flex-col w-screen gap-[20px] lg:gap-[40px] items-center justify-center mt-2 md:mt-12 lg:mt-32 xl:mt-52 2xl:mt-44 mb-20">
      <div className="flex flex-col w-[87.79%] md:w-[91.4%] lg:w-[76.8%] gap-[17px] md:gap-[15px] lg:gap-[20px] items-center justify-center text-center">
        <span className="text-[12px] leading-[14px] uppercase tracking-[0.48px] font-medium font-jost">
          {t("span")}
        </span>
        <h3 className="text-[16px] font-bold md:text-[32px] md:leading-[57.6px] lg:text-[48px] capsizedText2 font-marcellus  leading-normal">
          {t("header")}
        </h3>
      </div>

      <div className="flex flex-col md:flex-row w-[80%] md:h-[49vh] md:min-h-[354px] lg:h-[498px] rounded-xl max-h-[50vh]">
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

               <div
                className="
                  absolute top-0 left-0 w-full h-full
              
                  text-white z-10 flex lg:hidden items-end
                "
              >
                {/* Soldaki şerit */}
                <div
                  className="h-[15%] bg-black/30 bg-opacity-50 flex flex-col lg:justify-center w-full md:w-1/4 md:min-w-[310px] 
                     font-jost items-center justify-center text-center"
                >
                  <Link
                    href={coll.href}
                    className="flex h-full  items-center text-[16px] leading-[37.5px] tracking-[-0.66px] capitalize font-marcellus font-normal text-center w-auto  cursor-pointer"
                  >
                    {coll.title}
                  
                  </Link>
                </div>
              </div>

              {/* Hover overlay */}
              <div
                className="
                  absolute top-0 left-0 w-full h-full opacity-0
                  group-hover:opacity-100 transition-opacity duration-[1200ms]
                  text-white z-10 flex items-end
                "
              >
                {/* Soldaki şerit */}
                <div
                  className="h-[15%] bg-black bg-opacity-50 flex flex-col lg:justify-center w-full md:w-1/4 md:min-w-[310px] gap-[20px]
                    md:opacity-0 md:translate-x-[-10px] opacity-100 md:group-hover:opacity-100 md:group-hover:translate-x-0
                    transition-all duration-[800ms] ease-in-out font-jost items-center justify-center text-center"
                >
                  <Link
                    href={coll.href}
                    className="flex h-full items-center gap-4 text-[28px] lg:text-[28px] leading-[37.5px] tracking-[-0.66px] capitalize font-marcellus font-normal text-left w-auto ml-6 lg:ml-8 cursor-pointer"
                  >
                    {coll.title}{" "}
                    <ArrowRight
                      className="
                  h-6 w-6
                  translate-x-0 group-hover:translate-x-1
                  transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
