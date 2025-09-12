// app/[locale]/(catalog)/travertine/page.jsx
"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";

import { BASE_BY_LOCALE, PRODUCT_SLUGS } from "@/lib/travertine";
import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";
import IntroSection from "../components/products1/IntroSection";
import VariantCircleSection2 from "../components/products1/VariantCircleSection2";
import block from "@/public/images/homepage/Ivoryblok.webp";
import slabs from "@/public/images/homepage/slabler.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/homepage/masa.webp";
import InfoCard from "../components/products1/InfoCard"

const PRODUCT_ORDER = ["block", "slabs", "tiles", "special"]; // 4 ürün
const VARIANT_SLUGS = ["blaundos-antiko", "blaundos-light", "blaundos-ivory"]; // 3 renk

export default function TravertinePage() {
    const locale = useLocale();
  const t = useTranslations("TravertinePage");


  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];     // "traverten" | "travertine"
  const baseHref = `${prefix}/${baseSegment}`;    // "/tr/traverten"

  // Intro
  const title = "Travertine From Turkey – Majen" ;
  const intro = 
      "Majen olarak, Türkiye’nin seçkin ocaklarından traverten tedarik ediyoruz. Blok, slab ve karo seçenekleriyle proje odaklı üretim sağlıyoruz.";
  const heroFallback =
    typeof PRODUCT_IMG?.block === "object"
      ? PRODUCT_IMG.block.cover ?? Object.values(PRODUCT_IMG.block)[0]
      : PRODUCT_IMG?.block;

        const cards = [
    {
      title: t("cards.quality", { default: "Why Choose Our Travertine?" }),
      content: t("cards.qualityText", { default: "High durability, natural beauty, and sustainable sourcing." }),
    },
    {
      title: t("cards.applications", { default: "Applications" }),
      content: t("cards.applicationsText", { default: "Flooring, wall cladding, pool decks, and bespoke design." }),
    },
    {
      title: t("cards.sizes", { default: "Sizes & Thickness" }),
      content: t("cards.sizesText", { default: "From custom blocks to 2cm & 3cm slabs, plus tiles in many formats." }),
    },
    {
      title: t("cards.finishes", { default: "Finishes" }),
      content: t("cards.finishesText", { default: "Polished, honed, tumbled, brushed, and more." }),
    },
  ];

  return (
    <main className="px-5 md:px-8 lg:px-0 py-1">
     <IntroSection/>

      {/* 4 ürün + altlarında tüm renkler (chip) */}
     <VariantCircleSection2
  heading= "Ürün & Renk Kombinasyonları" 
  productOrder={["block", "slabs", "tiles", "special"]}
  variantSlugs={["blaundos-antiko", "blaundos-light", "blaundos-ivory"]}
  baseHref={baseHref}
  productSegments={PRODUCT_SLUGS[locale]}
  locale={locale}
  productImages={{ block, slabs, tiles, special }}
/>

    {/* Info Cards */}
      <section className="my-8 md:my-10 lg:my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto">
        {cards.map((c, i) => (
          <InfoCard key={i} title={c.title}>
            {typeof c.content === "string"
              ? c.content
              : Array.isArray(c.content)
              ? c.content.join(", ")
              : null}
          </InfoCard>
        ))}
      </section>
    </main>
  );
}
