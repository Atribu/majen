"use client";
import React from "react";
import Image from "next/image";
import { FaYoutube } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import InlineLinks from "../generalcomponent/InlineLinks";

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
  const locale = useLocale();
  // Tailwind’in compile-time sınırlaması için grid kolonlarını basit tutalım
  const colBase = "grid-cols-1";
  const colSm = variantCards.length <= 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";
  const colLg =
    variantCards.length <= 2
      ? "lg:grid-cols-2 grid"
      : variantCards.length === 3
      ? "lg:grid-cols-3 grid"
      : variantCards.length === 4
      ? "lg:grid-cols-4 grid"
        : variantCards.length === 9
      ? "flex flex-wrap justify-center gap-8"
      : "flex flex-wrap justify-center gap-8";

        const colorBlogPatterns = React.useMemo(() => {
    if (!locale || productKey !== "blocks") return []; // 🔹 sadece blocks için

    const base = (slug) => `/${locale}/${slug}`;

    if (locale.startsWith("tr")) {
      return [
        {
          // Blaundos Antiko, Antiko traverten vs.
          pattern: /\b(Blaundos\s+Antiko|Antiko traverten|Antico travertine)\b/i,
          href: base("antico-travertine"),
        },
        {
          pattern: /\b(Blaundos\s+Light|Light traverten|Light travertine)\b/i,
          href: base("light-travertine"),
        },
        {
          pattern: /\b(Blaundos\s+Ivory|Ivory traverten|Ivory travertine)\b/i,
          href: base("ivory-travertine"),
        },
      ];
    }

    // EN (ve diğer diller) için
    return [
      {
        pattern: /\b(Blaundos\s+Antiko|Blaundos\s+Antico|Antico travertine)\b/i,
        href: base("antico-travertine-blocks"),
      },
      {
        pattern: /\b(Blaundos\s+Light|Light travertine)\b/i,
        href: base("light-travertine-blocks"),
      },
      {
        pattern: /\b(Blaundos\s+Ivory|Ivory travertine)\b/i,
        href: base("ivory-travertine-blocks"),
      },
    ];
  }, [locale, productKey]);


        const processBlogPatterns = React.useMemo(() => {
    if (!locale || productKey == "blocks") return []; // 🔹 sadece blocks için

    const base = (slug) => `/${locale}/${slug}`;

    if (locale.startsWith("tr")) {
      return [
        {
          // Blaundos Antiko, Antiko traverten vs.
          pattern: /\bhoned\b/i,
          href: base(`/filled-honed-vein-cut-travertine-${productKey}`),
        },
        {
          pattern: /\bbrushed\b/i,
          href: base(`/filled-brushed-vein-cut-travertine-${productKey}`),
        },
        {
          pattern: /\btumbled\b/i,
          href: base(`/filled-tumbled-vein-cut-travertine-${productKey}`),
        },
          {
          pattern: /\band polished\b/i,
          href: base(`/filled-polished-vein-cut-travertine-${productKey}`),
        },
      ];
    }

    // EN (ve diğer diller) için
    return [
          {
          // Blaundos Antiko, Antiko traverten vs.
          pattern: /\bhoned\b/i,
          href: base(`/filled-honed-vein-cut-travertine-${productKey}`),
        },
        {
          pattern: /\bbrushed\b/i,
          href: base(`/filled-brushed-vein-cut-travertine-${productKey}`),
        },
        {
          pattern: /\btumbled\b/i,
          href: base(`/filled-tumbled-vein-cut-travertine-${productKey}`),
        },
          {
          pattern: /\band polished\b/i,
          href: base(`/filled-polished-vein-cut-travertine-${productKey}`),
        },
    ];
  }, [locale, productKey]);

      

  return (
    <section className="flex mt-14 w-full text-center items-center justify-center">
      <div className="flex flex-col max-w-[1200px] items-center justify-center text-center">
        {heading && (
          <h3 className="text-[20px] lg:text-[22px] font-semibold">{heading}</h3>
        )}
        {text && (
          <p className="text-[12px] lg:text-[14px] mt-2 w-[90%] items-center">
  {productKey === "blocks" && colorBlogPatterns.length > 0 ? (
    <InlineLinks
      text={text || ""}
      patterns={colorBlogPatterns}
      textClassName="text-[12px] md:text-[12px] lg:text-[14px] text-neutral-800"
      linkClassName="text-teal-700 font-semibold "
    />
  ) : (
     <InlineLinks
      text={text || ""}
      patterns={processBlogPatterns}
      textClassName="text-[12px] md:text-[12px] lg:text-[14px] text-neutral-800"
      linkClassName="text-teal-700 font-semibold "
    />
  )}
</p>
        )}

        <div className={`mt-6  gap-8 ${colBase} ${colSm} ${colLg}`}>
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

            const keyInMap = vKey || slug; 

    const fromMap =
  typeof imgMap === "object"
    ? imgMap?.[keyInMap] ?? imgMap?.cover ?? null
    : imgMap ?? null;
            const cardSrc = img ?? byCut ?? byVariant ?? fromMap ?? heroSrc;

           // string href geldiyse locale ön-ekini ekle; object geldiyse olduğu gibi bırak
            const hrefFinal =
              typeof href === "string" ? normalizeHref(href, locale) : href;

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
                      alt={`${imgAlt} ${title}`}
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
