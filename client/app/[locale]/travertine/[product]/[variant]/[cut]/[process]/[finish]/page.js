// app/[locale]/travertine/[product]/[variant]/[cut]/[process]/[finish]/page.js
"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
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

// — ürün bazlı ölçüler
function sizeSlugList(productKey, t) {
  if (productKey === "slabs") return ["2cm", "3cm", "5cm"];
  if (productKey === "tiles") {
    const sizes = t.raw("tiles.sizes") || ["30×60", "60×60", "60×120"];
    return sizes.map((s) =>
      s.toLowerCase().replace(/[×*]/g, "x").replace(/\s+/g, "")
    );
  }
  return ["custom"];
}
function sizeLabelFromSlug(slug) {
  if (slug === "custom") return "Custom / Project-based";
  return slug.replace(/x/g, "×").replace(/([0-9])cm$/, "$1 cm");
}

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

export default function FinishPage() {
      const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };

  const { product: rawProduct, variant: vSlug, cut, process, finish } = useParams();
  const locale = useLocale();
  const t = useTranslations("ProductPage");

  const prefix = `/${locale}`;
  const baseSegment = baseFor(locale);
  const baseHref = `${prefix}/${baseSegment}`;

  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === rawProduct) || "slabs";

  const vKey = VARIANT_KEY_BY_SLUG[vSlug];
  if (!vKey) return null;

  const title   = t(`${productKey}.title`, { default: "Product" });
  const intro   = t(`${productKey}.intro`, { default: "" });
  const vTitle  = t(`${productKey}.variants.${vKey}.title`, { default: vSlug });
  const vAlt    = t(`${productKey}.variants.${vKey}.alt`, { default: vTitle });
  const sizes   = t.raw(`${productKey}.sizes`) || [];
  const finishes = t.raw(`${productKey}.finishes`) || [];
  const features = t.raw(`${productKey}.features`) || [];
  const description = t.raw(`${productKey}.description`) || intro;

  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[vSlug] ??
    (typeof imgMap === "object"
      ? imgMap?.[vKey] ?? imgMap?.cover ?? Object.values(imgMap)[0]
      : imgMap);

  const cards = [
    {
      title: `${vTitle} – ${title} · ${cut} · ${process} · ${finish}`,
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
          : t("detailsHeadings.harvestText", { default: "See size options on the right." }),
    },
    {
      title: t("detailsHeadings.features", { default: "Finishes & Features" }),
      content: [...(finishes || []), ...(features || [])].slice(0, 12).join(", "),
    },
  ];

  // === SIZE (yuvarlak kartlar) ===
  const sizeSlugs = sizeSlugList(productKey, t);

  const sizeCards = sizeSlugs.map((s) => ({
    slug: s,
    vKey: s, // component için bir key
    title: sizeLabelFromSlug(s),
    alt: "", // alt'ı boş bırakıyoruz (YouTube linki mekanizmasını tetiklememesi için)
    href: `${prefix}/${baseSegment}/${rawProduct}/${vSlug}/${cut}/${process}/${finish}/${s}`,
  }));

  // Tüm size’lar için aynı görseli kullanmak istersen:
  const sizeImgMap = Object.fromEntries(sizeSlugs.map((s) => [s, heroSrc]));

  return (
    <main className="px-5 md:px-8 lg:px-0 py-7 mt-16">
      {/* === INTRO === */}
      <ProductIntroSection
        title={`${vTitle} – ${title} · ${cut} · ${process} · ${finish}`}
        intro={intro}
        heroSrc={heroSrc}
        alt={vAlt}
        prefix={prefix}
        baseHref={baseHref}
        crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
        depth={5}
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



      {/* === SIZE (yuvarlak görselli seçim) === */}
      <VariantCircleSection
        heading={locale.startsWith("tr") ? "Ebat Seçin" : "Choose Size"}
        variantCards={sizeCards}
        imgMap={sizeImgMap}              // tüm size’lar aynı görsel → heroSrc
        heroSrc={heroSrc}
        IMAGE_BY_PRODUCT_AND_VARIANT={undefined}
        productKey="sizes"
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

      {/* İstersen altına eski chip’leri yedek olarak bırakabilirsin:
      <section className="mt-8 max-w-[1200px] mx-auto">
        <h2 className="text-lg md:text-xl font-semibold text-neutral-900 mb-4">
          {locale.startsWith("tr") ? "Ebat seçin" : "Choose size"}
        </h2>
        <div className="flex flex-wrap gap-3">
          {sizeSlugs.map((s) => (
            <Link
              key={s}
              href={`${prefix}/${baseSegment}/${rawProduct}/${vSlug}/${cut}/${process}/${finish}/${s}`}
              className="px-4 py-2 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition"
            >
              {sizeLabelFromSlug(s)}
            </Link>
          ))}
        </div>
      </section>
      */}
    </main>
  );
}
