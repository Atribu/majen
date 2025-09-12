// app/components/products1/VariantCircleSection2.jsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function VariantCircleSection2({
  heading,
  productOrder = ["block", "slabs", "tiles", "special"],
  variantSlugs = [],
  baseHref,
  productSegments,
  locale = "tr",
  labels = {},
  productImages = {},
  productHrefFor, // 🔑 dışarıdan ürün ana sayfa linki fonksiyonu
  className = "max-w-[1200px] mx-auto text-center mb-10 ",
  gridClassName = "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center",
  chipClassName = "px-3 py-1.5 rounded-full text-xs md:text-sm font-medium text-neutral-800 ring-1 ring-neutral-200 bg-white hover:bg-neutral-900 hover:text-white transition",
}) {
  // Varsayılan ürün başlıkları
  const defaultProductLabels =
    locale === "tr"
      ? { block: "Blok", slabs: "Slab", tiles: "Karo", special: "Özel Tasarım" }
      : { block: "Block", slabs: "Slab", tiles: "Tile", special: "Special Design" };

  const productLabels = { ...defaultProductLabels, ...(labels.product || {}) };

  // Variant label
  const humanize = (slug) =>
    slug
      .split("-")
      .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
      .join(" ");
  const variantLabel = (slug) => (labels.variants?.[slug] ?? humanize(slug));

  // Variant link
  const hrefFor = (productKey, variantSlug) => {
    const seg = productSegments?.[productKey] ?? productKey;
    return `${baseHref}/${seg}/${variantSlug}`;
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
            <div
              key={pkey}
              className="group flex flex-col items-center text-center"
            >
              {/* Ürün yuvarlak görseli → Link ile sarıldı */}
              <Link
                href={productHref}
                className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] block"
              >
                <Image
                  src={productImages[pkey]}
                  alt={productLabels[pkey]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="160px"
                />
              </Link>

              {/* Başlık */}
              <h4 className="mt-4 text-lg font-semibold text-neutral-900">
                {productLabels[pkey]}
              </h4>

              {/* Variant chipleri */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                {variantSlugs.map((slug) => (
                  <Link
                    key={`${pkey}-${slug}`}
                    href={hrefFor(pkey, slug)}
                    className={chipClassName}
                  >
                    {variantLabel(slug)}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
