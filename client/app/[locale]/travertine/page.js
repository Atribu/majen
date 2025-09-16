
// app/[locale]/(catalog)/travertine/page.jsx
"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaWikipediaW,
  FaInstagram
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { BASE_BY_LOCALE, PRODUCT_SLUGS } from "@/lib/travertine";
import { PRODUCT_IMG } from "@/app/[locale]/(catalog)/_images";
import IntroSection from "../components/products1/IntroSection";
import VariantCircleSection2 from "../components/products1/VariantCircleSection2";
import block from "@/public/images/homepage/Ivoryblok.webp";
import slabs from "@/public/images/homepage/slabs.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/homepage/masa.webp";
import InfoCard from "../components/products1/InfoCard"
import ContactFrom from '../components/generalcomponent/ContactFrom';
import BackgroundSection from '../components/homepage/BackgroundSection';
import TextSection from "../components/products1/TextSection";
import SocialMediaSection from "../components/products1/SocialMediaSection";

const PRODUCT_ORDER = ["block", "slabs", "tiles", "special"]; // 4 ürün
const VARIANT_SLUGS = ["blaundos-antiko", "blaundos-light", "blaundos-ivory"]; // 3 renk

const whatsappText = encodeURIComponent("Merhaba Majen ekibi!");
  const whatsappHref = `https://api.whatsapp.com/send?phone=905335561092&text=${whatsappText}`;

export default function TravertinePage() {
    const locale = useLocale();
  const t = useTranslations("TravertinePage");

  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];     // "traverten" | "travertine"
  const baseHref = `${prefix}/${baseSegment}`;    // "/tr/traverten"

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
    <main className="px-5 md:px-8 lg:px-0 py-10 overflow-hidden">
     <IntroSection/>

      {/* Info Cards */}
      <section className="mb-8 md:mb-10 lg:mb-20 mt-5 lg:mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto">
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


      {/* 4 ürün + altlarında tüm renkler (chip) */}
     <VariantCircleSection2
  heading= "Traverten Kesim & Renk Kombinasyonları" 
  productOrder={["block", "slabs", "tiles", "special"]}
  variantSlugs={["blaundos-antiko", "blaundos-light", "blaundos-ivory"]}
  baseHref={baseHref}
  productSegments={PRODUCT_SLUGS[locale]}
  locale={locale}
  productImages={{ block, slabs, tiles, special }}
/>

     <TextSection title="Wholesale Travertine Blocks From Turkey"  paragraphs={[
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
      ]}
      schema={schema}
      className="max-w-5xl mx-auto mt-12"
      clampMobile={3}
      as="section"/>

      <TextSection title="Wholesale Travertine Slabs From Turkey"  paragraphs={[
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
      ]}
      schema={schema}
      className="max-w-5xl mx-auto mt-12"
      clampMobile={3}
      as="section"/>

      <TextSection title="Wholesale Travertine Tiles From Turkey"  paragraphs={[
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
      ]}
      schema={schema}
      className="max-w-5xl mx-auto mt-12"
      clampMobile={3}
      as="section"/>

      <TextSection title="Wholesale Travertine Special Designs From Turkey"  paragraphs={[
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
      ]}
      schema={schema}
      className="max-w-5xl mx-auto mt-12"
      clampMobile={3}
      as="section"/>


<SocialMediaSection/>
    
        <ContactFrom />
        <div className='mt-12 mb-32'>
        <BackgroundSection/>
        </div>
    </main>
  );
}
