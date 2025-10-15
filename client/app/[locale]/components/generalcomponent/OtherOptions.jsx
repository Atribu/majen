// app/components/products1/VariantCircleSection2.jsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function OtherOptions(props) {
  const {
    heading,
    productOrder = ["blocks", "slabs", "tiles", "special"],
    excludeProduct = null,
    variantSlugs = [],
    baseHref,
    productSegments,
    locale = "tr",
    labels = {},
    productImages = {},
    productHrefFor,
    className = "flex flex-col w-screen mb-10 items-center justify-center text-center mt-16",
    gridClassName = "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center",
    customItems, 
  } = props;

  const t = useTranslations("TravertinePage");

  // 🔧 Yardımcı: dinamik href objesini SEO kısa URL string’ine çevir
  const resolveHref = (hrefLike) => {
    if (!hrefLike) return "#";
    if (typeof hrefLike === "string") return hrefLike;

    const { pathname, params = {} } = hrefLike || {};
    const L = `/${locale}`;

    // Bizim route map’imiz:
    // '/travertine/[product]'                    → '/travertine-[product]'
    // '/travertine/[product]/[cut]'              → '/[cut]'
    // '/travertine/[product]/[cut]/[process]'    → '/[process]-[cut]'
    if (pathname === "/travertine/[product]") {
      return `${L}/travertine-${params.product}`;
    }
    if (pathname === "/travertine/[product]/[cut]") {
      return `${L}/${params.cut}`;
    }
    if (pathname === "/travertine/[product]/[cut]/[process]") {
      return `${L}/${params.process}-${params.cut}`;
    }

    // Fallback: en kötü ihtimalle locale + join
    const tail = Object.values(params).filter(Boolean).join("/");
    return `${L}/${tail}`;
  };

  // … defaultProductLabels, productLabels, VARIANT_SLUG_MAP, humanize, variantLabel aynı …

  const hrefFor = (productKey, variantSlug) => {
    const seg = productSegments?.[productKey] ?? productKey;
    const finalSlug = VARIANT_SLUG_MAP[variantSlug] || variantSlug;
    return `${baseHref}/${seg}/${finalSlug}`;
  };

  const startByProduct = {
    blocks: t("variantSentence.blocks.start"),
    slabs: t("variantSentence.slabs.start"),
    tiles: t("variantSentence.tiles.start"),
    special: t("variantSentence.special.start"),
  };
  const endCommon = t("variantSentence.end");

  const visibleOrder = excludeProduct
    ? productOrder.filter((k) => k !== excludeProduct)
    : productOrder;

  return (
    <section className={className}>
      <div className="flex flex-col max-w-[1200px] items-center justify-center text-center">
        {heading ? (
          <h4 className="text-[18px] lg:text-[20px] font-semibold mb-0 md:mb-2">
            {heading}
          </h4>
        ) : null}

        <div className={gridClassName}>
          {/* ① customItems varsa sadece onları göster */}
          {Array.isArray(customItems) && customItems.length > 0
            ? customItems.slice(0, 3).map((it, i) => {
                const cardHref = resolveHref(it.href); // ← 🔴 burada string’e çeviriyoruz
                return (
                  <div key={i} className="group flex flex-col items-center text-center">
                    <Link
                      href={cardHref}
                      className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] block"
                    >
                      <Image
                        src={it.img}
                        alt={it.title || "item"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="120px"
                      />
                    </Link>

                    <h4 className="mt-4 text-[14px] lg:text-[16px] font-semibold capitalize text-neutral-800">
                      {it.title}
                    </h4>

                    {it.text ? (
                      <p className="lg:mt-2 text-center text-sm md:text-[14px] text-neutral-700 w-[90%] leading-[120%]">
                        {it.text}
                      </p>
                    ) : null}

                    <Link
                      href={cardHref}
                      className="px-5 py-[6px] bg-black text-center text-white text-[14px] lg:text-[16px] mt-2 lg:mt-4 rounded-xl"
                    >
                      {t("buttonText", { default: "Go to page" })}
                    </Link>
                  </div>
                );
              })
            : // ② customItems yoksa eski davranış (ürün blokları) devam
              visibleOrder.map((pkey) => {
                const rawHref = productHrefFor
                  ? productHrefFor(pkey) // object dönebilir
                  : `${baseHref}/${productSegments?.[pkey] ?? pkey}`;
                const productHref = resolveHref(rawHref); // ← 🔴 string’e çevir

                const startText = startByProduct[pkey] || "";
                return (
                  <div key={pkey} className="group flex flex-col items-center text-center">
                    <Link
                      href={productHref}
                      className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] block"
                    >
                      <Image
                        src={productImages[pkey]}
                        alt={t(`altTexts.${pkey}`, { default: pkey })}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="120px"
                      />
                    </Link>

                    {/* … başlık & cümle kısmı aynı … */}
                    <h4 className="mt-4 text-[18px] lg:text-[20px] font-semibold text-neutral-900">
                      {/* productLabels içeriğin aynı */}
                      {(locale === "tr"
                        ? {
                            blocks: t("variantsubtitle1"),
                            slabs: t("variantsubtitle2"),
                            tiles: t("variantsubtitle3"),
                            special: t("variantsubtitle4"),
                          }
                        : {
                            blocks: t("variantsubtitle1"),
                            slabs: t("variantsubtitle2"),
                            tiles: t("variantsubtitle3"),
                            special: t("variantsubtitle4"),
                          })[pkey]}
                    </h4>

                    <p className="lg:mt-2 text-center text-sm md:text-[14px] text-neutral-700 w-[90%] leading-[120%]">
                      {startText}{" "}
                      {variantSlugs.map((slug, i) => (
                        <span key={`${pkey}-${slug}`}>
                          <Link href={hrefFor(pkey, slug)} className="text-blue-600 hover:underline">
                            {labels.variants?.[slug] ??
                              slug.split("-").map((s) => s && s[0].toUpperCase() + s.slice(1)).join(" ")}
                          </Link>
                          {i < variantSlugs.length - 1 ? ", " : ""}
                        </span>
                      ))}{" "}
                      {endCommon}
                    </p>

                    <Link
                      href={productHref}
                      className="px-5 py-[6px] bg-black text-center text-white text-[14px] lg:text-[16px] mt-2 lg:mt-4 rounded-xl"
                    >
                      {t("buttonText", { default: "Go to page" })}
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
