// app/[locale]/travertine/[product]/[variant]/page.js
// (TR için: app/[locale]/traverten/[product]/[variant]/page.js)

"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_BY_PRODUCT_VARIANT_AND_CUT } from "@/app/[locale]/(catalog)/_images";

import {
  CUTS,
  baseFor,
  PRODUCT_KEYS,
  PRODUCT_SLUGS,
  VARIANT_KEY_BY_SLUG,
  buildVariantChildPath,
} from "@/lib/travertine";

import {
  PRODUCT_IMG,
  IMAGE_BY_PRODUCT_AND_VARIANT,
} from "@/app/[locale]/(catalog)/_images";

import { DetailBlock } from "@/app/[locale]/(catalog)/_ui";
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";


function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
      <h4 className="font-semibold text-neutral-800 mb-2 text-center">
        {title}
      </h4>
      <div className="text-sm text-neutral-600 leading-[1.7] text-center">
        {children}
      </div>
    </div>
  );
}

export default function VariantPage() {
        const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };

  const { product: rawProduct, variant: vSlug } = useParams();
  const locale = useLocale();
  const t = useTranslations("ProductPage");

  const prefix = `/${locale}`;
  const baseSegment = baseFor(locale);
  const baseHref = `${prefix}/${baseSegment}`;

  // ürün anahtarı
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === rawProduct) ||
    "block";

  // varyant key
  const vKey = VARIANT_KEY_BY_SLUG[vSlug];
  if (!vKey) return null;

  // içerikler
  const title = t(`${productKey}.title`);
  const intro = t(`${productKey}.intro`);
  const alt = t(`${productKey}.alt`);
  const vTitle = t(`${productKey}.variants.${vKey}.title`);
  const vAlt = t(`${productKey}.variants.${vKey}.alt`);
  const sizes = t.raw(`${productKey}.sizes`) || [];
  const finishes = t.raw(`${productKey}.finishes`) || [];
  const features = t.raw(`${productKey}.features`) || [];
  const description = t.raw(`${productKey}.description`) || intro;

  // görseller
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[vSlug] ??
    (typeof imgMap === "object"
      ? imgMap?.[vKey] ?? imgMap?.cover ?? Object.values(imgMap)[0]
      : imgMap);

  // bilgi kartları
  const cards = [
    {
      title: t("detailsHeadings.sizes", { default: "Benefits of " }) + vTitle,
      content: Array.isArray(description) ? description[0] : description || intro,
    },
    {
      title: t("detailsHeadings.sizes", { default: "Where It’s Produced / Used" }),
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

  // cutCards verisi
const cutCards = CUTS.map((cut) => {
  const img =
    IMAGE_BY_PRODUCT_VARIANT_AND_CUT?.[productKey]?.[vSlug]?.[cut] ??
    IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[vSlug] ??
    heroSrc;

  return {
    slug: cut, // VariantCircleSection link için slug
    vKey: cut, // key gibi kullanıyoruz
    title: cut.replace("-", " "), // Görünecek isim
    alt: `${vTitle} – ${title} (${cut})`,
    href: buildVariantChildPath(locale, rawProduct, vSlug, [cut]),
  };
});


  return (
    <main className="px-5 md:px-8 lg:px-0 py-7 mt-16">
      {/* === ÜST INTRO === */}
      <ProductIntroSection
        title={`${vTitle} – ${title}`}
        intro={intro}
        heroSrc={heroSrc}
        alt={vAlt}
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        depth={2}
      />

      {/* === 4 INFO CARD === */}
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


      {/* === CUT SEÇİMİ === */}
      {productKey !== "block" && (
        <section className="mt-14 max-w-[1200px] mx-auto">
          <h2 className="text-lg md:text-xl font-semibold text-neutral-900 mb-4">
            {locale.startsWith("tr") ? "Kesim şekli seçin" : "Choose cut"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {CUTS.map((cut) => (
              <Link
                key={cut}
                href={buildVariantChildPath(locale, rawProduct, vSlug, [cut])}
                className="px-4 py-2 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition"
              >
                {cut}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* === CUT SEÇİMLERİ (dairesel görseller) === */}
{productKey !== "block" && (
  <VariantCircleSection
    heading={locale.startsWith("tr") ? "Kesim şekli" : "Cut options"}
    variantCards={cutCards}
    imgMap={imgMap}
    heroSrc={heroSrc}
    IMAGE_BY_PRODUCT_AND_VARIANT={IMAGE_BY_PRODUCT_AND_VARIANT}
    productKey={productKey}
  />
)}

 <TextSection title="Wholesale Travertine Special Designs From Turkey"  paragraphs={[
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

             <TextSection title="Wholesale Travertine Special Designs From Turkey"  paragraphs={[
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ut distinctio perferendis adipisci aliquam nam omnis ea labore fugiat quas voluptatum voluptate id atque, quasi corporis eveniet nihil ratione sapiente voluptas tempora sed veritatis assumenda rerum? Dignissimos illo atque quas repellat ullam accusamus labore perferendis dolorem minus quia maxime, tempore quisquam magni fugiat praesentium laborum molestias commodi"
                  ]}
                  schema={schema}
                  className="max-w-5xl mx-auto mt-12"
                  clampMobile={3}
                  as="section"/>

    <ContactFrom/>
    </main>
  );
}
