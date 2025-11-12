
// app/[locale]/(catalog)/travertine/page.jsx
"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { BASE_BY_LOCALE, PRODUCT_SLUGS } from "@/lib/travertine";
import IntroSection from "../../components/products1/IntroSection";
import VariantCircleSection2 from "../../components/products1/VariantCircleSection2";
import block from "@/public/images/deneme/ivoryblok.webp";
import slabs from "@/public/images/deneme/slabson.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/homepage/Pavers3.webp";
import InfoCard from "../../components/products1/InfoCard"
import ContactFrom from '../../components/generalcomponent/ContactFrom';
import TextSection from "../../components/products1/TextSection";
import SocialMediaSection from "../../components/products1/SocialMediaSection";
import InlineLinks from "../../components/generalcomponent/InlineLinks";
import QuestionsSection from "../../components/generalcomponent/QuestionsSection";
import BreadcrumbsExact from "../../components/generalcomponent/BreadcrumbsExact";

const whatsappText = encodeURIComponent("Merhaba Majen ekibi!");
  const whatsappHref = `https://api.whatsapp.com/send?phone=905335561092&text=${whatsappText}`;

  const PRODUCT = {
  tr: {
    blocks: ["antiko", "light", "ivory"],
    slabs: ["antiko", "light", "ivory"],
    tiles: ["processes", "size", "color"],
    pavers: ["processes", "size", "color"],
  },
  en: {
    blocks: ["antico", "light", "ivory"],
    slabs: ["antico", "light", "ivory"],
    tiles: ["processes", "size", "color"],
    pavers: ["processes", "size", "color"],
  },
};

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
    { pattern: /blocks?/i,           href: hrefForProduct("block")   },
    { pattern: /slabs?/i,                            href: hrefForProduct("slabs")   },
    { pattern: /tiles?/i,                            href: hrefForProduct("tiles")   },
    { pattern: /custom/i, href: hrefForProduct("pavers") },
  ];
  

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

     const   depth = 1
      const pathname = usePathname() || ""; // boş string fallback
      const segments = pathname.split("/").filter(Boolean); 
      const lastSegment = pathname.split("/").filter(Boolean).pop(); 
      const selectedSegments = segments.slice(-depth);

  return (
    <main className="mt-[22px] lg:mt-7 overflow-hidden">
     <IntroSection/>

      <BreadcrumbsExact
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        selectedSegments={selectedSegments}
        className="mt-4 mb-10"
      />
      

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
  heading={t("variantsHeading")}
  productOrder={["blocks", "slabs", "tiles", "pavers"]}
  productSegments={PRODUCT[locale]}   // 🔹 artık buradan geliyor
  locale={locale}
  productImages={{ blocks: block, slabs, tiles, pavers: special }}
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
