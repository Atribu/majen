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

// Kullanacağımız varyant slugs (örnek Blaundos serisi)
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
   const tblock = useTranslations("ProductPage.block");

  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];
  const baseHref = `${prefix}/${baseSegment}`;

  // ürün key’ini bul (örn: "slabs", "tiles"…)
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === product) || "block";

  // i18n’den metinleri çek
  const title = t(`${productKey}.title`);
  const alt = t(`${productKey}.alt`);
  const intro = t(`${productKey}.intro`);
  const title2 = t(`${productKey}.title2`);
  const alt2 = t(`${productKey}.alt2`);
  const intro2 = t(`${productKey}.intro2`);
  const sizes = t.raw(`${productKey}.sizes`) || [];
  const finishes = t.raw(`${productKey}.finishes`) || [];
  const features = t.raw(`${productKey}.features`) || [];
  const description = t.raw(`${productKey}.description`) || intro;
  const variantsHeading = t(`${productKey}.variants.heading`);

  // görseller
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    typeof imgMap === "object"
      ? imgMap.cover ?? Object.values(imgMap)[0]
      : imgMap;

  // varyant kartları
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

  // bilgi kartları
  const cards = [
    {
      title: t("detailsHeadings.sizes", { default: "Benefits of " }) + title,
      content: Array.isArray(description) ? description[0] : description || intro,
    },
    {
      title: t("detailsHeadings.sizes", {
        default: "Where It’s Produced / Used",
      }),
      content: Array.isArray(description) ? description[1] ?? intro : intro,
    },
    {
      title: t("detailsHeadings.sizes", { default: "Sizes / Thickness" }),
      content:
        sizes && sizes.length
          ? sizes.join(", ")
          : t("detailsHeadings.harvestText", {
              default: "See size options on the right.",
            }),
    },
    {
      title: t("detailsHeadings.features", { default: "Finishes & Features" }),
      content: [...(finishes || []), ...(features || [])]
        .slice(0, 12)
        .join(", "),
    },
  ];

  const whatsappText = encodeURIComponent("Merhaba Majen ekibi!");
  const whatsappHref = `https://api.whatsapp.com/send?phone=905335561092&text=${whatsappText}`;

      const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };


  return (
    <main className="px-5 md:px-8 lg:px-0 py-7 mt-16">
      {/* ======= ÜST INTRO (IntroSection tasarımı) ======= */}
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

      {/* ======= 4 BİLGİ KARTI ======= */}
      <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto">
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

      {/* ======= VARYANTLAR (daire görseller) ======= */}
      <VariantCircleSection
        heading={variantsHeading}
        variantCards={variantCards}
        imgMap={imgMap}
        heroSrc={heroSrc}
        IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_AND_VARIANT}
        productKey={productKey}
      />

        <TextSection title="Wholesale Travertine Blocks Blaundos Antiko From Turkey"  paragraphs={[
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
            ]}
            schema={schema}
            className="max-w-5xl mx-auto mt-12"
            clampMobile={3}
            as="section"/>

             <TextSection title="Wholesale Travertine Blocks Blaundos Light From Turkey"  paragraphs={[
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
            ]}
            schema={schema}
            className="max-w-5xl mx-auto mt-12"
            clampMobile={3}
            as="section"/>

             <TextSection title="Wholesale Travertine Blocks Blaundos Ivory From Turkey"  paragraphs={[
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
            ]}
            schema={schema}
            className="max-w-5xl mx-auto mt-12"
            clampMobile={3}
            as="section"/>

             <TextSection title="Wholesale Travertine Blocks From Turkey"  paragraphs={[
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
            ]}
            schema={schema}
            className="max-w-5xl mx-auto mt-12"
            clampMobile={3}
            as="section"/>

   <SocialMediaSection/>     
   <ContactFrom/>
    </main>
  );
}
