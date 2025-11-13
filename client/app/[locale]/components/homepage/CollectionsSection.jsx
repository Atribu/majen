// app/components/CollectionsSection.jsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { baseFor, productSlugFor } from "@/lib/travertine";
import antik from "@/public/images/slabs/antik.webp";
import ivory from "@/public/images/slabs/Ivory.webp";
import light from "@/public/images/slabs/light.webp";

export default function CollectionsSection() {
  const t = useTranslations("CollectionsSection");
  const locale = useLocale();
  const prefix = `/${locale}`;
  const base = baseFor(locale);

  const labels = {
    block: locale === "tr" ? "Bloklar" : "Blocks",
    slabs: locale === "tr" ? "Plakalar" : "Slabs",
    tiles: locale === "tr" ? "Karolar" : "Tiles",
    special: locale === "tr" ? "Döşemeler" : "Pavers",
  };

  const TILES_HREF = `${prefix}/travertine-tiles`;
  const PAVERS_HREF = `${prefix}/travertine-pavers`;

  const collections = [
    {
      key: "antiko",
      title: t("titleAntiko"),
      alt: t("altAntiko"),
      blockHref: `${prefix}/antico-travertine-blocks`,
      slabsHref: `${prefix}/antico-filled-honed-vein-cut-travertine-slabs`,
      src: antik,
    },
    {
      key: "light",
      title: t("titleLight"),
      alt: t("altLight"),
      blockHref: `${prefix}/light-travertine-blocks`,
      slabsHref: `${prefix}/light-filled-honed-vein-cut-travertine-slabs`,
      src: light,
    },
    {
      key: "ivory",
      title: t("titleIvory"),
      alt: t("altIvory"),
      blockHref: `${prefix}/ivory-travertine-blocks`,
      slabsHref: `${prefix}/ivory-filled-honed-vein-cut-travertine-slabs`,
      src: ivory,
    },
  ];

  const hrefForType = (type, coll) => {
    switch (type) {
      case "block":
        return coll.blockHref;
      case "slabs":
        return coll.slabsHref;
      case "tiles":
        return TILES_HREF;
      case "special":
        return PAVERS_HREF;
      default:
        return "#";
    }
  };

  return (
    <div className="flex flex-col max-w-[1400px] gap-[20px] lg:gap-[10px] items-center justify-center mt-2 md:mt-12 lg:mt-32 xl:mt-52 2xl:mt-[10%] lg:mb-20">
      {/* Başlık */}
      <div className="flex flex-col w-[95%] md:w-[91.4%] lg:w-[76.8%] gap-[2px] md:gap-[6px] lg:gap-[2px] items-center justify-center text-center">
        <span className="text-[12px] leading-[14px] uppercase tracking-[0.48px] font-medium font-jost">
          {t("span")}
        </span>
        <h3 className="text-[24px] md:text-[26px] font-bold lg:text-[30px] md:leading-[57.6px] font-marcellus leading-normal">
          {t("header")}
        </h3>

        {/* 🔗 Rich text + internal blog links */}
        <p className="text-[12px] md:text-[14px]">
          {t.rich("text", {
            antiko: (chunks) => (
              <Link
                href={`${prefix}/antico-travertine`}
                className=" text-teal-700 font-semibold"
              >
                {chunks}
              </Link>
            ),
            light: (chunks) => (
              <Link
                href={`${prefix}/light-travertine`}
                className=" text-teal-700 font-semibold"
              >
                {chunks}
              </Link>
            ),
            ivory: (chunks) => (
              <Link
                href={`${prefix}/ivory-travertine`}
                className=" text-teal-700 font-semibold"
              >
                {chunks}
              </Link>
            ),
            supplier: (chunks) => (
              <Link
                href={`${prefix}/travertine-supplier`}
                className=" text-teal-700 font-semibold"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>

      {/* Yuvarlak kartlar */}
      <section className="w-full max-w-[1200px]">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 justify-items-center">
          {collections.map((coll) => (
            <div key={coll.key} className="group flex flex-col items-center text-center">
              <Link
                href={coll.blockHref}
                className="relative h-40 w-40 sm:h-44 sm:w-44 lg:w-60 lg:h-60 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]"
              >
                <Image
                  src={coll.src}
                  alt={coll.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-125"
                  sizes="160px"
                />
              </Link>

              <h5 className="mt-4 text-[20px] font-semibold text-neutral-900">
                {coll.title}
              </h5>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                {["block", "slabs", "tiles", "special"].map((pkey) => (
                  <Link
                    key={pkey}
                    href={hrefForType(pkey, coll)}
                    className="px-3 py-1.5 rounded-full text-xs md:text-sm font-medium
                               text-neutral-800 ring-1 ring-neutral-200 bg-white/80
                               hover:bg-neutral-900 hover:text-white transition"
                  >
                    {labels[pkey]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
