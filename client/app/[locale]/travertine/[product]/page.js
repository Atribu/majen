// app/[locale]/(catalog)/product/page.jsx (veya senin dosyan)
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

const VARIANT_SLUGS = ["blaundos-antiko", "blaundos-light", "blaundos-ivory"];

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

  // Görsel seçim
  const imgMap = PRODUCT_IMG[productKey];
  const heroSrc =
    typeof imgMap === "object" ? imgMap.cover ?? Object.values(imgMap)[0] : imgMap;

  // Varyant kartları
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

  return (
    <main className="px-5 md:px-8 lg:px-12 py-10 max-w-7xl mx-auto mt-16">
      {/* 1) Başlık çipi (glass + gradient kenar) */}
      <div className="inline-flex items-center rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]">
        <h1 className="px-5 py-2.5 text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-neutral-900">
          {title}
        </h1>
      </div>

      {/* 2) Breadcrumb – minik ayraç + erişilebilirlik */}
      <nav
        aria-label="Breadcrumb"
        className="mt-3 mb-7 text-sm text-neutral-500"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href={prefix} className="hover:text-neutral-700">
              {t("home", { default: "Anasayfa" })}
            </Link>
          </li>
          <li aria-hidden className="px-1 text-neutral-400">›</li>
          <li>
            <Link href={baseHref} className="hover:text-neutral-700">
              {t("products", { default: "Ürünler" })}
            </Link>
          </li>
          <li aria-hidden className="px-1 text-neutral-400">›</li>
          <li className="text-neutral-700">{title}</li>
        </ol>
      </nav>

      {/* 3) Hero + Sağ detaylar */}
      <section className="grid gap-8 md:grid-cols-2 items-start">
        {/* Sol: Hero görsel */}
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5">
          <div className="relative aspect-[16/10] md:aspect-[16/9]">
            {/* LCP için priority veriyoruz */}
            <HeroImage src={heroSrc} alt={alt} priority />
            {/* Alt bilgi şeridi */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
              <span className="block text-white/90 text-xs md:text-sm drop-shadow">
                {alt}
              </span>
            </div>
          </div>
        </div>

        {/* Sağ: Yazılar + özellikler */}
        <div className="mt-1 md:mt-0">
          <p className="text-base md:text-lg text-neutral-700 leading-[1.7]">
            {intro}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DetailBlock heading={t("detailsHeadings.sizes")} items={sizes} />
            <DetailBlock heading={t("detailsHeadings.finishes")} items={finishes} />
            <DetailBlock heading={t("detailsHeadings.features")} items={features} />
          </div>
        </div>
      </section>

      {/* 4) Açıklamalar (daha rahat okuma) */}
      <section className="mt-12 border-t border-neutral-200 pt-8">
        <h2 className="text-xl md:text-2xl font-semibold">
          {t("descriptions.heading", { default: "Ürün Açıklaması" })}
        </h2>
        <div className="mt-4 space-y-4 text-neutral-800 leading-[1.85]">
          {Array.isArray(description) ? (
            description.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>{description}</p>
          )}
        </div>
      </section>

      {/* 5) Varyantlar (daha modern kartlar) */}
      <section className="mt-12">
        <h3 className="text-xl md:text-2xl font-semibold">{variantsHeading}</h3>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {variantCards.map(({ slug, vKey, title, alt, href }) => {
            // ✅ slug + ürün için görsel; yoksa ürün imgMap’ten vKey’e düş
            const cardSrc =
              IMAGE_BY_PRODUCT_AND_VARIANT?.[productKey]?.[slug] ??
              (typeof imgMap === "object" ? imgMap[vKey] : imgMap) ??
              heroSrc;

            return (
              <Link
                key={slug}
                href={href}
                className="group relative overflow-hidden rounded-2xl ring-1 ring-neutral-200 bg-white/80 backdrop-blur-[2px] hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={cardSrc}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    priority={false}
                  />
                  {/* üst parlama */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-semibold drop-shadow-sm">
                      {title}
                    </h4>
                    <p className="text-white/90 text-xs mt-0.5 line-clamp-2">
                      {alt}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between text-sm">
                  <span className="font-medium text-neutral-700 group-hover:text-neutral-900">
                    {t("details", { default: "Detayları Gör" })}
                  </span>
                  <span
                    aria-hidden
                    className="translate-x-0 transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </div>

                {/* gradient kenar hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-amber-300/60 transition"
                />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
