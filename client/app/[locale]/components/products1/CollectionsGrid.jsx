// app/components/CollectionsGrid.jsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { baseFor, productSlugFor } from "@/lib/travertine";

/**
 * Reusable circular collections grid
 *
 * Props:
 * - collections: Array<{ key, title, alt, slug, src }>
 * - chips?: Array<"block" | "slabs" | "tiles" | "special">  (default: all)
 * - defaultProductOnImage?: "block" | "slabs" | "tiles" | "special" (default: "block")
 * - circleSize?: "sm" | "md" | "lg" (default: "md") // adjusts circle diameter
 * - className?: string (wrapper <section> class)
 * - gridClassName?: string (grid class)
 * - labels?: Partial<Record<"block"|"slabs"|"tiles"|"special", string>> (i18n override)
 */
export default function CollectionsGrid({
  collections = [],
  chips = ["block", "slabs", "tiles", "special"],
  defaultProductOnImage = "block",
  circleSize = "md",
  className = "w-full max-w-[1200px]",
  gridClassName = "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 justify-items-center",
  labels: labelsOverride,
}) {
  const locale = useLocale();
  const prefix = `/${locale}`;
  const base = baseFor(locale);

  // default etiketler (dil bazlı)
  const defaultLabels = {
    block: locale === "tr" ? "Blok" : "Block",
    slabs: locale === "tr" ? "Plaka" : "Slabs",
    tiles: locale === "tr" ? "Karo" : "Tiles",
    special: locale === "tr" ? "Özel Tasarım" : "Special Design",
  };
  const labels = { ...defaultLabels, ...(labelsOverride || {}) };

  // tek yerden link üretici
  const hrefFor = (productKey, variantSlug) =>
    `${prefix}/${base}/${productSlugFor(locale, productKey)}/${variantSlug}`;

  // daire boyutu
  const circleCls =
    circleSize === "lg"
      ? "h-60 w-60 sm:h-60 sm:w-60"
      : circleSize === "sm"
      ? "h-36 w-36 sm:h-40 sm:w-40"
      : "h-40 w-40 sm:h-44 sm:w-44"; // md (default)

  return (
    <section className={className}>
      <div className={gridClassName}>
        {collections.map((coll) => (
          <div key={coll.key} className="group flex flex-col items-center text-center">
            {/* Yuvarlak görsel */}
            <Link
              href={hrefFor(defaultProductOnImage, coll.slug)}
              className={`relative ${circleCls} rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]`}
              aria-label={`${coll.title} - ${labels[defaultProductOnImage]}`}
            >
              <Image
                src={coll.src}
                alt={coll.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-125"
                sizes="(max-width: 1024px) 180px, 240px"
                priority={false}
              />
            </Link>

            {/* Başlık */}
            <h4 className="mt-4 text-lg font-semibold text-neutral-900">{coll.title}</h4>

            {/* Ürün tipleri (chips) */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              {chips.map((pkey) => (
                <Link
                  key={pkey}
                  href={hrefFor(pkey, coll.slug)}
                  className="px-3 py-1.5 rounded-full text-xs md:text-sm font-medium
                             text-neutral-800 ring-1 ring-neutral-200 bg-white/80
                             hover:bg-neutral-900 hover:text-white transition"
                  aria-label={`${coll.title} - ${labels[pkey]}`}
                >
                  {labels[pkey]}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
