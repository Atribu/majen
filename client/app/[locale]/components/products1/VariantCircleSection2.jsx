// app/components/products1/VariantCircleSection2.jsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function VariantCircleSection2({
  heading,
  productOrder = ["block", "slabs", "tiles", "special"],
  variantSlugs = [],
  baseHref,
  productSegments,
  locale = "tr",
  labels = {},
  productImages = {},
  productHrefFor,
  className = "max-w-[1200px] mx-auto text-center mb-10 ",
  gridClassName = "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center",
}) {
  const t = useTranslations("TravertinePage");

  // Varsayılan başlıklar
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

  const VARIANT_SLUG_MAP = {
  antiko: "blaundos-antiko",
  light: "blaundos-light",
  ivory: "blaundos-ivory",
};

  const humanize = (slug) =>
    slug
      .split("-")
      .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
      .join(" ");

  const variantLabel = (slug) => labels.variants?.[slug] ?? humanize(slug);

const hrefFor = (productKey, variantSlug) => {
  const seg = productSegments?.[productKey] ?? productKey;
  const finalSlug = VARIANT_SLUG_MAP[variantSlug] || variantSlug;
  return `${baseHref}/${seg}/${finalSlug}`;
};

  return (
    <section className={className}>
      {heading ? <h3 className="text-2xl font-semibold">{heading}</h3> : null}

      <div className={gridClassName}>
        {productOrder.map((pkey) => {
          const productHref = productHrefFor
            ? productHrefFor(pkey)
            : `${baseHref}/${productSegments?.[pkey] ?? pkey}`;

          return (
            <div key={pkey} className="group flex flex-col items-center text-center">
              {/* Ürün görseli */}
              <Link
                href={productHref}
                className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] block"
              >
                <Image
                  src={productImages[pkey]}
                  alt={productLabels[pkey]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="120px"
                />
              </Link>

              {/* Başlık */}
              <h4 className="mt-4 text-lg font-semibold text-neutral-900">
                {productLabels[pkey]}
              </h4>

              {/* Ortak sabit metin */}
              <p className="lg:mt-3 text-center text-sm md:text-base text-neutral-700 w-[90%]">
                {t("variantSentence.start")}{" "}
                {variantSlugs.map((slug, i) => (
                  <span key={`${pkey}-${slug}`}>
                    <Link
                      href={hrefFor(pkey, slug)}
                      className="text-blue-600 hover:underline"
                    >
                      {variantLabel(slug)}
                    </Link>
                    {i < variantSlugs.length - 1 ? ", " : ""}
                  </span>
                ))}{" "}
                {t("variantSentence.end")}
              </p>

              <Link
                href={productHref}
                className="px-6 py-2 bg-black text-center text-white text-[14px] lg:text-[16px] mt-2 lg:mt-4 rounded-xl"
              >
                {t("goToPage", { default: "Go to page" })}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}