// app/components/products1/VariantCircleSection2.jsx
"use client";
import React from "react";
import { Link } from "@/i18n/navigation";
import { productSlugFor } from "@/lib/travertine";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function VariantCircleSection2({
  heading,
  productOrder = ["blocks", "slabs", "tiles", "special-designs"],
  variantSlugs = [],
  locale = "tr",
  labels = {},
  productImages = {},
  className = "flex flex-col w-screen mb-10 items-center justify-center text-center",
  gridClassName = "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center",
}) {
  const t = useTranslations("TravertinePage");

  const CANON = { block: "blocks", blocks: "blocks", special: "special-designs", "special-designs": "special-designs", slabs: "slabs", tiles: "tiles" };
  // Tek noktadan doğru dış slug’ı üret (özellikle special-designs için)
  const getProductSlug = (loc, canonKey) => {
    const key = CANON[canonKey] || canonKey;
    const slug = productSlugFor(loc, key) || key;
    // Bazı projelerde productSlugFor "special-designs" dönebiliyor; burada kesinleştiriyoruz:
    if (key === "special-designs") {
      return loc.startsWith("tr") ? "ozel-tasarim" : "special";
    }
    return slug;
  };

  const defaultProductLabels = {
    blocks: t("variantsubtitle1"),
    slabs: t("variantsubtitle2"),
    tiles: t("variantsubtitle3"),
    "special-designs": t("variantsubtitle4"),
  };
  const productLabels = { ...defaultProductLabels, ...(labels.product || {}) };
  

  const VARIANT_SLUG_MAP = {
    antiko: "blaundos-antiko",
    light: "blaundos-light",
    ivory: "blaundos-ivory",
  };

  const humanize = (slug) =>
    slug.split("-").map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s)).join(" ");

  const variantLabel = (slug) => labels.variants?.[slug] ?? humanize(slug);

  // i18n Link için route object üreten yardımcılar:
 const productRoute = (productKeyRaw) => {
    const product = getProductSlug(locale, productKeyRaw);
    return { pathname: "/travertine/[product]", params: { product } };
  };

  const variantRoute = (productKeyRaw, variantSlug) => {
    const seg = getProductSlug(locale, productKeyRaw);
    const finalSlug = VARIANT_SLUG_MAP[variantSlug] || variantSlug;
    return {
      pathname: "/travertine/[product]/[variant]",
      params: { product: seg, variant: finalSlug }
    };
  };

 const startByProduct = {
    // block: t("variantSentence.block.start"),
    blocks: t("variantSentence.blocks.start"),
    slabs: t("variantSentence.slabs.start"),
    tiles: t("variantSentence.tiles.start"),
    special: t("variantSentence.special.start"),
    "special-designs": t("variantSentence.special.start"),
  };

  const endCommon = t("variantSentence.end");

  return (
    <section className={className}>
      <div className="flex flex-col max-w-[1200px] items-center justify-center text-center">
        {heading ? (
          <h3 className="text-[20px] lg:text-[22px] font-semibold mb-2">{heading}</h3>
        ) : null}

        <p className="text-[12px] lg:text-[14px] w-[90%] mb-3">
        Turkish travertine from our Uşak–Ulubey quarry is available across four categories—Blocks, Slabs, Tiles, and Custom Designs—to suit projects from luxury interiors to large façades. Choose classic Blaundos Antico, Light, or Ivory tones, with polished, honed, brushed, or tumbled finishes and vein-cut or cross-cut options. Blocks are selected for high yield, slabs are calibrated in 2–3 cm, and tiles are cut to size for durable floors and wall cladding. We provide reinforced export packing and full documentation with <Link href="/howweexport/fob" className="cursor-pointer text-teal-700">FOB</Link>/ <Link href="/howweexport/cif" className="cursor-pointer text-teal-700">CIF</Link>/ <Link href="/howweexport/exw" className="cursor-pointer text-teal-700">EXW</Link> terms. Explore the categories below for technical data, recommended applications, and current availability.
        </p>

        <div className={gridClassName}>
          {productOrder.map((raw) => {
            const pkey = CANON[raw] || raw; // kanonikle
            const startText = startByProduct[pkey] || "";
             // Görsel anahtarını normalize et (images objesinde block/special var)
            const IMG_KEY = { blocks: "block", "special-designs": "special", slabs: "slabs", tiles: "tiles" };
            const imgKey = IMG_KEY[pkey] || pkey;
            return (
              <div key={pkey} className="group flex flex-col items-center text-center">
                {/* Ürün görseli */}
                <Link
                  href={productRoute(pkey)}
                  className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] block"
                >
                  <Image
                     src={productImages[imgKey] || productImages[pkey] || productImages[raw]}
                    alt={t(`altTexts.${pkey}`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="120px"
                    priority
                  />
                </Link>

                {/* Başlık */}
                <Link href={productRoute(pkey)}>
                  <h4 className="mt-4 text-[18px] lg:text-[20px] font-semibold text-neutral-900 leading-relaxed">
                    {productLabels[pkey]}
                  </h4>
                </Link>

                {/* Variant linkleri */}
                <p className="lg:mt-2 mt-1 text-center text-[12px] md:text-[14px] text-neutral-700 w-[90%] leading-[120%]">
                  {startText}{" "}
                  {variantSlugs.map((slug, i) => (
                    <span key={`${pkey}-${slug}`}>
                      <Link href={variantRoute(pkey, slug)} className="text-teal-700 hover:underline">
                        {variantLabel(slug)}
                      </Link>
                      {i < variantSlugs.length - 1 ? ", " : ""}
                    </span>
                  ))}{" "}
                  {endCommon}
                </p>

                <Link
                  href={productRoute(pkey)}
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
