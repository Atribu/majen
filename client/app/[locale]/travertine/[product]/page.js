// app/[locale]/(catalog)/product/page.jsx
"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  BASE_BY_LOCALE,
  PRODUCT_KEYS,
  PRODUCT_SLUGS,
  VARIANT_KEY_BY_SLUG,
} from "@/lib/travertine";

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

  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];
  const baseHref = `${prefix}/${baseSegment}`;

  // Ürün key’ini bul
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === product) || "block";

  // Metinler
  const title   = t(`${productKey}.title`);
  const alt     = t(`${productKey}.alt`);
  const intro   = t(`${productKey}.intro`);
  const title2  = t(`${productKey}.title2`, { default: "" });
  const alt2    = t(`${productKey}.alt2`, { default: "" });
  const intro2  = t(`${productKey}.intro2`, { default: "" });

  const sizes      = t.raw(`${productKey}.sizes`) || [];
  const finishes   = t.raw(`${productKey}.finishes`) || [];
  const features   = t.raw(`${productKey}.features`) || [];
  const description= t.raw(`${productKey}.description`) || intro;
  const variantsHeading = t(`${productKey}.variants.heading`);

  // Görsel
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    typeof imgMap === "object" ? imgMap.cover ?? Object.values(imgMap)[0] : imgMap;

  // Varyant kartları
  const variantCards = VARIANT_SLUGS.map((slug) => {
    const vKey = VARIANT_KEY_BY_SLUG[slug];
    return {
      slug,
      vKey,
      title: t(`${productKey}.variants.${vKey}.title`),
      alt: t(`${productKey}.variants.${vKey}.alt`),
      href: `${baseHref}/${product}/${slug}`,
    };
  });

  // Info kartları
  const cards = [
    {
      title: t("detailsHeadings.sizes", { default: "Benefits of " }) + title,
      content: Array.isArray(description) ? description[0] : description || intro,
    },
    {
      title: t("detailsHeadings.sizes", { default: "Where It’s Produced / Used" }),
      content: Array.isArray(description) ? description[1] ?? intro : intro,
    },
    {
      title: t("detailsHeadings.sizes", { default: "Sizes / Thickness" }),
      content: sizes?.length
        ? sizes.join(", ")
        : t("detailsHeadings.harvestText", { default: "See size options on the right." }),
    },
    {
      title: t("detailsHeadings.features", { default: "Finishes & Features" }),
      content: [...(finishes || []), ...(features || [])].slice(0, 12).join(", "),
    },
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
    const subheader  = textSectionRaw[`subheader${i}`];
    const subtext    = textSectionRaw[`subtext${i}`];

    // Başlık: headerN varsa onu kullan, yoksa subheaderN’ı title gibi kullanabiliriz (opsiyonel)
    const titleForSection =
      header || subheader || `${title} — Section ${i}`;

    // Paragraflar: text/subtext olanları sırayla ekle
    const paragraphsForSection = [text, subtext].filter(Boolean);

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

  return (
    <main className=" py-7 mt-16">
      {/* ÜST INTRO */}
      <ProductIntroSection
        title={title}
        intro={intro}
        title2={title2}
        intro2={intro2}
        heroSrc={heroSrc}
        alt={alt}
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
      />

      {/* 4 BİLGİ KARTI */}
      <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto">
        {cards.map((c, i) => (
          <InfoCard key={i} title={c.title}>
            {typeof c.content === "string" ? c.content : Array.isArray(c.content) ? c.content.join(", ") : null}
          </InfoCard>
        ))}
      </section>

      {/* VARYANTLAR */}
      <VariantCircleSection
        heading={variantsHeading}
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
        />
      ))}

      <SocialMediaSection />
      <ContactFrom />
    </main>
  );
}