// app/components/VariantCircleSection.jsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";

/**
 * Varyant dairesel grid section
 *
 * Props:
 * - heading: string (section başlığı, örn. variantsHeading)
 * - variantCards: Array<{ slug, vKey, title, alt, href }>
 * - imgMap: PRODUCT_IMG[productKey]
 * - heroSrc: fallback görsel
 * - IMAGE_BY_PRODUCT_AND_VARIANT: obj (ürün+slug görsel eşleme)
 * - productKey: string
 */
export default function VariantCircleSection({
  heading,
  text,
  variantCards,
  imgMap,
  heroSrc,
  IMAGE_BY_PRODUCT_AND_VARIANT,
  productKey,
  imgAlt=""
}) {
  return (
    <section className="flex mt-14 w-screen text-center items-center justify-center">
      <div className="flex flex-col max-w-[1200px] items-center justify-center text-center">
        {heading && <h3 className="text-[20px] lg:text-[22px] font-semibold">{heading}</h3>}
      <p className="text-[12px] lg:text-[14px] mt-2 w-[90%]">{text}</p>

     <div
  className={`
    mt-6 grid gap-8
    grid-cols-1
    sm:grid-cols-${variantCards.length === 2 ? "2" : "2"}
    lg:grid-cols-${variantCards.length < 3 ? variantCards.length : 3}
  `}
>

        {variantCards.map(({ slug, vKey, title, alt, href }) => {
          const cardSrc =
            IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[slug] ??
            (typeof imgMap === "object" ? imgMap[vKey] : imgMap) ??
            heroSrc;


          return (
            // Kart: DIŞARI div, İÇERDE iki ayrı link
            <div key={slug} className="group flex flex-col items-center text-center">
              {/* Üst: Görsel + Başlık → ürün sayfasına gider */}
              <Link
                href={href}
                className="flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-xl"
                aria-label={title}
              >
                <div className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]">
                  <Image
                    src={cardSrc}
                    alt={ imgAlt + title}
                    fill
                    className="object-cover transition-transform duration-500 scale-80 group-hover:scale-95"
                    sizes="160px"
                    loading="lazy"
                  />
                </div>
                <h4 className="mt-4 text-[16px] lg:text-[20px] font-semibold text-neutral-900 capitalize">
                  {title}
                </h4>
              </Link>

              {/* Alt: YouTube linki → alt artık URL (JSON'dan) */}
              {alt && (
                <a
                  href="https://www.youtube.com/@MajenMadencilik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-1 mt-1 text-[12px] md:text-sm underline-offset-2 hover:underline text-red-600"
                  onClick={(e) => {
                    // Üstteki Link'e bulaşmasın (ekstra güvence)
                    e.stopPropagation();
                  }}
                >
                  <FaYoutube size={20} /> YouTube
                </a>
              )}

               <Link
                  href={href}
                  className="px-5 py-[6px] bg-black text-center text-white text-[14px] lg:text-[16px] mt-2 lg:mt-4 rounded-xl">
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
