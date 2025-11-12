// VariantCircleSection2.jsx
"use client";
import React from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { productSlugFor } from "@/lib/travertine";

export default function VariantCircleSection2(props) {
  const {
    heading,
    productOrder = ["blocks", "slabs", "tiles", "pavers"],
    // GLOBAL fallback (gerekirse)
    variantSlugs = [],
    // 🔹 HER ÜRÜN İÇİN AYRI SLUG LİSTESİ
    productSegments = {},
    locale = "tr",
    labels = {},
    productImages = {},
    className = "flex flex-col w-screen mb-10 items-center justify-center text-center",
    gridClassName = "mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center",
    defaultCombos = {
      slabs: [
        { filled: "filled", finish: "brushed", cut: "vein-cut" },
        { filled: "filled", finish: "brushed", cut: "cross-cut" },
      ],
      tiles: [{ filled: "filled", finish: "tumbled", cut: "vein-cut" }],
      pavers: [{ filled: "filled", finish: "polished", cut: "vein-cut" }],
    },
  } = props;

  const t = useTranslations("TravertinePage");

  const CANON = {
    block: "blocks",
    blocks: "blocks",
    pavers: "pavers",
    slabs: "slabs",
    tiles: "tiles",
  };

  // ——— Renk SEO slugu ———
  const COLOR_SEO_MAP_EN = { ivory: "ivory", light: "light", antico: "antico" };
  const COLOR_SEO_MAP_TR = { ivory: "fildisi", light: "acik", antico: "antiko" };
  const colorSeo = (c) => {
    const key = String(c).toLowerCase();
    return locale.startsWith("tr")
      ? COLOR_SEO_MAP_TR[key] || key
      : COLOR_SEO_MAP_EN[key] || key;
  };

  const COLOR_INTERNAL_MAP = {
    "blaundos-ivory": "ivory",
    "blaundos-light": "light",
    "blaundos-antiko": "antico",
    antiko: "antico",
  };
  const normColor = (c) => COLOR_INTERNAL_MAP[c] || c;

  // ——— TR/EN son kuyruklar ———
  const PRODUCT_TAIL = locale.startsWith("tr")
    ? {
        blocks: "traverten-bloklar",
        slabs: "traverten-plakalar",
        tiles: "traverten-karolar",
        pavers: "traverten-dosemeler",
      }
    : {
        blocks: "travertine-blocks",
        slabs: "travertine-slabs",
        tiles: "travertine-tiles",
        pavers: "travertine-pavers",
      };

  const FILL = locale.startsWith("tr")
    ? { filled: "dolgulu", unfilled: "dolgusuz" }
    : { filled: "filled", unfilled: "unfilled" };

  const FINISH = locale.startsWith("tr")
    ? {
        polished: "cilali",
        honed: "honlanmis",
        brushed: "fircalanmis",
        tumbled: "eskitilmis",
      }
    : {
        polished: "polished",
        honed: "honed",
        brushed: "brushed",
        tumbled: "tumbled",
      };

  const CUT = locale.startsWith("tr")
    ? {
        "vein-cut": "damar-kesim",
        "cross-cut": "en-kesim",
      }
    : {
        "vein-cut": "vein-cut",
        "cross-cut": "cross-cut",
      };

  const buildSeoProductPathLocalized = ({ product, color, filled, finish, cut }) => {
    const p = CANON[product] || product;
    const tail =
      PRODUCT_TAIL[p] ||
      (locale.startsWith("tr") ? "traverten" : "travertine");
    const c = colorSeo(normColor(color));

    if (p === "blocks") {
      return `/${c}-${tail}`;
    }

    const f = FILL[filled] || filled;
    const fn = FINISH[finish] || finish;
    const ct = CUT[cut] || cut;

    return `/${c}-${f}-${fn}-${ct}-${tail}`;
  };

  const productListPath = (pkey) =>
    `/${PRODUCT_TAIL[pkey === "pavers" ? "pavers" : pkey]}`;

  const defaultProductLabels = {
    blocks: t("variantsubtitle1"),
    slabs: t("variantsubtitle2"),
    tiles: t("variantsubtitle3"),
    pavers: t("variantsubtitle4"),
  };
  const productLabels = { ...defaultProductLabels, ...(labels.product || {}) };

  const humanize = (slug) =>
    slug
      .split("-")
      .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
      .join(" ");

  // 🔹 Processes / Size / Color için özel label
  const variantLabel = (slug) => {
    if (labels.variants?.[slug]) return labels.variants[slug];

    if (["processes", "size", "color"].includes(slug)) {
      // JSON'da TravertinePage.variants.processes/size/color varsa onu kullan
      try {
        return t(`variants.${slug}`);
      } catch {
        return humanize(slug);
      }
    }

    return humanize(colorSeo(normColor(slug)));
  };

  const startByProduct = {
    blocks: t("variantSentence.blocks.start"),
    slabs: t("variantSentence.slabs.start"),
    tiles: t("variantSentence.tiles.start"),
    pavers: t("variantSentence.pavers.start"),
  };
  const endCommon = t("variantSentence.end");

  // 🔴 TILES & PAVERS özel link dizileri
  const TILES_VARIANT_LINKS = [
    "/vein-cut-travertine-tiles#product-intro",
    "/filled-honed-vein-cut-travertine-tiles#product-intro",
    "/8x8-filled-honed-vein-cut-travertine-tiles#product-intro",
  ];

  const PAVERS_VARIANT_LINKS = [
    "/vein-cut-travertine-pavers#product-intro",
    "/filled-honed-vein-cut-travertine-pavers#product-intro",
    "/6x12-filled-honed-vein-cut-travertine-pavers#product-intro",
  ];

  const variantHref = (productKey, colorSlug, index) => {
    const p = CANON[productKey] || productKey;

    if (p === "tiles") {
      return TILES_VARIANT_LINKS[index] || TILES_VARIANT_LINKS[0];
    }

    if (p === "pavers") {
      return PAVERS_VARIANT_LINKS[index] || PAVERS_VARIANT_LINKS[0];
    }

    if (p === "blocks") {
      return buildSeoProductPathLocalized({ product: p, color: colorSlug });
    }

    const combos = defaultCombos[p] || defaultCombos["pavers"] || [];
    const use =
      combos[0] || { filled: "filled", finish: "polished", cut: "vein-cut" };

    return buildSeoProductPathLocalized({
      product: p,
      color: colorSlug,
      ...use,
    });
  };

  return (
    <section className={className}>
      <div className="flex flex-col max-w-[1200px] items-center justify-center text-center">
        {heading ? (
          <h3 className="text-[20px] lg:text-[22px] font-semibold mb-2">
            {heading}
          </h3>
        ) : null}

        <div className={gridClassName}>
          {productOrder.map((raw) => {
            const pkey = CANON[raw] || raw;
            const startText = startByProduct[pkey] || "";

            const IMG_KEY = {
              blocks: "block",
              pavers: "pavers",
              slabs: "slabs",
              tiles: "tiles",
            };
            const imgKey = IMG_KEY[pkey] || pkey;

            const listHref = productListPath(pkey);

            // 🔹 HER ÜRÜN İÇİN KENDİ VARIANT LİSTESİ
            const localVariantSlugs =
              productSegments[pkey] && productSegments[pkey].length
                ? productSegments[pkey]
                : variantSlugs;

            return (
              <div
                key={pkey}
                className="group flex flex-col items-center text-center"
              >
                <Link
                  href={listHref}
                  className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] block"
                >
                  <Image
                    src={
                      productImages[imgKey] ||
                      productImages[pkey] ||
                      productImages[raw]
                    }
                    alt={t(`altTexts.${pkey}`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="120px"
                    priority
                  />
                </Link>

                <Link href={listHref}>
                  <h4 className="mt-4 text-[18px] lg:text-[20px] font-semibold text-neutral-900 leading-relaxed">
                    {productLabels[pkey]}
                  </h4>
                </Link>

                {localVariantSlugs?.length ? (
                  <p className="lg:mt-2 mt-1 text-center text-[12px] md:text-[14px] text-neutral-700 w-[90%] leading-[120%]">
                    {startText}{" "}
                    {localVariantSlugs.map((slug, i) => {
                      const href = variantHref(pkey, normColor(slug), i);
                      return (
                        <span key={`${pkey}-${slug}-${i}`}>
                          <Link
                            href={href}
                            className="text-teal-700 hover:underline"
                          >
                            {variantLabel(slug)}
                          </Link>
                          {i < localVariantSlugs.length - 1 ? ", " : ""}
                        </span>
                      );
                    })}{" "}
                    {endCommon}
                  </p>
                ) : null}

                <Link
                  href={listHref}
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
