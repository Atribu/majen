// app/[locale]/(catalog)/[product]/[variant]/[cut]/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  BASE_BY_LOCALE,
  PRODUCT_KEYS,
  PRODUCT_SLUGS,
  VARIANT_KEY_BY_SLUG, // örn: { "blaundos-antiko": "antiko", ... }
} from "@/lib/travertine";

import {
  PRODUCT_IMG,
  IMAGE_BY_PRODUCT_AND_VARIANT,
  IMAGE_BY_PRODUCT_VARIANT_AND_CUT,
} from "@/app/[locale]/(catalog)/_images";

import { DetailBlock, HeroImage } from "@/app/[locale]/(catalog)/_ui";
import ProductIntroSection from "@/app/[locale]/components/products1/ProductIntroSection";
import VariantCircleSection from "@/app/[locale]/components/products1/VariantCircleSection";
import TextSection from "@/app/[locale]/components/products1/TextSection";
import ContactFrom from "@/app/[locale]/components/generalcomponent/ContactFrom";

// Kesim ve süreç listeleri (gerekiyorsa i18n’e taşıyabilirsin)
const CUTS = ["vein-cut", "cross-cut"];
const PROCESSES = ["natural", "filling", "epoxy", "transparent", "antique"];

export default function CutPage() {
      const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Travertine from Turkey",
    author: { "@type": "Organization", name: "Majen" },
    publisher: { "@type": "Organization", name: "Majen" },
  };

  const { product, variant, cut } = useParams();
  const locale = useLocale();
  const t = useTranslations("ProductPage");

  // === base & prefix
  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];
  const baseHref = `${prefix}/${baseSegment}`;

  // === productKey çöz
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === product) || "slabs"; // cut sayfası block olmaz

  // === varyant key çöz
  const vKey = VARIANT_KEY_BY_SLUG[variant]; // "antiko" | "light" | "ivory" ...
  // güvenlik (geçersiz slug durumunda basit fallback)
  const safeVKey = vKey || Object.values(VARIANT_KEY_BY_SLUG)[0];

  // === metinler
  const titleProduct = t(`${productKey}.title`, { default: "Product" });
  const titleVariant = t(`${productKey}.variants.${safeVKey}.title`, { default: variant });
  const altVariant = t(`${productKey}.variants.${safeVKey}.alt`, { default: titleVariant });
  const intro = t(`${productKey}.intro`, { default: "" });

  // cut label (TR/EN çok basit örnek; i18n'e taşıyabilirsin)
  const cutLabel =
    cut === "vein-cut"
      ? (locale.startsWith("tr") ? "Damar Kesim" : "Vein Cut")
      : cut === "cross-cut"
      ? (locale.startsWith("tr") ? "Cross Kesim" : "Cross Cut")
      : cut;

  // === görsel seçimi (cut öncelikli)
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrcCut =
    IMAGE_BY_PRODUCT_VARIANT_AND_CUT?.[productKey]?.[variant]?.[cut] ??
    IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[variant] ??
    (typeof imgMap === "object" ? imgMap[safeVKey] ?? imgMap.cover ?? Object.values(imgMap)[0] : imgMap);

  // === detay içerikleri
  const sizes = t.raw(`${productKey}.sizes`) || [];
  const finishes = t.raw(`${productKey}.finishes`) || [];
  const features = t.raw(`${productKey}.features`) || [];
  const description = t.raw(`${productKey}.description`) || intro;

  // === üst başlıkta göstereceğimiz metin
  const composedTitle = `${titleVariant} – ${titleProduct} · ${cutLabel}`;

  // === info card’lar (ürün sayfasıyla uyumlu)
  const cards = [
    {
      title: t("detailsHeadings.sizes", { default: "Benefits of " }) + titleProduct,
      content: Array.isArray(description) ? description[0] : description || intro,
    },
    {
      title: t("detailsHeadings.sizes", { default: "Where It’s Produced / Used" }),
      content: Array.isArray(description) ? description[1] ?? intro : intro,
    },
    {
      title: t("detailsHeadings.sizes", { default: "Sizes / Thickness" }),
      content: (sizes && sizes.length)
        ? sizes.join(", ")
        : t("detailsHeadings.harvestText", { default: "See size options on the right." }),
    },
    {
      title: t("detailsHeadings.features", { default: "Finishes & Features" }),
      content: [...(finishes || []), ...(features || [])].slice(0, 12).join(", "),
    },
  ];

// === (heroSrcCut’tan SONRA) process etiketleri ve kartlar
const processLabels = (key) => {
  const tr = { natural: "Doğal", filling: "Dolgu", epoxy: "Epoksi", transparent: "Şeffaf", antique: "Antik" };
  const en = { natural: "Natural", filling: "Filling", epoxy: "Epoxy", transparent: "Transparent", antique: "Antique" };
  return locale.startsWith("tr") ? (tr[key] ?? key) : (en[key] ?? key);
};

// (İsteğe bağlı) process bazlı görseller — yoksa heroSrcCut fallback olur
const processImgMap = {
  natural: heroSrcCut,
  filling: heroSrcCut,
  epoxy: heroSrcCut,
  transparent: heroSrcCut,
  antique: heroSrcCut,
};

// VariantCircleSection’e uygun “kart” objeleri
const processCards = PROCESSES.map((p) => ({
  slug: p,
  vKey: p, // img seçimi için processImgMap[vKey]
  title: processLabels(p),
  alt: "", // YouTube vs. yoksa boş
  href: `${prefix}/${baseSegment}/${product}/${variant}/${cut}/${p}`,
}));


  return (
    <main className="px-5 md:px-8 lg:px-0 py-7 mt-16">
      {/* ======= ÜST INTRO (IntroSection yapısı + heroSrc = cut görseli) ======= */}
      <ProductIntroSection
        title={composedTitle}
        intro={intro}
        heroSrc={heroSrcCut}
        alt={altVariant}
        prefix={prefix}
        baseHref={`${baseHref}/${product}`} // breadcrumb “Travertine > {product}”
        crumbHome={locale.startsWith("tr") ? "Ana Sayfa" : "Home"}
        crumbProducts={locale.startsWith("tr") ? "Traverten" : "Travertine"}
         depth={3}
      />

      {/* ======= 4 BİLGİ KARTI ======= */}
      <section className="mt-8 md:mt-10 lg:mt-20 xl:mt-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-[1200px] mx-auto">
        {cards.map((c, i) => (
          <div key={i} className="rounded-2xl bg-white shadow-[0_6px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-neutral-200 p-5">
            <h4 className="font-semibold text-neutral-800 mb-2 text-center">{c.title}</h4>
            <div className="text-sm text-neutral-600 leading-[1.7] text-center">
              {typeof c.content === "string"
                ? c.content
                : Array.isArray(c.content)
                ? c.content.join(", ")
                : null}
            </div>
          </div>
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

      {/* ======= CUT SEÇİCİ (vein / cross) ======= */}
      <section className="mt-12 max-w-[1200px] mx-auto">
        <h3 className="text-lg md:text-xl font-semibold mb-3">
          {locale.startsWith("tr") ? "Kesim Seç" : "Choose cut"}
        </h3>
        <div className="flex flex-wrap gap-3">
          {CUTS.map((c) => (
            <Link
              key={c}
              href={`${prefix}/${baseSegment}/${product}/${variant}/${c}`}
              className={`px-4 py-2 rounded-full border transition ${
                c === cut
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 hover:border-black hover:bg-black hover:text-white"
              }`}
            >
              {c === "vein-cut"
                ? (locale.startsWith("tr") ? "Damar Kesim" : "Vein Cut")
                : (locale.startsWith("tr") ? "Cross Kesim" : "Cross Cut")}
            </Link>
          ))}
        </div>
      </section>

      {/* ======= PROCESS SEÇİCİ ======= */}
      <section className="mt-8 max-w-[1200px] mx-auto">
        <h3 className="text-lg md:text-xl font-semibold mb-3">
          {locale.startsWith("tr") ? "Yüzey İşlemi Seç" : "Choose process"}
        </h3>
        <div className="flex flex-wrap gap-3">
          {PROCESSES.map((p) => (
            <Link
              key={p}
              href={`${prefix}/${baseSegment}/${product}/${variant}/${cut}/${p}`}
              className="px-4 py-2 rounded-full border border-neutral-300 hover:border-black hover:bg-black hover:text-white transition"
            >
              {p}
            </Link>
          ))}
        </div>
      </section>

      <VariantCircleSection
  heading={locale.startsWith("tr") ? "Yüzey İşlemi Seç" : "Choose Process"}
  variantCards={processCards}
  imgMap={processImgMap}
  heroSrc={heroSrcCut}
  IMAGE_BY_PRODUCT_AND_VARIANT={undefined}
  productKey="process"
/>

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
