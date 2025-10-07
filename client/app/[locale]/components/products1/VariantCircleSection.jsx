// app/components/VariantCircleSection.jsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

/**
 * Variant dairesel grid section
 *
 * Props:
 * - heading?: string
 * - text?: string
 * - variantCards: Array<{
 *     slug: string;          // "vein-cut" | "cross-cut" | "antiko" vb.
 *     vKey?: string;         // "ivory" | "light" | "antiko" gibi varyant anahtarı
 *     title: string;
 *     href: string;
 *     img?: StaticImport | string;  // kesime göre özel görsel (varsa ilk bu kullanılır)
 *     youtubeUrl?: string;   // opsiyonel: youtube linki
 *   }>
 * - imgMap: PRODUCT_IMG[productKey]     // {cover, ivory, light, antiko} gibi
 * - heroSrc: StaticImport | string      // en son fallback görsel
 * - productKey: "block" | "slabs" | "tiles" | "special"
 * - imgAlt?: string                     // alt metine prefix (opsiyonel)
 * - IMAGE_BY_PRODUCT_AND_VARIANT?: obj  // { slabs: { "blaundos-ivory": ... } }
 * - IMAGE_BY_PRODUCT_VARIANT_AND_CUT?: obj // { slabs: { "blaundos-ivory": { "vein-cut": ... } } }
 * - variantSlug?: string                // "blaundos-ivory" gibi (cut kartlarında şart)
 */

export default function VariantCircleSection({
  heading,
  text,
  variantCards = [],
  imgMap,
  heroSrc,
  productKey,
  imgAlt = "",
  IMAGE_BY_PRODUCT_AND_VARIANT,
  IMAGE_BY_PRODUCT_VARIANT_AND_CUT, // opsiyonel
  variantSlug,                       // opsiyonel
}) {
  // Grid kolon sayısını Tailwind'in görebileceği şekilde statik seçelim
  const smCols = variantCards.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";
  const lgCols =
    variantCards.length <= 1
      ? "lg:grid-cols-1"
      : variantCards.length === 2
      ? "md:grid-cols-2"
        : variantCards.length === 3
      ? "md:grid-cols-3"
      : "lg:grid-cols-5";

  return (
    <section className="flex mt-14 w-screen text-center items-center justify-center">
      <div className="flex flex-col max-w-[1200px] items-center justify-center text-center">
        {heading && <h3 className="text-[20px] lg:text-[22px] font-semibold">{heading}</h3>}
        {text && <p className="text-[12px] lg:text-[14px] mt-2 w-[90%]">{text}</p>}

        <div className={`mt-6 grid gap-8 grid-cols-1 ${smCols} ${lgCols}`}>
          {variantCards.map(({ slug, vKey, title, href, img, youtubeUrl }) => {
            // Görsel seçim sırası:
            // 1) Karttan gelen img
            // 2) (Opsiyonel) product+variant+cut map'i (variantSlug ve IMAGE_BY_PRODUCT_VARIANT_AND_CUT varsa)
            // 3) product+variant (IMAGE_BY_PRODUCT_AND_VARIANT)
            // 4) imgMap[vKey] veya imgMap
            // 5) heroSrc (en son)
            const byCut =
              IMAGE_BY_PRODUCT_VARIANT_AND_CUT?.[productKey]?.[variantSlug]?.[slug];
            const byVariant =
              IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[slug];
            const fromMap = typeof imgMap === "object" ? imgMap?.[vKey ?? "cover"] ?? imgMap?.cover : imgMap;

            const cardSrc = img ?? byCut ?? byVariant ?? fromMap ?? heroSrc;

            return (
              <div key={`${slug}-${href}`} className="group flex flex-col items-center text-center">
                {/* Üst: Görsel + Başlık → kartın sayfasına gider */}
                <Link
                  href={href}
                  className="flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl"
                  aria-label={title}
                >
                  <div className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]">
                    <Image
                      src={cardSrc}
                      alt={`${imgAlt}${title}`}
                      fill
                      className="object-cover transition-transform duration-500 scale-100 group-hover:scale-105"
                      sizes="160px"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="mt-4 text-[16px] lg:text-[20px] font-semibold text-neutral-900 capitalize">
                    {title}
                  </h4>
                  <p>Filled / Unfilled Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </Link>

                {/* Alt: YouTube (varsa) */}
                {youtubeUrl && (
                  <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-1 mt-1 text-[12px] md:text-sm underline-offset-2 hover:underline text-red-600"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaYoutube size={20} /> YouTube
                  </a>
                )}

                {/* Alt: buton */}
                <Link
                  href={href}
                  className="px-5 py-[6px] bg-black text-center text-white text-[14px] lg:text-[16px] mt-2 lg:mt-4 rounded-xl"
                >
                  Go to page
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
