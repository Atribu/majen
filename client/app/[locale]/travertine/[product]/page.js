// app/[locale]/(catalog)/product/page.jsx
"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations, useMessages } from "next-intl";
import {
  BASE_BY_LOCALE,
  PRODUCT_KEYS,
  PRODUCT_SLUGS,
  VARIANT_KEY_BY_SLUG,
} from "@/lib/travertine";
import block from "@/public/images/deneme/ivoryblok.webp";
import slabs from "@/public/images/deneme/slabson.webp";
import tiles from "@/public/images/homepage/kesim.webp";
import special from "@/public/images/deneme/masa2.webp";

import {
  PRODUCT_IMG,
  IMAGE_BY_PRODUCT_AND_VARIANT,
} from "@/app/[locale]/(catalog)/_images";
import { DetailBlock } from "@/app/[locale]/(catalog)/_ui";
import VariantCircleSection from "../../components/products1/VariantCircleSection";
import ProductIntroSection from "../../components/products1/ProductIntroSection";
import TextSection from "../../components/products1/TextSection";
import ContactFrom from "../../components/generalcomponent/ContactFrom";
import SocialMediaSection from "../../components/products1/SocialMediaSection";
import InlineLinks from "../../components/generalcomponent/InlineLinks";
import QuestionsSection from "../../components/generalcomponent/QuestionsSection";
import VariantCircleSection2 from "../../components/products1/VariantCircleSection2";
import OtherOptions from "../../components/generalcomponent/OtherOptions";

const VARIANT_SLUGS = ["blaundos-antiko", "blaundos-light", "blaundos-ivory"];

function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
      <h4 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h4>
      <div className="text-sm text-neutral-600 leading-[1.7] text-center">
        {children}
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { product } = useParams();
  const locale = useLocale();
  const t = useTranslations("ProductPage");
  const t3 = useTranslations("TravertinePage");

  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];
  const baseHref = `${prefix}/${baseSegment}`;

  // Ürün key’ini bul
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === product) || "block";

        const t2 = useTranslations(`ProductPage.${productKey}.QuestionsItems`);
  const messages = useMessages();

const qItems = messages?.ProductPage?.[productKey]?.QuestionsItems || {};

  // otomatik saydır → sadece gerçekten var olan header/text çiftlerini al
  const items = [];
  let j = 1;
  while (qItems[`aboutpage_s4_faq${j}_header`] && qItems[`aboutpage_s4_faq${j}_text`]) {
    items.push({
      q: qItems[`aboutpage_s4_faq${j}_header`],
      a: qItems[`aboutpage_s4_faq${j}_text`],
    });
    j++;
  }



  // Metinler
  const title   = t(`${productKey}.title`);
  const alt     = t(`${productKey}.alt`);
  const intro   = t(`${productKey}.intro`);
  const title2  = t(`${productKey}.title2`, { default: "" });
  const alt2    = t(`${productKey}.alt2`, { default: "" });
  const intro2  = t(`${productKey}.intro2`, { default: "" });

  const cardTitle1      = t.raw(`${productKey}.detailsHeadings.title1`) || [];
  const cardTitle2   = t.raw(`${productKey}.detailsHeadings.title2`) || [];
  const cardTitle3   = t.raw(`${productKey}.detailsHeadings.title3`) || [];
  const cardTitle4   = t.raw(`${productKey}.detailsHeadings.title4`) || [];
  const description= t.raw(`${productKey}.description`) || intro;
  const variantsHeading = t(`${productKey}.variants.heading`);
  const variantsText = t(`${productKey}.variants.text`);

  // Görsel
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    typeof imgMap === "object" ? imgMap.cover ?? Object.values(imgMap)[0] : imgMap;

const productAltMap = {
  block: "Blocks",
  slabs: "Slabs",
  tiles: "Tiles",
  special: "Custom Designs",
};

  // Varyant kartları
  const variantCards = VARIANT_SLUGS.map((slug) => {
    const vKey = VARIANT_KEY_BY_SLUG[slug];
    return {
      slug,
      vKey,
      title: t(`${productKey}.variants.${vKey}.title`),
      alt: `Wholesale Travertine ${productAltMap[productKey] || productKey} from Turkey`,
      href: `${baseHref}/${product}/${slug}`,
    };
  });

  // Info kartları
  const cards = [
    {
       title: cardTitle1,
      content: Array.isArray(description) ? description[0] : description || intro,
    },
    {
       title: cardTitle2,
      content: Array.isArray(description) ? description[1] ?? intro : intro,
    },
    {
      title: cardTitle3,
      content: Array.isArray(description) ? description[2] ?? intro : intro,
    },
     {
       title: cardTitle4,
      content: Array.isArray(description) ? description[3] ?? intro : intro,
    }
  ];

  // SEO schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };

  // === TextSection verilerini i18n'den dinamik çek ===
  // ProductPage.{productKey}.TextSection altında bekliyoruz
  const textSectionRaw = t.raw(`${productKey}.TextSection`) || {};

  // header1/text1/subheader1/subtext1 ... yapısından bölümler üret
  // Kaç adet varsa (1..N) otomatik yakalar
  const sections = [];
  let i = 1;
  while (
    textSectionRaw[`header${i}`] ||
    textSectionRaw[`text${i}`] ||
    textSectionRaw[`subheader${i}`] ||
    textSectionRaw[`subtext${i}`]
  ) {
    const header     = textSectionRaw[`header${i}`];
    const text       = textSectionRaw[`text${i}`];

    // Başlık: headerN varsa onu kullan, yoksa subheaderN’ı title gibi kullanabiliriz (opsiyonel)
    const titleForSection =
      header  || `${title} — Section ${i}`;

    // Paragraflar: text/subtext olanları sırayla ekle
    const paragraphsForSection = [text].filter(Boolean);

    // Sadece title veya en az bir paragraf varsa render’a ekle
    if (titleForSection || paragraphsForSection.length) {
      sections.push({
        id: i,
        title: titleForSection,
        paragraphs: paragraphsForSection,
      });
    }
    i++;
  }

  const linkPatterns = [
  { pattern: /Blaundos Antiko/i, href: `${baseHref}/${product}/blaundos-antiko` },
  { pattern: / Light/i,  href: `${baseHref}/${product}/blaundos-light` },
  { pattern: / Ivory/i,  href: `${baseHref}/${product}/blaundos-ivory` },
];

 const heroAlt = `Wholesale Travertine ${productKey} from Turkey`;

  const hrefForProduct = (key) => `${baseHref}/${PRODUCT_SLUGS[locale][key]}`;

  return (
    <main className=" py-7 mt-16 overflow-x-hidden">
      {/* ÜST INTRO */}
      <ProductIntroSection
        title={title}
        intro={intro}
        title2={title2}
        intro2={intro2}
        heroSrc={heroSrc}
        alt={heroAlt}
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
      />

      {/* 4 BİLGİ KARTI */}
     <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto">
  {cards.map((c, i) => (
    <InfoCard key={i} title={c.title}>
      {i === 1 ? ( // 2. kart (index 1)
        <InlineLinks text={c.content} patterns={linkPatterns} />
      ) : (
        typeof c.content === "string"
          ? c.content
          : Array.isArray(c.content)
            ? c.content.join(", ")
            : null
      )}
    </InfoCard>
    
  ))}
</section>


      {/* VARYANTLAR */}
      <VariantCircleSection
        heading={variantsHeading}
        text={variantsText}
        variantCards={variantCards}
        imgMap={imgMap}
        heroSrc={heroSrc}
        IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_AND_VARIANT}
        productKey={productKey}
      />

      {sections.map(({ id, title: secTitle, paragraphs }) => (
        <TextSection
          key={id}
          title={secTitle}
          paragraphs={paragraphs}
          schema={schema}
          className="max-w-5xl mx-auto mt-12"
          clampMobile={3}
          as="section"
          title2=""
          text2=""
        />
      ))}

      <SocialMediaSection />
      <ContactFrom />
      <QuestionsSection items={items} span="Travertine Blocks "/>
      <OtherOptions
       heading="Other Options"
  excludeProduct={productKey}                         
  productOrder={["block", "slabs", "tiles", "special"]}
  variantSlugs={["antiko", "light", "ivory"]}
  baseHref={`${prefix}/${baseSegment}`}
  productSegments={PRODUCT_SLUGS[locale]}
  locale={locale}
  productImages={{ block, slabs, tiles, special }}
  productHrefFor={(pkey) => `${prefix}/${baseSegment}/${PRODUCT_SLUGS[locale][pkey]}`}
      />
    </main>
  );
}