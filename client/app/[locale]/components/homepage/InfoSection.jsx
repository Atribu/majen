// app/components/InfoSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import block from "@/public/images/traverterBlock.jpeg";
import slabs from "@/public/images/traverterSlabs.jpeg";
import tiles from "@/public/images/traverterFayans.jpeg";
import special from "@/public/images/traverterDeskt.webp";

export default function InfoSection() {
  const t = useTranslations("InfoSection");
  const locale = useLocale(); // 'tr' | 'en' | ...

  // Dil bazlı prefix ve base path
  const prefix = `/${locale}`;
  const baseProducts = locale === "tr" ? "traverten" : "travertine";
  const contactPath = `${prefix}/${locale === "tr" ? "iletisim" : "contact"}`;

  // Dil bazlı ürün slug'ları
  const slugs = {
    tr: {
      product1: "blok",
      product2: "plakalar",
      product3: "karolar",
      product4: "ozel-tasarimlar",
    },
    en: {
      product1: "block",
      product2: "slabs",
      product3: "tiles",
      product4: "special-designs",
    },
  };

  const products = [
    { key: "product1", img: block },
    { key: "product2", img: slabs },
    { key: "product3", img: tiles },
    { key: "product4", img: special },
  ].map((p) => ({
    ...p,
    href: `${prefix}/${baseProducts}/${slugs[locale]?.[p.key] ?? p.key}`,
  }));

  return (
    <section className="flex w-screen items-center justify-center py-8 md:py-12 lg:py-16">
      <div className="w-[90%] md:w-[80%] lg:w-[75%]">
        {/* Üst metinler */}
        <div className="max-w-3xl">
          <span className="text-[#6b7177] font-medium text-[12px] md:text-[14px] lg:text-[16px] uppercase">
            {t("subtitle")}
          </span>
          <h3 className="mt-2 text-[26px] md:text-[36px] lg:text-[48px] text-[#0C1A13] leading-[110%]">
            {t("heading")}
          </h3>
          <p className="mt-3 text-black text-[14px] md:text-[16px] lg:text-[18px]">
            {t("description")}
          </p>
        </div>

        {/* 4'lü Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map(({ key, img, href }) => (
            <div
              key={key}
              className="group rounded-md border border-black/10 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Görsel alanı */}
              <Link href={href} className="block relative aspect-[4/3] overflow-hidden">
                <Image
                  src={img}
                  alt={t(`products.${key}.alt`)}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
              </Link>

              {/* İçerik */}
              <div className="p-4">
                <h4 className="text-[18px] md:text-[20px] font-semibold text-[#0C1A13]">
                  {t(`products.${key}.title`)}
                </h4>
                <p className="mt-2 text-[13px] md:text-[14px] text-[#2a2a2a]">
                  {t(`products.${key}.description`)}
                </p>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={href}
                    className="inline-flex items-center justify-center bg-black text-white text-[13px] md:text-[14px] px-3 py-2 rounded-sm border-2 border-black hover:bg-white hover:text-black transition"
                  >
                    {t("explore")}
                  </Link>
                  <Link
                    href={contactPath}
                    className="inline-flex items-center justify-center bg-white text-black text-[13px] md:text-[14px] px-3 py-2 rounded-sm border-2 border-black hover:bg-black hover:text-white transition"
                  >
                    {t("contact")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alt butonlar gerekirse buraya ekleyebilirsin */}
      </div>
    </section>
  );
}
