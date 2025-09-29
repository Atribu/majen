// app/components/products1/VariantCircleSection2.jsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function OtherOptions({
  heading,
  productOrder = ["block", "slabs", "tiles", "special"],
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
}) {
  const t = useTranslations("TravertinePage");

  // Başlık etiketleri
  const defaultProductLabels =
    locale === "tr"
      ? {
          block: t("variantsubtitle1"),
          slabs: t("variantsubtitle2"),
          tiles: t("variantsubtitle3"),
          special: t("variantsubtitle4"),
        }
      : {
          block: t("variantsubtitle1"),
          slabs: t("variantsubtitle2"),
          tiles: t("variantsubtitle3"),
          special: t("variantsubtitle4"),
        };
  const productLabels = { ...defaultProductLabels, ...(labels.product || {}) };

  // Variant slug eşlemesi
  const VARIANT_SLUG_MAP = {
    antiko: "blaundos-antiko",
    light: "blaundos-light",
    ivory: "blaundos-ivory",
  };

  const humanize = (slug) =>
    slug.split("-").map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s)).join(" ");
  const variantLabel = (slug) => labels.variants?.[slug] ?? humanize(slug);

  const hrefFor = (productKey, variantSlug) => {
    const seg = productSegments?.[productKey] ?? productKey;
    const finalSlug = VARIANT_SLUG_MAP[variantSlug] || variantSlug;
    return `${baseHref}/${seg}/${finalSlug}`;
  };

  // Ürün-bazlı açılış cümlesi (yalnızca "start" farklı)
  const startByProduct = {
    block: t("variantSentence.block.start"),
    slabs: t("variantSentence.slabs.start"),
    tiles: t("variantSentence.tiles.start"),
    special: t("variantSentence.special.start"),
  };
  const endCommon = t("variantSentence.end");

  // 🔎 Mevcut sayfadaki ürünü hariç tut
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
          {visibleOrder.map((pkey) => {
            const productHref = productHrefFor
              ? productHrefFor(pkey)
              : `${baseHref}/${productSegments?.[pkey] ?? pkey}`;

            const startText = startByProduct[pkey] || "";

            return (
              <div key={pkey} className="group flex flex-col items-center text-center">
                <Link
                  href={productHref}
                  className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] block"
                >
                  <Image
                    src={productImages[pkey]}
                    alt={t(`altTexts.${pkey}`, { default: productLabels[pkey] })}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="120px"
                  />
                </Link>

                <h4 className="mt-4 text-[18px] lg:text-[20px] font-semibold text-neutral-900">
                  {productLabels[pkey]}
                </h4>

                <p className="lg:mt-2 text-center text-sm md:text-[14px] text-neutral-700 w-[90%] leading-[120%]">
                  {startText}{" "}
                  {variantSlugs.map((slug, i) => (
                    <span key={`${pkey}-${slug}`}>
                      <Link href={hrefFor(pkey, slug)} className="text-blue-600 hover:underline">
                        {variantLabel(slug)}
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
