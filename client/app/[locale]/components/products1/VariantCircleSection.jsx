// app/components/VariantCircleSection.jsx
"use client";
import React from "react";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";
import { Link } from "@/i18n/navigation";

/**
 * Dairesel kart grid (variant / cut / process için ortak)
 *
 * Props:
 * - heading?: string
 * - text?: string
 * - variantCards: Array<{
 *     slug: string;            // "blaundos-ivory" | "vein-cut" | "honed" ...
 *     vKey?: string;           // imgMap için "ivory" | "light" | "antico" gibi
 *     title: string;
 *     href: string | UrlObject;
 *     img?: StaticImport | string;
 *     youtubeUrl?: string;
 *     description?: string;    // opsiyonel kısa açıklama
 *   }>
 * - imgMap: PRODUCT_IMG[productKey]   // {cover, ivory, light, antico}...
 * - heroSrc: StaticImport | string
 * - productKey: "blocks" | "slabs" | "tiles" | "special-designs" | "process"
 * - imgAlt?: string
 * - IMAGE_BY_PRODUCT_AND_VARIANT?: obj
 *   // { slabs: { "blaundos-ivory": <img>, "blaundos-light": <img>, ... } }
 * - IMAGE_BY_PRODUCT_VARIANT_AND_CUT?: obj
 *   // { slabs: { "blaundos-ivory": { "vein-cut": <img>, "cross-cut": <img> } } }
 * - variantSlug?: string  // cut kartlarında: "blaundos-ivory" gibi (opsiyonel)
 */

function normalizeHref(href, locale) {
  if (!href) return "#";

  // Dış link
  if (/^https?:\/\//i.test(href)) return href;

  // Zaten locale ile başlıyor: "/en/..." veya "/tr/..."
  if (/^\/(en|tr)\//i.test(href)) return href;

  // Kökten başlıyor ama locale yoksa: "/filled-honed-..." → "/en/filled-honed-..."
  if (href.startsWith("/")) return `/${locale}${href}`;

  // Görece segment geldiyse: "filled-honed-..." → "/en/filled-honed-..."
  return `/${locale}/${href.replace(/^\//, "")}`;
}

export default function VariantCircleSection({
  heading,
  text,
  variantCards = [],
  imgMap,
  heroSrc,
  productKey,
  imgAlt = "",
  IMAGE_BY_PRODUCT_AND_VARIANT,
  IMAGE_BY_PRODUCT_VARIANT_AND_CUT,
  variantSlug, // opsiyonel
}) {
  // Tailwind’in compile-time sınırlaması için grid kolonlarını basit tutalım
  const colBase = "grid-cols-1";
  const colSm = variantCards.length <= 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";
  const colLg =
    variantCards.length <= 2
      ? "lg:grid-cols-2"
      : variantCards.length === 3
      ? "lg:grid-cols-3"
      : variantCards.length === 4
      ? "lg:grid-cols-4"
      : "lg:grid-cols-5";

  return (
    <section className="flex mt-14 w-screen text-center items-center justify-center">
      <div className="flex flex-col max-w-[1200px] items-center justify-center text-center">
        {heading && (
          <h3 className="text-[20px] lg:text-[22px] font-semibold">{heading}</h3>
        )}
        {text && (
          <p className="text-[12px] lg:text-[14px] mt-2 w-[90%]">{text}</p>
        )}

        <div className={`mt-6 grid gap-8 ${colBase} ${colSm} ${colLg}`}>
          {variantCards.map(({ slug, vKey, title, href, img, youtubeUrl, description }) => {
            // Görsel seçim sırası:
            // 1) Karttan gelen img
            // 2) product+variant+cut (eğer variantSlug & map varsa)
            // 3) product+variant (slug → "blaundos-ivory" gibi)
            // 4) imgMap[vKey] → imgMap.cover → imgMap
            // 5) heroSrc
            const byCut =
              variantSlug &&
              IMAGE_BY_PRODUCT_VARIANT_AND_CUT?.[productKey]?.[variantSlug]?.[slug];

            const byVariant =
              IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[slug];

            const fromMap =
              typeof imgMap === "object"
                ? imgMap?.[vKey ?? "cover"] ?? imgMap?.cover ?? null
                : imgMap ?? null;

            const cardSrc = img ?? byCut ?? byVariant ?? fromMap ?? heroSrc;

            return (
              <div
                key={`${title}-${typeof href === "string" ? href : JSON.stringify(href)}`}
                className="group flex flex-col items-center text-center"
              >
                {/* Görsel + başlık */}
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

                  {description && (
                    <p className="mt-1 text-[12px] md:text-[14px] text-neutral-700 w-[90%] leading-[130%]">
                      {description}
                    </p>
                  )}
                </Link>

                {/* YouTube (opsiyonel) */}
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

                {/* CTA */}
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
