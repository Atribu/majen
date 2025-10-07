"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import {
  PRODUCT_KEYS,
  PRODUCT_SLUGS,
  VARIANT_KEY_BY_SLUG,
  baseFor,
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

const CUTS = ["vein-cut", "cross-cut"];
const PROCESSES = ["natural", "filling", "epoxy", "transparent", "antique"];
const FINISHES = ["polished", "unpolished"];

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

export default function ProcessPage() {
      const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };

  const { product: rawProduct, variant: vSlug, cut, process } = useParams();
  const locale = useLocale();
  const t = useTranslations("ProductPage");

  const prefix = `/${locale}`;
  const baseSegment = baseFor(locale);
  const baseHref = `${prefix}/${baseSegment}`;

  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === rawProduct) ||
    "slabs";

  const vKey = VARIANT_KEY_BY_SLUG[vSlug];
  if (!vKey) return null;

  // içerikler
  const title = t(`${productKey}.title`);
  const intro = t(`${productKey}.intro`);
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

  // info kartları
  const cards = [
    {
      title: `${vTitle} – ${title}`,
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

  // finish kartları (VariantCircleSection için)
  const finishLabels = (key) =>
    locale.startsWith("tr")
      ? key === "polished"
        ? "Cilalı"
        : "Cilasız"
      : key === "polished"
      ? "Polished"
      : "Unpolished";

  const finishImgMap = {
    polished: heroSrc,
    unpolished: heroSrc,
  };

  const finishCards = FINISHES.map((f) => ({
    slug: f,
    vKey: f,
    title: finishLabels(f),
    alt: "",
    href: `${prefix}/${baseSegment}/${rawProduct}/${vSlug}/${cut}/${process}/${f}`,
  }));

  return (
    <main className="px-5 md:px-8 lg:px-0 py-7 mt-16">
      {/* === INTRO === */}
      <ProductIntroSection
        title={`${vTitle} – ${title} · ${cut} · ${process}`}
        intro={intro}
        heroSrc={heroSrc}
        alt={vAlt}
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale === "tr" ? "Ana Sayfa" : "Home"}
        crumbProducts={locale === "tr" ? "Traverten" : "Travertine"}
        depth={4}
      />

      {/* === INFO CARDS === */}
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



      {/* === FINISH SEÇİMİ (yuvarlak görselli) === */}
      <VariantCircleSection
        heading={locale.startsWith("tr") ? "Yüzey Seç" : "Choose Finish"}
        variantCards={finishCards}
        imgMap={finishImgMap}
        heroSrc={heroSrc}
        IMAGE_BY_PRODUCT_AND_VARIANT={undefined}
        productKey="finish"
      />

      <TextSection title="Wholesale Travertine Blocks From Turkey"  paragraphs={[
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

            <TextSection title="Wholesale Travertine Blocks From Turkey"  paragraphs={[
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
