// app/components/VariantCircleSection.jsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

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
  variantCards,
  imgMap,
  heroSrc,
  IMAGE_BY_PRODUCT_AND_VARIANT,
  productKey,
}) {
  return (
    <section className="mt-14 max-w-[1200px] mx-auto text-center">
      {heading && (
        <h3 className="text-2xl font-semibold">{heading}</h3>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {variantCards.map(({ slug, vKey, title, alt, href }) => {
          const cardSrc =
            IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[slug] ??
            (typeof imgMap === "object" ? imgMap[vKey] : imgMap) ??
            heroSrc;

          return (
            <Link
              key={slug}
              href={href}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]">
                <Image
                  src={cardSrc}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="160px"
                />
              </div>
              <h4 className="mt-4 text-lg font-semibold text-neutral-900">
                {title}
              </h4>
              <p className="mt-1 text-sm text-neutral-600 max-w-[36ch]">
                {alt}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
