// app/[locale]/(catalog)/product/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
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
import { DetailBlock, HeroImage } from "@/app/[locale]/(catalog)/_ui";
import VariantCircleSection from "../../components/products1/VariantCircleSection";
import ProductIntroSection from "../../components/products1/ProductIntroSection";


const VARIANT_SLUGS = ["blaundos-antiko", "blaundos-light", "blaundos-ivory"];

function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
      <h4 className="font-semibold text-neutral-800 mb-2 text-center">{title}</h4>
      <div className="text-sm text-neutral-600 leading-[1.7] text-center">{children}</div>
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

  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === product) || "block";

  const title = t(`${productKey}.title`);
  const alt = t(`${productKey}.alt`);
  const intro = t(`${productKey}.intro`);
  const sizes = t.raw(`${productKey}.sizes`) || [];
  const finishes = t.raw(`${productKey}.finishes`) || [];
  const features = t.raw(`${productKey}.features`) || [];
  const description = t.raw(`${productKey}.description`) || intro;
  const variantsHeading = t(`${productKey}.variants.heading`);

  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    typeof imgMap === "object" ? imgMap.cover ?? Object.values(imgMap)[0] : imgMap;

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
      content: (sizes && sizes.length) ? sizes.join(", ") : t("detailsHeadings.harvestText", { default: "See size options on the right." }),
    },
    {
      title: t("detailsHeadings.features", { default: "Finishes & Features" }),
      content: [...(finishes || []), ...(features || [])].slice(0, 12).join(", "),
    },
  ];

  return (
    <main className="px-5 md:px-8 lg:px-0 py-10 mt-16">
      {/* ======= ÜST INTRO (IntroSection yapısı + heroSrc) ======= */}
     <ProductIntroSection
  title={title}
  intro={intro}
  heroSrc={heroSrc}
  alt={alt}
  prefix={prefix}
  baseHref={baseHref}
  // crumbHome ve crumbProducts istersen override edebilirsin:
  // crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
  // crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
/>

      {/* ======= 4 BİLGİ KARTI ======= */}
      <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto">
        {cards.map((c, i) => (
          <InfoCard key={i} title={c.title}>
            {typeof c.content === "string" ? c.content : Array.isArray(c.content) ? c.content.join(", ") : null}
          </InfoCard>
        ))}
      </section>

      {/* ======= DETAY BLOKLARI ======= */}
      {(sizes?.length || finishes?.length || features?.length) ? (
        <section className="mt-12 max-w-[1200px] mx-auto">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sizes?.length ? <DetailBlock heading={t("detailsHeadings.sizes")} items={sizes} /> : null}
            {finishes?.length ? <DetailBlock heading={t("detailsHeadings.finishes")} items={finishes} /> : null}
            {features?.length ? <DetailBlock heading={t("detailsHeadings.features")} items={features} /> : null}
          </div>
        </section>
      ) : null}

      {/* ======= VARYANTLAR – dairesel görseller ======= */}
      <VariantCircleSection
        heading={variantsHeading}
        variantCards={variantCards}
        imgMap={imgMap}
        heroSrc={heroSrc}
        IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_AND_VARIANT}
        productKey={productKey}
      />
    </main>
  );
}
