// app/components/CollectionsSection.jsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { baseFor, productSlugFor } from "@/lib/travertine"; // ✅ travertine helper
import antik from "@/public/images/slabs/antik.webp";
import ivory from "@/public/images/slabs/Ivory.webp";
import light from "@/public/images/slabs/light.webp";

export default function CollectionsSection() {
  const t = useTranslations("CollectionsSection");
  const locale = useLocale();
  const prefix = `/${locale}`;
  const base = baseFor(locale); // örn: tr -> traverten, en -> travertine

  // UI etiketleri
  const labels = {
    block: locale === "tr" ? "Blok" : "Block",
    slabs: locale === "tr" ? "Plaka" : "Slabs",
    tiles: locale === "tr" ? "Karo" : "Tiles",
    special: locale === "tr" ? "Özel Tasarım" : "Special Design",
  };

  // koleksiyonlar (her renk için slug ekledik)
  const collections = [
    {
      key: "antiko",
      title: t("titleAntiko"),
      alt: t("altAntiko"),
      slug: "blaundos-antiko",
      src: antik,
    },
    {
      key: "light",
      title: t("titleLight"),
      alt: t("altLight"),
      slug: "blaundos-light",
      src: light,
    },
    {
      key: "ivory",
      title: t("titleIvory"),
      alt: t("altIvory"),
      slug: "blaundos-ivory",
      src: ivory,
    },
  ];

  // tek yerden link üretici
  const hrefFor = (productKey, variantSlug) =>
    `${prefix}/${base}/${productSlugFor(locale, productKey)}/${variantSlug}`;

  return (
    <div className="flex flex-col max-w-[1400px] gap-[20px] lg:gap-[10px] items-center justify-center mt-2 md:mt-12 lg:mt-32 xl:mt-52 2xl:mt-[10%] lg:mb-20">
      {/* Başlık */}
      <div className="flex flex-col w-[95%] md:w-[91.4%] lg:w-[76.8%] gap-[2px] md:gap-[6px] lg:gap-[2px] items-center justify-center text-center">
        <span className="text-[12px] leading-[14px] uppercase tracking-[0.48px] font-medium font-jost">
          {t("span")}
        </span>
        <h3 className="text-[24px] md:text-[26px] font-bold lg:text-[30px] md:leading-[57.6px]  font-marcellus leading-normal">
       {t("header")}
        </h3>
        <p className="text-[12px] md:text-[14px]">{t("text")}</p>
      </div>

      {/* Yuvarlak kartlar */}
      <section className=" w-full max-w-[1200px]">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 justify-items-center">
          {collections.map((coll) => (
            <div key={coll.key} className="group flex flex-col items-center text-center">
              {/* Yuvarlak görsel */}
              <Link
                href={hrefFor("block", coll.slug)} // Görsel tıklanınca default block’a gitsin
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

              {/* Başlık */}
              <h5 className="mt-4 text-[20px] font-semibold text-neutral-900">
                {coll.title}
              </h5>

              {/* Ürün tipleri (Blocks / Slabs / Tiles / Special Design) */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                {(["block", "slabs", "tiles", "special"]).map((pkey) => (
                  <Link
                    key={pkey}
                    href={hrefFor(pkey, coll.slug)}
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
