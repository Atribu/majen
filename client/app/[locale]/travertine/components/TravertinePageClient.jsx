
// app/[locale]/(catalog)/travertine/page.jsx
"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { BASE_BY_LOCALE, PRODUCT_SLUGS } from "@/lib/travertine";
import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";
import IntroSection from "../../components/products1/IntroSection";
import VariantCircleSection2 from "../../components/products1/VariantCircleSection2";
import block from "@/public/images/deneme/ivoryblok.webp";
import slabs from "@/public/images/deneme/slabson.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/deneme/masa2.webp";
import InfoCard from "../../components/products1/InfoCard"
import ContactFrom from '../../components/generalcomponent/ContactFrom';
import BackgroundSection from '../../components/homepage/BackgroundSection';
import TextSection from "../../components/products1/TextSection";
import SocialMediaSection from "../../components/products1/SocialMediaSection";
import InlineLinks from "../../components/generalcomponent/InlineLinks";
import QuestionsSection from "../../components/generalcomponent/QuestionsSection";

const PRODUCT_ORDER = ["block", "slabs", "tiles", "special"]; // 4 ürün
const VARIANT_SLUGS = ["blaundos-antiko", "blaundos-light", "blaundos-ivory"]; // 3 renk

const whatsappText = encodeURIComponent("Merhaba Majen ekibi!");
  const whatsappHref = `https://api.whatsapp.com/send?phone=905335561092&text=${whatsappText}`;

export default function TravertinePageClient() {
    const locale = useLocale();
  const t = useTranslations("TravertinePage");
  const t2 = useTranslations("TravertinePage.TextSection");
  const t3=useTranslations("TravertinePage.QuestionsItems");

     const items = [
      { q: t3("aboutpage_s4_faq1_header"), a: t3("aboutpage_s4_faq1_text") },
      { q: t3("aboutpage_s4_faq2_header"), a: t3("aboutpage_s4_faq2_text") },
      { q: t3("aboutpage_s4_faq3_header"), a: t3("aboutpage_s4_faq3_text") },
      { q: t3("aboutpage_s4_faq4_header"), a: t3("aboutpage_s4_faq4_text") },
      { q: t3("aboutpage_s4_faq5_header"), a: t3("aboutpage_s4_faq5_text") }
      
    ];

  const hrefForProduct = (key) => `${baseHref}/${PRODUCT_SLUGS[locale][key]}`;
  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];     // "traverten" | "travertine"
  const baseHref = `${prefix}/${baseSegment}`;    // "/tr/traverten"

   const linkPatterns = [
    { pattern: /(travertine\s*)?blocks?/i,           href: hrefForProduct("block")   },
    { pattern: /slabs?/i,                            href: hrefForProduct("slabs")   },
    { pattern: /tiles?/i,                            href: hrefForProduct("tiles")   },
    { pattern: /(travertine\s*)?custom\s*designs?/i, href: hrefForProduct("special") },
  ];
  // Intro
  
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
         linkify: true,
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

    const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };

  return (
    <main className=" py-10 overflow-hidden">
     <IntroSection/>
      {/* Info Cards */}
      <section className="mb-8 md:mb-10 lg:mb-20 mt-5 lg:mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto w-[95%] ">
        {cards.map((c, i) => (
          <InfoCard key={i} title={c.title}>
            {/* Sadece 2. kart (applications) linkli olsun */}
            {c.linkify ? (
              <InlineLinks text={c.content} patterns={linkPatterns} />
            ) : (
              (typeof c.content === "string"
                ? c.content
                : Array.isArray(c.content)
                ? c.content.join(", ")
                : null)
            )}
          </InfoCard>
        ))}
      </section>


      {/* 4 ürün + altlarında tüm renkler (chip) */}
     <VariantCircleSection2
  heading= {t("variantsHeading")}
  productOrder={["block", "slabs", "tiles", "special"]}
  variantSlugs={["antiko", "light", "ivory"]}
  baseHref={baseHref}
  productSegments={PRODUCT_SLUGS[locale]}
  locale={locale}
  productImages={{ block, slabs, tiles, special }}
/>

     <TextSection title={t2("header1")} title2={t2("subheader1")} text2={t2("subtext1")} paragraphs={[
     t2("text1")
      ]}
      schema={schema}
      className="max-w-5xl mx-auto mt-12"
      clampMobile={3}
      as="section"/>

      <TextSection title={t2("header2")} title2={t2("subheader2")} text2={t2("subtext2")} paragraphs={[
     t2("text2")
      ]}
      schema={schema}
      className="max-w-5xl mx-auto mt-12"
      clampMobile={3}
      as="section"/>

     <TextSection title={t2("header3")} title2={t2("subheader3")} text2={t2("subtext3")} paragraphs={[
     t2("text3")
      ]}
      schema={schema}
      className="max-w-5xl mx-auto mt-12"
      clampMobile={3}
      as="section"/>

      <TextSection title={t2("header4")} title2={t2("subheader4")} text2={t2("subtext4")} paragraphs={[
     t2("text4")
      ]}
      schema={schema}
      className="max-w-5xl mx-auto mt-12"
      clampMobile={3}
      as="section"/>

<ContactFrom />
      <SocialMediaSection/>
      <QuestionsSection span="Export & Specs" items={items}/>
    

    </main>
  );
}
