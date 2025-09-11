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

// örnek varyantlar; sende farklıysa aynı mantıkla çalışır
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

  // prefix & base
  const prefix = `/${locale}`;
  const baseSegment = BASE_BY_LOCALE[locale];
  const baseHref = `${prefix}/${baseSegment}`;

  // productKey
  const productKey =
    PRODUCT_KEYS.find((k) => PRODUCT_SLUGS[locale]?.[k] === product) || "block";

  // içerikler
  const title = t(`${productKey}.title`);
  const alt = t(`${productKey}.alt`);
  const intro = t(`${productKey}.intro`);
  const sizes = t.raw(`${productKey}.sizes`) || [];
  const finishes = t.raw(`${productKey}.finishes`) || [];
  const features = t.raw(`${productKey}.features`) || [];
  const description = t.raw(`${productKey}.description`) || intro;
  const variantsHeading = t(`${productKey}.variants.heading`);

  // görsel seçim
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    typeof imgMap === "object" ? imgMap.cover ?? Object.values(imgMap)[0] : imgMap;

  // varyant kartları
  const variantCards = VARIANT_SLUGS.map((slug) => {
    const vKey = VARIANT_KEY_BY_SLUG[slug]; // "antiko" | "light" | "ivory"
    return {
      slug,
      vKey,
      title: t(`${productKey}.variants.${vKey}.title`),
      alt: t(`${productKey}.variants.${vKey}.alt`),
      href: `${baseHref}/${product}/${slug}`,
    };
  });

  // InfoCard içerikleri (mockup'taki 4 kutu)
  const cards = [
    {
      title: t("detailsHeadings.sizes", { default: "Benefits of " }) + title,
      content:
        Array.isArray(description) ? description[0] : (description || intro),
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
      content: [
        ...(finishes || []),
        ...(features || []),
      ].slice(0, 12).join(", "),
    },
  ];

  return (
    <main className="px-5 md:px-8 lg:px-12 py-10 max-w-[1200px] mx-auto mt-16">
      {/* ======= ÜST BANT (yeşil şerit + sağda görsel) ======= */}
      <section className="relative">
        <div className="grid lg:grid-cols-[1fr,520px] gap-0 items-stretch">
          {/* Sol: yeşil panel */}
          <div className="relative">
            <div className="rounded-3xl bg-emerald-900 text-white px-6 md:px-10 py-8 md:py-10 h-full flex flex-col justify-center shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                {title}
              </h1>
              <p className="text-white/90 text-sm md:text-base leading-[1.9] max-w-[62ch]">
                {intro}
              </p>
              {/* breadcrumb chip */}
              <div className="mt-5 inline-flex items-center rounded-lg bg-emerald-800/60 ring-1 ring-white/20 px-3 py-1.5 text-xs">
                <ol className="flex flex-wrap items-center gap-1">
                  <li>
                    <Link href={prefix} className="hover:underline">
                      {t("home", { default: "Home" })}
                    </Link>
                  </li>
                  <li aria-hidden className="px-1">/</li>
                  <li>
                    <Link href={baseHref} className="hover:underline">
                      {t("products", { default: "Products" })}
                    </Link>
                  </li>
                  <li aria-hidden className="px-1">/</li>
                  <li className="text-white/95">{title}</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Sağ: büyük görsel (üst banda oturan) */}
          <div className="relative mt-6 lg:mt-0 lg:-ml-6">
            <div className="relative h-[240px] sm:h-[320px] md:h-[380px] lg:h-full rounded-3xl overflow-hidden ring-1 ring-black/10">
              <HeroImage src={heroSrc} alt={alt} priority />
            </div>
          </div>
        </div>
      </section>

      {/* ======= 4 BİLGİ KARTI ======= */}
      <section className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {cards.map((c, i) => (
          <InfoCard key={i} title={c.title}>
            {typeof c.content === "string" ? (
              <>{c.content}</>
            ) : Array.isArray(c.content) ? (
              <>{c.content.join(", ")}</>
            ) : null}
          </InfoCard>
        ))}
      </section>

      {/* ======= DETAY BLOKLARI (varsa) ======= */}
      {(sizes?.length || finishes?.length || features?.length) ? (
        <section className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sizes?.length ? (
              <DetailBlock heading={t("detailsHeadings.sizes")} items={sizes} />
            ) : null}
            {finishes?.length ? (
              <DetailBlock heading={t("detailsHeadings.finishes")} items={finishes} />
            ) : null}
            {features?.length ? (
              <DetailBlock heading={t("detailsHeadings.features")} items={features} />
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ======= AÇIKLAMA ======= */}
      <section className="mt-12">
        <div className="prose prose-neutral max-w-none">
          <h2 className="text-2xl font-semibold">
            {t("descriptions.heading", { default: "Description" })}
          </h2>
        </div>
        <div className="mt-4 space-y-4 text-neutral-800 leading-[1.85]">
          {Array.isArray(description) ? (
            description.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>{description}</p>
          )}
        </div>
      </section>

      {/* ======= VARYANTLAR – dairesel görseller ======= */}
      <section className="mt-14">
        <h3 className="text-2xl font-semibold">{variantsHeading}</h3>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {variantCards.map(({ slug, vKey, title, alt, href }) => {
            const cardSrc =
              IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[slug] ??
              (typeof imgMap === "object" ? imgMap[vKey] : imgMap) ??
              heroSrc;

            return (
              <Link
                key={slug}
                href={href}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-40 w-40 sm:h-44 sm:w-44 rounded-full overflow-hidden ring-1 ring-neutral-200 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]">
                  <Image
                    src={cardSrc}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="160px"
                  />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-neutral-900">
                  {title}
                </h4>
                <p className="mt-1 text-sm text-neutral-600 max-w-[36ch]">
                  {alt}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
