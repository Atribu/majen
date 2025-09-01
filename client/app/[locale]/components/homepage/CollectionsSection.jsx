// app/components/CollectionsSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

// Görsellerini kendi dosyalarınla eşleştir
import imgAntiko from "@/public/images/figure1.webp";
import imgLight from "@/public/images/figre2.webp"; // dosya adın farklıysa düzelt
import imgIvory from "@/public/images/figure3.webp";

export default function CollectionsSection() {
  const t = useTranslations("CollectionsSection");
  const locale = useLocale();
  const prefix = `/${locale}`;

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
      src: imgIvory,
      href: "/collections/blaundos-ivory",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Üst başlık */}
      <div className="max-w-3xl">
        <p className="text-[12px] lg:text-sm uppercase tracking-[0.25em] text-neutral-500">
          {t("span")}
        </p>
        <h2 className="mt-2 text-[28px] sm:text-4xl md:text-5xl font-semibold text-neutral-900">
          {t("header")}
        </h2>
      </div>

      {/* 3'lü keskin grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(({ key, title, alt, src, href }) => (
          <Link
            key={key}
            href={`${prefix}${href}`}
            aria-label={title}
            role="article"
            className="
              group relative overflow-hidden rounded-none
              ring-1 ring-neutral-900/10 hover:ring-neutral-900/25
              transition-all duration-300
              will-change-transform
              bg-white
              hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)]
            "
          >
            {/* Görsel */}
            <div className="relative w-full h-72 md:h-80 lg:h-[22rem]">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="
                  object-cover object-center
                  transition-transform duration-500
                  group-hover:scale-[1.035]
                "
                priority={false}
              />
              {/* Üstten aşağı net bir gradyan */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            </div>

            {/* Başlık + ok */}
            <div className="absolute inset-x-0 bottom-0 px-5 py-4 flex items-center justify-between text-white">
              <h3 className="text-[15px] sm:text-base font-semibold uppercase tracking-[0.12em]">
                {title}
              </h3>
              <ArrowRight
                className="
                  h-5 w-5
                  translate-x-0 group-hover:translate-x-1
                  transition-transform duration-300
                "
              />
            </div>

            {/* Altta aksan çizgisi: hover'da genişler */}
            <span
              className="
                pointer-events-none absolute left-0 bottom-0 h-[3px]
                w-0 group-hover:w-full
                bg-neutral-900 transition-[width] duration-300
              "
            />

            {/* Klavye erişilebilirlik halkası */}
            <span className="absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/60" />
          </Link>
        ))}
      </div>
    </section>
  );
}
